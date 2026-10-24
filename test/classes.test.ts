import { Project } from 'ts-morph'
import { describe, expect, it } from 'vitest'
import { collectClassSources } from '../src/ast/classNames.js'
import { analyzeClass } from '../src/tailwind/support.js'
import { parseClass } from '../src/tailwind/tokenize.js'

const status = (raw: string) => analyzeClass(parseClass(raw)!).status

describe('collectClassSources', () => {
  const file = (text: string) =>
    new Project({ useInMemoryFileSystem: true }).createSourceFile('/a.tsx', text)

  it('follows class-joining syntax but not other strings', () => {
    const sf = file(`
      const x = <div className={cn("a", on && "b", v === "nope" ? "c" : "d", { "e f": on }, fn("nope"), [ "g" ])} />
    `)
    expect(collectClassSources(sf).map((s) => s.text)).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e f',
      'g',
    ])
  })

  it('reads cva bases, variants and compound variants but not defaults', () => {
    const sf = file(`
      const v = cva("base", {
        variants: { size: { sm: "h-8", lg: "h-10" } },
        compoundVariants: [{ size: "sm", class: "px-2" }],
        defaultVariants: { size: "sm" },
      })
    `)
    expect(collectClassSources(sf).map((s) => s.text)).toEqual([
      'base',
      'h-8',
      'h-10',
      'px-2',
    ])
  })

  it('records glued template substitutions', () => {
    const sf = file('const x = <p className={`p-2 text-${c}-500 ${extra}`} />')
    const [source] = collectClassSources(sf)
    expect(source!.interpolations).toEqual(['text-${c}-500'])
  })

  it('treats *ClassName props as class sources', () => {
    const sf = file(
      'const x = <Dialog overlayClassName="bg-black/50" title="not classes" />',
    )
    expect(collectClassSources(sf).map((s) => s.text)).toEqual(['bg-black/50'])
  })
})

describe('analyzeClass', () => {
  it('classifies representative classes', () => {
    expect(status('p-4')).toBe('supported')
    expect(status('bg-primary/90')).toBe('supported')
    expect(status('hover:bg-accent')).toBe('supported')
    expect(status('active:scale-95')).toBe('supported')
    expect(status('dark:bg-input/30')).toBe('supported')
    expect(status('md:flex-row')).toBe('supported')
    expect(status('2xl:p-4')).toBe('supported')
    expect(status('group-hover/item:opacity-100')).toBe('supported')
    expect(status('grid')).toBe('web-only')
    expect(status('data-[state=open]:bg-accent')).toBe('web-only')
    expect(status('[&_svg]:size-4')).toBe('web-only')
    expect(status('rounded-[min(var(--radius),8px)]')).toBe('web-only')
    expect(status('text-current')).toBe('web-only')
    expect(status('p-4!')).toBe('web-only')
    expect(status('after:absolute')).toBe('unsupported')
    expect(status('content-[""]')).toBe('unsupported')
    expect(status('my-custom-class')).toBe('unknown')
  })

  it('suggests an arbitrary value for Tailwind v4 numeric spacing', () => {
    expect(analyzeClass(parseClass('w-38')!)).toMatchObject({
      status: 'unknown',
      suggestion: expect.stringContaining('w-[9.5rem]'),
    })
  })

  it('warns about container query sizes', () => {
    expect(analyzeClass(parseClass('@md:flex-row')!)).toMatchObject({
      status: 'supported',
      caveat: expect.stringContaining('28rem'),
    })
  })
})
