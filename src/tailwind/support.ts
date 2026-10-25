import configTokens from '../data/config-tokens.json' with { type: 'json' }
import supportData from '../data/tailwind-support.json' with { type: 'json' }
import type { ClassStatus } from '../types.js'
import type { ClassToken, Variant } from './tokenize.js'

/**
 * - `supported`: claimed by Tamagui and resolved on web and native.
 * - `web-only`: works on web, dropped (or wrong) on native.
 * - `unsupported`: loses content or behavior on native in a way that needs a human.
 * - `unknown`: not a Tailwind utility this table knows (e.g. a custom CSS class);
 *   passes through on web, dropped on native.
 */
export type SupportStatus = ClassStatus

export interface ClassAnalysis {
  token: ClassToken
  status: SupportStatus
  /** What decided the status. */
  via: 'variant' | 'utility' | 'value'
  reason?: string
  suggestion?: string
  /** Extra caveat for a class that is supported but behaves differently. */
  caveat?: string
}

interface RuleEntry {
  status: SupportStatus
  reason?: string
  suggestion?: string
  alias?: string
}

interface PrefixRule extends RuleEntry {
  prefix: string
  values: string[]
  /** Value kinds that parse but are dropped on native. */
  webOnlyKinds?: { kinds: string[]; reason: string; suggestion?: string }
}

interface VariantPrefixRule extends RuleEntry {
  prefix: string
  match?: string
}

export interface SupportContext {
  /** Theme keys usable as colors (`bg-<key>`). */
  themeColors: ReadonlySet<string>
  /** Media query names usable as variants (`md:`). */
  media: ReadonlySet<string>
  /** Theme names usable as variants (`dark:`). */
  themes: ReadonlySet<string>
}

const STATUS_RANK: Record<SupportStatus, number> = {
  supported: 0,
  unknown: 1,
  'web-only': 2,
  unsupported: 3,
}

function normalize(entry: string | RuleEntry): RuleEntry {
  return typeof entry === 'string' ? { status: entry as SupportStatus } : entry
}

const UTILITIES = new Map<string, RuleEntry>(
  Object.entries(supportData.utilities).map(([key, value]) => [
    key,
    normalize(value as string | RuleEntry),
  ]),
)

// Longest prefix first; rules with the same prefix keep their order.
const PREFIX_RULES: PrefixRule[] = (supportData.prefixes as PrefixRule[])
  .map((rule, index) => ({ rule, index }))
  .sort((a, b) => b.rule.prefix.length - a.rule.prefix.length || a.index - b.index)
  .map(({ rule }) => rule)

const VARIANTS = new Map<string, RuleEntry>(
  Object.entries(supportData.variants.exact).map(([key, value]) => [
    key,
    normalize(value as string | RuleEntry),
  ]),
)
const VARIANT_PREFIXES = supportData.variants.prefixes as VariantPrefixRule[]

const KEYWORDS = supportData.valueKeywords
const TOKENS = configTokens.tokens as Record<string, string[]>
const FONT_SIZES = new Set(Object.values(configTokens.fonts).flatMap((f) => f.size))
const FONT_NAMES = new Set(Object.keys(configTokens.fonts))
const PALETTE = new Set(TOKENS.color)
const tokenSets = new Map<string, Set<string>>(
  Object.entries(TOKENS).map(([category, names]) => [category, new Set(names)]),
)

export function defaultSupportContext(): SupportContext {
  const assumed = supportData.assumedConfig
  return {
    themeColors: new Set([...configTokens.themeKeys, ...assumed.extraThemeKeys]),
    media: new Set([...configTokens.media, ...assumed.extraMedia]),
    themes: new Set(assumed.themeNames),
  }
}

const SIZING_PREFIXES = new Set([
  'w',
  'h',
  'size',
  'min-w',
  'max-w',
  'min-h',
  'max-h',
  'basis',
])

function webOnlyArbitrary(value: string): boolean {
  if (value.startsWith('--')) return true // `w-(--x)` is var(--x)
  return supportData.arbitraryValues.webOnlyFunctions.some((fn) => value.includes(fn))
}

type ValueMatch = { ok: true; webOnly?: RuleEntry } | { ok: false }

