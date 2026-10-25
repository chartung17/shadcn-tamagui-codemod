import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import htmlElements from '../src/data/html-elements.json' with { type: 'json' }
import { buildHtmlElementsData } from '../scripts/html-elements.ts'

const require = createRequire(import.meta.url)

describe('generated data', () => {
  it('html-elements.json matches the installed @tamagui/dom tables', () => {
    const pkg = JSON.parse(
      readFileSync(require.resolve('@tamagui/dom/package.json'), 'utf8'),
    )
    expect(htmlElements).toEqual(buildHtmlElementsData(pkg.version))
  })
})
