import type { FilePass } from '../types.js'
import { classesPass } from './classes.js'
import { elementsPass } from './elements.js'
import { importsPass } from './imports.js'

/** Per-file passes in run order. Each milestone registers its passes here. */
export const FILE_PASSES: FilePass[] = [importsPass, elementsPass, classesPass]
