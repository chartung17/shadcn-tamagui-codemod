import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import * as prettier from 'prettier'
import { Project, ts } from 'ts-morph'
import { placeTodos } from './diagnostics.js'
import { FILE_PASSES } from './passes/index.js'
import { createOffsetMapper, lineColumnAt } from './positions.js'
import {
  emptyMetrics,
  type CodemodOptions,
  type Diagnostic,
  type DiagnosticDraft,
  type FilePass,
  type FileResult,
  type PassContext,
} from './types.js'

export function selectPasses(
  only: CodemodOptions['only'],
  passes: readonly FilePass[] = FILE_PASSES,
): readonly FilePass[] {
  if (!only || only.length === 0) return passes
  return passes.filter((pass) => only.includes(pass.name))
}

let sharedProject: Project | undefined

function getProject(): Project {
  sharedProject ??= new Project({
    useInMemoryFileSystem: true,
    skipAddingFilesFromTsConfig: true,
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      allowJs: true,
      target: ts.ScriptTarget.Latest,
    },
  })
  return sharedProject
}

function toPosix(p: string): string {
  return p.split(path.sep).join('/')
}

/**
 * Transform one file's source text. Does no file I/O except reading the
 * target project's Prettier config when `options.prettier` is `'resolve'`.
 */
export async function transformSource(
  filePath: string,
  source: string,
  options: CodemodOptions,
): Promise<FileResult> {
  const relative = toPosix(
    path.isAbsolute(filePath) ? path.relative(options.cwd, filePath) : filePath,
  )
  const project = getProject()
  const virtualPath = `/${relative.replace(/^(\.\.\/)+/, '')}`
  const sourceFile = project.createSourceFile(virtualPath, source, { overwrite: true })

  try {
    const context: PassContext = {
      filePath: relative,
      options,
      shared: new Map(),
      metrics: emptyMetrics(),
    }
    const drafts: DiagnosticDraft[] = []
    let changed = false
    for (const pass of selectPasses(options.only, options.passes)) {
      const result = pass.run(sourceFile, context)
      changed ||= result.changed
      drafts.push(...result.diagnostics)
    }

    const hasTodos = drafts.some((d) => d.severity === 'todo')
    if (!changed && !hasTodos) {
      return {
        filePath: relative,
        original: source,
        output: source,
        changed: false,
        diagnostics: drafts.map((d) =>
          finalize(d, relative, lineColumnAt(source, d.pos)),
        ),
        metrics: context.metrics,
      }
    }

    const { text, anchored, unplaced } = placeTodos(sourceFile, drafts)
    const output = await format(
      text,
      path.resolve(options.cwd, relative),
      options.prettier,
    )
    const mapOffset = createOffsetMapper(text, output)
    const diagnostics = anchored.map(({ draft, pos }) => {
      const diagnostic = finalize(draft, relative, lineColumnAt(output, mapOffset(pos)))
      if (unplaced.includes(draft)) {
        diagnostic.suggestion = [
          diagnostic.suggestion,
          '(no inline TODO comment could be placed)',
        ]
          .filter(Boolean)
          .join(' ')
      }
      return diagnostic
    })
    return {
      filePath: relative,
      original: source,
      output,
      changed: output !== source,
      diagnostics,
      metrics: context.metrics,
    }
  } finally {
    project.removeSourceFile(sourceFile)
  }
}

function finalize(
  draft: DiagnosticDraft,
  file: string,
  at: { line: number; column: number },
): Diagnostic {
  const diagnostic: Diagnostic = {
    pass: draft.pass,
    file,
    line: at.line,
    column: at.column,
    severity: draft.severity,
    code: draft.code,
    construct: draft.construct,
    reason: draft.reason,
  }
  if (draft.suggestion) diagnostic.suggestion = draft.suggestion
  return diagnostic
}

async function format(
  text: string,
  absolutePath: string,
  setting: CodemodOptions['prettier'],
): Promise<string> {
  if (setting === false) return text
  const config =
    setting === undefined || setting === 'resolve'
      ? ((await prettier.resolveConfig(absolutePath, { editorconfig: true })) ?? {})
      : setting
  return prettier.format(text, { ...config, filepath: absolutePath })
}

export interface RunOptions extends CodemodOptions {
  write: boolean
}

export async function transformFiles(
  files: readonly string[],
  options: RunOptions,
): Promise<FileResult[]> {
  const results: FileResult[] = []
  for (const file of files) {
    const absolute = path.resolve(options.cwd, file)
    const source = await readFile(absolute, 'utf8')
    const result = await transformSource(absolute, source, options)
    if (options.write && result.changed) await writeFile(absolute, result.output)
    results.push(result)
  }
  return results
}
