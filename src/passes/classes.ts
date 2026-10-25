import { collectClassSources } from '../ast/classNames.js'
import { getImportOrigins, TAMAGUI_TAILWIND } from '../ast/imports.js'
import { isInScope } from '../ast/scope.js'
import { DiagnosticCollector } from '../diagnostics.js'
import {
  analyzeClass,
  defaultSupportContext,
  type ClassAnalysis,
} from '../tailwind/support.js'
import { parseClass, splitClasses } from '../tailwind/tokenize.js'
import type { FilePass, Severity } from '../types.js'

const SEVERITY: Record<ClassAnalysis['status'], Severity | undefined> = {
  supported: undefined,
  'web-only': 'warning',
  unknown: 'warning',
  unsupported: 'todo',
}

const CODE: Record<ClassAnalysis['status'], string> = {
  supported: 'class/caveat',
  'web-only': 'class/web-only',
  unknown: 'class/unknown',
  unsupported: 'class/unsupported',
}

/**
 * Pass 3. Analyzes every static Tailwind class against the support table
 * (`src/data/tailwind-support.json`). Web-only and unknown classes are
 * reported as warnings; classes whose meaning is lost on native (pseudo-element
 * content) and class names assembled at runtime get a TODO. Classes are left
 * as written. Diagnostics for the same string and reason are grouped.
 */
export const classesPass: FilePass = {
  name: 'classes',
  description: 'Analyze Tailwind classes for native support',
  run(sourceFile, context) {
    const diagnostics = new DiagnosticCollector('classes')
    if (!isInScope(sourceFile, context)) return { changed: false, diagnostics: [] }

    const origins = getImportOrigins(sourceFile, context)
    const cva = new Set(['cva'])
    const styled = new Set<string>()
    for (const [local, origin] of origins) {
      if (origin.module === 'class-variance-authority' && origin.imported === 'cva')
        cva.add(local)
      if (origin.module === TAMAGUI_TAILWIND && origin.imported === 'styled')
        styled.add(local)
    }

    const support = defaultSupportContext(context.options.themeKeys)
    for (const source of collectClassSources(sourceFile, { cva, styled })) {
      for (const interpolation of source.interpolations) {
        context.metrics.constructs.flagged++
        diagnostics.todo(source.node, {
          code: 'class/interpolated',
          construct: interpolation,
          reason:
            'This class name is assembled at runtime, so neither the codemod nor Tailwind can check it.',
          suggestion:
            'Map each value to a complete class name, e.g. `{ red: "bg-red-500" }[color]`.',
        })
      }

      const groups = new Map<string, { analysis: ClassAnalysis; classes: string[] }>()
      for (const raw of splitClasses(source.text)) {
        const token = parseClass(raw)
        if (!token) {
          context.metrics.classes.unknown++
          diagnostics.warn(source.node, {
            code: 'class/invalid',
            construct: raw,
            reason: 'Not a well-formed class (unbalanced brackets?).',
          })
          continue
        }
        const analysis = analyzeClass(token, support)
        context.metrics.classes[analysis.status]++
        const reason = analysis.status === 'supported' ? analysis.caveat : analysis.reason
        if (!reason && analysis.status === 'supported') continue
        const key = `${analysis.status}\0${reason}\0${analysis.suggestion ?? ''}`
        const group = groups.get(key)
        if (group) group.classes.push(raw)
        else groups.set(key, { analysis, classes: [raw] })
      }

      for (const { analysis, classes } of groups.values()) {
        const severity = SEVERITY[analysis.status] ?? 'warning'
        const reason =
          (analysis.status === 'supported' ? analysis.caveat : analysis.reason) ?? ''
        diagnostics.add(source.node, {
          severity,
          code: CODE[analysis.status],
          construct: classes.join(' '),
          reason,
          ...(analysis.suggestion ? { suggestion: analysis.suggestion } : {}),
        })
      }
    }
    return { changed: false, diagnostics: diagnostics.items }
  },
}
