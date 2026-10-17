import { describe, it, expect } from 'vitest'
import { buildThemePrompt, extractThemeJson } from '../../src/theme/aiPrompt'
import { detectAndParse } from '../../src/theme/io'
import { midnight } from '../../src/theme/presets'

describe('buildThemePrompt', () => {
  it('includes the user description', () => {
    expect(buildThemePrompt('  neon jungle at dusk ')).toContain('neon jungle at dusk')
  })

  it('falls back to a placeholder when the description is empty', () => {
    expect(buildThemePrompt('')).toContain('[describe the look you want here]')
  })

  it('embeds a reference theme that imports cleanly', () => {
    const prompt = buildThemePrompt('anything')
    const result = detectAndParse(extractThemeJson(prompt.split('## Reference')[1]), 'ai-theme.json')
    expect(result.ok).toBe(true)
  })

  it('names every color slot via the reference', () => {
    const prompt = buildThemePrompt('x')
    for (const key of Object.keys(midnight.colors)) expect(prompt).toContain(`"${key}"`)
  })
})

describe('extractThemeJson', () => {
  const json = '{"name":"X"}'

  it('returns a bare object unchanged', () => {
    expect(extractThemeJson(json)).toBe(json)
  })

  it('unwraps a fenced json block surrounded by prose', () => {
    expect(extractThemeJson(`Here you go!\n\`\`\`json\n${json}\n\`\`\`\nEnjoy.`)).toBe(json)
  })

  it('pulls an unfenced object out of prose', () => {
    expect(extractThemeJson(`Sure: ${json} hope that helps`)).toBe(json)
  })
})
