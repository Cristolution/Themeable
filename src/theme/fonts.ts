import type { Theme } from './schema'

// Google Fonts the app knows how to load, mapped to the css2 axis spec to
// request. Families with an empty spec only ship a single (400) weight —
// asking for weights they don't have makes Google return a 400.
export const GOOGLE_FONTS: Record<string, string> = {
  'Anton': '',
  'Archivo': 'wght@400;500;700',
  'Archivo Black': '',
  'Audiowide': '',
  'Bebas Neue': '',
  'Bodoni Moda': 'wght@400;600;700',
  'Bowlby One': '',
  'Bricolage Grotesque': 'wght@400;600;700',
  'Caveat': 'wght@400;700',
  'Cinzel': 'wght@400;600;700',
  'Cormorant Garamond': 'wght@400;500;700',
  'Courier Prime': 'wght@400;700',
  'Crimson Pro': 'wght@400;600;700',
  'DM Sans': 'wght@400;500;700',
  'DM Serif Display': '',
  'EB Garamond': 'wght@400;500;700',
  'Familjen Grotesk': 'wght@400;600;700',
  'Fira Code': 'wght@400;500;700',
  'Fraunces': 'wght@400;600;700',
  'Geist': 'wght@400;500;600;700',
  'Geist Mono': 'wght@400;500;700',
  'IBM Plex Mono': 'wght@400;500;700',
  'IBM Plex Sans': 'wght@400;500;700',
  'IM Fell English': '',
  'Instrument Serif': '',
  'Inter': 'wght@400;500;600;700',
  'JetBrains Mono': 'wght@400;500;700',
  'Lexend': 'wght@400;500;700',
  'Libre Baskerville': 'wght@400;700',
  'Lora': 'wght@400;600;700',
  'Manrope': 'wght@400;500;700',
  'Merriweather': 'wght@400;700',
  'Monoton': '',
  'Montserrat': 'wght@400;500;700',
  'Nunito': 'wght@400;600;700',
  'Orbitron': 'wght@400;600;700',
  'Outfit': 'wght@400;500;700',
  'Patrick Hand': '',
  'Playfair Display': 'wght@400;600;700',
  'Plus Jakarta Sans': 'wght@400;500;700',
  'Poppins': 'wght@400;500;600;700',
  'Press Start 2P': '',
  'Roboto': 'wght@400;500;700',
  'Roboto Mono': 'wght@400;500;700',
  'Rubik Mono One': '',
  'Shippori Mincho': 'wght@400;500;700',
  'Sora': 'wght@400;600;700',
  'Source Code Pro': 'wght@400;500;700',
  'Source Serif 4': 'wght@400;600;700',
  'Space Grotesk': 'wght@400;500;600;700',
  'Space Mono': 'wght@400;700',
  'Special Elite': '',
  'Syne': 'wght@400;600;700',
  'VT323': '',
  'Work Sans': 'wght@400;500;700',
}

const LINK_ATTR = 'data-theme-font'

/** Split a CSS font-family stack into bare family names. */
export function parseFontStack(stack: string): string[] {
  return stack
    .split(',')
    .map(f => f.trim().replace(/^['"]|['"]$/g, '').trim())
    .filter(Boolean)
}

/** Google Fonts families referenced anywhere in the theme's font stacks. */
export function themeGoogleFonts(theme: Theme): string[] {
  const { body, heading, mono } = theme.typography.fontFamily
  const found = new Set<string>()
  for (const stack of [body, heading, mono]) {
    for (const family of parseFontStack(stack)) {
      if (family in GOOGLE_FONTS) found.add(family)
    }
  }
  return [...found]
}

export function googleFontUrl(family: string): string {
  const spec = GOOGLE_FONTS[family]
  const name = family.replace(/ /g, '+')
  return `https://fonts.googleapis.com/css2?family=${name}${spec ? `:${spec}` : ''}&display=swap`
}

/**
 * Inject one stylesheet <link> per Google font the theme uses. Links are kept
 * once added, so switching back and forth between presets doesn't re-request.
 * One link per family means an unavailable weight can't break other fonts.
 */
export function ensureThemeFonts(theme: Theme): void {
  for (const family of themeGoogleFonts(theme)) {
    if (document.head.querySelector(`link[${LINK_ATTR}="${family}"]`)) continue
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = googleFontUrl(family)
    link.setAttribute(LINK_ATTR, family)
    document.head.appendChild(link)
  }
}
