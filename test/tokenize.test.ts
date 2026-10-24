import { describe, expect, it } from 'vitest'
import { formatClass, parseClass, splitClasses } from '../src/tailwind/tokenize.js'

describe('parseClass', () => {
  it('parses plain utilities', () => {
    expect(parseClass('flex')).toMatchObject({
      base: 'flex',
      variants: [],
      important: false,
    })
  })

  it('parses stacked variants', () => {
    const t = parseClass('md:hover:bg-primary/90')!
    expect(t.variants.map((v) => v.name)).toEqual(['md', 'hover'])
    expect(t.base).toBe('bg-primary/90')
    expect(t.modifier).toBe('90')
  })

  it('keeps fractions intact', () => {
    expect(parseClass('w-1/2')!.modifier).toBeUndefined()
    expect(parseClass('-translate-x-1/2')).toMatchObject({
      negative: true,
      base: 'translate-x-1/2',
    })
  })

  it('handles arbitrary variants with colons and quotes inside', () => {
    const t = parseClass("[&_svg:not([class*='size-'])]:size-4")!
    expect(t.variants).toHaveLength(1)
    expect(t.variants[0]).toMatchObject({
      arbitrary: true,
      value: "&_svg:not([class*='size-'])",
    })
    expect(t.base).toBe('size-4')
  })

  it('parses named arbitrary variants and labels', () => {
    const data = parseClass('data-[state=open]:animate-in')!.variants[0]!
    expect(data).toMatchObject({ name: 'data', value: 'state=open' })
    const group = parseClass('group-data-[disabled=true]:opacity-50')!.variants[0]!
    expect(group).toMatchObject({ name: 'group-data', value: 'disabled=true' })
    const labelled = parseClass('group-hover/item:flex')!.variants[0]!
    expect(labelled).toMatchObject({ name: 'group-hover', label: 'item' })
    const has = parseClass('has-[>svg]:px-3')!.variants[0]!
    expect(has).toMatchObject({ name: 'has', value: '>svg' })
  })

  it('parses arbitrary values and properties', () => {
    expect(parseClass('ring-[3px]')!.arbitraryValue).toBe('3px')
    expect(parseClass('bg-(--brand)')!.arbitraryValue).toBe('--brand')
    expect(parseClass('rounded-[min(var(--radius-md),10px)]')!.arbitraryValue).toBe(
      'min(var(--radius-md),10px)',
    )
    expect(parseClass('[mask-type:luminance]')).toMatchObject({
      arbitraryProperty: true,
      arbitraryValue: 'mask-type:luminance',
      variants: [],
    })
    expect(parseClass('bg-[url(/a:b.png)]/50')).toMatchObject({ modifier: '50' })
  })

  it('parses important modifiers in both styles', () => {
    expect(parseClass('!p-4')).toMatchObject({
      important: true,
      importantStyle: 'prefix',
      base: 'p-4',
    })
    expect(parseClass('hover:p-4!')).toMatchObject({
      important: true,
      importantStyle: 'suffix',
      base: 'p-4',
    })
  })

  it('rejects unbalanced input', () => {
    expect(parseClass('w-[10px')).toBeUndefined()
    expect(parseClass('hover:')).toBeUndefined()
  })

  it('round-trips through formatClass', () => {
    for (const raw of [
      'md:hover:!-mt-2',
      'dark:aria-invalid:ring-destructive/40',
      'p-4!',
      'data-[a=b]:flex',
    ]) {
      expect(formatClass(parseClass(raw)!)).toBe(raw)
    }
  })
})

describe('splitClasses', () => {
  it('splits on any whitespace', () => {
    expect(splitClasses('  a  b\n c ')).toEqual(['a', 'b', 'c'])
  })
})
