import { describe, expect, it } from 'vitest'
import { transformSource } from '../src/runner.js'
import {
  FIXTURE_OPTIONS,
  INPUT_DIR,
  listFixtures,
  readFixture,
} from './helpers/fixtures.js'

describe('safety', () => {
  const safety = listFixtures().filter((rel) => rel.startsWith('safety/'))

  it('has safety fixtures', () => {
    expect(safety.length).toBeGreaterThan(0)
  })

  for (const rel of safety) {
    it(`leaves ${rel} byte-for-byte untouched`, async () => {
      const input = readFixture(INPUT_DIR, rel)!
      const result = await transformSource(rel, input, FIXTURE_OPTIONS)
      expect(result.changed).toBe(false)
      expect(result.output).toBe(input)
      expect(result.diagnostics).toEqual([])
    })
  }
})
