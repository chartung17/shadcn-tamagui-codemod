import {
  Node,
  type ImportDeclaration,
  type JsxAttribute,
  type PropertyAccessExpression,
  type SourceFile,
} from 'ts-morph'
import { collectClassSources, isStaticString, setStringValue } from '../ast/classNames.js'
import { declaredNames, ensureNamedImport, TAMAGUI_TAILWIND } from '../ast/imports.js'
import type { ElementNode } from '../ast/jsx.js'
import type { DiagnosticCollector } from '../diagnostics.js'
import {
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

function wrapperHelper(sourceFile: SourceFile, shared: Map<string, unknown>): string {
  const key = 'radix:twHelper'
  const existing = shared.get(key)
  if (typeof existing === 'string') return existing
  const styledLocal = ensureNamedImport(sourceFile, TAMAGUI_TAILWIND, 'styled')
  const taken = declaredNames(sourceFile)
  let name = 'tw'
  for (let i = 2; taken.has(name); i++) name = `tw${i}`
  const hasReactNamespace = sourceFile
    .getImportDeclarations()
    .some(
      (d) =>
        d.getModuleSpecifierValue() === 'react' &&
        d.getNamespaceImport()?.getText() === 'React',
    )
  let ComponentType = 'React.ComponentType'
  let ComponentProps = 'React.ComponentProps'
  if (!hasReactNamespace) {
    ComponentType = ensureNamedImport(sourceFile, 'react', 'ComponentType', {
      typeOnly: true,
    })
    ComponentProps = ensureNamedImport(sourceFile, 'react', 'ComponentProps', {
      typeOnly: true,
    })
  }
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

function ensureWrapper(
  sourceFile: SourceFile,
  context: PassContext,
  wrappers: Map<string, string>,
  target: string,
): string {
  const existing = wrappers.get(target)
  if (existing) return existing
  const helper = wrapperHelper(sourceFile, context.shared)
  const taken = declaredNames(sourceFile)
  const stem = target.replace(/Primitive/g, '').replace(/\./g, '')
  let name = `Styled${stem}`
  for (let i = 2; taken.has(name) || [...wrappers.values()].includes(name); i++)
    name = `Styled${stem}${i}`
  // Wrappers go right after the helper, in order of first use.
  const helperDecl = sourceFile.getVariableStatement((s) =>
    s.getDeclarations().some((d) => d.getName() === helper),
  )!
  sourceFile.insertStatements(
    helperDecl.getChildIndex() + 1 + wrappers.size,
    `const ${name} = ${helper}(${target})`,
  )
  wrappers.set(target, name)
  return name
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
    const decl = binding.decl
    if (decl.getModuleSpecifierValue() === 'radix-ui') {
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
    } else {
      decl.remove()
    }
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
        const styledTag = attributesOf(element).some(
          (a) => a.getNameNode().getText() === 'className',
        )
          ? ensureWrapper(sourceFile, context, wrappers, target)
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
