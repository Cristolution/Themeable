import { describe, it, expect } from 'vitest'
import {
  parseColor,
  formatColor,
  rgbaToHex,
  rgbaToRgbCss,
  rgbaToHslCss,
  rgbaToOklchCss,
  rgbaToHsl,
  hslToRgba,
  rgbaToOklch,
  oklchToRgba,
} from '../../src/theme/io/color'

describe('parseColor', () => {
  it('parses 6-digit hex', () => {
    expect(parseColor('#0e1117')).toEqual({ r: 14, g: 17, b: 23, a: 1 })
    expect(parseColor('#ffffff')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(parseColor('#000000')).toEqual({ r: 0, g: 0, b: 0, a: 1 })
  })

  it('parses 8-digit hex with alpha', () => {
    expect(parseColor('#5af78e66')).toEqual({ r: 90, g: 247, b: 142, a: 0x66 / 255 })
    expect(parseColor('#ff0000ff')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
  })

  it('parses 3-digit and 4-digit hex shorthand', () => {
    expect(parseColor('#abc')).toEqual({ r: 0xaa, g: 0xbb, b: 0xcc, a: 1 })
    expect(parseColor('#abcd')).toEqual({ r: 0xaa, g: 0xbb, b: 0xcc, a: 0xdd / 255 })
  })

  it('parses rgb() and rgba()', () => {
    expect(parseColor('rgb(14, 17, 23)')).toEqual({ r: 14, g: 17, b: 23, a: 1 })
    expect(parseColor('rgba(255, 0, 0, 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
  })

  it('parses modern space-separated rgb syntax', () => {
    expect(parseColor('rgb(14 17 23)')).toEqual({ r: 14, g: 17, b: 23, a: 1 })
    expect(parseColor('rgb(255 0 0 / 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 0.5 })
  })

  it('parses hsl() and hsla()', () => {
    const black = parseColor('hsl(0 0% 0%)')
    expect(black).toEqual({ r: 0, g: 0, b: 0, a: 1 })
    const white = parseColor('hsl(0 0% 100%)')
    expect(white).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    const red = parseColor('hsl(0 100% 50%)')
    expect(red?.r).toBe(255)
    expect(red?.g).toBeLessThan(5)
    expect(red?.b).toBeLessThan(5)
  })

  it('parses oklch()', () => {
    const black = parseColor('oklch(0% 0 0)')
    expect(black).toEqual({ r: 0, g: 0, b: 0, a: 1 })
    const white = parseColor('oklch(100% 0 0)')
    expect(white).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  })

  it('returns null on garbage', () => {
    expect(parseColor('not a color')).toBeNull()
    expect(parseColor('blend(#000, #fff)')).toBeNull()
  })
})

describe('hex emission', () => {
  it('omits alpha when fully opaque', () => {
    expect(rgbaToHex({ r: 14, g: 17, b: 23, a: 1 })).toBe('#0e1117')
  })
  it('includes alpha when translucent', () => {
    const out = rgbaToHex({ r: 90, g: 247, b: 142, a: 0x66 / 255 })
    expect(out).toBe('#5af78e66')
  })
})

describe('css emission', () => {
  it('emits rgb() in modern space syntax', () => {
    expect(rgbaToRgbCss({ r: 14, g: 17, b: 23, a: 1 })).toBe('rgb(14 17 23)')
    expect(rgbaToRgbCss({ r: 255, g: 0, b: 0, a: 0.5 })).toBe('rgb(255 0 0 / 0.5)')
  })

  it('emits hsl() with % units', () => {
    expect(rgbaToHslCss({ h: 0, s: 0, l: 0, a: 1 })).toBe('hsl(0 0% 0%)')
    expect(rgbaToHslCss({ h: 200, s: 50, l: 50, a: 0.75 })).toMatch(/^hsl\(200 50% 50% \/ 0\.75\)$/)
  })

  it('emits oklch() with % lightness only', () => {
    expect(rgbaToOklchCss({ l: 50, c: 0.1, h: 200, a: 1 })).toMatch(/^oklch\(50% [\d.]+ 200\)$/)
  })
})

describe('round-trip via formatColor', () => {
  it('hex -> all formats preserve identity within rounding', () => {
    const input = '#0e1117'
    const asRgb = formatColor(input, 'rgb')
    const asHsl = formatColor(input, 'hsl')
    const asOklch = formatColor(input, 'oklch')
    expect(formatColor(asRgb, 'hex')).toBe('#0e1117')
    expect(formatColor(asHsl, 'hex')).toBe('#0e1117')
    expect(formatColor(asOklch, 'hex')).toBe('#0e1117')
  })

  it('preserves alpha through hex -> rgb -> hex', () => {
    const input = '#5af78e66'
    const round1 = formatColor(input, 'rgb')
    const round2 = formatColor(round1, 'hex')
    expect(round2).toBe(input)
  })

  it('handles grey (zero chroma in oklch)', () => {
    expect(formatColor('#808080', 'oklch')).toMatch(/^oklch\([\d.]+% 0 [\d.]+\)$/)
    expect(formatColor('#808080', 'hsl')).toBe('hsl(0 0% 50.2%)')
  })

  it('handles primary red across formats', () => {
    expect(formatColor('#ff0000', 'hsl')).toMatch(/^hsl\(0 100% 50%\)$/)
  })
})

describe('hsl <-> rgb', () => {
  it('round-trips a variety of colors', () => {
    const samples = [
      { r: 0, g: 0, b: 0, a: 1 },
      { r: 255, g: 255, b: 255, a: 1 },
      { r: 255, g: 0, b: 0, a: 1 },
      { r: 14, g: 17, b: 23, a: 1 },
      { r: 90, g: 247, b: 142, a: 0.4 },
    ]
    for (const s of samples) {
      const hsl = rgbaToHsl(s)
      const back = hslToRgba(hsl.h, hsl.s, hsl.l, s.a)
      // Allow ±1 rounding per channel
      expect(Math.abs(back.r - s.r)).toBeLessThanOrEqual(1)
      expect(Math.abs(back.g - s.g)).toBeLessThanOrEqual(1)
      expect(Math.abs(back.b - s.b)).toBeLessThanOrEqual(1)
    }
  })
})

describe('oklch <-> rgb', () => {
  it('round-trips within reasonable tolerance', () => {
    const samples = [
      { r: 0, g: 0, b: 0, a: 1 },
      { r: 255, g: 255, b: 255, a: 1 },
      { r: 255, g: 0, b: 0, a: 1 },
      { r: 14, g: 17, b: 23, a: 1 },
      { r: 90, g: 247, b: 142, a: 0.4 },
      { r: 30, g: 60, b: 200, a: 1 },
    ]
    for (const s of samples) {
      const ok = rgbaToOklch(s)
      const back = oklchToRgba(ok.l, ok.c, ok.h, s.a)
      // oklch is not bit-exact; allow ±2 per channel for non-grey
      expect(Math.abs(back.r - s.r)).toBeLessThanOrEqual(2)
      expect(Math.abs(back.g - s.g)).toBeLessThanOrEqual(2)
      expect(Math.abs(back.b - s.b)).toBeLessThanOrEqual(2)
    }
  })
})