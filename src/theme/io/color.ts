// Color format conversion: hex <-> rgb <-> hsl <-> oklch.
//
// All four formats are normalized to a shared { r, g, b, a } record where
// r/g/b are integers in [0,255] and a is a float in [0,1]. From there any
// output format can be emitted.
//
// Algorithms:
//   hex -> rgb: string parse, expand 3/4-digit shorthand to 6/8.
//   rgb -> hsl: standard HSL formula (https://en.wikipedia.org/wiki/HSL_and_HSV)
//   rgb -> oklch: sRGB -> linear sRGB -> Oklab -> cylindrical. Reference
//                 implementation per CSS Color 4 / Björn Ottosson.

export type RGBA = { r: number; g: number; b: number; a: number }
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch'

const HEX_RE = /^#([0-9a-fA-F]{3,8})$/
const RGB_RE = /^rgba?\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/
const HSL_RE = /^hsla?\(\s*([\d.]+)(?:deg)?\s*[, ]\s*([\d.]+)%\s*[, ]\s*([\d.]+)%(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/
const OKLCH_RE = /^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:deg)?(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/

// ---------------------------- parse ----------------------------

export function parseColor(input: string): RGBA | null {
  const s = input.trim()
  // hex
  const hm = s.match(HEX_RE)
  if (hm) return hexToRgba(hm[1])
  // rgb / rgba
  const rm = s.match(RGB_RE)
  if (rm) {
    const a = rm[4] === undefined ? 1 : parseAlpha(rm[4])
    return { r: +rm[1], g: +rm[2], b: +rm[3], a }
  }
  // hsl / hsla
  const hslm = s.match(HSL_RE)
  if (hslm) {
    const a = hslm[4] === undefined ? 1 : parseAlpha(hslm[4])
    return hslToRgba(+hslm[1], +hslm[2], +hslm[3], a)
  }
  // oklch
  const okm = s.match(OKLCH_RE)
  if (okm) {
    const a = okm[4] === undefined ? 1 : parseAlpha(okm[4])
    return oklchToRgba(+okm[1] / 100, +okm[2], +okm[3], a)
  }
  return null
}

function parseAlpha(raw: string): number {
  if (raw.endsWith('%')) return clamp01(+raw.slice(0, -1) / 100)
  return clamp01(+raw)
}

function hexToRgba(hex: string): RGBA {
  let h = hex
  if (h.length === 3 || h.length === 4) {
    h = h.split('').map(c => c + c).join('')
  }
  if (h.length !== 6 && h.length !== 8) throw new Error(`bad hex: ${hex}`)
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
  return { r, g, b, a }
}

// ---------------------------- hex <-> rgba ----------------------------

export function rgbaToHex({ r, g, b, a }: RGBA): string {
  const toHex = (n: number) => clamp255(Math.round(n)).toString(16).padStart(2, '0')
  const base = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  if (a >= 1) return base
  return base + toHex(a * 255)
}

// ---------------------------- rgb -> hsl ----------------------------

export function rgbaToHsl({ r, g, b, a }: RGBA): { h: number; s: number; l: number; a: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  let h = 0, s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break
      case gn: h = (bn - rn) / d + 2; break
      case bn: h = (rn - gn) / d + 4; break
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, l: l * 100, a }
}

export function hslToRgba(h: number, s: number, l: number, a = 1): RGBA {
  const hh = (((h % 360) + 360) % 360) / 360
  const ss = clamp01(s / 100)
  const ll = clamp01(l / 100)

  if (ss === 0) {
    const v = Math.round(ll * 255)
    return { r: v, g: v, b: v, a }
  }

  const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss
  const p = 2 * ll - q
  return {
    r: Math.round(hueToRgb(p, q, hh + 1 / 3) * 255),
    g: Math.round(hueToRgb(p, q, hh) * 255),
    b: Math.round(hueToRgb(p, q, hh - 1 / 3) * 255),
    a,
  }
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

// ---------------------------- rgb <-> oklch ----------------------------
//
// Reference: CSS Color 4 / https://www.w3.org/TR/css-color-4/#color-conversion-code
// Pipeline for rgb -> oklch:
//   1. sRGB-encoded (0..1) -> linear sRGB (gamma decode)
//   2. linear sRGB -> LMS via Oklab's M1 matrix
//   3. LMS (cube-rooted, signed) -> Oklab
//   4. Oklab -> Oklch (cylindrical: L, C, H)

const M1 = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0883024619, 0.2817188376, 0.6299787005],
]

function srgbToLinear(c: number): number {
  const cs = clamp01(c)
  return cs <= 0.04045 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4)
}