function matchValue(
  kind: string,
  value: string,
  token: ClassToken,
  prefix: string,
  context: SupportContext,
): ValueMatch {
  const isArbitrary = token.arbitraryValue !== undefined && /^[[(]/.test(value)
  const arbitraryResult = (): ValueMatch =>
    webOnlyArbitrary(token.arbitraryValue!)
      ? {
          ok: true,
          webOnly: {
            status: 'web-only',
            reason: supportData.arbitraryValues.reason,
            suggestion: supportData.arbitraryValues.suggestion,
          },
        }
      : { ok: true }

  switch (kind) {
    case 'any':
      return { ok: true }
    case 'arbitrary':
    case 'arbitrary-size':
    case 'arbitrary-color':
      return isArbitrary ? arbitraryResult() : { ok: false }
    case 'color': {
      if (isArbitrary) return { ok: false }
      const name = value
      if ((KEYWORDS.colorWebOnly as string[]).includes(name)) {
        return {
          ok: true,
          webOnly: {
            status: 'web-only',
            reason: '`currentColor` and `inherit` are not resolved on native.',
            suggestion: 'Use a theme color such as `foreground`.',
          },
        }
      }
      const ok =
        PALETTE.has(name) ||
        context.themeColors.has(name) ||
        (KEYWORDS.color as string[]).includes(name)
      return ok ? { ok: true } : { ok: false }
    }
    case 'fontSize':
      return FONT_SIZES.has(value) && !token.modifier ? { ok: true } : { ok: false }
    case 'fontFamily':
      return (KEYWORDS.fontFamily as string[]).includes(value) || FONT_NAMES.has(value)
        ? { ok: true }
        : { ok: false }
    case 'fontWeight':
    case 'leading':
    case 'tracking':
    case 'align':
    case 'textAlign':
      return (KEYWORDS[kind] as string[]).includes(value) ? { ok: true } : { ok: false }
    case 'sizing': {
      if (
        (KEYWORDS.nativeUnsupportedSizing as string[]).includes(value) &&
        SIZING_PREFIXES.has(prefix)
      ) {
        return {
          ok: true,
          webOnly: {
            status: 'web-only',
            reason:
              '`min-content`/`max-content`/`fit-content` sizing is dropped on native.',
          },
        }
      }
      return (KEYWORDS.sizing as string[]).includes(value) ? { ok: true } : { ok: false }
    }
    case 'fraction':
      return /^\d+\/\d+$/.test(value) ? { ok: true } : { ok: false }
    case 'auto':
    case 'none':
      return value === kind ? { ok: true } : { ok: false }
    case 'integer':
      return /^\d+$/.test(value) ? { ok: true } : { ok: false }
    case 'number':
      return /^\d+(\.\d+)?$/.test(value) ? { ok: true } : { ok: false }
    default: {
      if (kind.startsWith('keyword:')) {
        return kind.slice('keyword:'.length).split(',').includes(value)
          ? { ok: true }
          : { ok: false }
      }
      const set = tokenSets.get(kind)
      if (set) return set.has(value) ? { ok: true } : { ok: false }
      throw new Error(`Unknown value kind in tailwind-support.json: ${kind}`)
    }
  }
}

function analyzeUtility(
  token: ClassToken,
  context: SupportContext,
): Omit<ClassAnalysis, 'token'> {
  if (token.arbitraryProperty) {
    return {
      status: 'web-only',
      via: 'utility',
      reason:
        'Arbitrary CSS properties (`[prop:value]`) pass through to CSS on web and are dropped on native.',
    }
  }
  const exact = UTILITIES.get(token.base)
  if (exact) return { ...exact, via: 'utility' }
  // Strip the modifier for matching: `bg-primary/50` (opacity) or the label of
  // a `group/name` / `@container/name` marker.
  const utility =
    token.modifier !== undefined
      ? token.base.slice(0, token.base.lastIndexOf('/'))
      : token.base
  const exactNoModifier = UTILITIES.get(utility)
  if (exactNoModifier) return { ...exactNoModifier, via: 'utility' }

  let prefixMatched = false
  for (const rule of PREFIX_RULES) {
    if (!utility.startsWith(`${rule.prefix}-`)) continue
    prefixMatched = true
    const value = utility.slice(rule.prefix.length + 1)
    if (rule.webOnlyKinds) {
      const { kinds, ...entry } = rule.webOnlyKinds
      if (kinds.some((kind) => matchValue(kind, value, token, rule.prefix, context).ok)) {
        return { status: 'web-only', via: 'value', ...entry }
      }
    }
    for (const kind of rule.values) {
      const match = matchValue(kind, value, token, rule.prefix, context)
      if (!match.ok) continue
      if (match.webOnly) return { ...match.webOnly, via: 'value' }
      const { status, reason, suggestion } = rule
      return {
        status,
        via: 'utility',
        ...(reason ? { reason } : {}),
        ...(suggestion ? { suggestion } : {}),
      }
    }
  }
  const spacing = /^(.+)-(\d+(?:\.\d+)?)$/.exec(utility)
  if (spacing && (supportData.spacingPrefixes as string[]).includes(spacing[1]!)) {
    // Tailwind v4 accepts any multiple of the spacing unit (`w-38`); Tamagui
    // only knows the configured tokens.
    const rem = Number(spacing[2]) * 0.25
    return {
      status: 'unknown',
      via: 'value',
      reason: `\`${spacing[2]}\` is not a spacing/size token in the generated Tamagui config, so it is not resolved on native.`,
      suggestion: `Use \`${token.negative ? '-' : ''}${spacing[1]}-[${rem}rem]\` or add a \`${spacing[2]}\` token to the config.`,
    }
  }
  return {
    status: 'unknown',
    via: prefixMatched ? 'value' : 'utility',
    reason:
      'Not a Tailwind utility or config token the codemod recognizes (a custom CSS class, or a value missing from the Tamagui config); it passes through on web and is dropped on native.',
  }
}

function analyzeVariant(
  variant: Variant,
  context: SupportContext,
): RuleEntry & { caveat?: string } {
  if (variant.arbitrary) return normalize(supportData.variants.arbitrary as RuleEntry)
  const name = variant.name
  const exact = VARIANTS.get(name)
  if (exact && variant.value === undefined) return exact
  if (variant.value === undefined) {
    if (context.media.has(name)) return { status: 'supported' }
    if (context.themes.has(name)) return { status: 'supported' }
    if (name.startsWith('@') && context.media.has(name.slice(1))) {
      return { status: 'supported', caveat: supportData.variants.containerWarning }
    }
  }
  const full = variant.value === undefined ? name : `${name}-[${variant.value}]`
  for (const rule of VARIANT_PREFIXES) {
    if (!full.startsWith(rule.prefix)) continue
    if (rule.match && !new RegExp(rule.match).test(full)) continue
    return rule
  }
  return {
    status: 'web-only',
    reason: `\`${variant.raw}:\` is not a variant Tamagui resolves (not a configured media query, theme, platform or interaction state), so it only works on web.`,
  }
}

/** Classify one parsed class against the support table. */
export function analyzeClass(
  token: ClassToken,
  context: SupportContext = defaultSupportContext(),
): ClassAnalysis {
  let worst: ClassAnalysis | undefined
  let caveat: string | undefined
  for (const variant of token.variants) {
    const result = analyzeVariant(variant, context)
    if (result.caveat) caveat = result.caveat
    if (result.status === 'supported') continue
    const candidate: ClassAnalysis = {
      token,
      status: result.status,
      via: 'variant',
      ...(result.reason ? { reason: result.reason } : {}),
      ...(result.suggestion ? { suggestion: result.suggestion } : {}),
    }
    if (!worst || STATUS_RANK[candidate.status] > STATUS_RANK[worst.status])
      worst = candidate
  }
  const utility: ClassAnalysis = token.important
    ? { token, via: 'utility', ...(supportData.important as RuleEntry) }
    : { token, ...analyzeUtility(token, context) }
  if (worst && STATUS_RANK[worst.status] >= STATUS_RANK[utility.status]) return worst
  if (caveat && utility.status === 'supported') utility.caveat = caveat
  return utility
}
