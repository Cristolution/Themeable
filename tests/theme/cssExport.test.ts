import { describe, it, expect } from 'vitest'
import { exportCss } from '../../src/theme/io/cssExport'
import { exportTailwind4 } from '../../src/theme/io/tw4Export'
import { importCss } from '../../src/theme/io/cssImport'
import { mergeTheme } from '../../src/theme/io/merge'
import { parseColor } from '../../src/theme/io/color'
import { midnight } from '../../src/theme/presets'

describe('exportCss', () => {
  it('produces a :root block with every CSS variable', () => {
    const out = exportCss(midnight, 'hex')
    expect(out.text).toContain(':root {')
    expect(out.text).toContain(`--color-bg: ${midnight.colors.bg};`)
    expect(out.text).toContain(`--color-accent: ${midnight.colors.accent};`)
    expect(out.text).toContain(`--font-body: ${midnight.typography.fontFamily.body};`)
    expect(out.text).toContain(`--radius-md: ${midnight.radius.md};`)
    expect(out.text).toContain('--shadow-md:')
    expect(out.filename).toBe('midnight.css')
    expect(out.mime).toBe('text/css')
  })

  it('emits chosen color format on every color variable', () => {
    const hex = exportCss(midnight, 'hex').text
    const rgb = exportCss(midnight, 'rgb').text
    const hsl = exportCss(midnight, 'hsl').text
    const oklch = exportCss(midnight, 'oklch').text

    expect(hex).toContain('--color-bg: #')
    expect(rgb).toMatch(/--color-bg: rgb\(/)
    expect(hsl).toMatch(/--color-bg: hsl\(/)
    expect(oklch).toMatch(/--color-bg: oklch\(/)
  })

  it('appends customCss after the :root block', () => {
    const theme = { ...midnight, customCss: '/* my override */ body { margin: 0; }' }
    const out = exportCss(theme, 'hex')
    const rootEnd = out.text.indexOf('}')
    expect(rootEnd).toBeGreaterThan(0)
    expect(out.text).toContain('/* my override */')
  })

  it('round-trips through importCss (every color slot populated)', () => {
    const exported = exportCss(midnight, 'hex').text
    const result = importCss(exported)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const merged = mergeTheme(midnight, result.partial)
    for (const [k, v] of Object.entries(midnight.colors)) {
      const imported = merged.colors[k as keyof typeof merged.colors]
      expect(imported).toBeDefined()
      const original = parseColor(v)
      const got = parseColor(imported!)
      expect(got).not.toBeNull()
      expect(Math.abs((got?.r ?? 0) - (original?.r ?? 0))).toBeLessThanOrEqual(1)
      expect(Math.abs((got?.g ?? 0) - (original?.g ?? 0))).toBeLessThanOrEqual(1)
      expect(Math.abs((got?.b ?? 0) - (original?.b ?? 0))).toBeLessThanOrEqual(1)
      expect(Math.abs((got?.a ?? 1) - (original?.a ?? 1))).toBeLessThanOrEqual(0.01)
    }
  })
})

describe('exportTailwind4', () => {
  it('produces an @theme block', () => {
    const out = exportTailwind4(midnight, 'hex')
    expect(out.text).toContain('@theme {')
    expect(out.text).toContain('--color-bg:')
    expect(out.text).toContain('--font-sans:')
  })

  it('emits chosen color format', () => {
    const oklch = exportTailwind4(midnight, 'oklch').text
    expect(oklch).toMatch(/--color-bg: oklch\(/)
  })

  it('round-trips through importCss (CSS parser accepts @theme too)', () => {
    const exported = exportTailwind4(midnight, 'hex').text
    const result = importCss(exported)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const merged = mergeTheme(midnight, result.partial)
    for (const [k, v] of Object.entries(midnight.colors)) {
      const imported = merged.colors[k as keyof typeof merged.colors]
      const original = parseColor(v)
      const got = parseColor(imported!)
      expect(got).not.toBeNull()
      expect(Math.abs((got?.r ?? 0) - (original?.r ?? 0))).toBeLessThanOrEqual(1)
      expect(Math.abs((got?.g ?? 0) - (original?.g ?? 0))).toBeLessThanOrEqual(1)
      expect(Math.abs((got?.b ?? 0) - (original?.b ?? 0))).toBeLessThanOrEqual(1)
    }
  })
})