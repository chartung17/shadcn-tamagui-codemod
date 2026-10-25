import type { FilePass } from '../types.js'
import { classesPass } from './classes.js'
import { cnCvaPass } from './cnCva.js'
import { elementsPass } from './elements.js'
import { iconsPass } from './icons.js'
import { importsPass } from './imports.js'
import { radixPass } from './radix.js'
import { selectorsPass } from './selectors.js'

/** Per-file passes in run order. */
export const FILE_PASSES: FilePass[] = [
  importsPass,
  elementsPass,
  classesPass,
  cnCvaPass,
  selectorsPass,
  radixPass,
  iconsPass,
]
