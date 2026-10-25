import {
  Node,
  type CallExpression,
  type JsxAttribute,
  type ObjectLiteralExpression,
  type SourceFile,
  type VariableDeclaration,
} from 'ts-morph'
import {
  collectClassSources,
  getAttributeExpression,
  isStaticString,
} from '../ast/classNames.js'
import {
  declaredNames,
  ensureNamedImport,
  getImportOrigins,
  removeUnusedImports,
  TAMAGUI_TAILWIND,
  type ImportOrigin,
} from '../ast/imports.js'
import { enclosingComponentName, getAttribute, type ElementNode } from '../ast/jsx.js'
import { isInScope } from '../ast/scope.js'
import { DiagnosticCollector } from '../diagnostics.js'
import { analyzeClass, defaultSupportContext } from '../tailwind/support.js'
import { parseClass, splitClasses } from '../tailwind/tokenize.js'
import type { FilePass, PassContext } from '../types.js'

const CVA_MODULE = 'class-variance-authority'

function isClassHelperModule(module: string): boolean {
  return (
    ['cn', 'clsx', 'tailwind-merge', 'classnames'].includes(module) ||
    /(^|\/)lib\/utils$/.test(module)
  )
}

/** Local names of `cn`-style helpers imported into the file. */
function classHelperLocals(origins: Map<string, ImportOrigin>): Set<string> {
  const locals = new Set<string>()
  for (const [local, origin] of origins) {
    if (origin.typeOnly || !isClassHelperModule(origin.module)) continue
    if (['cn', 'clsx', 'cx', 'twMerge', 'twJoin', 'default'].includes(origin.imported))
      locals.add(local)
  }
  return locals
}

