import type { Theme } from './schema'

const baseBreakpoints = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }

export const midnight: Theme = {
  name: 'Midnight',
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#0f1115', bgElevated: '#1a1d24', bgSubtle: '#222632',
    text: '#e6e8eb', textMuted: '#9aa3b2', border: '#262a33',
    accent: '#7c9eff', accentText: '#0a0d1a',
    success: '#3ecf8e', warning: '#f5a524', danger: '#ef4444',
    bgHover: '#1c2030', bgActive: '#262a3a', textInverse: '#0a0d1a',
    borderStrong: '#3a3f55', focusRing: '#7c9eff', info: '#38bdf8',
    link: '#7c9eff', codeBg: '#0a0d14', overlay: 'rgba(0,0,0,0.6)'
  },
  typography: {
    fontFamily: {
      body: 'Inter, system-ui, sans-serif',
      heading: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, ui-monospace, monospace'
    },
    fontSize: { xs: '12px', sm: '13px', base: '14px', lg: '17px', xl: '21px', '2xl': '28px' },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.2, normal: 1.5, loose: 1.7 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '14px', lg: '22px', xl: '32px', '2xl': '48px' },
  radius: { none: '0', sm: '4px', md: '8px', lg: '12px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.25)',
    md: '0 4px 12px rgba(0,0,0,0.35)',
    lg: '0 12px 32px rgba(0,0,0,0.45)',
    button: '0 1px 2px rgba(0,0,0,0.25)',
    input: '0 1px 2px rgba(0,0,0,0.20)',
    card: '0 2px 8px rgba(0,0,0,0.30)',
    focus: '0 0 0 3px rgba(124,158,255,0.40)',
    inner: 'inset 0 1px 2px rgba(0,0,0,0.30)',
    glow: '0 0 24px rgba(124,158,255,0.50)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '120ms ease', normal: '200ms ease', slow: '400ms ease' },
  customCss: '',
  direction: 'ltr' as const,
  nightMode: false as const
}

