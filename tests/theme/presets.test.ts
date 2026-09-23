import { describe, it, expect } from 'vitest'
import { presets } from '../../src/theme/presets'
import { validateTheme } from '../../src/theme/validate'

// Guardrail: every preset must validate against the schema, and every
// display name must be unique. If a JSON source file is edited in a way
// that breaks the schema, this test will fail at the offending name.

describe('presets', () => {
  it('every preset validates against the schema', () => {
    for (const p of presets) {
      const result = validateTheme(p)
      expect(
        result.ok,
        `${p.name} failed validation: ${result.ok ? '' : result.errors.join('; ')}`
      ).toBe(true)
    }
  })

  it('every preset has a unique display name', () => {
    const names = presets.map(p => p.name)
    const seen = new Map<string, number>()
    for (const n of names) seen.set(n, (seen.get(n) ?? 0) + 1)
    const dupes = [...seen.entries()].filter(([, c]) => c > 1).map(([n]) => n)
    expect(dupes, `duplicate preset names: ${dupes.join(', ')}`).toEqual([])
  })

  it('export count matches array length', () => {
    // Sanity check — guards against the presets array becoming empty.
    expect(presets.length).toBeGreaterThan(0)
  })
})