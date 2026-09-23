import { describe, it, expect } from 'vitest'
import { mergeTheme, missingSections } from '../../src/theme/io/merge'
import { midnight } from '../../src/theme/presets'

describe('mergeTheme', () => {
  it('preserves all tokens when partial is empty', () => {
    const merged = mergeTheme(midnight, {})
    expect(merged).toEqual(midnight)
  })

  it('overrides only the tokens that partial supplies', () => {
    const merged = mergeTheme(midnight, { colors: { accent: '#ff0000' } })
    expect(merged.colors.accent).toBe('#ff0000')
    expect(merged.colors.bg).toBe(midnight.colors.bg) // unchanged
    expect(merged.typography).toEqual(midnight.typography) // untouched
  })

  it('merges nested objects (typography, breakpoints)', () => {
    const merged = mergeTheme(midnight, {
      typography: { fontFamily: { body: 'Comic Sans, cursive' } },
    })
    expect(merged.typography.fontFamily.body).toBe('Comic Sans, cursive')
    expect(merged.typography.fontFamily.heading).toBe(midnight.typography.fontFamily.heading)
  })

  it('overrides name, direction, nightMode', () => {
    const merged = mergeTheme(midnight, {
      name: 'Renamed',
      direction: 'rtl',
      nightMode: true,
    })
    expect(merged.name).toBe('Renamed')
    expect(merged.direction).toBe('rtl')
    expect(merged.nightMode).toBe(true)
  })
})

describe('missingSections', () => {
  it('lists every section when partial is empty', () => {
    const missing = missingSections({})
    expect(missing).toContain('colors')
    expect(missing).toContain('typography')
    expect(missing).toContain('shadows')
  })

  it('lists only the sections not provided', () => {
    const missing = missingSections({ colors: { bg: '#000' } })
    expect(missing).not.toContain('colors')
    expect(missing).toContain('typography')
  })
})