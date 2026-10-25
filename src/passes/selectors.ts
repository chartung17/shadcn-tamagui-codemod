import { Node } from 'ts-morph'
import {
  collectClassSources,
  isStaticString,
  setStringValue,
  type StaticString,
} from '../ast/classNames.js'
import { getImportOrigins, TAMAGUI_TAILWIND } from '../ast/imports.js'
import { isInScope } from '../ast/scope.js'
import { DiagnosticCollector } from '../diagnostics.js'
import {
  analyzeClass,
  analyzeVariant,
  defaultSupportContext,
  expandCustomVariant,
  isAssumedOnNative,
  isWebPassthrough,
  themeColorAsVariable,
  WEB_DARK_VARIANT,
  type SupportContext,
} from '../tailwind/support.js'
import {
  formatClass,
  parseClass,
  parseVariant,
  splitClasses,
  type ClassToken,
} from '../tailwind/tokenize.js'
import type { FilePass } from '../types.js'

const DIRECTIONS = new Set([
  'flex-row',
  'flex-col',
  'flex-row-reverse',
  'flex-col-reverse',
])

/**
 * A direction that applies by default: unconditional, or behind a variant that
 * holds for the default orientation (`data-horizontal:flex-col` on Tabs).
 */
function hasBaseDirection(text: string): boolean {
  return splitClasses(text).some((raw) => {
    const token = parseClass(raw)
    return (
      !!token &&
      DIRECTIONS.has(token.base) &&
      token.variants.every((v) => isAssumedOnNative(expandCustomVariant(v.raw) ?? v.raw))
    )
  })
}

const BORDER_WIDTH = /^border(?:-[xytrblse])?(?:-(?:[1-9]\d*|\[[^\]]+\]))?$/
/** Pseudo-elements and descendant selectors: inline styles never compete with these. */
const NOT_SELF =
  /^(?:\*|\*\*|\[.*|before|after|placeholder|file|marker|selection|backdrop|first-letter|first-line)$/

const BORDER_NOT_COLOR =
  /^border(?:-[xytrblse])?-(?:\d+|\[[^\]]+\]|solid|dashed|dotted|double|hidden|none)$|^border-(?:spacing|collapse|separate)\b/

/** A base-level border color class (`border-input`, `border-b-transparent`). */
function hasBaseBorderColor(text: string): boolean {
  return splitClasses(text).some((raw) => {
    const token = parseClass(raw)
    return (
      !!token &&
      token.variants.length === 0 &&
      /^border-/.test(token.base) &&
      !BORDER_WIDTH.test(token.base) &&
      !BORDER_NOT_COLOR.test(token.base)
    )
  })
}

/** Static strings that come before `literal` in the same call (`cn("flex-col", "inline-flex")`). */
function earlierSiblings(literal: StaticString): StaticString[] {
  const call = literal.getParent()
  if (!Node.isCallExpression(call)) return []
  const args = call.getArguments()
  return args
    .slice(0, args.indexOf(literal))
    .filter((arg): arg is StaticString => isStaticString(arg))
}

/**
 * Whether the classes in `node` end up on an `html.*` element: a `className`
 * on `<html.div>` (directly or through `cn()`), or the base of `styled(html.div, ...)`.
 */
function targetsHtml(
  node: Node,
  htmlNames: ReadonlySet<string>,
  styled: ReadonlySet<string>,
): boolean {
  const isHtml = (text: string) =>
    [...htmlNames].some((name) => text.startsWith(`${name}.`))
  for (const ancestor of node.getAncestors()) {
    if (Node.isJsxAttribute(ancestor)) {
      const element = ancestor.getParent()?.getParent()
      return (
        !!element &&
        (Node.isJsxOpeningElement(element) || Node.isJsxSelfClosingElement(element)) &&
        isHtml(element.getTagNameNode().getText())
      )
    }
    if (
      Node.isCallExpression(ancestor) &&
      styled.has(ancestor.getExpression().getText())
    ) {
      return isHtml(ancestor.getArguments()[0]?.getText() ?? '')
    }
  }
  return false
}

interface Rewrite {
  /** The classes after rewriting, in order. */
  classes: string[]
  webVariants: string[]
  webColors: string[]
  webState: string[]
  nativeAssumed: string[]
}

/**
 * `native:<class>` for a supported class behind a variant assumed to hold on
 * native (`data-horizontal:h-1.5` -> `native:h-1.5`), since native drops it.
 */
