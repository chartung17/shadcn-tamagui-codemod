import { Node, SyntaxKind, type SourceFile } from 'ts-morph'
import {
  getAttributeExpression,
  getClassNameAttribute,
  getUnconditionalClasses,
  getUnconditionalStrings,
  isStaticString,
  setStringValue,
  type StaticString,
} from '../ast/classNames.js'
import { ensureNamedImport, TAMAGUI_TAILWIND } from '../ast/imports.js'
import {
  collectElements,
  getAttribute,
  renameElement,
  type ElementNode,
} from '../ast/jsx.js'
import { isInScope } from '../ast/scope.js'
import htmlElements from '../data/html-elements.json' with { type: 'json' }
import { DiagnosticCollector } from '../diagnostics.js'
import { splitClasses } from '../tailwind/tokenize.js'
import type { FilePass, PassContext } from '../types.js'

interface TagInfo {
  backing: string
  display: string
  nativeSupported: boolean
  note?: string
}

const TAGS: Readonly<Record<string, TagInfo>> = htmlElements.tags
const NATIVE_INPUT_TYPES = new Set<string>(htmlElements.nativeInputTypes)

const SELECT_FAMILY = new Set(['select', 'option', 'optgroup'])
const DIRECTION_CLASSES = new Set([
  'flex-row',
  'flex-col',
  'flex-row-reverse',
  'flex-col-reverse',
])
/** Intrinsic tags that may become `View` when they are plain flex containers. */
const VIEW_CANDIDATES = new Set(['div', 'span'])

const TABLE_TAGS = new Set([
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'caption',
  'colgroup',
  'col',
])
const SVG_TAGS = new Set([
  'svg',
  'g',
  'path',
  'circle',
  'ellipse',
  'line',
  'polyline',
  'polygon',
  'rect',
  'text',
  'tspan',
  'defs',
  'linearGradient',
  'radialGradient',
  'stop',
  'clipPath',
  'mask',
  'pattern',
  'use',
  'symbol',
  'filter',
  'foreignObject',
  'image',
  'marker',
  'title',
  'desc',
])

/** Attributes whose presence makes a tag's native caveat relevant. */
const NOTE_TRIGGERS: Readonly<Record<string, readonly string[]>> = {
  a: ['href', 'target', 'rel', 'download'],
  label: ['htmlFor'],
  form: ['onSubmit', 'action', 'onReset'],
  fieldset: ['disabled'],
}

/** `React.ComponentProps<"div">`-style helpers whose tag argument we rewrite. */
const PROPS_TYPE_NAMES = new Set([
  'ComponentProps',
  'ComponentPropsWithoutRef',
  'ComponentPropsWithRef',
  'React.ComponentProps',
  'React.ComponentPropsWithoutRef',
  'React.ComponentPropsWithRef',
])

function intrinsicTag(element: ElementNode): string | undefined {
  const tag = element.getTagNameNode()
  if (!Node.isIdentifier(tag)) return undefined
  const name = tag.getText()
  return /^[a-z][A-Za-z0-9]*$/.test(name) ? name : undefined
}

function intrinsicAncestors(element: ElementNode): string[] {
  const tags: string[] = []
  for (const ancestor of element.getAncestors()) {
    if (Node.isJsxElement(ancestor)) {
      const opening = ancestor.getOpeningElement()
      if (opening === element) continue
      const tag = intrinsicTag(opening)
      if (tag) tags.push(tag)
    }
  }
  return tags
}

function hasSpread(element: ElementNode): boolean {
  return element.getAttributes().some((attr) => Node.isJsxSpreadAttribute(attr))
}

type Plan =
  | { kind: 'html'; tag: string }
  | { kind: 'view'; tag: string; addRow: boolean }
  | { kind: 'unsupported'; tag: string }
  | { kind: 'skip' }

