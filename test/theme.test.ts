import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { lengthToPx, parseShadcnCss, resolveVars } from '../src/theme/css.js'
import { generateTamaguiConfig } from '../src/theme/generate.js'
import { FIXTURES } from './helpers/fixtures.js'

describe('parseShadcnCss', () => {
  it('reads :root, .dark and @theme inline blocks', () => {
    const css = parseShadcnCss(`
      @import "tailwindcss";
      @theme inline { --radius-lg: var(--radius); --color-primary: var(--primary); }
      :root { --radius: 0.625rem; --primary: oklch(0.205 0 0); /* comment */ }
      .dark { --primary: oklch(0.922 0 0); }
      @layer base { * { @apply border-border; } }
    `)
    expect(css.light).toEqual({ radius: '0.625rem', primary: 'oklch(0.205 0 0)' })
    expect(css.dark).toEqual({ primary: 'oklch(0.922 0 0)' })
    expect(css.theme).toEqual({
      'radius-lg': 'var(--radius)',
      'color-primary': 'var(--primary)',
    })
  })

  it('resolves variables and lengths', () => {
    expect(resolveVars('calc(var(--radius) * 0.6)', { radius: '0.625rem' })).toBe(
      'calc(0.625rem * 0.6)',
    )
    expect(lengthToPx('calc(0.625rem * 0.6)')).toBe(6)
    expect(lengthToPx('calc(0.625rem + 4px)')).toBe(14)
    expect(lengthToPx('var(--x)')).toBeUndefined()
  })
})

describe('generateTamaguiConfig', () => {
  for (const file of ['next-globals.css', 'vite-index.css']) {
    it(`generates a config from fixtures/theme/${file}`, async () => {
      const css = readFileSync(path.join(FIXTURES, 'theme', file), 'utf8')
      const result = generateTamaguiConfig(css, `theme/${file}`)
      expect(result.themeKeys).toContain('primary')
      expect(result.themeKeys).toContain('sidebar-accent-foreground')
      expect(result.code).toContain("primary: '#171717'")
      await expect(result.code).toMatchFileSnapshot(
        path.join(
          FIXTURES,
          'theme',
          'expected',
          file.replace(/\.css$/, '.tamagui.config.ts'),
        ),
      )
    })
  }
})
