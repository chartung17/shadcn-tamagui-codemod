import { Node, type ImportDeclaration, type SourceFile } from 'ts-morph'
import type { PassContext } from '../types.js'

export const TAMAGUI_TAILWIND = '@tamagui/tailwind'

/** Where an identifier in the file was imported from, before any rewrite. */
export interface ImportOrigin {
  module: string
  /** Imported name, `default` or `*` for namespace imports. */
  imported: string
  typeOnly: boolean
}

const ORIGINS_KEY = 'imports:origins'

/**
 * Map of local name to import origin, as the file looked when the imports pass
 * ran. Later passes use it to recognize e.g. `DialogPrimitive` as Radix even
 * after its import was rewritten.
 */
export function getImportOrigins(
  sourceFile: SourceFile,
  context: PassContext,
): Map<string, ImportOrigin> {
  let origins = context.shared.get(ORIGINS_KEY) as Map<string, ImportOrigin> | undefined
  if (!origins) {
    origins = collectImportOrigins(sourceFile)
    context.shared.set(ORIGINS_KEY, origins)
  }
  return origins
}

export function collectImportOrigins(sourceFile: SourceFile): Map<string, ImportOrigin> {
  const origins = new Map<string, ImportOrigin>()
  for (const decl of sourceFile.getImportDeclarations()) {
    const module = decl.getModuleSpecifierValue()
    const declTypeOnly = decl.isTypeOnly()
    const def = decl.getDefaultImport()
    if (def)
      origins.set(def.getText(), { module, imported: 'default', typeOnly: declTypeOnly })
    const ns = decl.getNamespaceImport()
    if (ns) origins.set(ns.getText(), { module, imported: '*', typeOnly: declTypeOnly })
    for (const spec of decl.getNamedImports()) {
      const local = spec.getAliasNode()?.getText() ?? spec.getName()
      origins.set(local, {
        module,
        imported: spec.getName(),
        typeOnly: declTypeOnly || spec.isTypeOnly(),
      })
    }
  }
  return origins
}

/** Names declared anywhere in the file (imports, variables, functions, params...). */
export function declaredNames(sourceFile: SourceFile): Set<string> {
  const names = new Set<string>()
  sourceFile.forEachDescendant((node) => {
    if (
      Node.isImportSpecifier(node) ||
      Node.isImportClause(node) ||
      Node.isNamespaceImport(node)
    ) {
      return
    }
    if (
      Node.isVariableDeclaration(node) ||
      Node.isFunctionDeclaration(node) ||
      Node.isClassDeclaration(node) ||
      Node.isParameterDeclaration(node) ||
      Node.isBindingElement(node) ||
      Node.isTypeAliasDeclaration(node) ||
      Node.isInterfaceDeclaration(node) ||
      Node.isEnumDeclaration(node)
    ) {
      const nameNode = node.getNameNode()
      if (nameNode && Node.isIdentifier(nameNode)) names.add(nameNode.getText())
    }
  })
  for (const local of collectImportOrigins(sourceFile).keys()) names.add(local)
  return names
}

function findImport(
  sourceFile: SourceFile,
  module: string,
  typeOnly: boolean,
): ImportDeclaration | undefined {
  return sourceFile
    .getImportDeclarations()
    .find(
      (d) =>
        d.getModuleSpecifierValue() === module &&
        !d.getNamespaceImport() &&
        d.isTypeOnly() === typeOnly,
    )
}

/**
 * Make sure `name` is imported from `module` and return the local name to use.
 * Reuses an existing import, and picks an alias such as `TwView` if `name`
 * already means something else in the file.
 */
export function ensureNamedImport(
  sourceFile: SourceFile,
  module: string,
  name: string,
  options: { typeOnly?: boolean; aliasPrefix?: string } = {},
): string {
  const typeOnly = options.typeOnly ?? false
  for (const decl of sourceFile.getImportDeclarations()) {
    if (decl.getModuleSpecifierValue() !== module) continue
    for (const spec of decl.getNamedImports()) {
      if (spec.getName() === name) return spec.getAliasNode()?.getText() ?? name
    }
  }

  const taken = declaredNames(sourceFile)
  let local = name
  if (taken.has(local)) {
    const prefix = options.aliasPrefix ?? 'Tw'
    local = `${prefix}${name[0]!.toUpperCase()}${name.slice(1)}`
    for (let i = 2; taken.has(local); i++) local = `${prefix}${name}${i}`
  }

  const spec = local === name ? name : { name, alias: local }
  const existing = findImport(sourceFile, module, typeOnly)
  if (existing) {
    existing.addNamedImport(spec)
  } else {
    const imports = sourceFile.getImportDeclarations()
    const last = imports[imports.length - 1]
    const index = last ? last.getChildIndex() + 1 : directiveCount(sourceFile)
    sourceFile.insertImportDeclaration(index, {
      moduleSpecifier: module,
      namedImports: [spec],
      isTypeOnly: typeOnly,
    })
  }
  return local
}

/** Number of leading `"use client"`-style directive statements. */
function directiveCount(sourceFile: SourceFile): number {
  let count = 0
  for (const statement of sourceFile.getStatements()) {
    if (
      Node.isExpressionStatement(statement) &&
      Node.isStringLiteral(statement.getExpression())
    ) {
      count++
    } else {
      break
    }
  }
  return count
}

/** True if `local` is referenced anywhere other than its own import specifier. */
export function isIdentifierUsed(sourceFile: SourceFile, local: string): boolean {
  let used = false
  sourceFile.forEachDescendant((node, traversal) => {
    if (Node.isImportDeclaration(node)) {
      traversal.skip()
      return
    }
    if (Node.isIdentifier(node) && node.getText() === local) {
      const parent = node.getParent()
      // `obj.local` and `{ local: x }` keys are not references to the import.
      if (Node.isPropertyAccessExpression(parent) && parent.getNameNode() === node) return
      if (Node.isPropertyAssignment(parent) && parent.getNameNode() === node) return
      used = true
      traversal.stop()
    }
  })
  return used
}

/** Remove named/default/namespace imports whose local name is no longer used. */
export function removeUnusedImports(sourceFile: SourceFile, module: string): boolean {
  let changed = false
  for (const decl of sourceFile.getImportDeclarations()) {
    if (decl.getModuleSpecifierValue() !== module) continue
    // Side-effect imports (`import "x"`) have no bindings and are kept.
    if (!decl.getImportClause()) continue
    for (const spec of decl.getNamedImports()) {
      const local = spec.getAliasNode()?.getText() ?? spec.getName()
      if (!isIdentifierUsed(sourceFile, local)) {
        spec.remove()
        changed = true
      }
    }
    const def = decl.getDefaultImport()
    if (def && !isIdentifierUsed(sourceFile, def.getText())) {
      decl.removeDefaultImport()
      changed = true
    }
    const ns = decl.getNamespaceImport()
    if (ns && !isIdentifierUsed(sourceFile, ns.getText())) {
      decl.remove()
      changed = true
      continue
    }
    if (
      !decl.getDefaultImport() &&
      !decl.getNamespaceImport() &&
      decl.getNamedImports().length === 0
    ) {
      decl.remove()
      changed = true
    }
  }
  return changed
}