/** True for an expression that can only produce elements (or nothing). */
function isElementExpression(node: Node | undefined): boolean {
  if (!node) return true
  if (
    Node.isJsxElement(node) ||
    Node.isJsxSelfClosingElement(node) ||
    Node.isJsxFragment(node)
  ) {
    return true
  }
  if (Node.isNullLiteral(node) || node.getKind() === SyntaxKind.FalseKeyword) return true
  if (Node.isParenthesizedExpression(node))
    return isElementExpression(node.getExpression())
  if (Node.isConditionalExpression(node)) {
    return (
      isElementExpression(node.getWhenTrue()) && isElementExpression(node.getWhenFalse())
    )
  }
  if (Node.isBinaryExpression(node)) {
    const op = node.getOperatorToken().getKind()
    // `cond && <X />`: the left side renders nothing when falsy only for
    // booleans/null, so accept it only when the right side is an element.
    if (op === SyntaxKind.AmpersandAmpersandToken)
      return isElementExpression(node.getRight())
    return false
  }
  if (Node.isCallExpression(node)) {
    // `items.map((item) => <X />)`
    const callee = node.getExpression()
    if (!Node.isPropertyAccessExpression(callee) || callee.getName() !== 'map')
      return false
    const [fn] = node.getArguments()
    if (!fn || !(Node.isArrowFunction(fn) || Node.isFunctionExpression(fn))) return false
    const body = fn.getBody()
    if (Node.isBlock(body)) {
      const returns = body.getDescendantsOfKind(SyntaxKind.ReturnStatement)
      return (
        returns.length > 0 && returns.every((r) => isElementExpression(r.getExpression()))
      )
    }
    return isElementExpression(body)
  }
  return false
}

/**
 * A React Native `View` cannot hold raw text, so only containers whose
 * children are provably elements qualify. (`html.*` wraps literal text for
 * you; plain `View` does not.)
 */
function childrenAreElements(element: ElementNode): boolean {
  if (Node.isJsxSelfClosingElement(element)) return true
  const parent = element.getParent()
  if (!Node.isJsxElement(parent)) return false
  return parent.getJsxChildren().every((child) => {
    if (Node.isJsxText(child)) return child.containsOnlyTriviaWhiteSpaces()
    if (Node.isJsxExpression(child)) return isElementExpression(child.getExpression())
    return true
  })
}

/**
 * A `div`/`span` becomes `View` when it is unambiguously a flex container:
 * `flex` applies unconditionally, its children are all elements, and it has
 * no prop spread or `ref` (whose DOM-typed values would not fit `View`).
 * `View` is a column on every platform, so `flex-row` is added when the
 * classes leave the direction at Tailwind's default (row).
 */
function viewPlan(element: ElementNode, tag: string): Plan | undefined {
  if (!VIEW_CANDIDATES.has(tag) || hasSpread(element) || getAttribute(element, 'ref'))
    return undefined
  if (!childrenAreElements(element)) return undefined
  const classes = getUnconditionalClasses(element).filter((t) => t.variants.length === 0)
  if (!classes.some((t) => t.base === 'flex')) return undefined
  const addRow = !classes.some((t) => DIRECTION_CLASSES.has(t.base))
  return { kind: 'view', tag, addRow }
}

function planElement(element: ElementNode): Plan {
  const tag = intrinsicTag(element)
  if (!tag) return { kind: 'skip' }
  if (SVG_TAGS.has(tag) && intrinsicAncestors(element).some((t) => SVG_TAGS.has(t))) {
    return { kind: 'skip' }
  }
  if (!TAGS[tag]) return { kind: 'unsupported', tag }
  return viewPlan(element, tag) ?? { kind: 'html', tag }
}

function unsupportedSuggestion(tag: string): string {
  if (TABLE_TAGS.has(tag)) {
    return 'Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file.'
  }
  if (SVG_TAGS.has(tag)) {
    return 'Use react-native-svg (or an icon component) for SVG that must render on native.'
  }
  return 'Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file.'
}

/** Add `flex-row` right after the unconditional `flex` class. */
function addFlexRow(element: ElementNode): boolean {
  const attr = getClassNameAttribute(element)
  if (!attr) return false
  for (const literal of getUnconditionalStrings(getAttributeExpression(attr))) {
    const value = literal.getLiteralText()
    if (!splitClasses(value).includes('flex')) continue
    setStringValue(literal, value.replace(/(^|\s)flex(?=\s|$)/, '$1flex flex-row'))
    return true
  }
  return false
}

