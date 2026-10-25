import { Node, SyntaxKind } from 'ts-morph'
import { describe, expect, it } from 'vitest'
import { DiagnosticCollector } from '../src/diagnostics.js'
import { transformSource } from '../src/runner.js'
import type { FilePass } from '../src/types.js'
import { FIXTURE_PRETTIER } from './helpers/fixtures.js'

/** Flags every `select` element and every `legacy()` call. */
const flaggingPass: FilePass = {
  name: 'elements',
  description: 'test pass',
  run(sourceFile) {
    const collector = new DiagnosticCollector('elements')
    sourceFile.forEachDescendant((node) => {
      if (
        (Node.isJsxOpeningElement(node) || Node.isJsxSelfClosingElement(node)) &&
        node.getTagNameNode().getText() === 'select'
      ) {
        collector.todo(node, {
          code: 'test/select',
          construct: 'select',
          reason: 'no native select',
        })
      }
      if (Node.isCallExpression(node) && node.getExpression().getText() === 'legacy') {
        collector.todo(node, {
          code: 'test/legacy',
          construct: 'legacy()',
          reason: 'replace me',
        })
      }
      if (
        node.getKind() === SyntaxKind.JsxAttribute &&
        node.getText().startsWith('title')
      ) {
        collector.warn(node, {
          code: 'test/title',
          construct: 'title',
          reason: 'just a warning',
        })
      }
    })
    return { changed: false, diagnostics: collector.items }
  },
}

const options = { cwd: '/', prettier: FIXTURE_PRETTIER, passes: [flaggingPass] }

const source = `export function A() {
  const v = legacy()
  return (
    <div title="x">
      <select className="w-full" />
      <select>
        <option />
      </select>
    </div>
  )
}
`

describe('TODO placement', () => {
  it('writes TODO comments inside JSX tags and before statements', async () => {
    const result = await transformSource('a.tsx', source, options)
    expect(result.output).toMatchInlineSnapshot(`
      "export function A() {
        // TODO(native): \`legacy()\`: replace me
        const v = legacy()
        return (
          <div title="x">
            <select
              // TODO(native): \`select\`: no native select
              className="w-full"
            />
            <select
            // TODO(native): \`select\`: no native select
            >
              <option />
            </select>
          </div>
        )
      }
      "
    `)
  })

  it('reports positions in the output file', async () => {
    const result = await transformSource('a.tsx', source, options)
    const lines = result.output.split('\n')
    for (const d of result.diagnostics) {
      const line = lines[d.line - 1]!
      const at = line.slice(d.column - 1)
      if (d.code === 'test/select') expect(at.startsWith('<select')).toBe(true)
      if (d.code === 'test/legacy') expect(at.startsWith('legacy()')).toBe(true)
      if (d.code === 'test/title') expect(at.startsWith('title=')).toBe(true)
    }
    expect(result.diagnostics).toHaveLength(4)
  })

  it('does not duplicate TODOs on a second run', async () => {
    const first = await transformSource('a.tsx', source, options)
    const second = await transformSource('a.tsx', first.output, options)
    expect(second.output).toBe(first.output)
    expect(second.changed).toBe(false)
  })
})
