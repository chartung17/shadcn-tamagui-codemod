import {
  Node,
  type ImportDeclaration,
  type JsxAttribute,
  type PropertyAccessExpression,
  type SourceFile,
} from 'ts-morph'
import {
  CLASS_HELPER_NAMES,
  classSourcesIn,
  collectClassSources,
  getAttributeExpression,
  isStaticString,
  setStringValue,
} from '../ast/classNames.js'
import { parseClass, splitClasses } from '../tailwind/tokenize.js'
import { declaredNames, ensureNamedImport, TAMAGUI_TAILWIND } from '../ast/imports.js'
import type { ElementNode } from '../ast/jsx.js'
import type { DiagnosticCollector } from '../diagnostics.js'
import {
  findLocalComponent,
  findMapping,
  findMappingByPackage,
  TAMAGUI_PRIMITIVES_MODULE,
  type RadixMapping,
} from '../mappings/radix.js'
import type { PassContext } from '../types.js'

interface Binding {
  /** Local name, e.g. `DialogPrimitive`. */
  local: string
  /** Radix export, e.g. `Dialog`. */
  radix: string
  mapping?: RadixMapping
  decl: ImportDeclaration
}

/** Radix component bindings: `{ Dialog as DialogPrimitive } from "radix-ui"` or `* as X from "@radix-ui/react-dialog"`. */
function collectBindings(
  sourceFile: SourceFile,
  diagnostics: DiagnosticCollector,
  context: PassContext,
): Binding[] {
  const out: Binding[] = []
  for (const decl of sourceFile.getImportDeclarations()) {
    const module = decl.getModuleSpecifierValue()
    if (decl.isTypeOnly()) continue
    if (module === 'radix-ui') {
      for (const spec of decl.getNamedImports()) {
        const radix = spec.getName()
        if (radix === 'Slot') continue
        const local = spec.getAliasNode()?.getText() ?? radix
        out.push({ local, radix, mapping: findMapping(radix), decl })
      }
    } else if (
      module.startsWith('@radix-ui/react-') &&
      module !== '@radix-ui/react-slot'
    ) {
      const ns = decl.getNamespaceImport()
      const mapping = findMappingByPackage(module)
      if (ns) {
        out.push({ local: ns.getText(), radix: mapping?.radix ?? module, mapping, decl })
      } else {
        context.metrics.constructs.flagged++
        diagnostics.todo(decl, {
          code: 'radix/import-style',
          construct: decl.getText(),
          reason:
            'Only namespace imports (`import * as X from "@radix-ui/react-..."`) of Radix packages are converted.',
          suggestion:
            'Switch to a namespace import and re-run, or convert this component by hand.',
        })
      }
    }
  }
  return out
}

const REACT_TYPES = new Set(['ComponentType', 'ComponentProps', 'ReactNode'])

/**
 * `React.<name>` when the file has `import * as React`, else a named import
 * from `react` (type-only for types), added on first use.
 */
function reactName(sourceFile: SourceFile, name: string): string {
  const hasReactNamespace = sourceFile
    .getImportDeclarations()
    .some(
      (d) =>
        d.getModuleSpecifierValue() === 'react' &&
        d.getNamespaceImport()?.getText() === 'React',
    )
  if (hasReactNamespace) return `React.${name}`
  return ensureNamedImport(sourceFile, 'react', name, { typeOnly: REACT_TYPES.has(name) })
}

function freeName(sourceFile: SourceFile, base: string): string {
  const taken = declaredNames(sourceFile)
  let name = base
  for (let i = 2; taken.has(name); i++) name = `${base}${i}`
  return name
}

function wrapperHelper(sourceFile: SourceFile, shared: Map<string, unknown>): string {
  const key = 'radix:twHelper'
  const existing = shared.get(key)
  if (typeof existing === 'string') return existing
  const styledLocal = ensureNamedImport(sourceFile, TAMAGUI_TAILWIND, 'styled')
  const name = freeName(sourceFile, 'tw')
  const ComponentType = reactName(sourceFile, 'ComponentType')
  const ComponentProps = reactName(sourceFile, 'ComponentProps')
  const imports = sourceFile.getImportDeclarations()
  const index = imports[imports.length - 1]!.getChildIndex() + 1
  sourceFile.insertStatements(
    index,
    [
      '// Lets Tailwind classes (className) style a Tamagui UI primitive on web and native.',
      `const ${name} = <C extends ${ComponentType}<any>>(component: C) =>`,
      `  ${styledLocal}(component as never) as unknown as ${ComponentType}<${ComponentProps}<C> & { className?: string }>`,
    ].join('\n'),
  )
  shared.set(key, name)
  return name
}

