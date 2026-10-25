// Resolve Tailwind classes with @tamagui/tailwind's native build and print the
// style props each one produces. Run via test/support-oracle.test.ts.
import { readFileSync } from 'node:fs'
import { defaultConfig } from '@tamagui/config/v6'
import { createTamagui } from '@tamagui/core'
import { parseStaticStyle } from '@tamagui/tailwind'

const { classes, extraThemeKeys, extraMedia } = JSON.parse(
  readFileSync(process.argv[2], 'utf8'),
)

const extend = (theme) => ({
  ...theme,
  ...Object.fromEntries(extraThemeKeys.map((key) => [key, theme[key] ?? '#808080'])),
})
const media = { ...defaultConfig.media }
for (const name of extraMedia) {
  media[name] = name.startsWith('max-') ? { maxWidth: 1535.98 } : { minWidth: 1536 }
}
const config = createTamagui({
  ...defaultConfig,
  media,
  themes: {
    light: extend(defaultConfig.themes.light),
    dark: extend(defaultConfig.themes.dark),
  },
})

const out = {}
for (const c of classes) {
  try {
    out[c] = parseStaticStyle(c, config)
  } catch (error) {
    out[c] = { __error: String(error?.message ?? error) }
  }
}
process.stdout.write(JSON.stringify(out))
