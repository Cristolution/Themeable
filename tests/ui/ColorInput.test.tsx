// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { ColorInput } from '../../src/components/ui/ColorInput'

function mount(value: string, onChange: (v: string) => void) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => { root.render(React.createElement(ColorInput, { value, onChange })) })
  const input = container.querySelector('input')!
  const change = (v: string) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!
    act(() => {
      setter.call(input, v)
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
  }
  return { input, change, unmount: () => act(() => root.unmount()) }
}

describe('ColorInput', () => {
  it('shows translucent values as their opaque base color', () => {
    expect(mount('#7c9cff66', () => {}).input.value).toBe('#7c9cff')
    expect(mount('rgba(0, 0, 0, 0.7)', () => {}).input.value).toBe('#000000')
  })

  it('keeps the original alpha when the color changes', () => {
    const onChange = vi.fn()
    mount('#7c9cff66', onChange).change('#ff0000')
    expect(onChange).toHaveBeenCalledWith('#ff000066')
  })

  it('passes opaque colors through unchanged', () => {
    const onChange = vi.fn()
    mount('#123456', onChange).change('#abcdef')
    expect(onChange).toHaveBeenCalledWith('#abcdef')
  })
})