/**
 * `twText`: like `tw`, for a primitive that is a view and receives text. A
 * native view cannot render a raw string, so string children are wrapped in
 * `html.span`, which gets the part's text classes on native (on web the span
 * inherits them through CSS).
 */
function textWrapperHelper(sourceFile: SourceFile, shared: Map<string, unknown>): string {
  const key = 'radix:twTextHelper'
  const existing = shared.get(key)
  if (typeof existing === 'string') return existing
  const tw = wrapperHelper(sourceFile, shared)
  const html = ensureNamedImport(sourceFile, TAMAGUI_TAILWIND, 'html')
  const name = freeName(sourceFile, 'twText')
  const ComponentType = reactName(sourceFile, 'ComponentType')
  const ComponentProps = reactName(sourceFile, 'ComponentProps')
  const ReactNode = reactName(sourceFile, 'ReactNode')
  const Children = reactName(sourceFile, 'Children')
  const twDecl = sourceFile.getVariableStatement((s) =>
    s.getDeclarations().some((d) => d.getName() === tw),
  )!
  sourceFile.insertStatements(
    twDecl.getChildIndex() + 1,
    `// Native views cannot render raw text: wraps string children in html.span,
// with the part's text classes applied to it on native.
const ${name} = <C extends ${ComponentType}<any>>(component: C) => {
  const Styled = ${tw}(component) as ${ComponentType}<any>
  return ({
    className,
    children,
    ...props
  }: ${ComponentProps}<C> & { className?: string; children?: ${ReactNode} }) => {
    const textClasses = className
      ?.split(/\\s+/)
      .filter((c: string) => /^(?:text|font|leading|tracking)-|^(?:italic|underline|line-through|uppercase|lowercase|capitalize)$/.test(c))
      .map((c: string) => \`native:\${c}\`)
      .join(" ")
    const wrap = (child: ${ReactNode}) =>
      typeof child === "string" || typeof child === "number" ? (
        <${html}.span className={textClasses}>{child}</${html}.span>
      ) : (
        child
      )
    return (
      <Styled className={className} {...props}>
        {Array.isArray(children) ? ${Children}.map(children, wrap) : wrap(children)}
      </Styled>
    )
  }
}`,
  )
  shared.set(key, name)
  return name
}

function ensureWrapper(
  sourceFile: SourceFile,
  context: PassContext,
  wrappers: Map<string, string>,
  target: string,
  wrapsText = false,
): string {
  const key = wrapsText ? `${target}:text` : target
  const existing = wrappers.get(key)
  if (existing) return existing
  const helper = wrapsText
    ? textWrapperHelper(sourceFile, context.shared)
    : wrapperHelper(sourceFile, context.shared)
  const tw = wrapperHelper(sourceFile, context.shared)
  const stem = target.replace(/Primitive/g, '').replace(/\./g, '')
  let name = freeName(sourceFile, `Styled${stem}`)
  for (let i = 2; [...wrappers.values()].includes(name); i++)
    name = freeName(sourceFile, `Styled${stem}${i}`)
  // Wrappers go after the helpers, in order of first use.
  const helpers = [tw, context.shared.get('radix:twTextHelper')].filter(Boolean)
  const last = Math.max(
    ...helpers.map(
      (h) =>
        sourceFile
          .getVariableStatement((s) => s.getDeclarations().some((d) => d.getName() === h))
          ?.getChildIndex() ?? -1,
    ),
  )
  sourceFile.insertStatements(
    last + 1 + wrappers.size,
    `const ${name} = ${helper}(${target})`,
  )
  wrappers.set(key, name)
  return name
}

/** Remove `local` from its `radix-ui` import, or the whole `@radix-ui/*` import. */
function removeRadixImport(decl: ImportDeclaration, local: string): void {
  if (decl.getModuleSpecifierValue() !== 'radix-ui') {
    decl.remove()
    return
  }
  decl
    .getNamedImports()
    .find((s) => (s.getAliasNode()?.getText() ?? s.getName()) === local)
    ?.remove()
  if (
    !decl.getDefaultImport() &&
    !decl.getNamespaceImport() &&
    decl.getNamedImports().length === 0
  )
    decl.remove()
}

