import type { Options as PrettierOptions } from 'prettier'
import type { Node, SourceFile } from 'ts-morph'

/**
 * Per-file passes, in the order they run. `theme` and `report` are project-level
 * steps (see `runner.ts`) and are not part of this list.
 */
export const FILE_PASS_NAMES = [
  'imports',
  'elements',
  'classes',
  'cn-cva',
  'selectors',
  'radix',
  'icons',
] as const

export const PROJECT_STEP_NAMES = ['theme', 'report'] as const

export const ALL_PASS_NAMES = [...FILE_PASS_NAMES, ...PROJECT_STEP_NAMES] as const

export type FilePassName = (typeof FILE_PASS_NAMES)[number]
export type ProjectStepName = (typeof PROJECT_STEP_NAMES)[number]
export type PassName = (typeof ALL_PASS_NAMES)[number]

/**
 * How a diagnostic is surfaced.
 *
 * - `todo`: the construct cannot be converted safely. A `// TODO(native): ...`
 *   comment is written next to it and it is counted against "auto-converted %".
 * - `warning`: the construct was kept and still works on web, but behaves
 *   differently (or not at all) on native. Report only, no inline comment.
 * - `info`: a note about something the codemod did. Report only.
 */
export type Severity = 'todo' | 'warning' | 'info'

export interface Diagnostic {
  pass: PassName
  /** Path relative to the run's cwd, with forward slashes. */
  file: string
  line: number
  column: number
  severity: Severity
  /** Stable identifier, e.g. `class/web-only` or `element/select`. */
  code: string
  /** The class name or source construct the diagnostic is about. */
  construct: string
  reason: string
  suggestion?: string
}

export interface CodemodOptions {
  /** Directory paths are reported relative to. */
  cwd: string
  /** Subset of passes to run. Defaults to all. */
  only?: readonly PassName[]
  /** Path to a shadcn `globals.css` used for theme generation. */
  themeCss?: string
  /**
   * Prettier options used to format changed files. `'resolve'` (the default)
   * reads the target project's Prettier config for each file; `false` disables
   * formatting.
   */
  prettier?: PrettierOptions | 'resolve' | false
  /** Module the generated Tamagui icons are imported from (default `@/components/icons`). */
  iconsImport?: string
  /** Extra theme keys (from `--theme-css`) the class analysis treats as colors. */
  themeKeys?: readonly string[]
  /** Override the per-file pass list (used by tests and extensions). */
  passes?: readonly FilePass[]
}

/** How Tailwind classes fare on native; see `src/tailwind/support.ts`. */
export type ClassStatus = 'supported' | 'web-only' | 'unsupported' | 'unknown'

/** Counters for the report's conversion percentages. */
export interface FileMetrics {
  /** Class occurrences by support status. */
  classes: Record<ClassStatus, number>
  /** Elements, components and imports a pass rewrote, or flagged with a TODO. */
  constructs: { converted: number; flagged: number }
}

export function emptyMetrics(): FileMetrics {
  return {
    classes: { supported: 0, 'web-only': 0, unsupported: 0, unknown: 0 },
    constructs: { converted: 0, flagged: 0 },
  }
}

export interface PassContext {
  /** Path of the file being transformed, relative to `options.cwd`. */
  filePath: string
  options: CodemodOptions
  /**
   * State shared between passes for the current file, e.g. the original
   * module of an imported identifier after the imports pass rewrote it.
   */
  shared: Map<string, unknown>
  metrics: FileMetrics
}

/**
 * A diagnostic as a pass produces it: anchored to an AST node rather than a
 * line, because later passes and Prettier move code around. The runner turns
 * it into a `Diagnostic` with output-file positions at the end of the run.
 */
export interface DiagnosticDraft {
  pass: PassName
  severity: Severity
  code: string
  construct: string
  reason: string
  suggestion?: string
  /** Node the diagnostic is about; used for positions and TODO placement. */
  node?: Node
  /** Position at the time the diagnostic was created, used if `node` is gone. */
  pos: number
}

export interface PassResult {
  changed: boolean
  diagnostics: DiagnosticDraft[]
}

export interface FilePass {
  name: FilePassName
  description: string
  run(sourceFile: SourceFile, context: PassContext): PassResult
}

export interface FileResult {
  /** Path relative to `options.cwd`. */
  filePath: string
  original: string
  output: string
  changed: boolean
  diagnostics: Diagnostic[]
  metrics: FileMetrics
  /** Icons the file uses: generated component name -> Lucide source name. */
  icons: Record<string, string>
}