function nativeTwin(token: ClassToken, support: SupportContext): string | undefined {
  const assumed = token.variants.filter((v) => isAssumedOnNative(v.raw))
  if (assumed.length !== 1) return undefined
  const rest: ClassToken = {
    ...token,
    variants: [parseVariant('native'), ...token.variants.filter((v) => v !== assumed[0])],
  }
  return analyzeClass(rest, support).status === 'supported'
    ? formatClass(rest)
    : undefined
}

/**
 * Rewrite a class Tamagui leaves to Tailwind on web (see `isWebPassthrough`):
 * shadcn's custom variants become the attribute selectors they stand for,
 * `dark:` targets Tamagui's dark theme class, and theme colors read Tamagui's
 * theme variables. A class native also resolves is kept, with the web form added
 * after it (native drops the `(--var)` form).
 */
function rewriteForWeb(
  raw: string,
  existing: readonly string[],
  support: SupportContext,
  out: Rewrite,
): void {
  const token = parseClass(raw)
  if (!token) {
    out.classes.push(raw)
    return
  }
  let variantChanged = false
  const variants = token.variants.map((variant) => {
    const expanded = expandCustomVariant(variant.raw)
    if (!expanded) return variant
    variantChanged = true
    return parseVariant(expanded)
  })
  let next: ClassToken = { ...token, variants }
  const native = nativeTwin(next, support)
  const twin = native && !existing.includes(native) ? [native] : []
  if (twin.length) out.nativeAssumed.push(raw)
  if (!isWebPassthrough(next, support)) {
    out.classes.push(variantChanged ? formatClass(next) : raw, ...twin)
    if (variantChanged) out.webVariants.push(raw)
    return
  }
  const withDark = next.variants.map((variant) =>
    variant.raw === 'dark' ? parseVariant(WEB_DARK_VARIANT) : variant,
  )
  if (withDark.some((variant, i) => variant !== next.variants[i])) variantChanged = true
  next = { ...next, variants: withDark }
  const color = themeColorAsVariable(next, support)
  if (color) next = { ...next, base: color }
  // A state variant has to beat the inline styles Tamagui renders for the base
  // classes of a runtime className (`cn(...)`), as it beats them in CSS.
  const state =
    next.variants.some((v) => analyzeVariant(v, support).status !== 'supported') &&
    !next.variants.some((v) => NOT_SELF.test(v.raw))
  const important = state && !next.important
  if (important) next = { ...next, important: true, importantStyle: 'suffix' }
  if (!variantChanged && !color && !important) {
    out.classes.push(raw, ...twin)
    return
  }
  const web = formatClass(next)
  const nativeUsesIt = analyzeClass(token, support).status === 'supported'
  if (nativeUsesIt && existing.includes(web)) {
    out.classes.push(raw, ...twin)
    return
  }
  // The web form goes first: Tamagui resolves the original at runtime, and the
  // last class it can resolve wins.
  out.classes.push(...(nativeUsesIt ? [web, raw] : [web]), ...twin)
  if (color) out.webColors.push(raw)
  else if (variantChanged) out.webVariants.push(raw)
  else out.webState.push(raw)
}

/**
 * Pass 5. Rewrites classes so they behave the same after conversion; what
 * cannot be rewritten is reported by the classes pass.
 *
 * - `flex` (on anything but an `html.*` element) and `inline-flex` without a
 *   direction get `flex-row`: Tamagui views and native default to a column,
 *   while Tailwind's default is a row.
 * - A border width without a border color gets `border-border`: shadcn's base
 *   CSS gives every element that color, and native defaults to black.
 * - `placeholder:text-<color>` gets a `placeholder-<color>` twin, which Tamagui
 *   maps to `placeholderTextColor` on native. The original stays for web.
 * - Classes Tamagui leaves to Tailwind on web are compiled with Tailwind's
 *   default theme, so their shadcn custom variants, `dark:` and theme colors are
 *   rewritten (see `rewriteForWeb`).
 *
 * `active:` needs no rewrite (Tamagui reads it as `press:`), nor do `hover:`,
 * `focus:`, `focus-visible:`, `disabled:`, `dark:` and configured breakpoints
 * on classes Tamagui claims.
 */
