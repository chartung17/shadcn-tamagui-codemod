import { describe, expect, it } from 'vitest'
import { createOffsetMapper, lineColumnAt } from '../src/positions.js'

describe('lineColumnAt', () => {
  it('is 1-based', () => {
    expect(lineColumnAt('ab\ncd', 0)).toEqual({ line: 1, column: 1 })
    expect(lineColumnAt('ab\ncd', 4)).toEqual({ line: 2, column: 2 })
  })
})

describe('createOffsetMapper', () => {
  it('follows tokens through reformatting', () => {
    const before = "const x = {a:1,\n  b: 'two'}\nfoo( x )"
    const after = 'const x = { a: 1, b: "two" };\nfoo(x);\n'
    const map = createOffsetMapper(before, after)
    expect(after.slice(map(before.indexOf('b:')), map(before.indexOf('b:')) + 2)).toBe(
      'b:',
    )
    expect(after.slice(map(before.indexOf('foo')))).toMatch(/^foo/)
  })

  it('is the identity for unchanged text', () => {
    const map = createOffsetMapper('abc', 'abc')
    expect(map(2)).toBe(2)
  })
})
