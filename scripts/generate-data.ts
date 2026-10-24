import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { buildConfigTokensData } from './config-tokens.ts'
import { buildHtmlElementsData } from './html-elements.ts'

const require = createRequire(import.meta.url)
const root = path.resolve(import.meta.dirname, '..')

function packageVersion(name: string): string {
  const pkg = require.resolve(`${name}/package.json`)
  return (JSON.parse(readFileSync(pkg, 'utf8')) as { version: string }).version
}

function write(file: string, data: unknown) {
  const out = path.join(root, 'src/data', file)
  writeFileSync(out, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`wrote ${path.relative(root, out)}`)
}

write('html-elements.json', buildHtmlElementsData(packageVersion('@tamagui/dom')))
write('config-tokens.json', buildConfigTokensData(packageVersion('@tamagui/config')))
