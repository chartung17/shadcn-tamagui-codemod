import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { buildHtmlElementsData } from './html-elements.ts'

const require = createRequire(import.meta.url)
const root = path.resolve(import.meta.dirname, '..')

function packageVersion(name: string): string {
  const pkg = require.resolve(`${name}/package.json`)
  return (JSON.parse(readFileSync(pkg, 'utf8')) as { version: string }).version
}

const out = path.join(root, 'src/data/html-elements.json')
writeFileSync(
  out,
  `${JSON.stringify(buildHtmlElementsData(packageVersion('@tamagui/dom')), null, 2)}\n`,
)
console.log(`wrote ${path.relative(root, out)}`)