function linearToSrgb(c: number): number {
  const cs = Math.max(0, c)
  return cs <= 0.0031308 ? 12.92 * cs : 1.055 * Math.pow(cs, 1 / 2.4) - 0.055
}

function dot(m: number[][], row: number, v: [number, number, number]): number {
  return m[row][0] * v[0] + m[row][1] * v[1] + m[row][2] * v[2]
}

function cbrtSigned(x: number): number {
  return Math.sign(x) * Math.pow(Math.abs(x), 1 / 3)
}

export function rgbaToOklch({ r, g, b, a }: RGBA): { l: number; c: number; h: number; a: number } {
  const rL = srgbToLinear(r / 255)
  const gL = srgbToLinear(g / 255)
  const bL = srgbToLinear(b / 255)
  const lms: [number, number, number] = [
    dot(M1, 0, [rL, gL, bL]),
    dot(M1, 1, [rL, gL, bL]),
    dot(M1, 2, [rL, gL, bL]),
  ]
  const l_ = cbrtSigned(lms[0])
  const m_ = cbrtSigned(lms[1])
  const s_ = cbrtSigned(lms[2])
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const a_ = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
  const C = Math.sqrt(a_ * a_ + b_ * b_)
  let h = Math.atan2(b_, a_) * (180 / Math.PI)
  if (h < 0) h += 360
  // L normalized [0,1]; CSS emitter multiplies by 100 for the % syntax.
  return { l: L, c: C, h, a }
}

export function oklchToRgba(L: number, C: number, h: number, a = 1): RGBA {
  // L is normalized [0,1] — callers (parseColor) convert from the % syntax.
  const Ln = clamp01(L)
  const hr = (h * Math.PI) / 180
  const a_ = Math.cos(hr) * C
  const b_ = Math.sin(hr) * C
  const l_ = Ln + 0.3963377774 * a_ + 0.2158037573 * b_
  const m_ = Ln - 0.1055613458 * a_ - 0.0638541728 * b_
  const s_ = Ln - 0.0894841775 * a_ - 1.2914855480 * b_
  const l3 = l_ * l_ * l_
  const m3 = m_ * m_ * m_
  const s3 = s_ * s_ * s_
  const rL = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  const gL = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  const bL = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3
  return {
    r: Math.round(clamp01(linearToSrgb(rL)) * 255),
    g: Math.round(clamp01(linearToSrgb(gL)) * 255),
    b: Math.round(clamp01(linearToSrgb(bL)) * 255),
    a,
  }
}

// ---------------------------- emit ----------------------------

export function formatColor(input: string, fmt: ColorFormat): string {
  const rgba = parseColor(input)
  if (!rgba) throw new Error(`unparseable color: ${input}`)
  return rgbaToFormat(rgba, fmt)
}

export function rgbaToFormat({ r, g, b, a }: RGBA, fmt: ColorFormat): string {
  switch (fmt) {
    case 'hex':
      return rgbaToHex({ r, g, b, a })
    case 'rgb':
      return rgbaToRgbCss({ r, g, b, a })
    case 'hsl': {
      const hsl = rgbaToHsl({ r, g, b, a })
      return rgbaToHslCss(hsl)
    }
    case 'oklch': {
      const ok = rgbaToOklch({ r, g, b, a })
      return rgbaToOklchCss({ l: ok.l * 100, c: ok.c, h: ok.h, a: ok.a })
    }
  }
}

export function rgbaToRgbCss({ r, g, b, a }: RGBA): string {
  if (a >= 1) return `rgb(${r} ${g} ${b})`
  return `rgb(${r} ${g} ${b} / ${round(a, 3)})`
}

export function rgbaToHslCss({ h, s, l, a }: { h: number; s: number; l: number; a: number }): string {
  const hh = round(h, 1)
  const ss = round(s, 1)
  const ll = round(l, 1)
  if (a >= 1) return `hsl(${hh} ${ss}% ${ll}%)`
  return `hsl(${hh} ${ss}% ${ll}% / ${round(a, 3)})`
}

export function rgbaToOklchCss({ l, c, h, a }: { l: number; c: number; h: number; a: number }): string {
  const Lp = round(l, 3)
  const cp = round(c, 4)
  const hp = round(h, 1)
  if (a >= 1) return `oklch(${Lp}% ${cp} ${hp})`
  return `oklch(${Lp}% ${cp} ${hp} / ${round(a, 3)})`
}

// ---------------------------- helpers ----------------------------

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0
  if (n < 0) return 0
  if (n > 1) return 1
  return n
}

function clamp255(n: number): number {
  if (n < 0) return 0
  if (n > 255) return 255
  return n
}

function round(n: number, decimals: number): number {
  const p = Math.pow(10, decimals)
  return Math.round(n * p) / p
}