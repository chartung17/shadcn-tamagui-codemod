import {
  emptyMetrics,
  type Diagnostic,
  type FileMetrics,
  type FileResult,
  type Severity,
} from '../types.js'

export interface FileReport {
  file: string
  changed: boolean
  metrics: FileMetrics
  autoConvertedPercent: number
  diagnostics: Diagnostic[]
}

export interface Report {
  totals: {
    files: number
    changedFiles: number
    diagnostics: Record<Severity, number>
    metrics: FileMetrics
    /** Classes and constructs that needed no TODO, as a share of all of them. */
    autoConvertedPercent: number
    /** Class occurrences that resolve on native, as a share of all classes. */
    nativeClassCoveragePercent: number
  }
  byCode: { code: string; severity: Severity; count: number }[]
  files: FileReport[]
}

function percent(part: number, whole: number): number {
  return whole === 0 ? 100 : Math.round((part / whole) * 1000) / 10
}

function classTotal(metrics: FileMetrics): number {
  return Object.values(metrics.classes).reduce((a, b) => a + b, 0)
}

export function autoConvertedPercent(metrics: FileMetrics): number {
  const classes = classTotal(metrics)
  const { converted, flagged } = metrics.constructs
  const ok = classes - metrics.classes.unsupported + converted
  return percent(ok, classes + converted + flagged)
}

function addMetrics(into: FileMetrics, from: FileMetrics): void {
  for (const key of Object.keys(into.classes) as (keyof FileMetrics['classes'])[]) {
    into.classes[key] += from.classes[key]
  }
  into.constructs.converted += from.constructs.converted
  into.constructs.flagged += from.constructs.flagged
}

const SEVERITY_ORDER: Record<Severity, number> = { todo: 0, warning: 1, info: 2 }

function compareDiagnostics(a: Diagnostic, b: Diagnostic): number {
  return a.line - b.line || a.column - b.column || a.code.localeCompare(b.code)
}

export function buildReport(results: readonly FileResult[]): Report {
  const diagnostics: Record<Severity, number> = { todo: 0, warning: 0, info: 0 }
  const metrics = emptyMetrics()
  const byCode = new Map<string, { code: string; severity: Severity; count: number }>()
  const files: FileReport[] = []

  for (const result of results) {
    addMetrics(metrics, result.metrics)
    for (const d of result.diagnostics) {
      diagnostics[d.severity]++
      const key = `${d.severity}:${d.code}`
      const entry = byCode.get(key) ?? { code: d.code, severity: d.severity, count: 0 }
      entry.count++
      byCode.set(key, entry)
    }
    files.push({
      file: result.filePath,
      changed: result.changed,
      metrics: result.metrics,
      autoConvertedPercent: autoConvertedPercent(result.metrics),
      diagnostics: [...result.diagnostics].sort(compareDiagnostics),
    })
  }

  return {
    totals: {
      files: results.length,
      changedFiles: results.filter((r) => r.changed).length,
      diagnostics,
      metrics,
      autoConvertedPercent: autoConvertedPercent(metrics),
      nativeClassCoveragePercent: percent(metrics.classes.supported, classTotal(metrics)),
    },
    byCode: [...byCode.values()].sort(
      (a, b) =>
        SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] ||
        b.count - a.count ||
        a.code.localeCompare(b.code),
    ),
    files,
  }
}

function escapeCell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

function code(text: string): string {
  // Use a longer fence when the text itself contains backticks.
  const fence = text.includes('`') ? '``' : '`'
  const pad = fence.length > 1 ? ' ' : ''
  return `${fence}${pad}${escapeCell(text)}${pad}${fence}`
}

export function reportToMarkdown(report: Report): string {
  const { totals } = report
  const { classes, constructs } = totals.metrics
  const lines = [
    '# shadcn-tamagui-codemod report',
    '',
    '| | |',
    '| --- | ---: |',
    `| Files scanned | ${totals.files} |`,
    `| Files changed | ${totals.changedFiles} |`,
    `| **Auto-converted** | **${totals.autoConvertedPercent}%** |`,
    `| Native class coverage | ${totals.nativeClassCoveragePercent}% |`,
    `| TODOs | ${totals.diagnostics.todo} |`,
    `| Warnings | ${totals.diagnostics.warning} |`,
    `| Notes | ${totals.diagnostics.info} |`,
    `| Classes (supported / web-only / unknown / unsupported) | ${classes.supported} / ${classes['web-only']} / ${classes.unknown} / ${classes.unsupported} |`,
    `| Constructs (converted / flagged) | ${constructs.converted} / ${constructs.flagged} |`,
    '',
    '*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.',
    '*Native class coverage*: class occurrences that resolve on native as well as web.',
    '',
  ]
  if (report.byCode.length) {
    lines.push(
      '## Diagnostics by code',
      '',
      '| Code | Severity | Count |',
      '| --- | --- | ---: |',
    )
    for (const entry of report.byCode) {
      lines.push(`| \`${entry.code}\` | ${entry.severity} | ${entry.count} |`)
    }
    lines.push('')
  }
  for (const file of report.files) {
    if (file.diagnostics.length === 0) continue
    const todos = file.diagnostics.filter((d) => d.severity === 'todo').length
    const warnings = file.diagnostics.filter((d) => d.severity === 'warning').length
    lines.push(
      `## ${file.file}`,
      '',
      `Auto-converted ${file.autoConvertedPercent}% · ${todos} TODO(s) · ${warnings} warning(s)`,
      '',
      '| Line | Severity | Code | Construct | Reason | Suggested fix |',
      '| ---: | --- | --- | --- | --- | --- |',
    )
    for (const d of file.diagnostics) {
      lines.push(
        `| ${d.line} | ${d.severity} | \`${d.code}\` | ${code(d.construct)} | ${escapeCell(d.reason)} | ${escapeCell(d.suggestion ?? '')} |`,
      )
    }
    lines.push('')
  }
  return lines.join('\n')
}