/** Write a `LOCAL_COMPONENTS` replacement after the imports, under `local`. */
function insertLocalComponent(sourceFile: SourceFile, local: string, code: string): void {
  const html = ensureNamedImport(sourceFile, TAMAGUI_TAILWIND, 'html')
  const ComponentProps = reactName(sourceFile, 'ComponentProps')
  const useState = reactName(sourceFile, 'useState')
  const imports = sourceFile.getImportDeclarations()
  sourceFile.insertStatements(
    imports[imports.length - 1]!.getChildIndex() + 1,
    code
      .replaceAll('$LOCAL', local)
      .replaceAll('$HTML', html)
      .replaceAll('$COMPONENT_PROPS', ComponentProps)
      .replaceAll('$USE_STATE', useState),
  )
}

function attributesOf(element: ElementNode): JsxAttribute[] {
  return element.getAttributes().filter((a): a is JsxAttribute => Node.isJsxAttribute(a))
}

/**
 * Rewrites Radix components that have an entry in `src/mappings/radix.ts`
 * to Tamagui UI primitives from `tamagui/unstyled`. Returns whether anything
 * changed.
 */
export function rewriteRadixComponents(
  sourceFile: SourceFile,
  context: PassContext,
  diagnostics: DiagnosticCollector,
): boolean {
  const bindings = collectBindings(sourceFile, diagnostics, context)
  if (bindings.length === 0) return false
  let changed = false
  const wrappers = new Map<string, string>()

  for (const binding of bindings) {
    const { mapping, local } = binding
    const localComponent = mapping ? undefined : findLocalComponent(binding.radix)
    if (localComponent) {
      removeRadixImport(binding.decl, local)
      insertLocalComponent(sourceFile, local, localComponent.code)
      context.metrics.constructs.converted++
      diagnostics.info(sourceFile.getVariableDeclarationOrThrow(local), {
        code: 'radix/local-component',
        construct: `${binding.radix} (${local})`,
        reason: `Tamagui has no \`${binding.radix}\`, so a small replacement built on \`html.*\` was added to this file in place of the Radix import.`,
      })
      changed = true
      continue
    }
    if (!mapping) {
      context.metrics.constructs.flagged++
      diagnostics.todo(binding.decl, {
        code: 'radix/unmapped',
        construct: `${binding.radix} (${local})`,
        reason: `There is no Tamagui mapping for Radix \`${binding.radix}\` yet, so it stays on Radix, which is web-only.`,
        suggestion:
          'Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file.',
      })
      continue
    }

    // 1. Imports: the Tamagui export takes over the same local name.
    removeRadixImport(binding.decl, local)
    const spec =
      local === mapping.tamagui ? local : { name: mapping.tamagui, alias: local }
    const existing = sourceFile
      .getImportDeclarations()
      .find(
        (d) =>
          d.getModuleSpecifierValue() === TAMAGUI_PRIMITIVES_MODULE && !d.isTypeOnly(),
      )
    if (existing) existing.addNamedImport(spec)
    else
      sourceFile.addImportDeclaration({
        moduleSpecifier: TAMAGUI_PRIMITIVES_MODULE,
        namedImports: [spec],
      })
    changed = true
    const exportLocals = new Map<string, string>()
    const resolveTarget = (partName: string): string | null | undefined => {
      const part = mapping.parts[partName]
      if (!part) return undefined
      if (part.part === null) return null
      let root = local
      if (part.export) {
        root =
          exportLocals.get(part.export) ??
          ensureNamedImport(sourceFile, TAMAGUI_PRIMITIVES_MODULE, part.export)
        exportLocals.set(part.export, root)
      }
      return part.part === '' ? root : `${root}.${part.part}`
    }

    // Font sizes that text parts inherit in Radix, read before tags are renamed.
    const fontSizes = new Map<string, string>()
    for (const part of Object.values(mapping.parts)) {
      if (part.fontSizeFrom && !fontSizes.has(part.fontSizeFrom))
        fontSizes.set(
          part.fontSizeFrom,
          fontSizeOfPart(sourceFile, `${local}.${part.fontSizeFrom}`) ?? 'text-base',
        )
    }

    // Keep Radix-only props in wrapper signatures (`orientation` on Separator).
    restoreRadixPropTypes(sourceFile, local, mapping)
    omitShadowedProps(sourceFile, local)

    // 2. References: `Local.Part` in JSX tags, types and values.
    const accesses = sourceFile
      .getDescendants()
      .filter(
        (n): n is PropertyAccessExpression =>
          Node.isPropertyAccessExpression(n) && n.getExpression().getText() === local,
      )
    const unwraps: ElementNode[] = []
    for (const access of accesses) {
      if (access.wasForgotten()) continue
      const partName = access.getName()
      const target = resolveTarget(partName)
      if (target === undefined) {
        context.metrics.constructs.flagged++
        diagnostics.todo(access, {
          code: 'radix/unknown-part',
          construct: access.getText(),
          reason: `\`${binding.radix}.${partName}\` has no mapping to a Tamagui \`${mapping.tamagui}\` part.`,
        })
        continue
      }
      const parent = access.getParent()
      const isTag =
        (Node.isJsxOpeningElement(parent) || Node.isJsxSelfClosingElement(parent)) &&
        parent.getTagNameNode() === access
      if (isTag) {
        const element = parent as ElementNode
        if (target === null) {
          unwraps.push(element)
          continue
        }
        const part = mapping.parts[partName]!
        if (part.classNameTo)
          moveClassName(element, `${local}.${part.classNameTo}`, diagnostics)
        if (part.fontSizeFrom)
          addFontSize(element, fontSizes.get(part.fontSizeFrom)!, diagnostics)
        for (const [name, value] of Object.entries(part.defaults ?? {})) {
          if (attributesOf(element).some((a) => a.getNameNode().getText() === name))
            continue
          const spread = element
            .getAttributes()
            .findIndex((a) => Node.isJsxSpreadAttribute(a))
          element.insertAttribute(
            spread === -1 ? element.getAttributes().length : spread,
            {
              name,
              initializer: value,
            },
          )
        }
        for (const attr of attributesOf(element)) {
          const name = attr.getNameNode().getText()
          const conversion = part.convert?.[name]
          if (conversion) {
            const init = attr.getInitializer()
            const value = !init
              ? 'true'
              : Node.isJsxExpression(init)
                ? (init.getExpression()?.getText() ?? 'undefined')
                : init.getText()
            const index = element.getAttributes().indexOf(attr)
            const extra = conversion.data
              ? [{ name: conversion.data, initializer: `{${value}}` }]
              : []
            element.insertAttributes(index, [
              ...extra,
              {
                name: conversion.prop,
                initializer: `{${conversion.expression.replace('$', value)}}`,
              },
            ])
            attr.remove()
            continue
          }
          const renamed = part.rename?.[name]
          if (renamed) attr.getNameNode().replaceWithText(renamed)
          const reason = part.unsupported?.[name]
          if (reason) {
            diagnostics.warn(element, {
              code: 'radix/unsupported-prop',
              construct: `${binding.radix}.${partName} ${name}`,
              reason: `Removed \`${name}\`: ${reason}.`,
            })
            attr.remove()
          }
        }
        if (
          part.propFromKey &&
          !attributesOf(element).some(
            (a) => a.getNameNode().getText() === part.propFromKey,
          )
        ) {
          const key = attributesOf(element).find(
            (a) => a.getNameNode().getText() === 'key',
          )
          const init = key?.getInitializer()
          if (init && Node.isJsxExpression(init) && init.getExpression()) {
            element.addAttribute({
              name: part.propFromKey,
              initializer: `{${init.getExpression()!.getText()}}`,
            })
          } else {
            diagnostics.todo(element, {
              code: 'radix/required-prop',
              construct: `${binding.radix}.${partName}`,
              reason: `Tamagui \`${mapping.tamagui}.${part.part}\` needs an \`${part.propFromKey}\` prop.`,
            })
          }
        }
        const styledTag =
          part.wrapsText ||
          attributesOf(element).some((a) => a.getNameNode().getText() === 'className')
            ? ensureWrapper(sourceFile, context, wrappers, target, part.wrapsText)
            : target
        element.getTagNameNode().replaceWithText(styledTag)
        const jsx = element.getParent()
        if (Node.isJsxOpeningElement(element) && Node.isJsxElement(jsx)) {
          jsx.getClosingElement().getTagNameNode().replaceWithText(styledTag)
        }
        context.metrics.constructs.converted++
        continue
      }
      // Closing tags are renamed with their opening tag.
      if (Node.isJsxClosingElement(parent)) continue
      if (target === null) {
        const typeQuery = access.getFirstAncestor((a) => Node.isTypeQuery(a))
        if (typeQuery) {
          typeQuery.replaceWithText('typeof React.Fragment')
        } else {
          diagnostics.todo(access, {
            code: 'radix/removed-part',
            construct: access.getText(),
            reason: `Tamagui \`${mapping.tamagui}\` has no \`${partName}\` part.`,
          })
        }
        continue
      }
      access.replaceWithText(target)
    }

    // Type positions: `typeof Local.Part` is a qualified name.
    const qualified = sourceFile
      .getDescendants()
      .filter((n) => Node.isQualifiedName(n) && n.getLeft().getText() === local)
    for (const name of qualified) {
      if (name.wasForgotten() || !Node.isQualifiedName(name)) continue
      const partName = name.getRight().getText()
      const target = resolveTarget(partName)
      if (target === undefined) {
        diagnostics.todo(name, {
          code: 'radix/unknown-part',
          construct: name.getText(),
          reason: `\`${binding.radix}.${partName}\` has no mapping to a Tamagui \`${mapping.tamagui}\` part.`,
        })
      } else if (target === null) {
        const typeQuery = name.getParent()
        if (Node.isTypeQuery(typeQuery))
          typeQuery.replaceWithText('typeof React.Fragment')
      } else {
        name.replaceWithText(target)
      }
    }

    // 3. Parts Tamagui handles itself (Popover.Portal): keep only the children.
    for (const element of unwraps.reverse()) {
      if (element.wasForgotten()) continue
      for (const attr of attributesOf(element)) {
        diagnostics.warn(element, {
          code: 'radix/unsupported-prop',
          construct: `${binding.radix}.${element.getTagNameNode().getText().split('.').pop()} ${attr.getNameNode().getText()}`,
          reason: `Removed with its part: Tamagui \`${mapping.tamagui}\` has no equivalent.`,
        })
      }
      if (Node.isJsxSelfClosingElement(element)) {
        const spread = element.getAttributes().find((a) => Node.isJsxSpreadAttribute(a))
        const replacement =
          spread && Node.isJsxSpreadAttribute(spread)
            ? `<>{${spread.getExpression().getText()}.children}</>`
            : 'null'
        element.replaceWithText(replacement)
      } else {
        const jsx = element.getParentOrThrow()
        if (!Node.isJsxElement(jsx)) continue
        const children = jsx
          .getJsxChildren()
          .filter((c) => !(Node.isJsxText(c) && c.containsOnlyTriviaWhiteSpaces()))
        const only = children.length === 1 ? children[0]! : undefined
        jsx.replaceWithText(
          only && (Node.isJsxElement(only) || Node.isJsxSelfClosingElement(only))
            ? only.getText()
            : `<>${jsx
                .getJsxChildren()
                .map((c) => c.getText())
                .join('')}</>`,
        )
      }
    }

    // 4. Radix CSS variables in classes.
    if (mapping.cssVariables) rewriteCssVariables(sourceFile, mapping, diagnostics)

    // 5. Behavior differences worth knowing about.
    const anchor = sourceFile
      .getImportDeclarations()
      .find((d) => d.getModuleSpecifierValue() === TAMAGUI_PRIMITIVES_MODULE)
    for (const caveat of mapping.caveats ?? []) {
      diagnostics.warn(anchor!, {
        code: 'radix/caveat',
        construct: mapping.tamagui,
        reason: caveat,
      })
    }
  }
  return changed
}

