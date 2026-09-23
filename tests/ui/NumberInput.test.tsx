// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { NumberInput } from '../../src/components/ui/NumberInput'

function mountNumberInput(props: {
  value: number
  onChange?: (n: number) => void
  step?: number
  min?: number
  max?: number
}) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  let current = props

  function Spy() {
    // Provide a default noop onChange so the prop type satisfies; tests that
    // care about emissions override it.
    return <NumberInput {...current} onChange={current.onChange ?? (() => {})} aria-label="n" />
  }

  act(() => { root.render(React.createElement(Spy)) })

  const input = () => container.querySelector('input') as HTMLInputElement

  return {
    input,
    setProps(next: Partial<typeof current>) {
      current = { ...current, ...next }
      act(() => { root.render(React.createElement(Spy)) })
    },
    unmount() {
      act(() => { root.unmount() })
      container.remove()
    }
  }
}

describe('NumberInput', () => {
  it('renders the value as text', () => {
    const probe = mountNumberInput({ value: 5 })
    expect(probe.input().value).toBe('5')
    probe.unmount()
  })

  it('renders as type=number with spinner arrows visible', () => {
    const probe = mountNumberInput({ value: 5 })
    expect(probe.input().type).toBe('number')
    expect(probe.input().className).toContain('number-input')
    probe.unmount()
  })

  it('ArrowUp steps the value by step', () => {
    const onChange = vi.fn()
    const probe = mountNumberInput({ value: 10, onChange, step: 1 })
    act(() => {
      probe.input().focus()
      probe.input().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }))
    })
    expect(onChange).toHaveBeenCalledWith(11)
    probe.unmount()
  })

  it('ArrowDown steps the value down by step', () => {
    const onChange = vi.fn()
    const probe = mountNumberInput({ value: 10, onChange, step: 1 })
    act(() => {
      probe.input().focus()
      probe.input().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    })
    expect(onChange).toHaveBeenCalledWith(9)
    probe.unmount()
  })

  it('Shift+ArrowUp multiplies the step by shiftMultiplier (default 10)', () => {
    const onChange = vi.fn()
    const probe = mountNumberInput({ value: 10, onChange, step: 1 })
    act(() => {
      probe.input().focus()
      probe.input().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true, bubbles: true, cancelable: true }))
    })
    expect(onChange).toHaveBeenCalledWith(20)
    probe.unmount()
  })

  it('respects min on step down', () => {
    const onChange = vi.fn()
    const probe = mountNumberInput({ value: 0, onChange, step: 1, min: 0 })
    act(() => {
      probe.input().focus()
      probe.input().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    })
    // Should clamp to 0 — onChange either not called, or called with 0
    if (onChange.mock.calls.length > 0) {
      expect(onChange).toHaveBeenCalledWith(0)
    }
    probe.unmount()
  })

  it('respects max on step up', () => {
    const onChange = vi.fn()
    const probe = mountNumberInput({ value: 3, onChange, step: 0.1, min: 0.5, max: 3 })
    act(() => {
      probe.input().focus()
      probe.input().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }))
    })
    if (onChange.mock.calls.length > 0) {
      expect(onChange).toHaveBeenCalledWith(3)
    }
    probe.unmount()
  })

  it('typing a number fires onChange with the parsed number', () => {
    const onChange = vi.fn()
    const probe = mountNumberInput({ value: 0, onChange })
    act(() => {
      const i = probe.input()
      i.focus()
      // Use native setter so React's onChange observes the change
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
      setter.call(i, '42')
      i.dispatchEvent(new Event('input', { bubbles: true }))
      i.dispatchEvent(new Event('change', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledWith(42)
    probe.unmount()
  })

  it('does not call onChange while text is empty (mid-edit)', () => {
    const onChange = vi.fn()
    const probe = mountNumberInput({ value: 5, onChange })
    act(() => {
      const i = probe.input()
      i.focus()
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
      setter.call(i, '')
      i.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(onChange).not.toHaveBeenCalled()
    probe.unmount()
  })

  it('restores the value when blurred while empty', () => {
    const probe = mountNumberInput({ value: 7 })
    const i = probe.input()
    act(() => {
      i.focus()
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
      setter.call(i, '')
      i.dispatchEvent(new Event('input', { bubbles: true }))
    })
    act(() => { i.blur() })
    expect(probe.input().value).toBe('7')
    probe.unmount()
  })

  it('updates displayed text when parent value changes externally', () => {
    const probe = mountNumberInput({ value: 5 })
    expect(probe.input().value).toBe('5')
    probe.setProps({ value: 99 })
    expect(probe.input().value).toBe('99')
    probe.unmount()
  })
})