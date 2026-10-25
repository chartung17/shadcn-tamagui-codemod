/**
 * Reads the custom properties shadcn puts in `globals.css`: `:root` (light
 * theme), `.dark` (dark theme) and `@theme` / `@theme inline` (Tailwind v4
 * mappings such as `--radius-lg` and `--font-sans`). This is not a general
 * CSS parser; it understands the flat blocks shadcn generates.
 */

export interface ShadcnCss {
  light: Record<string, string>
  dark: Record<string, string>
  theme: Record<string, string>
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '')
}

/** Top-level `selector { body }` blocks, with nested blocks kept inside `body`. */
function blocks(css: string): { selector: string; body: string }[] {
  const out: { selector: string; body: string }[] = []
  let depth = 0
  let start = 0
  let selectorStart = 0
  for (let i = 0; i < css.length; i++) {
    const c = css[i]
    if (c === '{') {
      if (depth === 0) start = i
      depth++
    } else if (c === '}') {
      depth--
      if (depth === 0) {
        out.push({
          selector: css.slice(selectorStart, start).trim(),
          body: css.slice(start + 1, i),
        })
        selectorStart = i + 1
      }
    } else if (c === ';' && depth === 0) {
      selectorStart = i + 1
    }
  }
  return out
}

function declarations(body: string): Record<string, string> {
  const out: Record<string, string> = {}
  // Only this block's own declarations, not nested rules.
  const flat = body.replace(/\{[^{}]*\}/g, '')
  for (const match of flat.matchAll(/(--[\w-]+)\s*:\s*([^;]+);?/g)) {
    out[match[1]!.slice(2)] = match[2]!.trim()
  }
  return out
}

export function parseShadcnCss(css: string): ShadcnCss {
  const result: ShadcnCss = { light: {}, dark: {}, theme: {} }
  const visit = (list: { selector: string; body: string }[]) => {
    for (const { selector, body } of list) {
      if (selector === ':root' || selector === ':root, :host')
        Object.assign(result.light, declarations(body))
      else if (
        selector === '.dark' ||
        selector === ':root.dark' ||
        selector === '.dark, [data-theme=dark]'
      ) {
        Object.assign(result.dark, declarations(body))
      } else if (/^@theme\b/.test(selector))
        Object.assign(result.theme, declarations(body))
      else if (/^@layer\b|^@media\b/.test(selector)) visit(blocks(body))
    }
  }
  visit(blocks(stripComments(css)))
  return result
}

/** Resolve `var(--x)` (with optional fallback) against a set of variables. */
export function resolveVars(
  value: string,
  vars: Record<string, string>,
  depth = 0,
): string {
  if (depth > 10) return value
  return value.replace(
    /var\(\s*--([\w-]+)\s*(?:,\s*([^)]+))?\)/g,
    (match, name: string, fallback?: string) => {
      const found = vars[name] ?? fallback
      return found === undefined ? match : resolveVars(found, vars, depth + 1)
    },
  )
}

/** Evaluate a length (`0.625rem`, `10px`, `calc(10px * 0.6)`) to px, if possible. */
export function lengthToPx(value: string): number | undefined {
  const v = value.trim()
  const calc = /^calc\((.*)\)$/.exec(v)
  const expr = (calc ? calc[1]! : v).replace(
    /(-?\d*\.?\d+)(rem|px)/g,
    (_, n: string, unit: string) => String(Number(n) * (unit === 'rem' ? 16 : 1)),
  )
  if (!/^[\d\s.+\-*/()]+$/.test(expr)) return undefined
  try {
    const result = Function(`"use strict"; return (${expr})`)() as unknown
    return typeof result === 'number' && Number.isFinite(result)
      ? Math.round(result * 100) / 100
      : undefined
  } catch {
    return undefined
  }
}
