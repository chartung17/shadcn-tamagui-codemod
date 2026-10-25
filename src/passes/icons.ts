import { Node, type JsxAttribute, type SourceFile } from 'ts-morph'
import {
  getAttributeExpression,
  getClassNameAttribute,
  isStaticString,
} from '../ast/classNames.js'
import { ensureNamedImport, TAMAGUI_TAILWIND } from '../ast/imports.js'
import { collectElements, type ElementNode } from '../ast/jsx.js'
import { isInScope } from '../ast/scope.js'
import { DiagnosticCollector } from '../diagnostics.js'
import {
  analyzeClass,
  defaultSupportContext,
  type SupportContext,
} from '../tailwind/support.js'
import { parseClass, splitClasses } from '../tailwind/tokenize.js'
import type { FilePass, PassContext } from '../types.js'

export const DEFAULT_ICONS_IMPORT = '@/components/icons'
const LUCIDE = 'lucide-react'
const ICON_HELPERS = '@tamagui/helpers-icon'

/** Lucide source icon for an imported name: `ChevronDownIcon` -> `ChevronDown`. */
export function lucideSource(name: string): string {
  return name.replace(/^Lucide(?=[A-Z])/, '').replace(/(?<=.)Icon$/, '')
}

export function iconsFromContext(context: PassContext): Map<string, string> {
  let icons = context.shared.get('icons:used') as Map<string, string> | undefined
  if (!icons) {
    icons = new Map()
    context.shared.set('icons:used', icons)
  }
  return icons
}

interface IconProps {
  size?: string
  color?: string
  fill?: string
  opacity?: string
  strokeWidth?: string
}

/** Tailwind size in px for spacing values like `4`, `3.5`, `px`, `[18px]`, `[1.5rem]`. */
function spacingPx(value: string): number | undefined {
  if (value === 'px') return 1
  if (/^\d+(\.\d+)?$/.test(value)) return Number(value) * 4
  const arbitrary = /^\[(\d+(?:\.\d+)?)(px|rem)\]$/.exec(value)
  if (arbitrary) return Number(arbitrary[1]) * (arbitrary[2] === 'rem' ? 16 : 1)
  return undefined
}

/**
 * Split an icon's classes into Tamagui icon props (size, color, fill,
 * opacity, stroke width) and the rest, which go on a `View asChild` wrapper.
 */
function partitionIconClasses(
  text: string,
  support: SupportContext,
): { props: IconProps; rest: string[] } {
  const props: IconProps = {}
  const rest: string[] = []
  let width: number | undefined
  let height: number | undefined
  const widthHeight: string[] = []
  for (const raw of splitClasses(text)) {
    const token = parseClass(raw)
    if (!token || token.variants.length > 0 || token.important || token.negative) {
      rest.push(raw)
      continue
    }
    const base = token.base
    let m: RegExpExecArray | null
    if ((m = /^size-(.+)$/.exec(base)) && spacingPx(m[1]!) !== undefined && !props.size) {
      props.size = String(spacingPx(m[1]!))
    } else if ((m = /^([wh])-(.+)$/.exec(base)) && spacingPx(m[2]!) !== undefined) {
      if (m[1] === 'w') width = spacingPx(m[2]!)
      else height = spacingPx(m[2]!)
      widthHeight.push(raw)
    } else if (
      (m = /^(text|fill)-(.+)$/.exec(base)) &&
      token.modifier === undefined &&
      !token.arbitraryValue &&
      analyzeClass(parseClass(`bg-${m[2]}`)!, support).status === 'supported'
    ) {
      props[m[1] === 'text' ? 'color' : 'fill'] = JSON.stringify(m[2])
    } else if ((m = /^opacity-(\d+)$/.exec(base))) {
      props.opacity = String(Number(m[1]) / 100)
    } else if ((m = /^stroke-(\d+)$/.exec(base))) {
      props.strokeWidth = String(Number(m[1]))
    } else {
      rest.push(raw)
    }
  }
  if (!props.size && width !== undefined && width === height) props.size = String(width)
  else rest.push(...widthHeight)
  return { props, rest }
}

function isIconElement(element: ElementNode, icons: Set<string>): boolean {
  const tag = element.getTagNameNode()
  return Node.isIdentifier(tag) && icons.has(tag.getText())
}

