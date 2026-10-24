/**
 * A small Tailwind class tokenizer.
 *
 * It splits a candidate such as `md:hover:!-translate-x-1/2` or
 * `[&_svg:not([class*='size-'])]:size-4` into its variants and base, and
 * recognizes important modifiers (`!` prefix from v3 or `!` suffix from v4),
 * negative values, arbitrary values (`[...]`, `(...)`), arbitrary properties
 * (`[mask-type:alpha]`) and opacity modifiers (`/50`). It does not know which
 * utilities exist; the support table does that.
 */

export interface Variant {
  /** Raw variant text, e.g. `hover`, `md`, `data-[state=open]`, `[&>svg]`. */
  raw: string
  /** Name without arbitrary/named parts: `hover`, `data`, `group-hover`, `[&>svg]`. */
  name: string
  /** Bracketed or parenthesized value, e.g. `state=open` for `data-[state=open]`. */
  value?: string
  /** Named group/peer suffix, e.g. `item` for `group-hover/item`. */
  label?: string
  /** True for a fully arbitrary variant such as `[&>svg]` or `[.border-b]`. */
  arbitrary: boolean
}

export interface ClassToken {
  /** The candidate exactly as written. */
  raw: string
  variants: Variant[]
  important: boolean
  /** `prefix` for v3-style `!p-4`, `suffix` for v4-style `p-4!`. */
  importantStyle?: 'prefix' | 'suffix'
  negative: boolean
  /** Utility without variants, important marker or leading `-`. */
  base: string
  /** True for an arbitrary property like `[mask-type:alpha]`. */
  arbitraryProperty: boolean
  /** Value inside `[...]` or `(...)` in the base, if any. */
  arbitraryValue?: string
  /** Opacity / line-height modifier after `/` (outside brackets), if any. */
  modifier?: string
}

/** Split a class string into candidates. */
export function splitClasses(value: string): string[] {
  return value.split(/\s+/).filter(Boolean)
}

/** Index of each top-level occurrence of `char` (outside brackets/parens/quotes). */
function topLevelIndexes(text: string, char: string): number[] {
  const out: number[] = []
  let depth = 0
  let quote: string | undefined
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!
    if (quote) {
      if (c === '\\') i++
      else if (c === quote) quote = undefined
      continue
    }
    if (c === '"' || c === "'") {
      if (depth > 0) quote = c
      continue
    }
    if (c === '[' || c === '(') depth++
    else if (c === ']' || c === ')') depth = Math.max(0, depth - 1)
    else if (c === char && depth === 0) out.push(i)
  }
  return out
}

function isBalanced(text: string): boolean {
  let depth = 0
  for (const c of text) {
    if (c === '[' || c === '(') depth++
    else if (c === ']' || c === ')') depth--
    if (depth < 0) return false
  }
  return depth === 0
}

export function parseVariant(raw: string): Variant {
  if (raw.startsWith('[') && raw.endsWith(']')) {
    return { raw, name: raw, value: raw.slice(1, -1), arbitrary: true }
  }
  let rest = raw
  let label: string | undefined
  const slashes = topLevelIndexes(rest, '/')
  const slash = slashes[slashes.length - 1]
  if (slash !== undefined) {
    label = rest.slice(slash + 1)
    rest = rest.slice(0, slash)
  }
  const bracket = rest.search(/[[(]/)
  if (bracket > 0 && (rest.endsWith(']') || rest.endsWith(')'))) {
    const name = rest.slice(0, bracket).replace(/-$/, '')
    const value = rest.slice(bracket + 1, -1)
    return { raw, name, value, label, arbitrary: false }
  }
  return { raw, name: rest, label, arbitrary: false }
}

/** Parse one candidate. Returns `undefined` for unbalanced or empty input. */
export function parseClass(raw: string): ClassToken | undefined {
  if (!raw || !isBalanced(raw)) return undefined
  const colons = topLevelIndexes(raw, ':')
  const last = colons[colons.length - 1]
  const variantText = last === undefined ? [] : splitAt(raw.slice(0, last), colons)
  let base = last === undefined ? raw : raw.slice(last + 1)
  if (!base) return undefined

  let importantStyle: ClassToken['importantStyle']
  if (base.startsWith('!')) {
    importantStyle = 'prefix'
    base = base.slice(1)
  } else if (base.endsWith('!')) {
    importantStyle = 'suffix'
    base = base.slice(0, -1)
  }
  const important = importantStyle !== undefined
  let negative = false
  if (base.startsWith('-') && base.length > 1) {
    negative = true
    base = base.slice(1)
  }
  if (!base) return undefined

  const token: ClassToken = {
    raw,
    variants: variantText.map(parseVariant),
    important,
    ...(importantStyle ? { importantStyle } : {}),
    negative,
    base,
    arbitraryProperty: false,
  }

  if (base.startsWith('[') && base.endsWith(']')) {
    token.arbitraryProperty = true
    token.arbitraryValue = base.slice(1, -1)
    return token
  }

  const slashes = topLevelIndexes(base, '/')
  const slash = slashes[slashes.length - 1]
  let utility = base
  if (slash !== undefined) {
    const after = base.slice(slash + 1)
    const before = base.slice(0, slash)
    // `w-1/2` is a fraction, not a modifier.
    if (!(/^\d+$/.test(after) && /-\d+$/.test(before))) {
      token.modifier = after
      utility = before
    }
  }
  const open = utility.search(/[[(]/)
  if (open > 0 && (utility.endsWith(']') || utility.endsWith(')'))) {
    token.arbitraryValue = utility.slice(open + 1, -1)
  }
  return token
}

/** Split `prefix` (text before the last top-level colon) into variant strings. */
function splitAt(prefix: string, colons: number[]): string[] {
  const out: string[] = []
  let start = 0
  for (const index of colons) {
    if (index >= prefix.length) break
    out.push(prefix.slice(start, index))
    start = index + 1
  }
  out.push(prefix.slice(start))
  return out.filter(Boolean)
}

/** Rebuild a candidate string from a token, e.g. after editing its variants. */
export function formatClass(token: ClassToken): string {
  const base = `${token.negative ? '-' : ''}${token.base}`
  const variants = token.variants.map((v) => `${v.raw}:`).join('')
  if (!token.important) return `${variants}${base}`
  return token.importantStyle === 'prefix' ? `${variants}!${base}` : `${variants}${base}!`
}

/** True when the token applies unconditionally (no variants). */
export function isBaseLevel(token: ClassToken): boolean {
  return token.variants.length === 0
}
