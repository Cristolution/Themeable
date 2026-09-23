// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { useTheme } from '../../src/state/useTheme'
import { midnight } from '../../src/theme/presets'
import type { Theme } from '../../src/theme/schema'

const KEY = 'td:theme'

// A minimal valid theme used for setTheme() calls in tests.
const sample: Theme = {
  ...midnight,
  name: 'Sample Test Theme'
}

function withHook<T>(callback: () => T): { value: T; root: Root; unmount: () => void } {
  const ref: { current: T | undefined } = { current: undefined }
  function Probe() {
    ref.current = callback()
    return null
  }
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => { root.render(React.createElement(Probe)) })
  return {
    get value() { return ref.current as T },
    root,
    unmount: () => {
      act(() => { root.unmount() })
      container.remove()
    }
  }
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('loads the saved theme from localStorage on mount', () => {
    localStorage.setItem(KEY, JSON.stringify(sample))
    const probe = withHook(() => useTheme())
    expect(probe.value.theme.name).toBe('Sample Test Theme')
    probe.unmount()
  })

  it('falls back to default theme when storage is empty', () => {
    const probe = withHook(() => useTheme())
    expect(probe.value.theme.name).toBe(midnight.name)
    probe.unmount()
  })

  it('falls back to default when stored JSON is corrupt and clears it', () => {
    localStorage.setItem(KEY, 'not json')
    const probe = withHook(() => useTheme())
    expect(probe.value.theme.name).toBe(midnight.name)
    expect(localStorage.getItem(KEY)).toBeNull()
    probe.unmount()
  })

  it('auto-saves the theme to localStorage after the debounce delay', () => {
    const probe = withHook(() => useTheme())
    act(() => { probe.value.setTheme(sample) })
    // Before the debounce fires, nothing should be persisted
    expect(localStorage.getItem(KEY)).toBeNull()
    act(() => { vi.advanceTimersByTime(300) })
    const stored = localStorage.getItem(KEY)
    expect(stored).not.toBeNull()
    expect(JSON.parse(stored!).name).toBe('Sample Test Theme')
    probe.unmount()
  })

  it('coalesces rapid changes into a single write', () => {
    const probe = withHook(() => useTheme())
    act(() => {
      probe.value.setTheme({ ...midnight, name: 'A' })
      vi.advanceTimersByTime(100)
      probe.value.setTheme({ ...midnight, name: 'B' })
      vi.advanceTimersByTime(100)
      probe.value.setTheme({ ...midnight, name: 'C' })
    })
    // No write yet — debounce keeps resetting
    expect(localStorage.getItem(KEY)).toBeNull()
    act(() => { vi.advanceTimersByTime(300) })
    const stored = JSON.parse(localStorage.getItem(KEY)!)
    expect(stored.name).toBe('C')
    probe.unmount()
  })

  it('dirty becomes false once auto-save fires', () => {
    const probe = withHook(() => useTheme())
    act(() => { probe.value.setTheme(sample) })
    expect(probe.value.dirty).toBe(true)
    act(() => { vi.advanceTimersByTime(300) })
    expect(probe.value.dirty).toBe(false)
    probe.unmount()
  })

  it('reset() reverts to the last auto-saved state', () => {
    // Pre-seed localStorage with a known "previous" theme
    localStorage.setItem(KEY, JSON.stringify(midnight))
    const probe = withHook(() => useTheme())
    expect(probe.value.theme.name).toBe(midnight.name)
    // User edits — auto-save flushes after debounce
    act(() => { probe.value.setTheme(sample) })
    act(() => { vi.advanceTimersByTime(300) })
    expect(probe.value.theme.name).toBe('Sample Test Theme')
    // Reset reverts to last auto-saved = sample (NOT midnight, since sample was just persisted)
    act(() => { probe.value.reset() })
    expect(probe.value.theme.name).toBe('Sample Test Theme')
    probe.unmount()
  })

  it('reset() reverts to lastSaved when no further edits have been saved', () => {
    // Pre-seed localStorage, mount (lastSaved = midnight), edit (theme = sample), reset BEFORE debounce fires
    localStorage.setItem(KEY, JSON.stringify(midnight))
    const probe = withHook(() => useTheme())
    act(() => { probe.value.setTheme(sample) })
    // Don't advance timers — debounce hasn't fired, so lastSaved is still midnight
    act(() => { probe.value.reset() })
    expect(probe.value.theme.name).toBe(midnight.name)
    probe.unmount()
  })

  it('flushes pending save synchronously on pagehide', () => {
    const probe = withHook(() => useTheme())
    act(() => { probe.value.setTheme(sample) })
    // No time has elapsed — debounce hasn't fired yet
    expect(localStorage.getItem(KEY)).toBeNull()
    // Dispatch the pagehide event the hook listens for
    act(() => {
      window.dispatchEvent(new Event('pagehide'))
    })
    const stored = localStorage.getItem(KEY)
    expect(stored).not.toBeNull()
    expect(JSON.parse(stored!).name).toBe('Sample Test Theme')
    probe.unmount()
  })
})