function quote(value: string): string {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

/** `cn("a", "b")` -> `"a b"`, and `className={cn("a")}` -> `className="a"`. */
function inlineStaticCalls(sourceFile: SourceFile, helpers: Set<string>): number {
  let count = 0
  for (;;) {
    const call = sourceFile
      .getDescendants()
      .find(
        (node): node is CallExpression =>
          Node.isCallExpression(node) &&
          Node.isIdentifier(node.getExpression()) &&
          helpers.has(node.getExpression().getText()) &&
          node.getArguments().length > 0 &&
          node.getArguments().every((arg) => isStaticString(arg)),
      )
    if (!call) return count
    const joined = splitClasses(
      call
        .getArguments()
        .map((arg) => (isStaticString(arg) ? arg.getLiteralText() : ''))
        .join(' '),
    ).join(' ')
    const container = call.getParent()
    const attr = Node.isJsxExpression(container) ? container.getParent() : undefined
    if (attr && Node.isJsxAttribute(attr) && !joined.includes('"')) {
      attr.setInitializer(quote(joined))
    } else {
      call.replaceWithText(quote(joined))
    }
    count++
  }
}

interface CvaCandidate {
  decl: VariableDeclaration
  call: CallExpression
  base?: Node
  config?: ObjectLiteralExpression
}

function cvaDeclarations(sourceFile: SourceFile, cvaLocals: Set<string>): CvaCandidate[] {
  const out: CvaCandidate[] = []
  for (const decl of sourceFile.getVariableDeclarations()) {
    const init = decl.getInitializer()
    if (!init || !Node.isCallExpression(init)) continue
    const callee = init.getExpression()
    if (!Node.isIdentifier(callee) || !cvaLocals.has(callee.getText())) continue
    const [base, config] = init.getArguments()
    out.push({
      decl,
      call: init,
      base,
      config: config && Node.isObjectLiteralExpression(config) ? config : undefined,
    })
  }
  return out
}

function isExported(decl: VariableDeclaration): boolean {
  if (decl.getVariableStatement()?.isExported()) return true
  const name = decl.getName()
  return decl
    .getSourceFile()
    .getExportDeclarations()
    .some((e) => e.getNamedExports().some((spec) => spec.getName() === name))
}

/** Why a cva() definition cannot become styled(), or undefined if it can. */
function staticProblem(candidate: CvaCandidate): string | undefined {
  const { base, config, call } = candidate
  if (base && !isStaticString(base)) return 'its base classes are not a static string'
  if (call.getArguments().length > 1 && !config)
    return 'its config is not an object literal'
  if (!config) return undefined
  for (const prop of config.getProperties()) {
    if (!Node.isPropertyAssignment(prop)) return 'its config uses spreads or methods'
    const name = prop.getName()
    if (name === 'compoundVariants') {
      const value = prop.getInitializer()
      if (
        !value ||
        !Node.isArrayLiteralExpression(value) ||
        value.getElements().length > 0
      ) {
        return '`styled()` has no `compoundVariants`'
      }
    } else if (name !== 'variants' && name !== 'defaultVariants') {
      return `its config has an unknown \`${name}\` option`
    }
  }
  const variants = config.getProperty('variants')
  if (variants && Node.isPropertyAssignment(variants)) {
    const groups = variants.getInitializer()
    if (!groups || !Node.isObjectLiteralExpression(groups))
      return 'its variants are not an object literal'
    for (const group of groups.getProperties()) {
      const options = Node.isPropertyAssignment(group)
        ? group.getInitializer()
        : undefined
      if (!options || !Node.isObjectLiteralExpression(options))
        return 'a variant is not an object literal'
      for (const option of options.getProperties()) {
        if (
          !Node.isPropertyAssignment(option) ||
          !isStaticString(option.getInitializer())
        ) {
          return 'a variant value is not a static class string'
        }
      }
    }
  }
  return undefined
}

function classProblem(candidate: CvaCandidate): string | undefined {
  const support = defaultSupportContext()
  for (const source of collectClassSources(candidate.decl, {
    cva: new Set([candidate.call.getExpression().getText()]),
  })) {
    if (source.interpolations.length) return 'it builds class names at runtime'
    for (const raw of splitClasses(source.text)) {
      const token = parseClass(raw)
      if (token && analyzeClass(token, support).status === 'unsupported') {
        return `it uses \`${raw}\`, which cannot be converted`
      }
    }
  }
  return undefined
}

interface Usage {
  element: ElementNode
  attr: JsxAttribute
  /** The `X({...})` call. */
  variantCall: CallExpression
  /** Other class arguments, in order, as source text. */
  rest: string[]
}

/** The single `className={cn(X({...}), ...)}` use of `X`, if that is its only call. */
function findUsage(candidate: CvaCandidate, helpers: Set<string>): Usage | string {
  const name = candidate.decl.getName()
  const calls: CallExpression[] = []
  for (const node of candidate.decl.getSourceFile().getDescendants()) {
    if (
      Node.isIdentifier(node) &&
      node.getText() === name &&
      node !== candidate.decl.getNameNode()
    ) {
      const parent = node.getParent()
      if (Node.isCallExpression(parent) && parent.getExpression() === node)
        calls.push(parent)
      else if (!Node.isTypeQuery(parent) && !Node.isExportSpecifier(parent)) {
        return `\`${name}\` is used outside a single className`
      }
    }
  }
  if (calls.length !== 1) return `\`${name}\` is called ${calls.length} times`
  const variantCall = calls[0]!
  const args = variantCall.getArguments()
  if (args.length > 1 || (args[0] && !Node.isObjectLiteralExpression(args[0]))) {
    return `\`${name}()\` is not called with an object literal`
  }

  let expr: Node | undefined = variantCall
  const rest: string[] = []
  const parent = variantCall.getParent()
  if (
    Node.isCallExpression(parent) &&
    Node.isIdentifier(parent.getExpression()) &&
    helpers.has(parent.getExpression().getText())
  ) {
    for (const arg of parent.getArguments())
      if (arg !== variantCall) rest.push(arg.getText())
    expr = parent
  }
  const container = expr.getParent()
  const attr = Node.isJsxExpression(container) ? container.getParent() : undefined
  if (
    !attr ||
    !Node.isJsxAttribute(attr) ||
    attr.getNameNode().getText() !== 'className'
  ) {
    return `\`${name}()\` is not used directly in a className`
  }
  if (getAttributeExpression(attr) !== expr)
    return `\`${name}()\` is not used directly in a className`
  const element = attr.getParentOrThrow().getParentOrThrow()
  if (!Node.isJsxOpeningElement(element) && !Node.isJsxSelfClosingElement(element)) {
    return `\`${name}()\` is not used on a JSX element`
  }
  return { element, attr, variantCall, rest }
}

/** The tag text if it is `html.*`/`View`/`Text` from @tamagui/tailwind. */
function tamaguiTag(
  element: ElementNode,
  origins: Map<string, ImportOrigin>,
): string | undefined {
  const tag = element.getTagNameNode()
  const fromTailwind = (local: string, imported: string[]) => {
    const origin = origins.get(local)
    if (origin?.module === TAMAGUI_TAILWIND && imported.includes(origin.imported))
      return true
    // Imports added by the elements pass are not in the original origins.
    return element
      .getSourceFile()
      .getImportDeclarations()
      .some(
        (d) =>
          d.getModuleSpecifierValue() === TAMAGUI_TAILWIND &&
          d
            .getNamedImports()
            .some(
              (s) =>
                imported.includes(s.getName()) &&
                (s.getAliasNode()?.getText() ?? s.getName()) === local,
            ),
      )
  }
  if (Node.isPropertyAccessExpression(tag)) {
    const object = tag.getExpression()
    return Node.isIdentifier(object) && fromTailwind(object.getText(), ['html'])
      ? tag.getText()
      : undefined
  }
  if (Node.isIdentifier(tag) && fromTailwind(tag.getText(), ['View', 'Text']))
    return tag.getText()
  return undefined
}

/** True when the tag is a `cond ? Slot... : X` component variable. */
function isAsChildSwitch(element: ElementNode): boolean {
  const tag = element.getTagNameNode()
  if (!Node.isIdentifier(tag)) return false
  const decl = tag
    .getSymbol()
    ?.getDeclarations()
    .find((d) => Node.isVariableDeclaration(d))
  const init =
    decl && Node.isVariableDeclaration(decl) ? decl.getInitializer() : undefined
  return (
    !!init &&
    Node.isConditionalExpression(init) &&
    /\bSlot\b|\.Root\b/.test(init.getText())
  )
}

function frameName(sourceFile: SourceFile, usage: Usage, variantsName: string): string {
  const component = enclosingComponentName(usage.element)
  const stem =
    component ??
    variantsName.replace(/Variants$/, '').replace(/^./, (c) => c.toUpperCase())
  const taken = declaredNames(sourceFile)
  let name = `${stem}Frame`
  for (let i = 2; taken.has(name); i++) name = `${stem}Frame${i}`
  return name
}

function convert(
  sourceFile: SourceFile,
  candidate: CvaCandidate,
  usage: Usage,
  tag: string,
  helpers: Set<string>,
): string {
  const variantsName = candidate.decl.getName()
  const frame = frameName(sourceFile, usage, variantsName)
  const styledLocal = ensureNamedImport(sourceFile, TAMAGUI_TAILWIND, 'styled')

  // Element: variant props as attributes, remaining classes on className.
  const [args] = usage.variantCall.getArguments()
  const attrs: { name: string; value: string }[] = []
  const rest = [...usage.rest]
  if (args && Node.isObjectLiteralExpression(args)) {
    for (const prop of args.getProperties()) {
      if (Node.isShorthandPropertyAssignment(prop)) {
        const name = prop.getName()
        if (name === 'className') rest.push(name)
        else attrs.push({ name, value: name })
      } else if (Node.isPropertyAssignment(prop)) {
        const name = prop.getName()
        const value = prop.getInitializerOrThrow().getText()
        if (name === 'className' || name === 'class') rest.push(value)
        else attrs.push({ name, value })
      }
    }
  }
  const index = usage.element.getAttributes().indexOf(usage.attr)
  if (rest.length === 0) {
    usage.attr.remove()
  } else if (rest.length === 1) {
    usage.attr.setInitializer(`{${rest[0]}}`)
  } else {
    const cn = [...helpers][0] ?? 'cn'
    usage.attr.setInitializer(`{${cn}(${rest.join(', ')})}`)
  }
  usage.element.insertAttributes(
    index,
    attrs.map((a) => ({ name: a.name, initializer: `{${a.value}}` })),
  )
  usage.element.getTagNameNode().replaceWithText(frame)
  const parent = usage.element.getParent()
  if (Node.isJsxOpeningElement(usage.element) && Node.isJsxElement(parent)) {
    parent.getClosingElement().getTagNameNode().replaceWithText(frame)
  }

  // Types: VariantProps<typeof x> -> GetTailwindVariantProps<typeof Frame>
  const typeRefs = sourceFile
    .getDescendants()
    .filter(
      (n) =>
        Node.isTypeReference(n) &&
        /(^|\.)VariantProps$/.test(n.getTypeName().getText()) &&
        n.getTypeArguments()[0]?.getText() === `typeof ${variantsName}`,
    )
  if (typeRefs.length) {
    const helper = ensureNamedImport(
      sourceFile,
      TAMAGUI_TAILWIND,
      'GetTailwindVariantProps',
      { typeOnly: true },
    )
    for (const ref of typeRefs) ref.replaceWithText(`${helper}<typeof ${frame}>`)
  }

  // Declaration: cva(base, config) -> styled(tag, base, config)
  candidate.call.getExpression().replaceWithText(styledLocal)
  if (candidate.call.getArguments().length === 0) candidate.call.addArgument('""')
  candidate.call.insertArgument(0, tag)
  candidate.decl.getNameNode().replaceWithText(frame)
  const config = candidate.config
  const compound = config?.getProperty('compoundVariants')
  compound?.remove()
  return frame
}

/**
 * Pass 4. Inlines `cn()` calls whose arguments are all static, and turns
 * `cva()` definitions into `styled()` from `@tamagui/tailwind` when they are
 * static, use no unconvertible classes, are not exported, and style one
 * `html.*`/`View` element in the file. cva() on `asChild` components is kept
 * (Tamagui's `asChild` forwards className styles but not `styled()` styles).
 * Calls with conditions keep a runtime `cn()`, which produces a class string
 * that Tamagui resolves at runtime on both platforms.
 */
export const cnCvaPass: FilePass = {
  name: 'cn-cva',
  description: 'Inline static cn() calls and convert cva() to styled()',
  run(sourceFile, context: PassContext) {
    const diagnostics = new DiagnosticCollector('cn-cva')
    if (!isInScope(sourceFile, context)) return { changed: false, diagnostics: [] }
    const origins = getImportOrigins(sourceFile, context)
    const helpers = classHelperLocals(origins)
    const cvaLocals = new Set(
      [...origins]
        .filter(([, o]) => o.module === CVA_MODULE && o.imported === 'cva')
        .map(([local]) => local),
    )
    let changed = inlineStaticCalls(sourceFile, helpers) > 0

    for (const candidate of cvaDeclarations(sourceFile, cvaLocals)) {
      const name = candidate.decl.getName()
      const keep = (reason: string, asChild = false) => {
        diagnostics.add(candidate.decl, {
          severity: asChild ? 'info' : 'warning',
          code: asChild ? 'cva/kept-as-child' : 'cva/kept',
          construct: `${name} = cva(...)`,
          reason: `Kept as cva(): ${reason}. Its classes still apply at runtime through className.`,
          ...(asChild
            ? {}
            : {
                suggestion:
                  'Convert it to `styled()` from `@tamagui/tailwind` by hand if it can be simplified.',
              }),
        })
      }
      const problem = staticProblem(candidate) ?? classProblem(candidate)
      if (problem) {
        keep(problem)
        continue
      }
      const usage = findUsage(candidate, helpers)
      if (
        typeof usage !== 'string' &&
        (getAttribute(usage.element, 'asChild') || isAsChildSwitch(usage.element))
      ) {
        keep(
          "the component supports `asChild`, and Tamagui's `asChild` does not forward `styled()` styles",
          true,
        )
        continue
      }
      if (isExported(candidate.decl)) {
        keep('it is exported, so other modules may call it for class strings')
        continue
      }
      if (typeof usage === 'string') {
        keep(usage)
        continue
      }
      const tag = tamaguiTag(usage.element, origins)
      if (!tag) {
        keep(
          `it styles \`${usage.element.getTagNameNode().getText()}\`, which is not an \`html.*\` element or \`View\``,
        )
        continue
      }
      const frame = convert(sourceFile, candidate, usage, tag, helpers)
      context.metrics.constructs.converted++
      diagnostics.info(candidate.decl, {
        code: 'cva/styled',
        construct: `${name} = cva(...)`,
        reason: `Converted to \`${frame} = styled(${tag}, ...)\` with the same variants.`,
      })
      changed = true
    }

    if (changed) {
      removeUnusedImports(sourceFile, CVA_MODULE)
      for (const module of new Set([...origins.values()].map((o) => o.module))) {
        if (isClassHelperModule(module)) removeUnusedImports(sourceFile, module)
      }
    }
    return { changed, diagnostics: diagnostics.items }
  },
}
