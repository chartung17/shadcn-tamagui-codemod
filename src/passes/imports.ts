import webOnlyPackages from '../data/web-only-packages.json' with { type: 'json' }
import { DiagnosticCollector } from '../diagnostics.js'
import { getImportOrigins } from '../ast/imports.js'
import { isInScope } from '../ast/scope.js'
import type { FilePass } from '../types.js'

/** Suggested replacements for `react-dom` APIs. */
const REACT_DOM_SUGGESTIONS: Record<string, string> = {
  createPortal:
    'Render through `Portal` from `@tamagui/portal` (or a Tamagui overlay component), which works on web and native.',
  flushSync: 'Remove the synchronous flush; React Native has no DOM to flush.',
  createRoot:
    'Keep this in the web entry point only; native apps register a root component instead.',
  hydrateRoot:
    'Keep this in the web entry point only; native apps register a root component instead.',
}

/**
 * Pass 1. Records where every imported identifier comes from (later passes
 * rewrite `radix-ui`, `@radix-ui/*`, `class-variance-authority`, `cn` and
 * `lucide-react` imports using this record) and flags imports of web-only
 * React DOM APIs and of DOM-only packages (`src/data/web-only-packages.json`).
 */
export const importsPass: FilePass = {
  name: 'imports',
  description: 'Record import origins and flag react-dom usage',
  run(sourceFile, context) {
    const diagnostics = new DiagnosticCollector('imports')
    if (!isInScope(sourceFile, context)) return { changed: false, diagnostics: [] }
    getImportOrigins(sourceFile, context)

    const packages = webOnlyPackages.packages as Record<
      string,
      { reason: string; suggestion?: string }
    >
    for (const decl of sourceFile.getImportDeclarations()) {
      const module = decl.getModuleSpecifierValue()
      const known = packages[module]
      if (known && !decl.isTypeOnly()) {
        context.metrics.constructs.flagged++
        diagnostics.todo(decl, {
          code: 'import/web-only-package',
          construct: `"${module}"`,
          reason: known.reason,
          ...(known.suggestion ? { suggestion: known.suggestion } : {}),
        })
        continue
      }
      if (module !== 'react-dom' && !module.startsWith('react-dom/')) continue
      if (decl.isTypeOnly()) continue
      const names = decl.getNamedImports().map((spec) => spec.getName())
      const suggestion = names
        .map((name) => REACT_DOM_SUGGESTIONS[name])
        .filter(Boolean)
        .join(' ')
      context.metrics.constructs.flagged++
      diagnostics.todo(decl, {
        code: 'import/react-dom',
        construct: names.length ? `${names.join(', ')} from "${module}"` : `"${module}"`,
        reason: `\`${module}\` is web-only and is not available in React Native.`,
        suggestion:
          suggestion ||
          'Move this code behind a `.web.tsx` file or replace it with a cross-platform API.',
      })
    }
    return { changed: false, diagnostics: diagnostics.items }
  },
}
