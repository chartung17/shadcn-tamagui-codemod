import { Node, type SourceFile } from 'ts-morph'
import type { DiagnosticDraft, PassName, Severity } from './types.js'

export interface DiagnosticInput {
  severity: Severity
  code: string
  construct: string
  reason: string
  suggestion?: string
}

/** Collects diagnostics for one pass over one file. */
export class DiagnosticCollector {
  readonly items: DiagnosticDraft[] = []

  constructor(private readonly pass: PassName) {}

  add(node: Node | undefined, input: DiagnosticInput): void {
    this.items.push({
      pass: this.pass,
      ...input,
      node,
      pos: node && !node.wasForgotten() ? node.getStart() : 0,
    })
  }

  todo(node: Node, input: Omit<DiagnosticInput, 'severity'>): void {
    this.add(node, { ...input, severity: 'todo' })
  }

  warn(node: Node, input: Omit<DiagnosticInput, 'severity'>): void {
    this.add(node, { ...input, severity: 'warning' })
  }

  info(node: Node, input: Omit<DiagnosticInput, 'severity'>): void {
    this.add(node, { ...input, severity: 'info' })
  }
}

export const TODO_PREFIX = 'TODO(native):'

/** One-line comment text for a TODO diagnostic. */
export function todoText(draft: Pick<DiagnosticDraft, 'construct' | 'reason'>): string {
  const construct = draft.construct.replace(/\s+/g, ' ').trim()
  const reason = draft.reason.replace(/\s+/g, ' ').trim()
  const subject = construct.length > 80 ? `${construct.slice(0, 77)}...` : construct
  return `${TODO_PREFIX} ${subject ? `\`${subject}\`: ` : ''}${reason}`
}

interface AnchoredDraft {
  draft: DiagnosticDraft
  /** Position of the diagnostic in the pre-format text. */
  pos: number
}

interface TodoInsertion {
  pos: number
  /** `jsx`: inside an opening tag after its name; `line`: before a statement. */
  style: 'jsx' | 'line'
  texts: string[]
}

/**
 * Resolve every draft to a position in the current (pre-format) text and insert
 * `// TODO(native): ...` comments for `todo` drafts. Returns the new text and the
 * drafts' positions in it.
 */
export function placeTodos(
  sourceFile: SourceFile,
  drafts: readonly DiagnosticDraft[],
): { text: string; anchored: AnchoredDraft[]; unplaced: DiagnosticDraft[] } {
  const text = sourceFile.getFullText()
  const insertions = new Map<number, TodoInsertion>()
  const anchored: AnchoredDraft[] = []
  const unplaced: DiagnosticDraft[] = []

  for (const draft of drafts) {
    const live = draft.node && !draft.node.wasForgotten() ? draft.node : undefined
    const pos = live ? live.getStart() : Math.min(draft.pos, text.length)
    anchored.push({ draft, pos })
    if (draft.severity !== 'todo') continue
    const target = live && findTodoAnchor(live)
    if (!target) {
      unplaced.push(draft)
      continue
    }
    const comment = todoText(draft)
    if (hasNearbyComment(text, target.pos, comment)) continue
    const existing = insertions.get(target.pos)
    if (existing) {
      if (!existing.texts.includes(comment)) existing.texts.push(comment)
    } else {
      insertions.set(target.pos, { ...target, texts: [comment] })
    }
  }

  // Splice from the end so earlier offsets stay valid, then shift anchors.
  const ordered = [...insertions.values()].sort((a, b) => b.pos - a.pos)
  let out = text
  for (const insertion of ordered) {
    const snippet =
      insertion.style === 'jsx'
        ? `\n${insertion.texts.map((t) => `// ${t}\n`).join('')}`
        : insertion.texts.map((t) => `// ${t}\n`).join('')
    out = out.slice(0, insertion.pos) + snippet + out.slice(insertion.pos)
    for (const a of anchored) {
      if (a.pos >= insertion.pos) a.pos += snippet.length
    }
  }
  return { text: out, anchored, unplaced }
}

function findTodoAnchor(node: Node): { pos: number; style: 'jsx' | 'line' } | undefined {
  let current: Node | undefined = node
  while (current) {
    if (Node.isJsxOpeningElement(current) || Node.isJsxSelfClosingElement(current)) {
      const typeArgs = current.compilerNode.typeArguments
      // After `<Tag` or, with type arguments, after the closing `>` of `<Tag<T>`.
      const end = typeArgs ? typeArgs.end + 1 : current.getTagNameNode().getEnd()
      return { pos: end, style: 'jsx' }
    }
    if (Node.isJsxElement(current)) {
      return findTodoAnchor(current.getOpeningElement())
    }
    if (
      Node.isStatement(current) ||
      Node.isPropertyAssignment(current) ||
      Node.isShorthandPropertyAssignment(current) ||
      Node.isPropertyDeclaration(current) ||
      Node.isMethodDeclaration(current)
    ) {
      // A JSX expression container is not a statement, but statements can live
      // inside arrow functions within JSX, where a line comment is still valid.
      return { pos: current.getStart(), style: 'line' }
    }
    current = current.getParent()
  }
  return undefined
}

/** True when `comment` already sits in the comment block touching `pos`. */
function hasNearbyComment(text: string, pos: number, comment: string): boolean {
  let start = pos
  let end = pos
  // Walk backward over whitespace and whole comment lines.
  for (;;) {
    const before = text.slice(0, start)
    const m = /(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/)\s*$/.exec(before)
    if (!m || m.index === start) break
    start = m.index
  }
  for (;;) {
    const after = text.slice(end)
    const m = /^\s*(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/)/.exec(after)
    if (!m || m[0].length === 0) break
    end += m[0].length
  }
  return text.slice(start, end).includes(comment)
}
