import { describe, it, expect } from 'vitest'
import { exportTailwind3 } from '../../src/theme/io/tw3Export'
import { importTailwind3 } from '../../src/theme/io/tw3Import'
import { midnight } from '../../src/theme/presets'

describe('exportTailwind3', () => {
  it('produces a module.exports with extend.colors', () => {
    const out = exportTailwind3(midnight, 'hex')
    expect(out.text).toContain('module.exports = {')
    expect(out.text).toContain('extend: {')
    expect(out.text).toContain('colors: {')
    expect(out.text).toContain(`'accent': '${midnight.colors.accent}'`)
  })

  it('falls back to hex with a warning when hsl requested', () => {
    const out = exportTailwind3(midnight, 'hsl')
    const hexWarning = out.warnings.find(w => /hex\/rgb/.test(w))
    expect(hexWarning).toBeDefined()
    expect(out.text).toMatch(/'accent': '#/)
  })

  it('falls back to hex with a warning when oklch requested', () => {
    const out = exportTailwind3(midnight, 'oklch')
    const hexWarning = out.warnings.find(w => /hex\/rgb/.test(w))
    expect(hexWarning).toBeDefined()
    expect(out.text).toMatch(/'accent': '#/)
  })

  it('warns about customCss being dropped', () => {
    const theme = { ...midnight, customCss: '/* keep me */' }
    const out = exportTailwind3(theme, 'hex')
    expect(out.warnings.some(w => w.includes('customCss'))).toBe(true)
  })
})

describe('importTailwind3', () => {
  it('parses module.exports with extend.colors', () => {
    const config = `
      /** @type {import('tailwindcss').Config} */
      module.exports = {
        theme: {
          extend: {
            colors: {
              'bg': '#0f1115',
              'accent': '#7c9eff',
              'unrelated-key': '#123456',
            }
          }
        }
      }
    `
    const result = importTailwind3(config)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const colors = result.partial.colors as Record<string, string> | undefined
    expect(colors?.bg).toBe('#0f1115')
    expect(colors?.accent).toBe('#7c9eff')
    expect(colors?.unrelatedKey).toBeUndefined()
    expect(result.warnings.length).toBeGreaterThan(0)
  })

  it('parses top-level colors shorthand', () => {
    const config = `
      module.exports = {
        colors: { 'bg': '#fff' }
      }
    `
    const result = importTailwind3(config)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.partial.colors?.bg).toBe('#fff')
  })

  it('rejects malformed config', () => {
    const result = importTailwind3('this is not a tailwind config')
    expect(result.ok).toBe(false)
  })

  it('round-trips export -> import', () => {
    const exported = exportTailwind3(midnight, 'hex').text
    const result = importTailwind3(exported)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.partial.colors?.accent).toBe(midnight.colors.accent)
    expect(result.partial.colors?.bg).toBe(midnight.colors.bg)
  })
})