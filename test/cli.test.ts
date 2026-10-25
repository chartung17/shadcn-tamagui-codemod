import { mkdtempSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { CliError, reportPaths, runCli, type CliIO } from '../src/cli.js'

function setup() {
  const dir = mkdtempSync(path.join(tmpdir(), 'stc-cli-'))
  mkdirSync(path.join(dir, 'src'))
  writeFileSync(
    path.join(dir, 'src/a.tsx'),
    'export const A = () => <div style={{}} />\n',
  )
  writeFileSync(path.join(dir, 'src/b.ts'), 'export const b = 1\n')
  writeFileSync(path.join(dir, 'src/c.css'), 'body {}\n')
  const out: string[] = []
  const err: string[] = []
  const io: CliIO = {
    stdout: (t) => out.push(t),
    stderr: (t) => err.push(t),
    cwd: dir,
    color: false,
  }
  return { dir, io, out, err }
}

describe('cli', () => {
  it('prints help', async () => {
    const { io, out } = setup()
    expect(await runCli(['--help'], io)).toBe(0)
    expect(out.join('')).toContain('--dry-run')
  })

  it('requires paths', async () => {
    const { io } = setup()
    await expect(runCli([], io)).rejects.toBeInstanceOf(CliError)
  })

  it('rejects --write with --dry-run', async () => {
    const { io } = setup()
    await expect(runCli(['src', '--write', '--dry-run'], io)).rejects.toThrow(
      /cannot be used together/,
    )
  })

  it('validates --only', async () => {
    const { io } = setup()
    await expect(runCli(['src', '--only', 'elements,nope'], io)).rejects.toThrow(
      /Unknown pass name\(s\): nope/,
    )
  })

  it('scans directories for source files and summarizes', async () => {
    const { io, err } = setup()
    expect(await runCli(['src'], io)).toBe(0)
    expect(err.join('')).toContain('2 file(s) scanned')
  })

  it('accepts globs', async () => {
    const { io, err } = setup()
    expect(await runCli(['src/*.tsx'], io)).toBe(0)
    expect(err.join('')).toContain('1 file(s) scanned')
  })

  it('writes JSON and Markdown reports', async () => {
    const { dir, io } = setup()
    await runCli(['src', '--report', 'out/report.json'], io)
    const json = JSON.parse(readFileSync(path.join(dir, 'out/report.json'), 'utf8'))
    expect(json.totals.files).toBe(2)
    expect(existsSync(path.join(dir, 'out/report.md'))).toBe(true)
  })

  it('derives report paths', () => {
    expect(reportPaths('r')).toEqual({ json: 'r.json', markdown: 'r.md' })
    expect(reportPaths('r.md')).toEqual({ json: 'r.json', markdown: 'r.md' })
  })
})
