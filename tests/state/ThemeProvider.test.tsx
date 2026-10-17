// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { ThemeProvider, useThemeContext, useActiveTheme } from '../../src/state/ThemeProvider'
import { useBreakpoint } from '../../src/hooks/useBreakpoint'
import { midnight } from '../../src/theme/presets'
import type { Theme } from '../../src/theme/schema'

const edited: Theme = { ...midnight, name: 'Edited' }

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
    })
  })

  it('keeps one owner so other consumers never flush a stale theme', () => {
    let setTheme: (t: Theme) => void = () => {}
    let seen = ''
    function Consumers() {
      setTheme = useThemeContext().setTheme
      useBreakpoint('sm')
      useBreakpoint('lg')
      seen = useActiveTheme().name
      return null
    }
    const container = document.createElement('div')
    const root = createRoot(container)
    act(() => {
      root.render(React.createElement(ThemeProvider, null, React.createElement(Consumers)))
    })

    act(() => setTheme(edited))
    window.dispatchEvent(new Event('pagehide'))

    expect(seen).toBe('Edited')
    expect(JSON.parse(localStorage.getItem('td:theme')!).name).toBe('Edited')
    act(() => root.unmount())
  })
})