const FONT_SIZE = /^text-(?:xs|sm|base|lg|xl|[2-9]xl|\[[^\]]+\])$/

function classNameOf(element: ElementNode): JsxAttribute | undefined {
  return attributesOf(element).find((a) => a.getNameNode().getText() === 'className')
}

/** A base-level font size class (`text-sm`) in the element's static classes. */
function fontSizeIn(element: ElementNode): string | undefined {
  const attr = classNameOf(element)
  for (const source of attr ? classSourcesIn(getAttributeExpression(attr)) : []) {
    for (const raw of splitClasses(source.text)) {
      const token = parseClass(raw)
      if (token && token.variants.length === 0 && FONT_SIZE.test(token.base)) return raw
    }
  }
  return undefined
}

function fontSizeOfPart(sourceFile: SourceFile, tag: string): string | undefined {
  for (const element of sourceFile.getDescendants()) {
    if (
      (Node.isJsxOpeningElement(element) || Node.isJsxSelfClosingElement(element)) &&
      element.getTagNameNode().getText() === tag
    ) {
      const size = fontSizeIn(element)
      if (size) return size
    }
  }
  return undefined
}

/**
 * Radix text parts inherit their font size; Tamagui's (Dialog.Title is an H2)
 * have their own. Give a part without a size class the size it would inherit.
 */
