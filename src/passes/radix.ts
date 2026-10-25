import { Node, type SourceFile, type VariableDeclaration } from 'ts-morph'
import {
  getImportOrigins,
  removeUnusedImports,
  type ImportOrigin,
} from '../ast/imports.js'
import { collectElements, addAttribute, renameElement } from '../ast/jsx.js'
import { isInScope } from '../ast/scope.js'
import { DiagnosticCollector } from '../diagnostics.js'
import { rewriteRadixComponents } from './radixComponents.js'
import type { FilePass, PassContext } from '../types.js'

const SLOT_MODULES = ['radix-ui', '@radix-ui/react-slot']

/** True for `Slot.Root` (radix-ui), `Slot`/`Root` (@radix-ui/react-slot) and namespace forms. */
function isSlotReference(node: Node, origins: Map<string, ImportOrigin>): boolean {
  if (Node.isIdentifier(node)) {
    const origin = origins.get(node.getText())
    return (
      origin?.module === '@radix-ui/react-slot' &&
      ['Slot', 'Root'].includes(origin.imported)
    )
  }
  if (Node.isPropertyAccessExpression(node)) {
    const object = node.getExpression()
    if (!Node.isIdentifier(object)) return false
    const origin = origins.get(object.getText())
    if (!origin || !['Root', 'Slot'].includes(node.getName())) return false
    if (origin.module === 'radix-ui') return origin.imported === 'Slot'
    return origin.module === '@radix-ui/react-slot' && origin.imported === '*'
  }
  return false
}

/** `html.button`, `View` or a local `styled()` frame: components that take `asChild`. */
function isTamaguiTag(node: Node, sourceFile: SourceFile): boolean {
  if (Node.isPropertyAccessExpression(node)) {
    const object = node.getExpression()
    return (
      Node.isIdentifier(object) && isTailwindLocal(object.getText(), sourceFile, 'html')
    )
  }
  if (!Node.isIdentifier(node)) return false
  const name = node.getText()
  if (
    isTailwindLocal(name, sourceFile, 'View') ||
    isTailwindLocal(name, sourceFile, 'Text')
  )
    return true
  const init = sourceFile.getVariableDeclaration(name)?.getInitializer()
  return (
    !!init &&
    Node.isCallExpression(init) &&
    Node.isIdentifier(init.getExpression()) &&
    isTailwindLocal(init.getExpression().getText(), sourceFile, 'styled')
  )
}

/** Whether `local` is imported from @tamagui/tailwind as `imported` (checked on the current file). */
function isTailwindLocal(
  local: string,
  sourceFile: SourceFile,
  imported: string,
): boolean {
  for (const decl of sourceFile.getImportDeclarations()) {
    if (decl.getModuleSpecifierValue() !== '@tamagui/tailwind') continue
    for (const spec of decl.getNamedImports()) {
      if (
        spec.getName() === imported &&
        (spec.getAliasNode()?.getText() ?? imported) === local
      )
        return true
    }
  }
  return false
}

interface SlotSwitch {
  decl: VariableDeclaration
  condition: string
  /** True when the Slot is the `whenTrue` branch (`asChild ? Slot : X`). */
  slotWhenTrue: boolean
  tag: string
}

function slotSwitch(
  decl: VariableDeclaration,
  sourceFile: SourceFile,
  origins: Map<string, ImportOrigin>,
): SlotSwitch | undefined {
  let init = decl.getInitializer()
  while (init && Node.isParenthesizedExpression(init)) init = init.getExpression()
  if (!init || !Node.isConditionalExpression(init)) return undefined
  const whenTrue = init.getWhenTrue()
  const whenFalse = init.getWhenFalse()
  const condition = init.getCondition().getText()
  if (isSlotReference(whenTrue, origins) && isTamaguiTag(whenFalse, sourceFile)) {
    return { decl, condition, slotWhenTrue: true, tag: whenFalse.getText() }
  }
  if (isSlotReference(whenFalse, origins) && isTamaguiTag(whenTrue, sourceFile)) {
    return { decl, condition, slotWhenTrue: false, tag: whenTrue.getText() }
  }
  return undefined
}

