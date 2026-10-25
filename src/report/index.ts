import type { Diagnostic, FileResult, Severity } from '../types.js'

export interface FileReport {
  file: string
  changed: boolean
  diagnostics: Diagnostic[]
}

export interface Report {
  totals: {
    files: number
    changedFiles: number
    diagnostics: Record<Severity, number>
  }
  files: FileReport[]
}

export function buildReport(results: readonly FileResult[]): Report {
  const diagnostics: Record<Severity, number> = { todo: 0, warning: 0, info: 0 }
  const files: FileReport[] = []
  for (const result of results) {
    for (const d of result.diagnostics) diagnostics[d.severity]++
    files.push({
      file: result.filePath,
      changed: result.changed,
      diagnostics: [...result.diagnostics].sort(compareDiagnostics),
    })
  }
  return {
    totals: {
      files: results.length,
      changedFiles: results.filter((r) => r.changed).length,
      diagnostics,
    },
    files,
  }
}

function compareDiagnostics(a: Diagnostic, b: Diagnostic): number {
  return a.line - b.line || a.column - b.column || a.code.localeCompare(b.code)
}

function escapeCell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

export function reportToMarkdown(report: Report): string {
  const { totals } = report
  const lines = [
    '# shadcn-tamagui-codemod report',
    '',
    `- Files scanned: ${totals.files}`,
    `- Files changed: ${totals.changedFiles}`,
    `- TODOs: ${totals.diagnostics.todo}`,
    `- Warnings: ${totals.diagnostics.warning}`,
    `- Notes: ${totals.diagnostics.info}`,
    '',
  ]
  for (const file of report.files) {
    if (file.diagnostics.length === 0) continue
    lines.push(`## ${file.file}`, '')
    lines.push('| Line | Severity | Construct | Reason | Suggested fix |')
    lines.push('| ---: | --- | --- | --- | --- |')
    for (const d of file.diagnostics) {
      lines.push(
        `| ${d.line} | ${d.severity} | \`${escapeCell(d.construct)}\` | ${escapeCell(d.reason)} | ${escapeCell(d.suggestion ?? '')} |`,
      )
    }
    lines.push('')
  }
  return lines.join('\n')
}
