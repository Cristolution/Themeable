import { describe, it, expect } from 'vitest'
import { validateTheme } from '../../src/theme/validate'
import type { Theme } from '../../src/theme/schema'

const validTheme: Theme = {
  name: 'Test',
  colors: {
    bg: '#000000', bgElevated: '#111111', bgSubtle: '#222222',
    text: '#ffffff', textMuted: '#cccccc', border: '#333333',
    accent: '#0066ff', accentText: '#ffffff',
    success: '#00cc66', warning: '#ffaa00', danger: '#ff3333',
    bgHover: '#1a1a1a', bgActive: '#2a2a2a', textInverse: '#ffffff',
    borderStrong: '#444444', focusRing: '#0066ff', info: '#00aaff',
    link: '#0066ff', codeBg: '#0a0a0a', overlay: 'rgba(0,0,0,0.5)'
  },
  typography: {
    fontFamily: { body: 'sans-serif', heading: 'sans-serif', mono: 'monospace' },
    fontSize: { xs: '12px', sm: '14px', base: '16px', lg: '20px', xl: '24px', '2xl': '32px' },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.2, normal: 1.5, loose: 1.8 }
  },
  spacing: {
    unit: '4px',
    xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px'
  },
  radius: { none: '0', sm: '4px', md: '8px', lg: '12px', full: '9999px' },
  shadows: {
    none: 'none', sm: '0 1px 2px rgba(0,0,0,0.1)', md: '0 4px 8px rgba(0,0,0,0.15)', lg: '0 8px 24px rgba(0,0,0,0.2)',
    button: '0 1px 2px rgba(0,0,0,0.1)', input: '0 1px 2px rgba(0,0,0,0.05)',
    card: '0 2px 8px rgba(0,0,0,0.1)', focus: '0 0 0 3px rgba(0,102,255,0.4)',
    inner: 'inset 0 1px 2px rgba(0,0,0,0.1)', glow: '0 0 24px rgba(0,102,255,0.5)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '120ms ease', normal: '200ms ease', slow: '400ms ease' },
  breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
  customCss: '',
  direction: 'ltr' as const,
  nightMode: false as const
}

describe('validateTheme', () => {
  it('accepts a fully valid theme', () => {
    const result = validateTheme(validTheme)
    expect(result.ok).toBe(true)
  })

  it('rejects non-object input', () => {
    const result = validateTheme('not a theme')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.length).toBeGreaterThan(0)
    }
  })

  it('rejects theme missing top-level keys', () => {
    const { name, ...rest } = validTheme
    const result = validateTheme(rest)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.some(e => e.includes('name'))).toBe(true)
    }
  })

  it('rejects theme with bad hex color', () => {
    const bad = { ...validTheme, colors: { ...validTheme.colors, bg: 'not-a-color' } }
    const result = validateTheme(bad)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.some(e => e.toLowerCase().includes('color') || e.includes('bg'))).toBe(true)
    }
  })

  it('rejects theme with bad border style', () => {
    const bad = { ...validTheme, borders: { width: '1px', style: 'wiggly' } }
    const result = validateTheme(bad)
    expect(result.ok).toBe(false)
  })

  it('rejects theme with non-numeric font weight', () => {
    const bad = {
      ...validTheme,
      typography: {
        ...validTheme.typography,
        fontWeight: { normal: 'normal', medium: 500, bold: 700 } as unknown as Theme['typography']['fontWeight']
      }
    }
    const result = validateTheme(bad)
    expect(result.ok).toBe(false)
  })

  it('rejects theme with negative line height', () => {
    const bad = {
      ...validTheme,
      typography: {
        ...validTheme.typography,
        lineHeight: { tight: -1, normal: 1.5, loose: 1.8 }
      }
    }
    const result = validateTheme(bad)
    expect(result.ok).toBe(false)
  })

  it('rejects theme missing breakpoints', () => {
    const { breakpoints, ...rest } = validTheme
    const result = validateTheme(rest)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.some(e => e.includes('breakpoints'))).toBe(true)
    }
  })

  it('rejects theme with bad breakpoint value', () => {
    const bad = { ...validTheme, breakpoints: { ...validTheme.breakpoints, sm: '' } }
    const result = validateTheme(bad)
    expect(result.ok).toBe(false)
  })

  it('rejects theme with bad shadow-card', () => {
    const bad = { ...validTheme, shadows: { ...validTheme.shadows, card: '' } }
    const result = validateTheme(bad)
    expect(result.ok).toBe(false)
  })

  it('rejects theme with bad hex color (bgHover)', () => {
    const bad = { ...validTheme, colors: { ...validTheme.colors, bgHover: 'not-hex' } }
    const result = validateTheme(bad)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.some(e => e.toLowerCase().includes('color') || e.includes('bgHover'))).toBe(true)
    }
  })

  it('rejects theme with bad direction', () => {
    const bad = { ...validTheme, direction: 'auto' as unknown as Theme['direction'] }
    const result = validateTheme(bad)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.some(e => e.includes('direction'))).toBe(true)
    }
  })

  it('rejects theme with bad nightMode', () => {
    const bad = { ...validTheme, nightMode: 'yes' as unknown as Theme['nightMode'] }
    const result = validateTheme(bad)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.some(e => e.includes('nightMode'))).toBe(true)
    }
  })

  it('rejects theme with non-numeric font weight', () => {
    // existing test stays
  })
})
