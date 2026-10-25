import { readFile } from 'node:fs/promises'
import path from 'node:path'
import * as prettier from 'prettier'
import { generateTamaguiConfig, type ThemeNote } from './generate.js'

export interface ThemeResult {
  /** Path of the CSS file, relative to cwd. */
  source: string
  /** Path of the generated config, relative to cwd. */
  output: string
  code: string
  /** Current content of the output file, if it exists. */
  previous?: string
  themeKeys: string[]
  notes: ThemeNote[]
}

export const DEFAULT_THEME_OUT = 'tamagui.config.ts'

/** Pass 8 (project-level): shadcn `globals.css` to a Tamagui config. */
export async function generateTheme(
  cssPath: string,
  outPath: string,
  cwd: string,
): Promise<ThemeResult> {
  const absoluteCss = path.resolve(cwd, cssPath)
  const absoluteOut = path.resolve(cwd, outPath)
  const source = path.relative(cwd, absoluteCss).split(path.sep).join('/')
  const output = path.relative(cwd, absoluteOut).split(path.sep).join('/')
  const generated = generateTamaguiConfig(await readFile(absoluteCss, 'utf8'), source)
  const config = (await prettier.resolveConfig(absoluteOut)) ?? {}
  const code = await prettier.format(generated.code, { ...config, filepath: absoluteOut })
  const previous = await readFile(absoluteOut, 'utf8').catch(() => undefined)
  return {
    source,
    output,
    code,
    ...(previous !== undefined ? { previous } : {}),
    themeKeys: generated.themeKeys,
    notes: generated.notes,
  }
}