export const selectorsPass: FilePass = {
  name: 'selectors',
  description: 'Rewrite variants that have a cross-platform form',
  run(sourceFile, context) {
    const diagnostics = new DiagnosticCollector('selectors')
    if (!isInScope(sourceFile, context)) return { changed: false, diagnostics: [] }
    const origins = getImportOrigins(sourceFile, context)
    const cva = new Set(['cva'])
    const styled = new Set<string>()
    const html = new Set<string>()
    for (const [local, origin] of origins) {
      if (origin.module === 'class-variance-authority' && origin.imported === 'cva')
        cva.add(local)
    }
    for (const decl of sourceFile.getImportDeclarations()) {
      if (decl.getModuleSpecifierValue() !== TAMAGUI_TAILWIND) continue
      for (const spec of decl.getNamedImports()) {
        const local = spec.getAliasNode()?.getText() ?? spec.getName()
        if (spec.getName() === 'styled') styled.add(local)
        if (spec.getName() === 'html') html.add(local)
      }
    }

    const support = defaultSupportContext(context.options.themeKeys)
    const borderColor = support.themeColors.has('border')
    let changed = false
    for (const source of collectClassSources(sourceFile, { cva, styled })) {
      if (!isStaticString(source.node)) continue
      const literal = source.node
      const text = literal.getLiteralText()
      const earlier = earlierSiblings(literal).map((s) => s.getLiteralText())
      const hasDirection =
        hasBaseDirection(text) || earlier.some((s) => hasBaseDirection(s))
      const needsBorderColor =
        borderColor && !hasBaseBorderColor(text) && !earlier.some(hasBaseBorderColor)

      const rewrite: Rewrite = {
        classes: [],
        webVariants: [],
        webColors: [],
        webState: [],
        nativeAssumed: [],
      }
      const added: string[] = []
      const add = (cls: string) => {
        added.push(cls)
        rewrite.classes.push(cls)
      }
      const original = splitClasses(text)
      for (const raw of original) {
        rewriteForWeb(raw, original, support, rewrite)
        if (
          !hasDirection &&
          !added.includes('flex-row') &&
          (raw === 'inline-flex' ||
            (raw === 'flex' && !targetsHtml(literal, html, styled)))
        ) {
          add('flex-row')
        }
        if (
          needsBorderColor &&
          !added.includes('border-border') &&
          BORDER_WIDTH.test(parseClass(raw)?.base ?? '')
        )
          add('border-border')
        const token = parseClass(raw)
        if (
          token?.variants.length === 1 &&
          token.variants[0]!.raw === 'placeholder' &&
          token.base.startsWith('text-')
        ) {
          const twin = `placeholder-${token.base.slice('text-'.length)}`
          const twinToken = parseClass(twin)
          if (
            twinToken &&
            !original.includes(twin) &&
            analyzeClass(twinToken, support).status === 'supported'
          ) {
            add(twin)
          }
        }
      }

      const value = rewrite.classes.join(' ')
      if (value === original.join(' ')) continue
      setStringValue(literal, value)
      changed = true
      if (added.length) {
        diagnostics.info(literal, {
          code: 'selector/rewrite',
          construct: added.join(' '),
          reason: [
            added.includes('flex-row') &&
              'Added `flex-row`: Tamagui views and native lay out a `flex` container as a column.',
            added.includes('border-border') &&
              'Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black.',
            added.some((c) => c.startsWith('placeholder-')) &&
              'Added `placeholder-*`, which maps to `placeholderTextColor` on native.',
          ]
            .filter(Boolean)
            .join(' '),
        })
      }
      if (rewrite.webVariants.length) {
        diagnostics.info(literal, {
          code: 'selector/web-variant',
          construct: rewrite.webVariants.join(' '),
          reason:
            "Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS.",
        })
      }
      if (rewrite.webState.length) {
        diagnostics.info(literal, {
          code: 'selector/web-state',
          construct: rewrite.webState.join(' '),
          reason:
            'Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web.',
        })
      }
      if (rewrite.nativeAssumed.length) {
        diagnostics.info(literal, {
          code: 'selector/native-orientation',
          construct: rewrite.nativeAssumed.join(' '),
          reason:
            'Added a `native:` copy of classes behind `data-horizontal:` (data variants are dropped on native), assuming the default horizontal orientation. Vertical components need those classes adjusted by hand on native.',
        })
      }
      if (rewrite.webColors.length) {
        diagnostics.info(literal, {
          code: 'selector/web-color',
          construct: rewrite.webColors.join(' '),
          reason:
            "Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors.",
        })
      }
    }
    return { changed, diagnostics: diagnostics.items }
  },
}