/**
 * `const Comp = asChild ? Slot.Root : html.button` + `<Comp ...>` becomes
 * `<html.button asChild={asChild} ...>`. Tamagui components implement
 * `asChild` themselves (merging props, events and className-derived styles
 * into the child) on web and native; Radix `Slot` is DOM-only.
 */
function rewriteSlotSwitches(
  sourceFile: SourceFile,
  context: PassContext,
  diagnostics: DiagnosticCollector,
): boolean {
  const origins = getImportOrigins(sourceFile, context)
  let changed = false
  const switches = new Map<VariableDeclaration, SlotSwitch>()

  for (const element of collectElements(sourceFile)) {
    const tag = element.getTagNameNode()
    if (!Node.isIdentifier(tag)) continue
    const decl = tag
      .getSymbol()
      ?.getDeclarations()
      .find((d) => Node.isVariableDeclaration(d))
    if (!decl || !Node.isVariableDeclaration(decl)) continue
    const found = switches.get(decl) ?? slotSwitch(decl, sourceFile, origins)
    if (!found) continue
    switches.set(decl, found)
    renameElement(element, found.tag)
    const condition = found.slotWhenTrue ? found.condition : `!(${found.condition})`
    addAttribute(element, 'asChild', condition, element.getAttributes().length)
    context.metrics.constructs.converted++
    diagnostics.info(element, {
      code: 'radix/as-child',
      construct: `asChild ? Slot : ${found.tag}`,
      reason: `Radix \`Slot\` replaced with Tamagui's \`asChild\` on \`${found.tag}\`.`,
    })
    changed = true
  }

  for (const { decl } of switches.values()) {
    const nameNode = decl.getNameNode()
    const stillUsed = Node.isIdentifier(nameNode)
      ? nameNode.findReferencesAsNodes().some((ref) => ref !== nameNode)
      : true
    if (stillUsed) continue
    const statement = decl.getVariableStatement()
    if (statement && statement.getDeclarations().length === 1) statement.remove()
    else decl.remove()
  }
  return changed
}

/** Flag Radix `Slot` uses the switch rewrite could not handle. */
function flagRemainingSlots(
  sourceFile: SourceFile,
  context: PassContext,
  diagnostics: DiagnosticCollector,
): void {
  const origins = getImportOrigins(sourceFile, context)
  sourceFile.forEachDescendant((node, traversal) => {
    if (Node.isImportDeclaration(node)) {
      traversal.skip()
      return
    }
    if (!(Node.isIdentifier(node) || Node.isPropertyAccessExpression(node))) return
    if (Node.isPropertyAccessExpression(node.getParent())) return
    if (!isSlotReference(node, origins)) return
    context.metrics.constructs.flagged++
    diagnostics.todo(node, {
      code: 'radix/slot',
      construct: node.getText(),
      reason: 'Radix `Slot` is DOM-only and has no native equivalent.',
      suggestion:
        'Render a Tamagui component (`html.*`, `View` or a `styled()` frame) with `asChild` instead.',
    })
    traversal.skip()
  })
}

/**
 * Pass 6. Replaces Radix-based constructs with Tamagui ones: `asChild`/`Slot`
 * switches, and the components in `src/mappings/radix.ts`.
 */
export const radixPass: FilePass = {
  name: 'radix',
  description: 'Replace Radix primitives with Tamagui components',
  run(sourceFile, context) {
    const diagnostics = new DiagnosticCollector('radix')
    if (!isInScope(sourceFile, context)) return { changed: false, diagnostics: [] }
    let changed = rewriteSlotSwitches(sourceFile, context, diagnostics)
    flagRemainingSlots(sourceFile, context, diagnostics)
    changed = rewriteRadixComponents(sourceFile, context, diagnostics) || changed
    if (changed) {
      for (const module of SLOT_MODULES)
        changed = removeUnusedImports(sourceFile, module) || changed
    }
    return { changed, diagnostics: diagnostics.items }
  },
}
