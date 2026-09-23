// Integration test: verifies that loadTheme's onCorrupt callback fires when
// storage contains bad data, and that the caller (useTheme / App) reacts by
// logging + restoring the default.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { loadTheme } from '../../src/theme/storage'
import { midnight } from '../../src/theme/presets'

const KEY = 'td:theme'

describe('storage onCorrupt integration', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    localStorage.clear()
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    localStorage.clear()
    consoleWarnSpy.mockRestore()
  })

  it('caller can observe corruption via onCorrupt and warn to console', () => {
    localStorage.setItem(KEY, 'corrupt')

    loadTheme({
      onCorrupt: (reason) => {
        console.warn(`[theme] cleared corrupt stored theme (${reason})`)
      }
    })

    expect(consoleWarnSpy).toHaveBeenCalledOnce()
    expect(consoleWarnSpy.mock.calls[0][0]).toContain('cleared corrupt stored theme')
  })

  it('returning null allows caller to fall back to default', () => {
    localStorage.setItem(KEY, '{"partial":true}')
    const result = loadTheme({ onCorrupt: () => {} })
    const effectiveTheme = result ?? midnight
    expect(effectiveTheme.name).toBe(midnight.name)
  })

  it('onCorrupt does not fire for valid stored data', () => {
    localStorage.setItem(KEY, JSON.stringify(midnight))
    loadTheme({ onCorrupt: () => console.warn('should not fire') })
    expect(consoleWarnSpy).not.toHaveBeenCalled()
  })
})
