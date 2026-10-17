import type { Theme } from './schema'
import { GOOGLE_FONTS } from './fonts'
import { midnight } from './presets'

// Prompt users paste into any chat AI (ChatGPT, Claude, Gemini, ...) to get
// back a complete Themeable theme. The reply is pasted into the "AI theme"
// dialog, which strips code fences and imports it like a JSON file.

export const AI_PROMPT_IDEAS = [
  'Calm Scandinavian SaaS: warm off-white, soft sage accent, generous rounding',
  'Late-night synthwave terminal with neon magenta and cyan',
  'Old newspaper: cream paper, ink-black serif headlines, no rounding',
  'Playful kids app: bubbly, chunky shadows, bright primaries',
  'Luxury fintech: near-black, champagne gold accent, thin borders',
  'Forest cabin: deep greens, warm wood browns, cozy serif type',
]

/** Theme used as a shape reference inside the prompt. */
function exampleTheme(): Theme {
  return { ...midnight, name: 'Example', customCss: '' }
}

export function buildThemePrompt(description: string): string {
  const vibe = description.trim() || '[describe the look you want here]'
  const fonts = Object.keys(GOOGLE_FONTS).join(', ')

  return `You are a senior product designer. Create a complete theme for "Themeable", a dashboard UI whose entire look is driven by a single JSON design-token file.

## The theme I want
${vibe}

## Output rules
- Reply with ONE \`\`\`json code block containing the full theme object, and nothing else.
- Use exactly the keys shown in the reference below. Do not add, rename or omit keys.
- Give the theme a short, evocative "name".
- All colors are hex (#rrggbb). Exceptions: "focusRing" should be the accent with alpha (#rrggbbaa), and "overlay" may be rgba(...).
- Lengths (font sizes, spacing, radius, breakpoints, border width) are CSS lengths like "16px" or "1rem".
- fontWeight values are numbers (100-900). lineHeight values are unitless numbers.
- shadows are full CSS box-shadow values; use "none" for any you don't want. Tint shadows to match the mood instead of plain grey.
- borders.style is one of: solid, dashed, dotted, none.
- "direction" is "ltr" unless I asked for a right-to-left language. Keep "nightMode": false.
- "customCss" is optional raw CSS (use "" if not needed). Never include <script>.

## Design guidance
- Build the palette from one base hue: bg / bgElevated / bgSubtle are three close steps of the surface; bgHover / bgActive are subtle interaction states.
- Text must pass WCAG AA: text on bg >= 4.5:1, accentText on accent >= 4.5:1, textMuted still readable.
- success / warning / danger / info should be tuned to the palette's mood, not default traffic-light colors.
- Fonts: write full stacks with fallbacks, e.g. "Inter, system-ui, sans-serif". These Google Fonts are loaded automatically: ${fonts}. Any other font must be a system font.
- Use a consistent type scale (ratio 1.2-1.333) and a 4px or 8px spacing scale.

## Reference (shape only, do not copy the values)
\`\`\`json
${JSON.stringify(exampleTheme(), null, 2)}
\`\`\``
}

/**
 * Pull the JSON object out of an AI reply: accepts a bare object, a fenced
 * ```json block, or an object surrounded by chatty prose.
 */
export function extractThemeJson(reply: string): string {
  const text = reply.trim()
  const fenced = text.match(/```(?:json|jsonc)?\s*([\s\S]*?)```/i)
  if (fenced) return fenced[1].trim()
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end > start) return text.slice(start, end + 1)
  return text
}
