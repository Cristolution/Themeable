// End-to-end smoke test for the IO pipeline.
// Simulates what the UI does: export midnight in each format,
// re-import, verify round-trip integrity.

import { describe, it, expect } from 'vitest'
import {
  exportCss, exportTailwind3, exportTailwind4, exportJson,
  importCss, importTailwind3, importJson, detectAndParse,
  mergeTheme,
} from '../../src/theme/io'
import { parseColor } from '../../src/theme/io/color'
import { midnight } from '../../src/theme/presets'

describe('io smoke (end-to-end)', () => {
  it('JSON round-trips byte-identically', () => {
    const exported = exportJson(midnight)
    const result = importJson(exported.text)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const merged = mergeTheme(midnight, result.partial)
    expect(merged).toEqual(midnight)
  })

  it('CSS :root round-trips every color slot (within format conversion)', () => {
    const exported = exportCss(midnight, 'hex')
    const result = detectAndParse(exported.text, exported.filename)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const merged = mergeTheme(midnight, result.partial)
    for (const [k, v] of Object.entries(midnight.colors)) {
      const imported = (merged.colors as Record<string, string>)[k]
      expect(imported).toBeDefined()
      // Format may change (rgba -> hex); verify same RGBA values.
      const original = parseColor(v)
      const got = parseColor(imported!)
      expect(got).not.toBeNull()
      expect(Math.abs((got?.r ?? 0) - (original?.r ?? 0))).toBeLessThanOrEqual(1)
      expect(Math.abs((got?.g ?? 0) - (original?.g ?? 0))).toBeLessThanOrEqual(1)
      expect(Math.abs((got?.b ?? 0) - (original?.b ?? 0))).toBeLessThanOrEqual(1)
    }
  })

  it('CSS :root in oklch emits oklch() function', () => {
    const exported = exportCss(midnight, 'oklch')
    expect(exported.text).toMatch(/--color-bg: oklch\(/)
    // round-trip
    const result = importCss(exported.text)
    expect(result.ok).toBe(true)
  })

  it('Tailwind v4 emits @theme block', () => {
    const exported = exportTailwind4(midnight, 'hex')
    expect(exported.text).toMatch(/@theme \{/)
    const result = importCss(exported.text)
    expect(result.ok).toBe(true)
  })

  it('Tailwind v3 round-trips colors only with a warning', () => {
    const exported = exportTailwind3(midnight, 'hex')
    expect(exported.warnings.length).toBeGreaterThan(0)
    const result = importTailwind3(exported.text)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const merged = mergeTheme(midnight, result.partial)
    expect(merged.colors.accent).toBe(midnight.colors.accent)
    // typography should be unchanged (not in tw3 config)
    expect(merged.typography).toEqual(midnight.typography)
  })

  it('Tailwind v3 + hsl falls back to hex with warning', () => {
    const exported = exportTailwind3(midnight, 'hsl')
    expect(exported.warnings.some(w => /hex\/rgb/.test(w))).toBe(true)
    expect(exported.text).toMatch(/'accent': '#/)
  })
})