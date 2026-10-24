/**
 * Checks src/data/tailwind-support.json against the real resolver: every class
 * used in the fixtures (plus test/oracle/extra-classes.json) is resolved with
 * @tamagui/tailwind's react-native build, and a class must produce native
 * styles exactly when the table calls it `supported`.
 *
 * Utilities and variants are checked separately: the base utility on its own,
 * and each variant as `<variant>:opacity-50`.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { Project } from 'ts-morph'
import { describe, expect, it } from 'vitest'
import { collectClassSources } from '../src/ast/classNames.js'
import support from '../src/data/tailwind-support.json' with { type: 'json' }
import { analyzeClass } from '../src/tailwind/support.js'
import { formatClass, parseClass, splitClasses } from '../src/tailwind/tokenize.js'
import { INPUT_DIR, ROOT, listFixtures } from './helpers/fixtures.js'

function fixtureClasses(): string[] {
  const project = new Project({ useInMemoryFileSystem: true })
  const out = new Set<string>()
  for (const rel of listFixtures()) {
    const file = project.createSourceFile(
      rel,
      readFileSync(path.join(INPUT_DIR, rel), 'utf8'),
    )
    for (const source of collectClassSources(file)) {
      for (const c of splitClasses(source.text)) out.add(c)
    }
  }
  return [...out]
}

function resolveOnNative(
  classes: readonly string[],
): Record<string, Record<string, unknown>> {
  const dir = mkdtempSync(path.join(tmpdir(), 'stc-oracle-'))
  const input = path.join(dir, 'in.json')
  writeFileSync(
    input,
    JSON.stringify({
      classes,
      extraThemeKeys: support.assumedConfig.extraThemeKeys,
      extraMedia: support.assumedConfig.extraMedia,
    }),
  )
  const out = execFileSync(
    process.execPath,
    [
      '--import',
      path.join(ROOT, 'test/oracle/register.mjs'),
      '--conditions=react-native',
      path.join(ROOT, 'test/oracle/resolve.mjs'),
      input,
    ],
    { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 },
  )
  return JSON.parse(out)
}

const claims = (props: Record<string, unknown> | undefined) =>
  !!props && Object.keys(props).some((key) => key !== 'className' && key !== '__error')

const RING_PREFIX = 'ring-1 ring-offset-1'
// Ring colors, offsets and `ring-inset` only compose onto a ring width, so they
// are resolved next to one and must change its output.
const isRingColor = (base: string) =>
  /^ring-inset$|^ring-offset-|^(ring|inset-ring)-(?!\d|\[)/.test(base)

describe('support table vs @tamagui/tailwind native resolver', () => {
  const extra: string[] = JSON.parse(
    readFileSync(path.join(ROOT, 'test/oracle/extra-classes.json'), 'utf8'),
  )
  const tokens = [...new Set([...fixtureClasses(), ...extra])]
    .map((raw) => parseClass(raw))
    .filter((t): t is NonNullable<typeof t> => !!t)

  const bases = new Map<string, string>()
  const variants = new Map<string, string>()
  for (const token of tokens) {
    const base = formatClass({ ...token, variants: [] })
    bases.set(base, isRingColor(token.base) ? `${RING_PREFIX} ${base}` : base)
    for (const variant of token.variants)
      variants.set(variant.raw, `${variant.raw}:opacity-50`)
  }
  const resolved = resolveOnNative([RING_PREFIX, ...bases.values(), ...variants.values()])

  it('checks a meaningful number of classes', () => {
    expect(bases.size).toBeGreaterThan(300)
    expect(variants.size).toBeGreaterThan(80)
  })

  it('agrees on utilities', () => {
    const mismatches: string[] = []
    for (const [base, query] of bases) {
      const analysis = analyzeClass(parseClass(base)!)
      // Native accepts these strings but cannot evaluate var()/min()/... there.
      if (analysis.via === 'value' && analysis.reason === support.arbitraryValues.reason)
        continue
      const props = resolved[query]
      const nativeClaims = query.startsWith(RING_PREFIX)
        ? JSON.stringify(props) !== JSON.stringify(resolved[RING_PREFIX])
        : claims(props)
      if (nativeClaims !== (analysis.status === 'supported')) {
        mismatches.push(
          `${base}: table=${analysis.status} native=${JSON.stringify(props)}`,
        )
      }
    }
    expect(mismatches).toEqual([])
  })

  it('agrees on variants', () => {
    const mismatches: string[] = []
    for (const [variant, query] of variants) {
      const analysis = analyzeClass(parseClass(query)!)
      const props = resolved[query]
      if (claims(props) !== (analysis.status === 'supported')) {
        mismatches.push(
          `${variant}: table=${analysis.status} native=${JSON.stringify(props)}`,
        )
      }
    }
    expect(mismatches).toEqual([])
  })
})