export const solarizedLight: Theme = {
  name: 'Solarized Light',
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#fdf6e3', bgElevated: '#eee8d5', bgSubtle: '#e4dcc6',
    text: '#073642', textMuted: '#586e75', border: '#d6cfb6',
    accent: '#268bd2', accentText: '#fdf6e3',
    success: '#859900', warning: '#b58900', danger: '#dc322f',
    bgHover: '#e9e2c8', bgActive: '#ddd5b8', textInverse: '#fdf6e3',
    borderStrong: '#a8a08c', focusRing: '#268bd2', info: '#2aa198',
    link: '#268bd2', codeBg: '#ece4cc', overlay: 'rgba(7,54,66,0.45)'
  },
  typography: {
    fontFamily: {
      body: 'IBM Plex Sans, system-ui, sans-serif',
      heading: 'IBM Plex Sans, system-ui, sans-serif',
      mono: 'IBM Plex Mono, ui-monospace, monospace'
    },
    fontSize: { xs: '12px', sm: '14px', base: '15px', lg: '18px', xl: '22px', '2xl': '28px' },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.25, normal: 1.55, loose: 1.8 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px' },
  radius: { none: '0', sm: '3px', md: '6px', lg: '10px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(7,54,66,0.08)',
    md: '0 4px 12px rgba(7,54,66,0.12)',
    lg: '0 12px 32px rgba(7,54,66,0.18)',
    button: '0 1px 2px rgba(7,54,66,0.10)',
    input: '0 1px 2px rgba(7,54,66,0.06)',
    card: '0 2px 8px rgba(7,54,66,0.12)',
    focus: '0 0 0 3px rgba(38,139,210,0.30)',
    inner: 'inset 0 1px 2px rgba(7,54,66,0.10)',
    glow: '0 0 24px rgba(38,139,210,0.40)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '120ms ease', normal: '200ms ease', slow: '400ms ease' },
  customCss: '',
  direction: 'ltr' as const,
  nightMode: false as const
}

export const monokai: Theme = {
  name: 'Monokai',
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#272822', bgElevated: '#3e3d32', bgSubtle: '#49483e',
    text: '#f8f8f2', textMuted: '#a59f85', border: '#3e3d32',
    accent: '#f92672', accentText: '#272822',
    success: '#a6e22e', warning: '#e6db74', danger: '#f92672',
    bgHover: '#34332a', bgActive: '#3f3e35', textInverse: '#272822',
    borderStrong: '#5a5950', focusRing: '#f92672', info: '#66d9ef',
    link: '#f92672', codeBg: '#1e1f1c', overlay: 'rgba(0,0,0,0.65)'
  },
  typography: {
    fontFamily: {
      body: 'JetBrains Mono, ui-monospace, monospace',
      heading: 'JetBrains Mono, ui-monospace, monospace',
      mono: 'JetBrains Mono, ui-monospace, monospace'
    },
    fontSize: { xs: '12px', sm: '13px', base: '14px', lg: '17px', xl: '21px', '2xl': '26px' },
    fontWeight: { normal: 400, medium: 600, bold: 700 },
    lineHeight: { tight: 1.25, normal: 1.5, loose: 1.75 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '14px', lg: '22px', xl: '32px', '2xl': '48px' },
  radius: { none: '0', sm: '2px', md: '4px', lg: '6px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.4)',
    md: '0 4px 12px rgba(0,0,0,0.5)',
    lg: '0 12px 32px rgba(0,0,0,0.6)',
    button: '0 1px 2px rgba(0,0,0,0.4)',
    input: '0 1px 2px rgba(0,0,0,0.35)',
    card: '0 2px 8px rgba(0,0,0,0.45)',
    focus: '0 0 0 3px rgba(249,38,114,0.45)',
    inner: 'inset 0 1px 2px rgba(0,0,0,0.45)',
    glow: '0 0 24px rgba(249,38,114,0.55)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '100ms linear', normal: '180ms linear', slow: '350ms linear' },
  customCss: '',
  direction: 'ltr' as const,
  nightMode: false as const
}

export const paper: Theme = {
  name: 'Paper',
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#fafaf9', bgElevated: '#ffffff', bgSubtle: '#f0efed',
    text: '#1c1917', textMuted: '#78716c', border: '#e7e5e4',
    accent: '#292524', accentText: '#fafaf9',
    success: '#166534', warning: '#a16207', danger: '#991b1b',
    bgHover: '#f0efed', bgActive: '#e7e5e4', textInverse: '#fafaf9',
    borderStrong: '#a8a29e', focusRing: '#292524', info: '#0369a1',
    link: '#1c1917', codeBg: '#f5f5f4', overlay: 'rgba(28,25,23,0.45)'
  },
  typography: {
    fontFamily: {
      body: 'Source Serif Pro, Georgia, serif',
      heading: 'Source Serif Pro, Georgia, serif',
      mono: 'IBM Plex Mono, ui-monospace, monospace'
    },
    fontSize: { xs: '12px', sm: '14px', base: '16px', lg: '19px', xl: '23px', '2xl': '30px' },
    fontWeight: { normal: 400, medium: 600, bold: 700 },
    lineHeight: { tight: 1.25, normal: 1.6, loose: 1.85 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '16px', lg: '28px', xl: '40px', '2xl': '56px' },
  radius: { none: '0', sm: '2px', md: '4px', lg: '6px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 1px rgba(28,25,23,0.05)',
    md: '0 2px 6px rgba(28,25,23,0.08)',
    lg: '0 8px 24px rgba(28,25,23,0.1)',
    button: '0 1px 1px rgba(28,25,23,0.06)',
    input: '0 1px 1px rgba(28,25,23,0.04)',
    card: '0 2px 6px rgba(28,25,23,0.08)',
    focus: '0 0 0 3px rgba(41,37,35,0.25)',
    inner: 'inset 0 1px 2px rgba(28,25,23,0.08)',
    glow: '0 0 24px rgba(41,37,35,0.20)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '120ms ease', normal: '200ms ease', slow: '400ms ease' },
  customCss: '',
  direction: 'ltr' as const,
  nightMode: false as const
}

// =============================================================
// 8 design-inspired presets — extracted from Crist's portfolio
// (anti-ai-slope design) and web design prototypes.
// =============================================================

// 1. MIDNIGHT CRT — portfolio-02-midnight (terminal / CRT vibes)
export const midnightCrt: Theme = {
  name: 'Midnight CRT',
  direction: 'ltr' as const,
  nightMode: false as const,
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#0e1117',
    bgElevated: '#181c24',
    bgSubtle: '#20242d',
    text: '#eef0f3',
    textMuted: '#8b919e',
    border: '#2a3144',
    accent: '#5a85ff',
    accentText: '#0e1117',
    success: '#3ecf8e',
    warning: '#f5a524',
    danger: '#ef4444',
    bgHover: '#1a1f29',
    bgActive: '#222836',
    textInverse: '#0e1117',
    borderStrong: '#3a4258',
    focusRing: '#5a85ff',
    info: '#38bdf8',
    link: '#5a85ff',
    codeBg: '#0a0d13',
    overlay: 'rgba(0,0,0,0.65)'
  },
  typography: {
    fontFamily: {
      body: "'Source Code Pro', 'Courier Prime', monospace",
      heading: "'Courier Prime', monospace",
      mono: "'Source Code Pro', monospace"
    },
    fontSize: { xs: '12px', sm: '13px', base: '14px', lg: '17px', xl: '21px', '2xl': '28px' },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.3, normal: 1.6, loose: 1.8 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '14px', lg: '22px', xl: '32px', '2xl': '48px' },
  radius: { none: '0', sm: '2px', md: '4px', lg: '6px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.30)',
    md: '0 4px 12px rgba(0,0,0,0.45)',
    lg: '0 12px 32px rgba(0,0,0,0.55)',
    button: '0 1px 2px rgba(0,0,0,0.30)',
    input: '0 1px 2px rgba(0,0,0,0.25)',
    card: '0 2px 8px rgba(0,0,0,0.40)',
    focus: '0 0 0 3px rgba(90,133,255,0.45)',
    inner: 'inset 0 1px 2px rgba(0,0,0,0.40)',
    glow: '0 0 24px rgba(90,133,255,0.55)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '120ms ease', normal: '200ms ease', slow: '400ms ease' },
  customCss: ''
}

// 2. CARNIVAL — portfolio-07-carnival (vibrant warm, pink-orange-magenta)
export const carnival: Theme = {
  name: 'Carnival',
  direction: 'ltr' as const,
  nightMode: false as const,
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#ead6c8',
    bgElevated: '#e1c4b3',
    bgSubtle: '#d6a89a',
    text: '#2c2541',
    textMuted: '#73708a',
    border: '#5e1657',
    accent: '#5e1657',
    accentText: '#ead6c8',
    success: '#3ecf8e',
    warning: '#f5a524',
    danger: '#d6336c',
    bgHover: '#e1c4b3',
    bgActive: '#d6a89a',
    textInverse: '#ead6c8',
    borderStrong: '#3e0f3a',
    focusRing: '#5e1657',
    info: '#7ac6d8',
    link: '#5e1657',
    codeBg: '#e1c4b3',
    overlay: 'rgba(44,37,65,0.55)'
  },
  typography: {
    fontFamily: {
      body: "'Space Mono', monospace",
      heading: "'Big Shoulders Display', sans-serif",
      mono: "'Space Mono', monospace"
    },
    fontSize: { xs: '12px', sm: '13px', base: '14px', lg: '17px', xl: '22px', '2xl': '32px' },
    fontWeight: { normal: 400, medium: 600, bold: 800 },
    lineHeight: { tight: 1.05, normal: 1.5, loose: 1.7 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '14px', lg: '22px', xl: '36px', '2xl': '56px' },
  radius: { none: '0', sm: '0', md: '0', lg: '0', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '2px 2px 0 var(--color-text)',
    md: '4px 4px 0 var(--color-text)',
    lg: '8px 8px 0 var(--color-text)',
    button: '4px 4px 0 var(--color-text)',
    input: '2px 2px 0 var(--color-text)',
    card: '4px 4px 0 var(--color-text)',
    focus: '0 0 0 3px rgba(94,22,87,0.45)',
    inner: 'inset 2px 2px 0 rgba(44,37,65,0.20)',
    glow: '0 0 24px rgba(94,22,87,0.55)'
  },
  borders: { width: '3px', style: 'solid' },
  transitions: { fast: '100ms ease', normal: '180ms ease', slow: '350ms ease' },
  customCss: ''
}

// 3. GARDEN — portfolio-12-garden (warm cream + sage green)
export const garden: Theme = {
  name: 'Garden',
  direction: 'ltr' as const,
  nightMode: false as const,
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#f8f1de',
    bgElevated: '#f0e7d0',
    bgSubtle: '#e7dcc1',
    text: '#1f3625',
    textMuted: '#6e7d6d',
    border: '#d4ccb7',
    accent: '#588759',
    accentText: '#f8f1de',
    success: '#3ecf8e',
    warning: '#b58900',
    danger: '#a4321f',
    bgHover: '#f0e7d0',
    bgActive: '#e7dcc1',
    textInverse: '#f8f1de',
    borderStrong: '#a8a08c',
    focusRing: '#588759',
    info: '#457645',
    link: '#457645',
    codeBg: '#e7dcc1',
    overlay: 'rgba(31,54,37,0.45)'
  },
  typography: {
    fontFamily: {
      body: "'Source Sans 3', system-ui, sans-serif",
      heading: "'Spectral', Georgia, serif",
      mono: "'JetBrains Mono', monospace"
    },
    fontSize: { xs: '12px', sm: '14px', base: '16px', lg: '19px', xl: '23px', '2xl': '30px' },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.25, normal: 1.65, loose: 1.85 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '40px', '2xl': '64px' },
  radius: { none: '0', sm: '2px', md: '4px', lg: '8px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(31,54,37,0.08)',
    md: '0 2px 8px rgba(31,54,37,0.12)',
    lg: '0 8px 24px rgba(31,54,37,0.16)',
    button: '0 1px 2px rgba(31,54,37,0.10)',
    input: '0 1px 2px rgba(31,54,37,0.06)',
    card: '0 2px 6px rgba(31,54,37,0.10)',
    focus: '0 0 0 3px rgba(88,135,89,0.35)',
    inner: 'inset 0 1px 2px rgba(31,54,37,0.08)',
    glow: '0 0 24px rgba(88,135,89,0.40)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '150ms cubic-bezier(0.16,1,0.3,1)', normal: '300ms cubic-bezier(0.16,1,0.3,1)', slow: '450ms cubic-bezier(0.16,1,0.3,1)' },
  customCss: ''
}

// 4. COBALT — portfolio-15-cobalt (white + cobalt blue)
export const cobalt: Theme = {
  name: 'Cobalt',
  direction: 'ltr' as const,
  nightMode: false as const,
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#f6f8fa',
    bgElevated: '#eef2f5',
    bgSubtle: '#dee5eb',
    text: '#2c374b',
    textMuted: '#7e8493',
    border: '#d4dae2',
    accent: '#1c66ff',
    accentText: '#f6f8fa',
    success: '#3ecf8e',
    warning: '#f5a524',
    danger: '#ef4444',
    bgHover: '#eef2f5',
    bgActive: '#dee5eb',
    textInverse: '#f6f8fa',
    borderStrong: '#a8b1c2',
    focusRing: '#1c66ff',
    info: '#38bdf8',
    link: '#1c66ff',
    codeBg: '#dee5eb',
    overlay: 'rgba(44,55,75,0.55)'
  },
  typography: {
    fontFamily: {
      body: "'Inter', system-ui, sans-serif",
      heading: "'Space Grotesk', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    fontSize: { xs: '12px', sm: '14px', base: '15px', lg: '18px', xl: '22px', '2xl': '30px' },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.2, normal: 1.55, loose: 1.75 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '40px', '2xl': '64px' },
  radius: { none: '0', sm: '4px', md: '8px', lg: '12px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(28,102,255,0.06)',
    md: '0 4px 12px rgba(28,102,255,0.10)',
    lg: '0 12px 32px rgba(28,102,255,0.14)',
    button: '0 1px 2px rgba(28,102,255,0.10)',
    input: '0 1px 2px rgba(28,102,255,0.06)',
    card: '0 2px 8px rgba(28,102,255,0.10)',
    focus: '0 0 0 3px rgba(28,102,255,0.35)',
    inner: 'inset 0 1px 2px rgba(28,102,255,0.08)',
    glow: '0 0 24px rgba(28,102,255,0.40)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '150ms cubic-bezier(0.16,1,0.3,1)', normal: '300ms cubic-bezier(0.16,1,0.3,1)', slow: '500ms cubic-bezier(0.16,1,0.3,1)' },
  customCss: ''
}

// 5. BRUTALIST — prototype-01-brutalist (cream + electric green + offset shadows)
export const brutalist: Theme = {
  name: 'Brutalist',
  direction: 'ltr' as const,
  nightMode: false as const,
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#f4f1ea',
    bgElevated: '#ffffff',
    bgSubtle: '#e8e4d8',
    text: '#0a0a0a',
    textMuted: '#525252',
    border: '#0a0a0a',
    accent: '#00ff88',
    accentText: '#0a0a0a',
    success: '#00ff88',
    warning: '#ff4f00',
    danger: '#ff4f00',
    bgHover: '#e8e4d8',
    bgActive: '#dcd8cc',
    textInverse: '#f4f1ea',
    borderStrong: '#0a0a0a',
    focusRing: '#00ff88',
    info: '#38bdf8',
    link: '#0a0a0a',
    codeBg: '#0a0a0a',
    overlay: 'rgba(10,10,10,0.55)'
  },
  typography: {
    fontFamily: {
      body: "'Space Grotesk', system-ui, sans-serif",
      heading: "'Archivo Black', sans-serif",
      mono: "'IBM Plex Mono', monospace"
    },
    fontSize: { xs: '12px', sm: '13px', base: '15px', lg: '18px', xl: '22px', '2xl': '32px' },
    fontWeight: { normal: 400, medium: 600, bold: 800 },
    lineHeight: { tight: 1.1, normal: 1.4, loose: 1.6 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '40px', '2xl': '64px' },
  radius: { none: '0', sm: '0', md: '0', lg: '0', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '2px 2px 0 var(--color-text)',
    md: '6px 6px 0 var(--color-text)',
    lg: '10px 10px 0 var(--color-text)',
    button: '6px 6px 0 var(--color-text)',
    input: '6px 6px 0 var(--color-text)',
    card: '6px 6px 0 var(--color-text)',
    focus: '0 0 0 4px rgba(0,255,136,0.50)',
    inner: 'inset 2px 2px 0 rgba(10,10,10,0.20)',
    glow: '16px 16px 0 var(--color-accent)'
  },
  borders: { width: '3px', style: 'solid' },
  transitions: { fast: '100ms ease', normal: '150ms ease', slow: '300ms ease' },
  customCss: ''
}

// 6. EDITORIAL — prototype-02-editorial-saas (cream paper + burgundy + brass)
export const editorial: Theme = {
  name: 'Editorial',
  direction: 'ltr' as const,
  nightMode: false as const,
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#fbf9f4',
    bgElevated: '#ffffff',
    bgSubtle: '#f0ead8',
    text: '#1a1a1a',
    textMuted: '#8a8580',
    border: '#1a1a1a',
    accent: '#6b1f1f',
    accentText: '#fbf9f4',
    success: '#3ecf8e',
    warning: '#b08850',
    danger: '#a4321f',
    bgHover: '#f0ead8',
    bgActive: '#e6dfc8',
    textInverse: '#fbf9f4',
    borderStrong: '#3a3a3a',
    focusRing: '#6b1f1f',
    info: '#b08850',
    link: '#6b1f1f',
    codeBg: '#f0ead8',
    overlay: 'rgba(26,26,26,0.45)'
  },
  typography: {
    fontFamily: {
      body: "'Inter', system-ui, sans-serif",
      heading: "'Fraunces', Georgia, serif",
      mono: "'JetBrains Mono', monospace"
    },
    fontSize: { xs: '12px', sm: '14px', base: '16px', lg: '19px', xl: '24px', '2xl': '32px' },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.2, normal: 1.5, loose: 1.8 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '40px', '2xl': '64px' },
  radius: { none: '0', sm: '2px', md: '4px', lg: '8px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(107,31,31,0.08)',
    md: '0 4px 12px rgba(26,26,26,0.12)',
    lg: '0 12px 32px rgba(26,26,26,0.16)',
    button: '0 1px 2px rgba(26,26,26,0.12)',
    input: '0 1px 2px rgba(26,26,26,0.06)',
    card: '0 2px 8px rgba(26,26,26,0.10)',
    focus: '0 0 0 3px rgba(107,31,31,0.30)',
    inner: 'inset 0 1px 2px rgba(26,26,26,0.08)',
    glow: '0 0 24px rgba(176,136,80,0.35)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '150ms ease', normal: '250ms ease', slow: '400ms ease' },
  customCss: ''
}

// 7. BENTO — prototype-03-bento-agency (light + electric green + electric blue)
export const bento: Theme = {
  name: 'Bento',
  direction: 'ltr' as const,
  nightMode: false as const,
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#fafafa',
    bgElevated: '#ffffff',
    bgSubtle: '#f0f0f0',
    text: '#0a0a0a',
    textMuted: '#6b6b6b',
    border: '#e5e5e5',
    accent: '#00ff88',
    accentText: '#0a0a0a',
    success: '#00ff88',
    warning: '#ff4f00',
    danger: '#ff4f00',
    bgHover: '#f0f0f0',
    bgActive: '#e5e5e5',
    textInverse: '#fafafa',
    borderStrong: '#a3a3a3',
    focusRing: '#0066ff',
    info: '#0066ff',
    link: '#0066ff',
    codeBg: '#f0f0f0',
    overlay: 'rgba(10,10,10,0.45)'
  },
  typography: {
    fontFamily: {
      body: "'Cabinet Grotesk', 'Inter', system-ui, sans-serif",
      heading: "'Cabinet Grotesk', 'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    fontSize: { xs: '12px', sm: '14px', base: '15px', lg: '18px', xl: '22px', '2xl': '30px' },
    fontWeight: { normal: 400, medium: 600, bold: 800 },
    lineHeight: { tight: 1.2, normal: 1.4, loose: 1.7 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '40px', '2xl': '64px' },
  radius: { none: '0', sm: '8px', md: '16px', lg: '24px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0,0,0,0.04)',
    md: '0 4px 12px rgba(0,0,0,0.06)',
    lg: '0 12px 32px rgba(0,0,0,0.10)',
    button: '0 1px 2px rgba(0,0,0,0.08)',
    input: '0 1px 2px rgba(0,0,0,0.04)',
    card: '0 2px 8px rgba(0,0,0,0.06)',
    focus: '0 0 0 3px rgba(0,102,255,0.35)',
    inner: 'inset 0 1px 2px rgba(0,0,0,0.04)',
    glow: '0 0 24px rgba(0,255,136,0.45)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '150ms cubic-bezier(0.16,1,0.3,1)', normal: '250ms cubic-bezier(0.16,1,0.3,1)', slow: '400ms cubic-bezier(0.16,1,0.3,1)' },
  customCss: ''
}

// 8. ASCII DINO — prototype-05-ascii-dino (pure black + matrix green)
export const asciiDino: Theme = {
  name: 'ASCII Dino',
  direction: 'ltr' as const,
  nightMode: false as const,
  breakpoints: baseBreakpoints,
  colors: {
    bg: '#000000',
    bgElevated: '#0d0d0d',
    bgSubtle: '#1a1a1a',
    text: '#f0f0f0',
    textMuted: '#8a8a8a',
    border: '#2a2a2a',
    accent: '#00ff41',
    accentText: '#000000',
    success: '#00ff41',
    warning: '#ffbe0b',
    danger: '#ff4f00',
    bgHover: '#1a1a1a',
    bgActive: '#2a2a2a',
    textInverse: '#000000',
    borderStrong: '#3a3a3a',
    focusRing: '#00ff41',
    info: '#38bdf8',
    link: '#00ff41',
    codeBg: '#0a0a0a',
    overlay: 'rgba(0,0,0,0.75)'
  },
  typography: {
    fontFamily: {
      body: "'JetBrains Mono', 'Space Mono', monospace",
      heading: "'JetBrains Mono', monospace",
      mono: "'JetBrains Mono', monospace"
    },
    fontSize: { xs: '12px', sm: '13px', base: '14px', lg: '17px', xl: '21px', '2xl': '28px' },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.3, normal: 1.5, loose: 1.7 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '14px', lg: '22px', xl: '32px', '2xl': '48px' },
  radius: { none: '0', sm: '2px', md: '4px', lg: '6px', full: '9999px' },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0,255,65,0.15)',
    md: '0 0 8px rgba(0,255,65,0.30)',
    lg: '0 0 24px rgba(0,255,65,0.45)',
    button: '0 0 8px rgba(0,255,65,0.40)',
    input: '0 0 4px rgba(0,255,65,0.25)',
    card: '0 0 8px rgba(0,255,65,0.20)',
    focus: '0 0 0 3px rgba(0,255,65,0.50)',
    inner: 'inset 0 1px 2px rgba(0,255,65,0.15)',
    glow: '0 0 32px rgba(0,255,65,0.55)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '150ms ease', normal: '350ms cubic-bezier(0.16,1,0.3,1)', slow: '500ms ease' },
  customCss: ''
}

export const presets: Theme[] = [
  midnight, solarizedLight, monokai, paper,
  midnightCrt, carnival, garden, cobalt,
  brutalist, editorial, bento, asciiDino
]
