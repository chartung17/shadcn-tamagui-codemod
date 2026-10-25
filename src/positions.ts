import { diffChars } from 'diff'

export interface LineColumn {
  line: number
  column: number
}

/** 1-based line and column of `offset` in `text`. */
export function lineColumnAt(text: string, offset: number): LineColumn {
  let line = 1
  let lastBreak = -1
  const end = Math.min(offset, text.length)
  for (let i = 0; i < end; i++) {
    if (text.charCodeAt(i) === 10) {
      line++
      lastBreak = i
    }
  }
  return { line, column: end - lastBreak }
}

function stripWhitespace(text: string): { chars: string; offsets: number[] } {
  let chars = ''
  const offsets: number[] = []
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!
    if (c === ' ' || c === '\n' || c === '\t' || c === '\r') continue
    chars += c
    offsets.push(i)
  }
  return { chars, offsets }
}

/**
 * Map offsets in `before` to offsets in `after`, where `after` is `before`
 * reformatted. Formatting mostly changes whitespace, plus small edits such as
 * quotes, parentheses and semicolons, so the non-whitespace characters are
 * aligned with a character diff and offsets follow that alignment.
 */
export function createOffsetMapper(
  before: string,
  after: string,
): (offset: number) => number {
  if (before === after) return (offset) => offset
  const a = stripWhitespace(before)
  const b = stripWhitespace(after)
  // stripped index in `a` -> stripped index in `b`
  const map = new Int32Array(a.chars.length + 1)
  let i = 0
  let j = 0
  for (const part of diffChars(a.chars, b.chars)) {
    const n = part.value.length
    if (part.added) {
      j += n
    } else if (part.removed) {
      for (let k = 0; k < n; k++) map[i + k] = j
      i += n
    } else {
      for (let k = 0; k < n; k++) map[i + k] = j + k
      i += n
      j += n
    }
  }
  map[a.chars.length] = b.chars.length

  return (offset) => {
    // first stripped index whose original offset is >= offset
    let lo = 0
    let hi = a.offsets.length
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (a.offsets[mid]! < offset) lo = mid + 1
      else hi = mid
    }
    const target = map[lo]!
    return target < b.offsets.length ? b.offsets[target]! : after.length
  }
}
