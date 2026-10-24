import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const reactNativeWeb = pathToFileURL(require.resolve('react-native-web')).href

export async function resolve(specifier, context, next) {
  if (specifier === 'react-native') return { url: reactNativeWeb, shortCircuit: true }
  return next(specifier, context)
}
