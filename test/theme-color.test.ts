import { describe, expect, it } from 'vitest'
import { toNativeColor } from '../src/theme/color.js'

describe('toNativeColor', () => {
  it('converts oklch to hex', () => {
    expect(toNativeColor('oklch(1 0 0)')).toEqual({ value: '#ffffff', converted: true })
    expect(toNativeColor('oklch(0 0 0)')!.value).toBe('#000000')
    // neutral-950 in Tailwind v4 is oklch(0.145 0 0) ~ #0a0a0a
    expect(toNativeColor('oklch(0.145 0 0)')!.value).toBe('#0a0a0a')
    // red-600 in Tailwind v4: oklch(0.577 0.245 27.325) ~ #e7000b
    expect(toNativeColor('oklch(0.577 0.245 27.325)')!.value).toBe('#e7000b')
  })

  it('keeps alpha as rgba', () => {
    expect(toNativeColor('oklch(1 0 0 / 10%)')!.value).toBe('rgba(255, 255, 255, 0.1)')
  })

  it('accepts percentage lightness', () => {
    expect(toNativeColor('oklch(100% 0 0)')!.value).toBe('#ffffff')
  })

  it('wraps bare HSL channels', () => {
    expect(toNativeColor('0 0% 100%')).toEqual({
      value: 'hsl(0, 0%, 100%)',
      converted: true,
    })
    expect(toNativeColor('222.2 84% 4.9% / 50%')!.value).toBe(
      'hsla(222.2, 84%, 4.9%, 0.5)',
    )
  })

  it('passes native-supported colors through and rejects non-colors', () => {
    expect(toNativeColor('#fff')).toEqual({ value: '#fff', converted: false })
    expect(toNativeColor('rgb(0 0 0 / 0.5)')).toEqual({
      value: 'rgb(0 0 0 / 0.5)',
      converted: false,
    })
    expect(toNativeColor('0.625rem')).toBeUndefined()
    expect(toNativeColor('var(--x)')).toBeUndefined()
  })
})