function addFontSize(
  element: ElementNode,
  size: string,
  diagnostics: DiagnosticCollector,
): void {
  if (fontSizeIn(element)) return
  const attr = classNameOf(element)
  const expr = attr && getAttributeExpression(attr)
  if (!attr) {
    element.addAttribute({ name: 'className', initializer: `"${size}"` })
  } else if (expr && isStaticString(expr)) {
    setStringValue(expr, `${size} ${expr.getLiteralText()}`)
  } else if (
    expr &&
    Node.isCallExpression(expr) &&
    CLASS_HELPER_NAMES.has(expr.getExpression().getText())
  ) {
    const first = expr.getArguments()[0]
    if (first && isStaticString(first))
      setStringValue(first, `${size} ${first.getLiteralText()}`)
    else expr.insertArgument(0, `"${size}"`)
  } else {
    return
  }
  diagnostics.info(element, {
    code: 'radix/font-size',
    construct: size,
    reason: `Added \`${size}\`: the Tamagui part has a font size of its own, while the Radix part inherits this one from its content.`,
  })
}

/** The JSX source of an attribute's value: `"a b"` or the expression in `{...}`. */
function valueText(attr: JsxAttribute): string | undefined {
  const init = attr.getInitializer()
  if (!init) return undefined
  if (Node.isJsxExpression(init)) return init.getExpression()?.getText()
  return init.getText()
}

