import { Node, type SourceFile } from 'ts-morph'
import type { PassContext } from '../types.js'

/**
 * Module specifiers that mark a file as Tailwind/shadcn code. Path aliases vary
 * between projects, so `lib/utils` and `components/ui/` match any prefix.
 */
const SCOPE_MODULES: readonly RegExp[] = [
  /^radix-ui$/,
  /^@radix-ui\//,
  /(^|\/)components\/ui\//,
  /(^|\/)lib\/utils$/,
  /^lucide-react$/,
  /^class-variance-authority$/,
  /^cn$/,
  /^clsx$/,
  /^tailwind-merge$/,
  /^@tamagui\/tailwind$/,
]

const SCOPE_KEY = 'scope:inScope'

/**
 * True when the file uses Tailwind or shadcn: it imports one of the modules
 * above or has a `className` JSX attribute. Files that are not in scope are
 * never changed. The answer is computed once, before any pass edits the file.
 */
export function isInScope(sourceFile: SourceFile, context: PassContext): boolean {
  const cached = context.shared.get(SCOPE_KEY)
  if (typeof cached === 'boolean') return cached
  const result = computeInScope(sourceFile)
  context.shared.set(SCOPE_KEY, result)
  return result
}

function computeInScope(sourceFile: SourceFile): boolean {
  for (const decl of sourceFile.getImportDeclarations()) {
    const module = decl.getModuleSpecifierValue()
    if (SCOPE_MODULES.some((re) => re.test(module))) return true
  }
  let found = false
  sourceFile.forEachDescendant((node, traversal) => {
    if (Node.isJsxAttribute(node) && node.getNameNode().getText() === 'className') {
      found = true
      traversal.stop()
    }
  })
  return found
}