/** String literals a component variable may evaluate to: `asChild ? Slot : "button"`. */
function tagLiterals(node: Node | undefined): StaticString[] {
  if (!node) return []
  if (isStaticString(node)) return [node]
  if (
    Node.isParenthesizedExpression(node) ||
    Node.isAsExpression(node) ||
    Node.isSatisfiesExpression(node)
  ) {
    return tagLiterals(node.getExpression())
  }
  if (Node.isConditionalExpression(node)) {
    return [...tagLiterals(node.getWhenTrue()), ...tagLiterals(node.getWhenFalse())]
  }
  if (Node.isBinaryExpression(node)) {
    const op = node.getOperatorToken().getKind()
    if (op === SyntaxKind.BarBarToken || op === SyntaxKind.QuestionQuestionToken) {
      return [...tagLiterals(node.getLeft()), ...tagLiterals(node.getRight())]
    }
  }
  return []
}

/**
 * Pass 2. Maps intrinsic JSX elements to `html.*` from `@tamagui/tailwind` (or
 * `View` for plain flex containers), rewrites `"button"`-style component
 * variables and `React.ComponentProps<"div">` types to match, and flags tags
 * with no native equivalent.
 */
export const elementsPass: FilePass = {
  name: 'elements',
  description: 'Map intrinsic JSX elements to html.* / View',
  run(sourceFile, context) {
    const diagnostics = new DiagnosticCollector('elements')
    if (!isInScope(sourceFile, context)) return { changed: false, diagnostics: [] }

    let changed = false
    let htmlLocal: string | undefined
    let viewLocal: string | undefined
    const html = () =>
      (htmlLocal ??= ensureNamedImport(sourceFile, TAMAGUI_TAILWIND, 'html'))
    const view = () =>
      (viewLocal ??= ensureNamedImport(sourceFile, TAMAGUI_TAILWIND, 'View'))

    const elements = collectElements(sourceFile)
    // Plan everything (including ancestor tags) before renaming anything.
    const plans = elements.map((element) => ({
      element,
      plan: planElement(element),
      ancestors: intrinsicAncestors(element),
    }))

    for (const { element, plan, ancestors } of plans) {
      if (plan.kind === 'skip') continue
      if (plan.kind === 'unsupported') {
        // One TODO per unsupported subtree: <table> but not each <tr>/<td>.
        if (ancestors.some((t) => !TAGS[t])) continue
        context.metrics.constructs.flagged++
        diagnostics.todo(element, {
          code: 'element/unsupported',
          construct: `<${plan.tag}>`,
          reason: `\`<${plan.tag}>\` has no \`html.*\` equivalent, so it renders on web only.`,
          suggestion: unsupportedSuggestion(plan.tag),
        })
        continue
      }

      const flagged = reportCaveats(element, plan.tag, ancestors, diagnostics)
      context.metrics.constructs[flagged ? 'flagged' : 'converted']++
      if (plan.kind === 'view') {
        if (plan.addRow) addFlexRow(element)
        renameElement(element, view())
        diagnostics.info(element, {
          code: 'element/view',
          construct: `<${plan.tag}>`,
          reason: `Flex container converted to \`View\`${plan.addRow ? '; `flex-row` added because `View` is a column by default' : ''}.`,
        })
      } else {
        renameElement(element, `${html()}.${plan.tag}`)
      }
      changed = true
    }

    changed = rewriteTagVariables(sourceFile, html, diagnostics, context) || changed
    changed = rewritePropsTypes(sourceFile, html) || changed
    return { changed, diagnostics: diagnostics.items }
  },
}