/**
 * Tamagui's Select.Content renders no frame (the Viewport is the visible list),
 * so its classes move to the Viewport inside it.
 */
function moveClassName(
  element: ElementNode,
  targetTag: string,
  diagnostics: DiagnosticCollector,
): void {
  const attr = classNameOf(element)
  const jsx = element.getParent()
  if (!attr || !Node.isJsxOpeningElement(element) || !Node.isJsxElement(jsx)) return
  const target = jsx
    .getDescendants()
    .find(
      (n): n is ElementNode =>
        (Node.isJsxOpeningElement(n) || Node.isJsxSelfClosingElement(n)) &&
        n.getTagNameNode().getText() === targetTag,
    )
  const source = valueText(attr)
  if (!target || !source) return
  const targetAttr = classNameOf(target)
  const targetSource = targetAttr && valueText(targetAttr)
  const helperCall = (expr: Node | undefined) =>
    expr &&
    Node.isCallExpression(expr) &&
    CLASS_HELPER_NAMES.has(expr.getExpression().getText())
      ? expr
      : undefined
  let merged = source
  if (targetAttr && targetSource) {
    const fromCall = helperCall(getAttributeExpression(attr))
    const toCall = helperCall(getAttributeExpression(targetAttr))
    const call = fromCall ?? toCall
    if (call) {
      const args = (node: Node | undefined, text: string) =>
        node && helperCall(node)
          ? helperCall(node)!
              .getArguments()
              .map((a) => a.getText())
          : [text]
      merged = `${call.getExpression().getText()}(${[
        // The moved classes go last: they end in the caller's `className`.
        ...args(getAttributeExpression(targetAttr), targetSource),
        ...args(getAttributeExpression(attr), source),
      ].join(', ')})`
    } else {
      merged = `\`\${${targetSource}} \${${source}}\``
    }
    targetAttr.remove()
  }
  target.addAttribute({
    name: 'className',
    initializer: merged.startsWith('"') ? merged : `{${merged}}`,
  })
  attr.remove()
  diagnostics.info(target, {
    code: 'radix/class-moved',
    construct: targetTag,
    reason: `Moved the classes of the parent part here: in Tamagui the \`${targetTag.split('.').pop()}\` is the visible frame.`,
  })
}

/**
 * `function Separator({ orientation, ...props }: React.ComponentProps<typeof X.Root>)`
 * destructures a prop Tamagui does not have; add it back to the parameter type.
 */
