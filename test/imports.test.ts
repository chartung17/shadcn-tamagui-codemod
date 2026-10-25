import { Project } from 'ts-morph'
import { describe, expect, it } from 'vitest'
import { ensureNamedImport, removeUnusedImports } from '../src/ast/imports.js'

function file(text: string) {
  return new Project({ useInMemoryFileSystem: true }).createSourceFile('/a.tsx', text)
}

describe('ensureNamedImport', () => {
  it('adds an import after existing imports and after directives', () => {
    const sf = file('"use client"\n\nimport * as React from "react"\nconst x = 1\n')
    expect(ensureNamedImport(sf, '@tamagui/tailwind', 'html')).toBe('html')
    expect(sf.getFullText()).toContain(
      'import * as React from "react"\nimport { html } from "@tamagui/tailwind";',
    )
  })

  it('places the import after directives when there are no imports', () => {
    const sf = file('"use client"\nconst x = 1\n')
    ensureNamedImport(sf, '@tamagui/tailwind', 'html')
    expect(sf.getStatements()[0]!.getText()).toBe('"use client"')
    expect(sf.getStatements()[1]!.getText()).toContain('@tamagui/tailwind')
  })

  it('reuses an existing import', () => {
    const sf = file('import { html as h } from "@tamagui/tailwind"\n')
    expect(ensureNamedImport(sf, '@tamagui/tailwind', 'html')).toBe('h')
  })

  it('merges into an existing declaration from the same module', () => {
    const sf = file('import { html } from "@tamagui/tailwind"\n')
    ensureNamedImport(sf, '@tamagui/tailwind', 'View')
    expect(sf.getImportDeclarations()).toHaveLength(1)
    expect(
      sf
        .getImportDeclarations()[0]!
        .getNamedImports()
        .map((s) => s.getName()),
    ).toEqual(['html', 'View'])
  })

  it('aliases names that are already taken', () => {
    const sf = file('import { View } from "react-native"\nfunction Text() {}\n')
    expect(ensureNamedImport(sf, '@tamagui/tailwind', 'View')).toBe('TwView')
    expect(ensureNamedImport(sf, '@tamagui/tailwind', 'Text')).toBe('TwText')
  })
})

describe('removeUnusedImports', () => {
  it('removes unused specifiers but keeps side-effect imports', () => {
    const sf = file('import "x"\nimport { a, b } from "x"\nconsole.log(a)\n')
    removeUnusedImports(sf, 'x')
    expect(sf.getFullText()).toBe('import "x"\nimport { a } from "x"\nconsole.log(a)\n')
  })

  it('ignores property names that match the import', () => {
    const sf = file('import { a } from "x"\nconst o = { a: 1 }\no.a\n')
    removeUnusedImports(sf, 'x')
    expect(sf.getImportDeclarations()).toHaveLength(0)
  })
})
