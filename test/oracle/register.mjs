// Loaded with `node --import`: lets @tamagui's react-native builds run in Node
// by resolving `react-native` to react-native-web.
import { register } from 'node:module'

register('./hooks.mjs', import.meta.url)
