// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { CodeEditor } from '../../src/components/editor/CodeEditor'
import { midnight } from '../../src/theme/presets'
import type { Theme } from '../../src/theme/schema'
import type { ExportFormat, ColorFormat } from '../../src/theme/io'

const carnival: Theme = { ...midnight, name: 'Carnival' }

function mountEditor(props: {
  theme: Theme
  onChange: (t: Theme) => void
  exportFormat: ExportFormat
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
    setProps(next: Partial<typeof current>) {
      current = { ...current, ...next }
      act(() => { root.render(React.createElement(Spy)) })
    },
    text: (): string => container.textContent ?? '',
    unmount() {
      act(() => { root.unmount() })
      container.remove()
    }
  }
}

describe('CodeEditor (Editor section)', () => {
  it('renders JSON by default and updates when theme prop changes', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'json',
      colorFormat: 'hex'
    })
    expect(probe.textarea().value).toContain('"name": "Midnight"')
    probe.setProps({ theme: carnival })
    expect(probe.textarea().value).toContain('"name": "Carnival"')
    probe.unmount()
  })

  it('switches to CSS :root representation when exportFormat is css', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'css',
      colorFormat: 'hex'
    })
    expect(probe.textarea().value).toContain(':root {')
    expect(probe.textarea().value).toContain('--color-bg:')
    expect(probe.textarea().value).toContain(midnight.colors.bg)
    probe.unmount()
  })

  it('uses the chosen color format in CSS representation', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'css',
      colorFormat: 'rgb'
    })
    expect(probe.textarea().value).toContain('rgb(')
    expect(probe.textarea().value).not.toMatch(/--color-bg:\s*#/) // not hex
    probe.unmount()
  })

  it('uses the chosen color format with hsl', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'css',
      colorFormat: 'hsl'
    })
    expect(probe.textarea().value).toContain('hsl(')
    probe.unmount()
  })

  it('uses the chosen color format with oklch', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'css',
      colorFormat: 'oklch'
    })
    expect(probe.textarea().value).toContain('oklch(')
    probe.unmount()
  })

  it('switches to Tailwind v4 representation when exportFormat is tailwind4', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'tailwind4',
      colorFormat: 'hex'
    })
    expect(probe.textarea().value).toContain('@theme')
    probe.unmount()
  })

  it('switches to Tailwind v3 representation when exportFormat is tailwind3', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'tailwind3',
      colorFormat: 'hex'
    })
    expect(probe.textarea().value).toContain('module.exports')
    expect(probe.textarea().value).toContain('colors:')
    probe.unmount()
  })

  it('non-JSON representations ARE editable (textarea is enabled)', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'css',
      colorFormat: 'hex'
    })
    expect(probe.textarea().disabled).toBe(false)
    probe.unmount()
  })

  it('JSON representation is editable (textarea is NOT disabled)', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'json',
      colorFormat: 'hex'
    })
    expect(probe.textarea().disabled).toBe(false)
    probe.unmount()
  })

  it('re-renders when colorFormat prop changes (live preview)', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'css',
      colorFormat: 'hex'
    })
    expect(probe.textarea().value).toMatch(/--color-bg:\s*#/)
    probe.setProps({ colorFormat: 'rgb' })
    expect(probe.textarea().value).toMatch(/--color-bg:\s*rgb\(/)
    probe.unmount()
  })

  it('shows a note indicating editable format and active color format', () => {
    const probe = mountEditor({
      theme: midnight,
      onChange: () => {},
      exportFormat: 'css',
      colorFormat: 'hex'
    })
    // Hint mentions the format and the active color format
    const text = probe.text().toLowerCase()
    expect(text).toContain('css')
    expect(text).toContain('hex')
    probe.unmount()
  })
})
