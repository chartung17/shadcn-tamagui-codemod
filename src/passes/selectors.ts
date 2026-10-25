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
import { analyzeClass, defaultSupportContext } from '../tailwind/support.js'
import { parseClass, splitClasses } from '../tailwind/tokenize.js'
import type { FilePass } from '../types.js'

const DIRECTIONS = new Set([
  'flex-row',
  'flex-col',
  'flex-row-reverse',
  'flex-col-reverse',
])

function hasBaseDirection(text: string): boolean {
  return splitClasses(text).some((raw) => {
    const token = parseClass(raw)
    return !!token && token.variants.length === 0 && DIRECTIONS.has(token.base)
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
 * Pass 5. Rewrites state and selector variants where a cross-platform form
 * exists; everything else is reported by the classes pass.
 *
 * - `inline-flex` without a direction gets `flex-row`: native drops
 *   `inline-flex` and falls back to a column, while Tailwind's default is a row.
 * - `placeholder:text-<color>` gets a `placeholder-<color>` twin, which Tamagui
 *   maps to `placeholderTextColor` on native. The original stays for web.
 *
 * `active:` needs no rewrite (Tamagui reads it as `press:`), nor do `hover:`,
 * `focus:`, `focus-visible:`, `disabled:`, `dark:` and configured breakpoints.
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
    for (const [local, origin] of origins) {
      if (origin.module === 'class-variance-authority' && origin.imported === 'cva')
        cva.add(local)
    }
    for (const decl of sourceFile.getImportDeclarations()) {
      if (decl.getModuleSpecifierValue() !== TAMAGUI_TAILWIND) continue
      for (const spec of decl.getNamedImports()) {
        if (spec.getName() === 'styled')
          styled.add(spec.getAliasNode()?.getText() ?? 'styled')
      }
    }

    const support = defaultSupportContext()
    let changed = false
    for (const source of collectClassSources(sourceFile, { cva, styled })) {
      if (!isStaticString(source.node)) continue
      const literal = source.node
      const classes = splitClasses(literal.getLiteralText())
      const added: string[] = []

      const inlineFlex = classes.some((raw) => raw === 'inline-flex')
      if (
        inlineFlex &&
        !hasBaseDirection(literal.getLiteralText()) &&
        !earlierSiblings(literal).some((s) => hasBaseDirection(s.getLiteralText()))
      ) {
        added.push('flex-row')
      }

      for (const raw of classes) {
        const token = parseClass(raw)
        if (
          !token ||
          token.variants.length !== 1 ||
          token.variants[0]!.raw !== 'placeholder'
        )
          continue
        if (!token.base.startsWith('text-')) continue
        const twin = `placeholder-${token.base.slice('text-'.length)}`
        const twinToken = parseClass(twin)
        if (!twinToken || classes.includes(twin) || added.includes(twin)) continue
        if (analyzeClass(twinToken, support).status === 'supported') added.push(twin)
      }

      if (added.length === 0) continue
      let value = literal.getLiteralText()
      for (const cls of added) {
        value =
          cls === 'flex-row'
            ? value.replace(/(^|\s)inline-flex(?=\s|$)/, '$1inline-flex flex-row')
            : value.replace(/(\S+)(?=\s|$)/g, (match) =>
                match === `placeholder:text-${cls.slice('placeholder-'.length)}`
                  ? `${match} ${cls}`
                  : match,
              )
      }
      setStringValue(literal, value)
      changed = true
      diagnostics.info(literal, {
        code: 'selector/rewrite',
        construct: added.join(' '),
        reason: added.includes('flex-row')
          ? 'Added `flex-row`: native drops `inline-flex` and would lay the children out as a column.'
          : 'Added `placeholder-*`, which maps to `placeholderTextColor` on native.',
      })
    }
    return { changed, diagnostics: diagnostics.items }
  },
}
