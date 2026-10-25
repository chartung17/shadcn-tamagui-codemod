import * as unstyled from 'tamagui/unstyled'
import { describe, expect, it } from 'vitest'
import { RADIX_MAPPINGS } from '../src/mappings/radix.js'

describe('Radix mappings', () => {
  for (const mapping of RADIX_MAPPINGS) {
    it(`${mapping.radix} maps to parts that exist in tamagui/unstyled`, () => {
      for (const [radixPart, target] of Object.entries(mapping.parts)) {
        if (target.part === null) continue
        const root = (unstyled as unknown as Record<string, Record<string, unknown>>)[
          target.export ?? mapping.tamagui
        ]
        expect(root, `${radixPart} -> ${target.export ?? mapping.tamagui}`).toBeTruthy()
        if (target.part) {
          expect(
            root?.[target.part],
            `${radixPart} -> ${mapping.tamagui}.${target.part}`,
          ).toBeTruthy()
        }
      }
    })
  }
})
