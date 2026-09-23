// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { Menu, MenuTrigger, MenuPanel, MenuItem, ControlledMenu } from '../../src/components/ui/Menu'

function mount(ui: React.ReactNode) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => { root.render(ui) })
  return {
    container,
    unmount() {
      act(() => { root.unmount() })
      container.remove()
    },
  }
}

describe('Menu', () => {
  it('renders the trigger but not the panel when closed', () => {
    const c = mount(
      <Menu>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPanel><MenuItem value="a">A</MenuItem></MenuPanel>
      </Menu>
    )
    expect(c.container.querySelector('.menu__trigger')).toBeTruthy()
    expect(c.container.querySelector('.menu__panel')).toBeNull()
    c.unmount()
  })

  it('opens the panel when the trigger is clicked', () => {
    const c = mount(
      <Menu>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPanel><MenuItem value="a">A</MenuItem></MenuPanel>
      </Menu>
    )
    act(() => { (c.container.querySelector('.menu__trigger') as HTMLButtonElement).click() })
    expect(c.container.querySelector('.menu__panel')).toBeTruthy()
    c.unmount()
  })

  it('closes the panel when an item is clicked and fires onSelect', () => {
    const onSelect = vi.fn()
    const c = mount(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPanel>
          <MenuItem value="a" onSelect={onSelect}>A</MenuItem>
          <MenuItem value="b" onSelect={onSelect}>B</MenuItem>
        </MenuPanel>
      </Menu>
    )
    const items = c.container.querySelectorAll('.menu__item')
    act(() => { (items[1] as HTMLButtonElement).click() })
    expect(onSelect).toHaveBeenCalledWith('b')
    expect(c.container.querySelector('.menu__panel')).toBeNull()
    c.unmount()
  })

  it('closes when Escape is pressed', () => {
    const c = mount(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPanel><MenuItem value="a">A</MenuItem></MenuPanel>
      </Menu>
    )
    expect(c.container.querySelector('.menu__panel')).toBeTruthy()
    act(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })) })
    expect(c.container.querySelector('.menu__panel')).toBeNull()
    c.unmount()
  })

  it('closes on outside mousedown', () => {
    const c = mount(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPanel><MenuItem value="a">A</MenuItem></MenuPanel>
      </Menu>
    )
    expect(c.container.querySelector('.menu__panel')).toBeTruthy()
    const outside = document.createElement('div')
    document.body.appendChild(outside)
    act(() => { outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })) })
    expect(c.container.querySelector('.menu__panel')).toBeNull()
    outside.remove()
    c.unmount()
  })

  it('marks the active item with the preset-chip--active class', () => {
    const c = mount(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPanel>
          <MenuItem value="a" active={false}>A</MenuItem>
          <MenuItem value="b" active>B</MenuItem>
        </MenuPanel>
      </Menu>
    )
    const items = c.container.querySelectorAll('.menu__item')
    expect(items[0].className).not.toContain('preset-chip--active')
    expect(items[1].className).toContain('preset-chip--active')
    c.unmount()
  })

  it('does not call onSelect when a disabled item is clicked', () => {
    const onSelect = vi.fn()
    const c = mount(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPanel>
          <MenuItem value="a" disabled onSelect={onSelect}>A</MenuItem>
        </MenuPanel>
      </Menu>
    )
    act(() => { (c.container.querySelector('.menu__item') as HTMLButtonElement).click() })
    expect(onSelect).not.toHaveBeenCalled()
    expect(c.container.querySelector('.menu__panel')).toBeTruthy() // still open
    c.unmount()
  })

  it('ArrowDown moves focus to the next item', () => {
    const c = mount(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPanel>
          <MenuItem value="a">A</MenuItem>
          <MenuItem value="b">B</MenuItem>
          <MenuItem value="c">C</MenuItem>
        </MenuPanel>
      </Menu>
    )
    const items = c.container.querySelectorAll<HTMLButtonElement>('.menu__item')
    items[0].focus()
    act(() => {
      items[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    })
    expect(document.activeElement).toBe(items[1])
    c.unmount()
  })

  it('Enter on a focused item fires onSelect', () => {
    const onSelect = vi.fn()
    const c = mount(
      <Menu defaultOpen>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPanel>
          <MenuItem value="x" onSelect={onSelect}>X</MenuItem>
        </MenuPanel>
      </Menu>
    )
    const item = c.container.querySelector<HTMLButtonElement>('.menu__item')!
    item.focus()
    act(() => { item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })) })
    expect(onSelect).toHaveBeenCalledWith('x')
    c.unmount()
  })
})

describe('ControlledMenu', () => {
  it('renders the chosen value and the caret', () => {
    const c = mount(
      <ControlledMenu
        value="b"
        onChange={() => {}}
        options={[
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
          { value: 'c', label: 'Gamma' },
        ]}
      />
    )
    const trigger = c.container.querySelector('.menu__trigger')!
    expect(trigger.textContent).toContain('Beta')
    expect(trigger.textContent).toContain('▾')
    c.unmount()
  })

  it('fires onChange with the picked value and closes', () => {
    const onChange = vi.fn()
    const c = mount(
      <ControlledMenu
        value="a"
        onChange={onChange}
        options={[
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ]}
      />
    )
    act(() => { (c.container.querySelector('.menu__trigger') as HTMLButtonElement).click() })
    act(() => {
      const items = c.container.querySelectorAll<HTMLButtonElement>('.menu__item')
      items[1].click()
    })
    expect(onChange).toHaveBeenCalledWith('b')
    expect(c.container.querySelector('.menu__panel')).toBeNull()
    c.unmount()
  })

  it('respects align="end" by adding menu__panel--end', () => {
    const c = mount(
      <ControlledMenu
        value="a"
        onChange={() => {}}
        align="end"
        options={[{ value: 'a', label: 'Alpha' }]}
      />
    )
    act(() => { (c.container.querySelector('.menu__trigger') as HTMLButtonElement).click() })
    const p = c.container.querySelector('.menu__panel')
    expect(p?.className).toContain('menu__panel--end')
    c.unmount()
  })
})