function reportCaveats(
  element: ElementNode,
  tag: string,
  ancestors: readonly string[],
  diagnostics: DiagnosticCollector,
): boolean {
  const info = TAGS[tag]!
  if (!info.nativeSupported) {
    // Flag the <select>, not every <option> inside it.
    if (tag !== 'select' && ancestors.some((t) => SELECT_FAMILY.has(t))) return false
    diagnostics.todo(element, {
      code: 'element/select',
      construct: `<${tag}>`,
      reason: `\`html.${tag}\` fails native builds because React Native has no menu-based select control.`,
      suggestion:
        'Use the shadcn `Select` component, which the radix pass maps to Tamagui `Select`.',
    })
    return true
  }
  if (tag === 'input') {
    let flagged = false
    const typeAttr = getAttribute(element, 'type')
    const init =
      typeAttr && Node.isJsxAttribute(typeAttr) ? typeAttr.getInitializer() : undefined
    if (init && Node.isStringLiteral(init)) {
      const type = init.getLiteralText()
      if (!NATIVE_INPUT_TYPES.has(type)) {
        flagged = true
        diagnostics.todo(element, {
          code: 'element/input-type',
          construct: `<input type="${type}">`,
          reason: `\`html.input\` supports only text-like types on native; \`type="${type}"\` is a native build error.`,
          suggestion:
            'Use the matching Tamagui component (Checkbox, RadioGroup, Slider, Switch) or a native picker.',
        })
      }
    } else if (init) {
      diagnostics.warn(element, {
        code: 'element/input-type',
        construct: `<input type={...}>`,
        reason: `\`html.input\` renders a TextInput on native; only ${[...NATIVE_INPUT_TYPES].join(', ')} types work there.`,
      })
    }
    return flagged
  }
  const triggers = NOTE_TRIGGERS[tag]
  if (info.note && triggers?.some((name) => getAttribute(element, name))) {
    diagnostics.warn(element, {
      code: 'element/native-caveat',
      construct: `<${tag}>`,
      reason: `Native caveat: ${info.note}.`,
    })
  }
  return false
}

/** `const Comp = asChild ? Slot.Root : "button"` -> `... : html.button` */
function rewriteTagVariables(
  sourceFile: SourceFile,
  html: () => string,
  diagnostics: DiagnosticCollector,
  context: PassContext,
): boolean {
  let changed = false
  const seen = new Set<Node>()
  for (const element of collectElements(sourceFile)) {
    const tagNode = element.getTagNameNode()
    if (!Node.isIdentifier(tagNode) || !/^[A-Z]/.test(tagNode.getText())) continue
    for (const decl of tagNode.getSymbol()?.getDeclarations() ?? []) {
      if (!Node.isVariableDeclaration(decl) || seen.has(decl)) continue
      seen.add(decl)
      for (const literal of tagLiterals(decl.getInitializer())) {
        const tag = literal.getLiteralText()
        if (!/^[a-z][A-Za-z0-9]*$/.test(tag)) continue
        if (!TAGS[tag]) {
          context.metrics.constructs.flagged++
          diagnostics.todo(literal, {
            code: 'element/unsupported',
            construct: `"${tag}"`,
            reason: `\`<${tag}>\` has no \`html.*\` equivalent, so it renders on web only.`,
            suggestion: unsupportedSuggestion(tag),
          })
          continue
        }
        literal.replaceWithText(`${html()}.${tag}`)
        context.metrics.constructs.converted++
        changed = true
      }
    }
  }
  return changed
}

/** `React.ComponentProps<"div">` -> `React.ComponentProps<typeof html.div>` */
function rewritePropsTypes(sourceFile: SourceFile, html: () => string): boolean {
  const targets: Node[] = []
  sourceFile.forEachDescendant((node) => {
    if (!Node.isTypeReference(node)) return
    if (!PROPS_TYPE_NAMES.has(node.getTypeName().getText())) return
    const [arg] = node.getTypeArguments()
    if (!arg || !Node.isLiteralTypeNode(arg)) return
    const literal = arg.getLiteral()
    if (!Node.isStringLiteral(literal) || !TAGS[literal.getLiteralText()]) return
    targets.push(arg)
  })
  for (const arg of targets) {
    const tag = (arg as Node).getText().slice(1, -1)
    arg.replaceWithText(`typeof ${html()}.${tag}`)
  }
  return targets.length > 0
}