function rewriteIconElement(
  sourceFile: SourceFile,
  element: ElementNode,
  attr: JsxAttribute,
  diagnostics: DiagnosticCollector,
  support: SupportContext,
): void {
  const expr = getAttributeExpression(attr)
  let restExpression: string | undefined
  let props: IconProps = {}
  if (expr && isStaticString(expr)) {
    const parts = partitionIconClasses(expr.getLiteralText(), support)
    props = parts.props
    const rest = parts.rest.join(' ')
    if (rest)
      restExpression = rest.includes('"') ? `{${JSON.stringify(rest)}}` : `"${rest}"`
  } else if (expr) {
    restExpression = `{${expr.getText()}}`
  }
  const existing = new Set(
    element
      .getAttributes()
      .filter((a): a is JsxAttribute => Node.isJsxAttribute(a))
      .map((a) => a.getNameNode().getText()),
  )
  const index = element.getAttributes().indexOf(attr)
  attr.remove()
  const added = Object.entries(props)
    .filter(([name]) => !existing.has(name))
    .map(([name, value]) => ({
      name,
      initializer: value.startsWith('"') ? value : `{${value}}`,
    }))
  if (added.length) element.insertAttributes(index, added)

  if (restExpression) {
    // Tamagui icons take size/color props but not classes; a View with
    // `asChild` applies the remaining classes to the icon on web and native.
    diagnostics.info(element, {
      code: 'icon/wrapped',
      construct: restExpression.replace(/^\{|\}$/g, '').replace(/^"|"$/g, ''),
      reason:
        'Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper.',
    })
    const view = ensureNamedImport(sourceFile, TAMAGUI_TAILWIND, 'View')
    const key = element
      .getAttributes()
      .find(
        (a): a is JsxAttribute =>
          Node.isJsxAttribute(a) && a.getNameNode().getText() === 'key',
      )
    const keyText = key ? ` ${key.getText()}` : ''
    key?.remove()
    const jsx = Node.isJsxOpeningElement(element) ? element.getParentOrThrow() : element
    jsx.replaceWithText(
      `<${view} asChild${keyText} className=${restExpression}>${jsx.getText()}</${view}>`,
    )
  }
}

/**
 * Pass 7. Points `lucide-react` imports at the Tamagui-generated icon
 * components (`npx @tamagui/cli icons add ...`, written to
 * `components/icons` by default), keeping every imported name, and turns icon
 * classes into icon props. The names used are collected so the report can
 * print the generation command.
 */
export const iconsPass: FilePass = {
  name: 'icons',
  description: 'Map lucide-react icons to Tamagui-generated icon components',
  run(sourceFile, context) {
    const diagnostics = new DiagnosticCollector('icons')
    if (!isInScope(sourceFile, context)) return { changed: false, diagnostics: [] }
    const iconsImport = context.options.iconsImport ?? DEFAULT_ICONS_IMPORT
    const used = iconsFromContext(context)
    const locals = new Set<string>()
    let changed = false

    for (const decl of sourceFile.getImportDeclarations()) {
      if (decl.getModuleSpecifierValue() !== LUCIDE) continue
      if (decl.getDefaultImport() || decl.getNamespaceImport()) {
        context.metrics.constructs.flagged++
        diagnostics.todo(decl, {
          code: 'icon/import-style',
          construct: decl.getText(),
          reason: 'Only named imports from `lucide-react` are converted.',
          suggestion: 'Import each icon by name, then re-run the codemod.',
        })
        continue
      }
      const values: { name: string; alias?: string }[] = []
      const types: string[] = []
      for (const spec of decl.getNamedImports()) {
        const name = spec.getName()
        const alias = spec.getAliasNode()?.getText()
        if (
          decl.isTypeOnly() ||
          spec.isTypeOnly() ||
          name === 'LucideIcon' ||
          name === 'LucideProps'
        ) {
          types.push(alias ?? name)
          if (name === 'LucideIcon' || name === 'LucideProps') {
            const helper = ensureNamedImport(sourceFile, ICON_HELPERS, 'IconProps', {
              typeOnly: true,
            })
            const replacement =
              name === 'LucideIcon' ? `React.ComponentType<${helper}>` : helper
            for (const id of sourceFile.getDescendants()) {
              if (
                Node.isIdentifier(id) &&
                id.getText() === (alias ?? name) &&
                Node.isTypeReference(id.getParent())
              ) {
                id.getParent()!.replaceWithText(replacement)
              }
            }
          }
          continue
        }
        values.push(alias ? { name, alias } : { name })
        used.set(name, lucideSource(name))
        locals.add(alias ?? name)
      }
      decl.remove()
      if (values.length) {
        sourceFile.addImportDeclaration({
          moduleSpecifier: iconsImport,
          namedImports: values,
        })
      }
      context.metrics.constructs.converted += values.length
      changed = true
    }
    if (locals.size === 0) return { changed, diagnostics: diagnostics.items }

    const support = defaultSupportContext(context.options.themeKeys)
    // Elements are rewritten from the innermost out, since wrapping replaces text.
    for (const element of collectElements(sourceFile).reverse()) {
      if (element.wasForgotten() || !isIconElement(element, locals)) continue
      const attr = getClassNameAttribute(element)
      if (!attr) continue
      rewriteIconElement(sourceFile, element, attr, diagnostics, support)
      changed = true
    }
    return { changed, diagnostics: diagnostics.items }
  },
}
