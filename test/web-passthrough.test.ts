/**
 * Checks `isWebPassthrough` (src/tailwind/support.ts, data in the
 * `webPassthrough` section of tailwind-support.json) against Tamagui's own web
 * classifier: a class the codemod rewrites for web must be one Tamagui leaves
 * to Tailwind, and a class it leaves alone must be one Tamagui claims.
 * Checked for every fixture class with a theme color, since those are the
 * ones the rewrite changes.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { defaultConfig } from '@tamagui/config/v6'
import { createTamagui } from '@tamagui/core'
import { createGrammarConfigView } from '@tamagui/style-grammar/runtime'
import { classifyCandidate } from '@tamagui/style-grammar/tooling/candidate'
import { Project } from 'ts-morph'
import { describe, expect, it } from 'vitest'
import { collectClassSources } from '../src/ast/classNames.js'
import support from '../src/data/tailwind-support.json' with { type: 'json' }
import {
  defaultSupportContext,
  expandCustomVariant,
  isWebPassthrough,
  themeColorAsVariable,
} from '../src/tailwind/support.js'
import {
  formatClass,
  parseClass,
  parseVariant,
  splitClasses,
} from '../src/tailwind/tokenize.js'
import { INPUT_DIR, listFixtures } from './helpers/fixtures.js'

function fixtureClasses(): string[] {
  const project = new Project({ useInMemoryFileSystem: true })
  const out = new Set<string>()
  for (const rel of listFixtures()) {
    const file = project.createSourceFile(
      rel,
      readFileSync(path.join(INPUT_DIR, rel), 'utf8'),
    )
    for (const source of collectClassSources(file))
      for (const c of splitClasses(source.text)) out.add(c)
  }
  return [...out].sort()
}

function grammarView() {
  const theme = (base: Record<string, unknown>) => ({
    ...base,
    ...Object.fromEntries(
      support.assumedConfig.extraThemeKeys.map((key) => [key, '#808080']),
    ),
  })
  const config = createTamagui({
    ...defaultConfig,
    themes: {
      light: theme(defaultConfig.themes.light),
      dark: theme(defaultConfig.themes.dark),
    },
  } as never)
  return createGrammarConfigView(config as never)
}

describe('web passthrough prediction', () => {
  const view = grammarView()
  const context = defaultSupportContext()

  it('matches the Tamagui web classifier for themed classes', () => {
    const wrong: string[] = []
    for (const raw of fixtureClasses()) {
      const parsed = parseClass(raw)
      if (!parsed || !themeColorAsVariable(parsed, context)) continue
      // Classify the class as the selectors pass sees it: custom variants expanded.
      const token = {
        ...parsed,
        variants: parsed.variants.map((v) => {
          const expanded = expandCustomVariant(v.raw)
          return expanded ? parseVariant(expanded) : v
        }),
      }
      const predicted = isWebPassthrough(token, context)
      const actual = classifyCandidate(formatClass(token), view).kind === 'passthrough'
      if (predicted !== actual)
        wrong.push(`${raw}: predicted ${predicted}, Tamagui ${actual}`)
    }
    expect(wrong).toEqual([])
  })

  it('leaves the CSS-variable form to Tailwind on web', () => {
    for (const c of [
      'bg-(--primary)',
      'ring-(--ring)/50',
      'data-[state=checked]:bg-(--primary)!',
    ])
      expect(classifyCandidate(c, view).kind, c).toBe('passthrough')
  })
})
