import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { loadTheme, saveTheme, clearStoredTheme } from '../../src/theme/storage'
import type { Theme } from '../../src/theme/schema'

const KEY = 'td:theme'

// A fully-valid theme matching the schema in src/theme/validate.ts.
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
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px' },
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
  direction: 'ltr',
  nightMode: false
}

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  describe('loadTheme', () => {
    it('returns the stored theme when JSON is valid and validates', () => {
      localStorage.setItem(KEY, JSON.stringify(validTheme))
      const result = loadTheme()
      expect(result).not.toBeNull()
      expect(result?.name).toBe('Test')
    })

    it('returns null and clears localStorage when JSON is corrupt', () => {
      localStorage.setItem(KEY, 'this is not json')
      const onCorrupt = vi.fn()
      const result = loadTheme({ onCorrupt })
      expect(result).toBeNull()
      expect(localStorage.getItem(KEY)).toBeNull()
      expect(onCorrupt).toHaveBeenCalledOnce()
    })

    it('returns null and clears localStorage when JSON parses but fails validation', () => {
      localStorage.setItem(KEY, JSON.stringify({ name: 'incomplete' }))
      const onCorrupt = vi.fn()
      const result = loadTheme({ onCorrupt })
      expect(result).toBeNull()
      expect(localStorage.getItem(KEY)).toBeNull()
      expect(onCorrupt).toHaveBeenCalledOnce()
    })

    it('returns null without calling onCorrupt when localStorage is empty', () => {
      const onCorrupt = vi.fn()
      const result = loadTheme({ onCorrupt })
      expect(result).toBeNull()
      expect(onCorrupt).not.toHaveBeenCalled()
      expect(localStorage.getItem(KEY)).toBeNull()
    })

    it('returns null without throwing when localStorage.getItem throws', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('quota exceeded')
      })
      const onCorrupt = vi.fn()
      const result = loadTheme({ onCorrupt })
      expect(result).toBeNull()
      // Should not throw — corruption callback fires after the catch swallows the error
      expect(onCorrupt).toHaveBeenCalledOnce()
    })

    it('does not call onCorrupt when storage has valid data', () => {
      localStorage.setItem(KEY, JSON.stringify(validTheme))
      const onCorrupt = vi.fn()
      const result = loadTheme({ onCorrupt })
      expect(result).not.toBeNull()
      expect(onCorrupt).not.toHaveBeenCalled()
      // Valid data must NOT be cleared
      expect(localStorage.getItem(KEY)).not.toBeNull()
    })
  })

  describe('saveTheme', () => {
    it('writes JSON to localStorage and returns ok', () => {
      const result = saveTheme(validTheme)
      expect(result.ok).toBe(true)
      const stored = localStorage.getItem(KEY)
      expect(stored).not.toBeNull()
      expect(JSON.parse(stored!).name).toBe('Test')
    })

    it('returns ok:false with error string when setItem throws', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('quota exceeded')
      })
      const result = saveTheme(validTheme)
      expect(result.ok).toBe(false)
      if (!result.ok) expect(result.error).toContain('quota exceeded')
    })
  })

  describe('clearStoredTheme', () => {
    it('removes the stored theme', () => {
      localStorage.setItem(KEY, JSON.stringify(validTheme))
      clearStoredTheme()
      expect(localStorage.getItem(KEY)).toBeNull()
    })

    it('does not throw when nothing is stored', () => {
      expect(() => clearStoredTheme()).not.toThrow()
    })
  })
})
