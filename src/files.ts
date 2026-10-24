import { stat } from 'node:fs/promises'
import path from 'node:path'
import { glob } from 'tinyglobby'

export const SOURCE_EXTENSIONS = ['tsx', 'ts', 'jsx', 'js'] as const

const IGNORE = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/*.d.ts',
]

/**
 * Expand CLI path arguments (files, directories or globs) into a sorted list of
 * source files relative to `cwd`.
 */
export async function expandPaths(
  inputs: readonly string[],
  cwd: string,
): Promise<string[]> {
  const patterns: string[] = []
  for (const input of inputs) {
    const info = await stat(path.resolve(cwd, input)).catch(() => undefined)
    if (info?.isDirectory()) {
      patterns.push(`${toGlobPath(input)}/**/*.{${SOURCE_EXTENSIONS.join(',')}}`)
    } else {
      patterns.push(toGlobPath(input))
    }
  }
  const files = await glob(patterns, { cwd, ignore: IGNORE, onlyFiles: true })
  return files
    .filter((file) => SOURCE_EXTENSIONS.some((ext) => file.endsWith(`.${ext}`)))
    .sort()
}

function toGlobPath(p: string): string {
  return p.split(path.sep).join('/').replace(/\/$/, '')
}
