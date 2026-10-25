/**
 * CSS color values to formats React Native accepts. shadcn v4 themes use
 * `oklch()`, which native cannot parse, so it is converted to hex (or
 * `rgba()` when it has alpha). Values native already supports pass through.
 */

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function linearToSrgb(value: number): number {
  return value <= 0.0031308 ? 12.92 * value : 1.055 * Math.pow(value, 1 / 2.4) - 0.055
}

/** OKLab to sRGB channels in 0..255 (clamped to the sRGB gamut). */
function oklabToRgb(L: number, a: number, b: number): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  return [r, g, bl].map((c) => Math.round(clamp01(linearToSrgb(c)) * 255)) as [
    number,
    number,
    number,
  ]
}

function parseNumber(token: string, percentScale: number): number {
  if (token === 'none') return 0
  if (token.endsWith('%')) return (Number(token.slice(0, -1)) / 100) * percentScale
  return Number(token)
}

function parseAlpha(token: string | undefined): number {
  if (token === undefined) return 1
  return token.endsWith('%') ? Number(token.slice(0, -1)) / 100 : Number(token)
}

function hex(n: number): string {
  return n.toString(16).padStart(2, '0')
}

function format([r, g, b]: [number, number, number], alpha: number): string {
  if (alpha >= 1) return `#${hex(r)}${hex(g)}${hex(b)}`
  return `rgba(${r}, ${g}, ${b}, ${Math.round(alpha * 1000) / 1000})`
}

/** `0.5 0.2 30 / 50%` -> channel tokens and alpha token. */
function splitChannels(inner: string): { channels: string[]; alpha?: string } {
  const [main, alpha] = inner.split('/').map((part) => part.trim())
  return { channels: main!.split(/[\s,]+/).filter(Boolean), alpha }
}

export interface ConvertedColor {
  value: string
  /** Set when the input had to be changed for native. */
  converted: boolean
}

/** Convert a CSS color to a native-friendly string, or `undefined` if it is not a color. */
export function toNativeColor(input: string): ConvertedColor | undefined {
  const value = input.trim()
  let m: RegExpExecArray | null
  if ((m = /^oklch\((.*)\)$/i.exec(value))) {
    const { channels, alpha } = splitChannels(m[1]!)
    if (channels.length !== 3) return undefined
    const L = parseNumber(channels[0]!, 1)
    const C = parseNumber(channels[1]!, 0.4)
    const H = (parseNumber(channels[2]!.replace(/deg$/, ''), 1) * Math.PI) / 180
    return {
      value: format(oklabToRgb(L, C * Math.cos(H), C * Math.sin(H)), parseAlpha(alpha)),
      converted: true,
    }
  }
  if ((m = /^oklab\((.*)\)$/i.exec(value))) {
    const { channels, alpha } = splitChannels(m[1]!)
    if (channels.length !== 3) return undefined
    const [L, a, b] = [
      parseNumber(channels[0]!, 1),
      parseNumber(channels[1]!, 0.4),
      parseNumber(channels[2]!, 0.4),
    ]
    return { value: format(oklabToRgb(L, a, b), parseAlpha(alpha)), converted: true }
  }
  // Tailwind v3-era shadcn themes store bare HSL channels: `0 0% 100%`.
  if (
    (m =
      /^(-?\d+(?:\.\d+)?)(?:deg)?\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%(?:\s*\/\s*([\d.]+%?))?$/.exec(
        value,
      ))
  ) {
    const alpha = parseAlpha(m[4])
    const hsl = `${m[1]}, ${m[2]}%, ${m[3]}%`
    return {
      value: alpha < 1 ? `hsla(${hsl}, ${alpha})` : `hsl(${hsl})`,
      converted: true,
    }
  }
  if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value))
    return { value, converted: false }
  if (/^(rgb|rgba|hsl|hsla|hwb)\(.*\)$/i.test(value)) return { value, converted: false }
  if (/^(transparent|black|white|currentcolor)$/i.test(value))
    return { value, converted: false }
  return undefined
}
