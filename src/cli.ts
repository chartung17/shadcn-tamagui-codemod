import { readFileSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import pc from 'picocolors'
import { colorizeDiff, unifiedDiff } from './diff.js'
import { expandPaths } from './files.js'
import { buildReport, reportToMarkdown } from './report/index.js'
import { transformFiles } from './runner.js'
import { ALL_PASS_NAMES, type PassName } from './types.js'

const HELP = `Usage: shadcn-tamagui-codemod <paths/globs...> [options]

Rewrites Tailwind/shadcn React components into Tamagui v3 components.

Options:
  --dry-run            print diffs, write nothing (default)
  --write              apply changes in place
  --report <file>      write a JSON + Markdown report (<file>.json and <file>.md)
  --only <passes>      comma-separated subset of passes to run:
                       ${ALL_PASS_NAMES.join(', ')}
  --theme-css <file>   path to shadcn globals.css for theme generation
  -h, --help           show this help
  -v, --version        show the version
`

export interface CliIO {
  stdout: (text: string) => void
  stderr: (text: string) => void
  cwd: string
  color: boolean
}

export class CliError extends Error {}

function readVersion(): string {
  const pkgPath = new URL('../package.json', import.meta.url)
  return (JSON.parse(readFileSync(pkgPath, 'utf8')) as { version: string }).version
}

function parsePassList(value: string): PassName[] {
  const names = value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const unknown = names.filter((n) => !(ALL_PASS_NAMES as readonly string[]).includes(n))
  if (unknown.length) {
    throw new CliError(
      `Unknown pass name(s): ${unknown.join(', ')}. Valid passes: ${ALL_PASS_NAMES.join(', ')}`,
    )
  }
  return names as PassName[]
}

export function reportPaths(file: string): { json: string; markdown: string } {
  const base = file.replace(/\.(json|md)$/i, '')
  return { json: `${base}.json`, markdown: `${base}.md` }
}

export async function runCli(argv: readonly string[], io: CliIO): Promise<number> {
  const { values, positionals } = parseArgs({
    args: [...argv],
    allowPositionals: true,
    options: {
      'dry-run': { type: 'boolean' },
      write: { type: 'boolean' },
      report: { type: 'string' },
      only: { type: 'string' },
      'theme-css': { type: 'string' },
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
    },
  })

  if (values.help) {
    io.stdout(HELP)
    return 0
  }
  if (values.version) {
    io.stdout(`${readVersion()}\n`)
    return 0
  }
  if (values.write && values['dry-run']) {
    throw new CliError('--write and --dry-run cannot be used together')
  }
  if (positionals.length === 0) {
    throw new CliError(`No paths given.\n\n${HELP}`)
  }

  const only = values.only ? parsePassList(values.only) : undefined
  const write = Boolean(values.write)
  const files = await expandPaths(positionals, io.cwd)
  if (files.length === 0) {
    throw new CliError(`No source files matched: ${positionals.join(' ')}`)
  }

  const results = await transformFiles(files, {
    cwd: io.cwd,
    write,
    only,
    themeCss: values['theme-css'],
    prettier: 'resolve',
  })

  if (!write) {
    for (const result of results) {
      if (!result.changed) continue
      const patch = unifiedDiff(result)
      io.stdout(`${io.color ? colorizeDiff(patch) : patch}\n`)
    }
  }

  const report = buildReport(results)
  if (values.report) {
    const target = reportPaths(path.resolve(io.cwd, values.report))
    await mkdir(path.dirname(target.json), { recursive: true })
    await writeFile(target.json, `${JSON.stringify(report, null, 2)}\n`)
    await writeFile(target.markdown, reportToMarkdown(report))
  }

  const { totals } = report
  const verb = write ? 'changed' : 'would change'
  const summary = `${totals.files} file(s) scanned, ${totals.changedFiles} ${verb}; ${totals.diagnostics.todo} TODO(s), ${totals.diagnostics.warning} warning(s)`
  io.stderr(`${io.color ? pc.bold(summary) : summary}\n`)
  if (!write && totals.changedFiles > 0) {
    io.stderr('Dry run: no files were written. Re-run with --write to apply.\n')
  }
  return 0
}

export function main(): void {
  runCli(process.argv.slice(2), {
    stdout: (t) => process.stdout.write(t),
    stderr: (t) => process.stderr.write(t),
    cwd: process.cwd(),
    color: pc.isColorSupported,
  }).then(
    (code) => {
      process.exitCode = code
    },
    (error: unknown) => {
      const message = error instanceof Error ? error.message : String(error)
      process.stderr.write(`${pc.red('error')}: ${message}\n`)
      process.exitCode = error instanceof CliError ? 2 : 1
    },
  )
}
