// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { CodeEditor } from '../../src/components/editor/CodeEditor'
import { midnight } from '../../src/theme/presets'
import type { Theme } from '../../src/theme/schema'
import type { ColorFormat } from '../../src/theme/io'

function mountEditor(props: {
  theme: Theme
  onChange: (t: Theme) => void
  exportFormat: 'css'
  colorFormat: ColorFormat
}) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  let current = props

  function Spy() {
    return <CodeEditor {...current} />
  }

  act(() => { root.render(React.createElement(Spy)) })

  return {
    textarea: (): HTMLTextAreaElement =>
      container.querySelector('textarea') as HTMLTextAreaElement,
    setText(v: string) {
      const ta = container.querySelector('textarea') as HTMLTextAreaElement
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')!.set!
      setter.call(ta, v)
      ta.dispatchEvent(new Event('input', { bubbles: true }))
    },
    unmount() {
      act(() => { root.unmount() })
      container.remove()
    }
  }
}

describe('CodeEditor CSS mode (editable)', () => {
  it('CSS textarea is enabled (not disabled)', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'css',
      colorFormat: 'hex'
    })
    expect(probe.textarea().disabled).toBe(false)
    probe.unmount()
  })

  it('typing a valid CSS :root change calls onChange with the updated theme', () => {
    const onChange = vi.fn()
    const probe = mountEditor({
      theme: midnight,
      onChange,
      exportFormat: 'css',
      colorFormat: 'hex'
    })
    const newText = ':root {\n  --color-bg: #ff0000;\n}\n'
    act(() => { probe.setText(newText) })
    expect(onChange).toHaveBeenCalled()
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Theme
    expect(lastCall.colors.bg).toBe('#ff0000')
    probe.unmount()
  })

  it('typing invalid CSS does NOT call onChange and shows an error', () => {
    const onChange = vi.fn()
    const probe = mountEditor({
      theme: midnight,
      onChange,
      exportFormat: 'css',
      colorFormat: 'hex'
    })
    const callsBefore = onChange.mock.calls.length
    act(() => { probe.setText('not css at all') })
    // No new onChange should have fired
    expect(onChange.mock.calls.length).toBe(callsBefore)
    // An error banner should be visible
    expect(document.querySelector('.json-editor__error')).not.toBeNull()
    probe.unmount()
  })

  it('when colorFormat is rgb, editing hex value is rejected', () => {
    const onChange = vi.fn()
    const probe = mountEditor({
      theme: midnight,
      onChange,
      exportFormat: 'css',
      colorFormat: 'rgb'
    })
    const callsBefore = onChange.mock.calls.length
    // Hex value under rgb mode should be rejected
    act(() => { probe.setText(':root {\n  --color-bg: #ff0000;\n}\n') })
    expect(onChange.mock.calls.length).toBe(callsBefore)
    probe.unmount()
  })

  it('when colorFormat is rgb, editing rgb value is accepted', () => {
    const onChange = vi.fn()
    const probe = mountEditor({
      theme: midnight,
      onChange,
      exportFormat: 'css',
      colorFormat: 'rgb'
    })
    act(() => { probe.setText(':root {\n  --color-bg: rgb(255 0 0);\n}\n') })
    expect(onChange).toHaveBeenCalled()
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Theme
    // Theme always stores colors as hex; the chosen format is for display only.
    expect(lastCall.colors.bg).toBe('#ff0000')
    probe.unmount()
  })

  it('non-color edits (spacing, radius) flow through to the theme', () => {
    const onChange = vi.fn()
    const probe = mountEditor({
      theme: midnight,
      onChange,
      exportFormat: 'css',
      colorFormat: 'hex'
    })
    act(() => { probe.setText(':root {\n  --radius-md: 99px;\n}\n') })
    expect(onChange).toHaveBeenCalled()
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Theme
    expect(lastCall.radius.md).toBe('99px')
    probe.unmount()
  })
})