function restoreRadixPropTypes(
  sourceFile: SourceFile,
  local: string,
  mapping: RadixMapping,
): void {
  for (const param of sourceFile
    .getDescendants()
    .filter((n) => Node.isParameterDeclaration(n))) {
    if (!Node.isParameterDeclaration(param)) continue
    const binding = param.getNameNode()
    const typeNode = param.getTypeNode()
    if (!Node.isObjectBindingPattern(binding) || !typeNode) continue
    const match = new RegExp(`typeof ${local}(?:\\.(\\w+))?\\b`).exec(typeNode.getText())
    if (!match) continue
    const part = mapping.parts[match[1] ?? 'Root']
    if (!part?.radixTypes) continue
    const names = binding
      .getElements()
      .map((el) => (el.getPropertyNameNode() ?? el.getNameNode()).getText())
    const extra = names.filter((name) => part.radixTypes![name])
    if (extra.length === 0) continue
    const members = extra.map((name) => `${name}?: ${part.radixTypes![name]}`).join('; ')
    // A renamed prop (`delayDuration` -> `delay`) is set by the wrapper itself,
    // so its Tamagui name is omitted from the wrapper's own props.
    const omitted = extra.map((name) => part.rename?.[name]).filter(Boolean)
    const base = typeNode.getText()
    const typed = omitted.length
      ? base.replace(
          /(React\.)?ComponentProps(WithoutRef|WithRef)?<typeof [\w.]+>/,
          (match) => `Omit<${match}, ${omitted.map((n) => `"${n}"`).join(' | ')}>`,
        )
      : base
    typeNode.replaceWithText(`${typed} & { ${members} }`)
  }
}

/**
 * `({ size, ...props }: React.ComponentProps<typeof Avatar> & { size?: "sm" | "lg" })`:
 * the wrapper declares its own `size`, which may clash with the Tamagui
 * primitive's prop of the same name, so that name is omitted from the
 * primitive's props.
 */
function omitShadowedProps(sourceFile: SourceFile, local: string): void {
  const propsRef = new RegExp(
    `^(React\\.)?ComponentProps(WithoutRef|WithRef)?<typeof ${local}(\\.\\w+)?>$`,
  )
  const params = sourceFile.getDescendants().filter((n) => Node.isParameterDeclaration(n))
  for (const param of params) {
    if (param.wasForgotten() || !Node.isParameterDeclaration(param)) continue
    const binding = param.getNameNode()
    const typeNode = param.getTypeNode()
    if (
      !Node.isObjectBindingPattern(binding) ||
      !typeNode ||
      !Node.isIntersectionTypeNode(typeNode)
    )
      continue
    const destructured = new Set(
      binding
        .getElements()
        .map((el) => (el.getPropertyNameNode() ?? el.getNameNode()).getText()),
    )
    const own = typeNode
      .getTypeNodes()
      .filter((t) => Node.isTypeLiteral(t))
      .flatMap((t) => (Node.isTypeLiteral(t) ? t.getMembers() : []))
      .map((m) => (Node.isPropertySignature(m) ? m.getName() : undefined))
      .filter(
        (name): name is string =>
          !!name && destructured.has(name) && name !== 'className',
      )
    if (own.length === 0) continue
    const ref = typeNode.getTypeNodes().find((t) => propsRef.test(t.getText()))
    if (!ref) continue
    ref.replaceWithText(`Omit<${ref.getText()}, ${own.map((n) => `"${n}"`).join(' | ')}>`)
  }
}

function rewriteCssVariables(
  sourceFile: SourceFile,
  mapping: RadixMapping,
  diagnostics: DiagnosticCollector,
): void {
  const variables = mapping.cssVariables!
  for (const source of collectClassSources(sourceFile)) {
    if (!isStaticString(source.node)) continue
    const literal = source.node
    let value = literal.getLiteralText()
    for (const [radixVar, tamaguiVar] of Object.entries(variables)) {
      if (!value.includes(radixVar)) continue
      if (tamaguiVar) {
        value = value.split(radixVar).join(tamaguiVar)
      } else {
        diagnostics.warn(literal, {
          code: 'radix/css-variable',
          construct: radixVar,
          reason: `Tamagui \`${mapping.tamagui}\` does not set \`${radixVar}\`, so classes using it fall back to their defaults.`,
        })
      }
    }
    if (value !== literal.getLiteralText()) setStringValue(literal, value)
  }
}
