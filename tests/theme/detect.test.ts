import { describe, it, expect } from 'vitest'
import { detectAndParse } from '../../src/theme/io/detect'
import { midnight } from '../../src/theme/presets'

describe('detectAndParse', () => {
  it('routes .json filename to JSON importer', () => {
    const r = detectAndParse(JSON.stringify(midnight), 'theme.json')
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.detectedFormat).toBe('json')
  })

  it('routes .css filename to CSS importer', () => {
    const css = `:root { --color-bg: #0f1115; }`
    const r = detectAndParse(css, 'theme.css')
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.detectedFormat).toBe('css')
    expect(r.partial.colors?.bg).toBe('#0f1115')
  })

  it('routes tailwind.config.js filename to tw3 importer', () => {
    const cfg = `module.exports = { theme: { extend: { colors: { bg: '#fff' } } } }`
    const r = detectAndParse(cfg, 'tailwind.config.js')
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.detectedFormat).toBe('tailwind3')
  })

  it('sniffs JSON from content starting with {', () => {
    const r = detectAndParse(JSON.stringify(midnight))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.detectedFormat).toBe('json')
  })

  it('sniffs CSS from content with :root block', () => {
    const r = detectAndParse(`:root { --color-bg: #0f1115; }`)
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.detectedFormat).toBe('css')
  })

  it('sniffs CSS from @theme block', () => {
    const r = detectAndParse(`@theme { --color-bg: #0f1115; }`)
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.detectedFormat).toBe('css')
  })

  it('sniffs tailwind3 from module.exports', () => {
    const r = detectAndParse(`module.exports = { theme: { colors: { bg: '#fff' } } }`)
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.detectedFormat).toBe('tailwind3')
  })

  it('rejects empty input', () => {
    const r = detectAndParse('')
    expect(r.ok).toBe(false)
  })

  it('rejects unrecognizable input', () => {
    const r = detectAndParse('hello world this is nothing')
    expect(r.ok).toBe(false)
  })
})