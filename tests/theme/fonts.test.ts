// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { ensureThemeFonts, googleFontUrl, parseFontStack, themeGoogleFonts } from '../../src/theme/fonts'
import { midnight, presets } from '../../src/theme/presets'
import type { Theme } from '../../src/theme/schema'

const withFonts = (body: string, heading: string, mono: string): Theme => ({
  ...midnight,
  typography: { ...midnight.typography, fontFamily: { body, heading, mono } },
})

describe('fonts', () => {
  beforeEach(() => {
    document.head.querySelectorAll('link[data-theme-font]').forEach(l => l.remove())
  })

  it('parses quoted and unquoted families', () => {
    expect(parseFontStack(`"Press Start 2P", 'VT323', system-ui, monospace`))
      .toEqual(['Press Start 2P', 'VT323', 'system-ui', 'monospace'])
  })

  it('only picks up known Google Fonts, deduplicated', () => {
    const theme = withFonts('Inter, system-ui', 'Inter, Helvetica', 'Söhne Mono, JetBrains Mono, monospace')
    expect(themeGoogleFonts(theme)).toEqual(['Inter', 'JetBrains Mono'])
  })

  it('omits the weight axis for single-weight families', () => {
    expect(googleFontUrl('VT323')).toBe('https://fonts.googleapis.com/css2?family=VT323&display=swap')
    expect(googleFontUrl('Space Grotesk')).toContain('family=Space+Grotesk:wght@')
  })

  it('injects each family once', () => {
    const theme = withFonts('Inter, sans-serif', 'Fraunces, serif', 'JetBrains Mono, monospace')
    ensureThemeFonts(theme)
    ensureThemeFonts(theme)
    expect(document.head.querySelectorAll('link[data-theme-font]')).toHaveLength(3)
  })

  it('ships no preset with nightMode on (it inverts the whole page)', () => {
    expect(presets.filter(p => p.nightMode).map(p => p.name)).toEqual([])
  })
})
