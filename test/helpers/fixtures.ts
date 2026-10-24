import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import type { Options as PrettierOptions } from 'prettier'
import type { CodemodOptions } from '../../src/types.js'

export const ROOT = path.resolve(import.meta.dirname, '../..')
export const FIXTURES = path.join(ROOT, 'fixtures')
export const INPUT_DIR = path.join(FIXTURES, 'input')
export const EXPECTED_DIR = path.join(FIXTURES, 'expected')
export const REPORTS_DIR = path.join(FIXTURES, 'reports')

/** Matches the formatting shadcn ships its sources with. */
export const FIXTURE_PRETTIER: PrettierOptions = {
  semi: false,
  singleQuote: false,
  trailingComma: 'es5',
  printWidth: 80,
}

export const FIXTURE_OPTIONS: CodemodOptions = {
  cwd: INPUT_DIR,
  prettier: FIXTURE_PRETTIER,
}

export function listFixtures(dir = INPUT_DIR, prefix = ''): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir).sort()) {
    const full = path.join(dir, name)
    const rel = prefix ? `${prefix}/${name}` : name
    if (statSync(full).isDirectory()) out.push(...listFixtures(full, rel))
    else if (/\.(tsx|ts|jsx|js)$/.test(name)) out.push(rel)
  }
  return out
}

export function readFixture(dir: string, rel: string): string | undefined {
  try {
    return readFileSync(path.join(dir, rel), 'utf8')
  } catch {
    return undefined
  }
}
