import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { buildReport, reportToMarkdown } from '../src/report/index.js'
import { transformSource } from '../src/runner.js'
import {
  EXPECTED_DIR,
  FIXTURE_OPTIONS,
  INPUT_DIR,
  REPORTS_DIR,
  listFixtures,
  readFixture,
} from './helpers/fixtures.js'

// `UPDATE_EXPECTED=1 pnpm test` rewrites fixtures/expected from the current
// output. Every regenerated file must be reviewed by hand before committing.
const update = process.env.UPDATE_EXPECTED === '1'

describe('fixtures', () => {
  const fixtures = listFixtures()

  it('has fixtures', () => {
    expect(fixtures.length).toBeGreaterThan(0)
  })

  for (const rel of fixtures) {
    describe(rel, () => {
      it('matches the expected output', async () => {
        const input = readFixture(INPUT_DIR, rel)!
        const result = await transformSource(rel, input, FIXTURE_OPTIONS)
        if (update) {
          mkdirSync(path.dirname(path.join(EXPECTED_DIR, rel)), { recursive: true })
          writeFileSync(path.join(EXPECTED_DIR, rel), result.output)
        }
        const expected = readFixture(EXPECTED_DIR, rel)
        expect(expected, `missing fixtures/expected/${rel}`).toBeDefined()
        expect(result.output).toBe(expected)

        const report = reportToMarkdown(buildReport([result]))
        await expect(report).toMatchFileSnapshot(
          path.join(REPORTS_DIR, rel.replace(/\.[jt]sx?$/, '.md')),
        )
      })

      it('is idempotent', async () => {
        const expected = readFixture(EXPECTED_DIR, rel)
        if (expected === undefined) return
        const second = await transformSource(rel, expected, FIXTURE_OPTIONS)
        expect(second.output).toBe(expected)
        expect(second.changed).toBe(false)
      })
    })
  }
})
