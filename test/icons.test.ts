import { describe, expect, it } from 'vitest'
import { lucideSource } from '../src/passes/icons.js'
import { iconsCommand } from '../src/report/index.js'

describe('icons', () => {
  it('derives the Lucide source name', () => {
    expect(lucideSource('ChevronDownIcon')).toBe('ChevronDown')
    expect(lucideSource('LucideChevronDown')).toBe('ChevronDown')
    expect(lucideSource('X')).toBe('X')
    expect(lucideSource('Icon')).toBe('Icon')
  })

  it('builds the generation command', () => {
    expect(iconsCommand({ XIcon: 'X', Plus: 'Plus' })).toBe(
      'npx @tamagui/cli icons add Plus XIcon=X',
    )
    expect(iconsCommand({})).toBeNull()
  })
})
