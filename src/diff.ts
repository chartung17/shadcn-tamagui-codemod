import { createTwoFilesPatch } from 'diff'
import pc from 'picocolors'
import type { FileResult } from './types.js'

export function unifiedDiff(
  result: Pick<FileResult, 'filePath' | 'original' | 'output'>,
): string {
  return createTwoFilesPatch(
    `a/${result.filePath}`,
    `b/${result.filePath}`,
    result.original,
    result.output,
    undefined,
    undefined,
    { context: 3 },
  )
}

export function colorizeDiff(patch: string): string {
  return patch
    .split('\n')
    .map((line) => {
      if (line.startsWith('+++') || line.startsWith('---')) return pc.bold(line)
      if (line.startsWith('+')) return pc.green(line)
      if (line.startsWith('-')) return pc.red(line)
      if (line.startsWith('@@')) return pc.cyan(line)
      return line
    })
    .join('\n')
}
