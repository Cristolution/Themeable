// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { ShadowField, parseShadow, serializeShadow, normalizeHex } from '../../src/components/ui/ShadowField'

function mountField(props: { value: string; onChange?: (next: string) => void }) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  let current = props

  function Spy() {
    return <ShadowField {...current} onChange={current.onChange ?? (() => {})} />
  }

  act(() => { root.render(React.createElement(Spy)) })

  const inputs = () => Array.from(container.querySelectorAll('input[type="number"]')) as HTMLInputElement[]
  const colorInput = () => container.querySelector('input[type="color"]') as HTMLInputElement

  return {
    inputs,
    colorInput,
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

describe('parseShadow', () => {
  it('parses "none" into all-null parts', () => {
    expect(parseShadow('none')).toEqual({ x: null, y: null, blur: null, color: '' })
  })

  it('parses a typical 4-part shadow', () => {
    expect(parseShadow('4px 8px 16px rgba(0,0,0,0.25)')).toEqual({
      x: 4, y: 8, blur: 16, color: 'rgba(0,0,0,0.25)'
    })
  })

  it('parses negative offsets', () => {
    const parts = parseShadow('-2px 4px 8px #000000')
    expect(parts.x).toBe(-2)
    expect(parts.y).toBe(4)
    expect(parts.blur).toBe(8)
    expect(parts.color).toBe('#000000')
  })
})

describe('serializeShadow', () => {
  it('produces "none" when all parts are null', () => {
    expect(serializeShadow(null, null, null, '')).toBe('none')
  })

  it('fills missing lengths with 0px and missing color with default', () => {
    expect(serializeShadow(null, 2, null, '#fff')).toBe('0px 2px 0px #fff')
  })

  it('uses default rgba color when none supplied', () => {
    expect(serializeShadow(1, 2, 3, '')).toBe('1px 2px 3px rgba(0,0,0,0.25)')
  })
})

describe('normalizeHex', () => {
  it('expands short hex', () => {
    expect(normalizeHex('#abc')).toBe('#aabbcc')
  })
  it('lowercases full hex', () => {
    expect(normalizeHex('#ABCDEF')).toBe('#abcdef')
  })
  it('extracts rgb from rgba()', () => {
    expect(normalizeHex('rgba(255, 0, 128, 0.5)')).toBe('#ff0080')
  })
  it('returns #000000 on empty input', () => {
    expect(normalizeHex('')).toBe('#000000')
  })
})

describe('ShadowField', () => {
  it('renders 3 number inputs + 1 color input', () => {
    const probe = mountField({ value: '4px 8px 16px rgba(0,0,0,0.25)' })
    expect(probe.inputs()).toHaveLength(3)
    expect(probe.colorInput()).toBeTruthy()
    probe.unmount()
  })

  it('pre-fills the inputs from the value', () => {
    const probe = mountField({ value: '4px 8px 16px rgba(0,0,0,0.25)' })
    expect(probe.inputs()[0].value).toBe('4')
    expect(probe.inputs()[1].value).toBe('8')
    expect(probe.inputs()[2].value).toBe('16')
    probe.unmount()
  })

  it('editing the x input re-serializes the shadow', () => {
    const onChange = vi.fn()
    const probe = mountField({ value: '4px 8px 16px rgba(0,0,0,0.25)', onChange })
    act(() => {
      const i = probe.inputs()[0]
      i.focus()
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
      setter.call(i, '12')
      i.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledWith('12px 8px 16px rgba(0,0,0,0.25)')
    probe.unmount()
  })

  it('ArrowUp on x steps from 4 to 5 and re-serializes', () => {
    const onChange = vi.fn()
    const probe = mountField({ value: '4px 8px 16px rgba(0,0,0,0.25)', onChange })
    act(() => {
      probe.inputs()[0].focus()
      probe.inputs()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }))
    })
    expect(onChange).toHaveBeenCalledWith('5px 8px 16px rgba(0,0,0,0.25)')
    probe.unmount()
  })

  it('changing the color input updates the shadow string', () => {
    const onChange = vi.fn()
    const probe = mountField({ value: '4px 8px 16px rgba(0,0,0,0.25)', onChange })
    act(() => {
      const i = probe.colorInput()
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
      setter.call(i, '#ff0000')
      i.dispatchEvent(new Event('input', { bubbles: true }))
      i.dispatchEvent(new Event('change', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledWith('4px 8px 16px #ff0000')
    probe.unmount()
  })

  it('"none" renders with 0/0/0 defaults and empty color', () => {
    const probe = mountField({ value: 'none' })
    expect(probe.inputs()[0].value).toBe('0')
    expect(probe.inputs()[1].value).toBe('0')
    expect(probe.inputs()[2].value).toBe('0')
    probe.unmount()
  })
})