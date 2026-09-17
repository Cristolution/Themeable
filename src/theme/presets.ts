import type { Theme } from './schema'

export const midnight: Theme = {
  name: 'Midnight',
  colors: {
    bg: '#0f1115',
    bgElevated: '#1a1d24',
    bgSubtle: '#222632',
    text: '#e6e8eb',
    textMuted: '#9aa3b2',
    border: '#262a33',
    accent: '#7c9eff',
    accentText: '#0a0d1a',
    success: '#3ecf8e',
    warning: '#f5a524',
    danger: '#ef4444'
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
    lg: '0 12px 32px rgba(0,0,0,0.45)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '120ms ease', normal: '200ms ease', slow: '400ms ease' },
  customCss: ''
}

export const solarizedLight: Theme = {
  name: 'Solarized Light',
  colors: {
    bg: '#fdf6e3',
    bgElevated: '#eee8d5',
    bgSubtle: '#e4dcc6',
    text: '#073642',
    textMuted: '#586e75',
    border: '#d6cfb6',
    accent: '#268bd2',
    accentText: '#fdf6e3',
    success: '#859900',
    warning: '#b58900',
    danger: '#dc322f'
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
    lg: '0 12px 32px rgba(7,54,66,0.18)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '120ms ease', normal: '200ms ease', slow: '400ms ease' },
  customCss: ''
}

export const monokai: Theme = {
  name: 'Monokai',
  colors: {
    bg: '#272822',
    bgElevated: '#3e3d32',
    bgSubtle: '#49483e',
    text: '#f8f8f2',
    textMuted: '#a59f85',
    border: '#3e3d32',
    accent: '#f92672',
    accentText: '#272822',
    success: '#a6e22e',
    warning: '#e6db74',
    danger: '#f92672'
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
    lg: '0 12px 32px rgba(0,0,0,0.6)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '100ms linear', normal: '180ms linear', slow: '350ms linear' },
  customCss: ''
}

export const paper: Theme = {
  name: 'Paper',
  colors: {
    bg: '#fafaf9',
    bgElevated: '#ffffff',
    bgSubtle: '#f0efed',
    text: '#1c1917',
    textMuted: '#78716c',
    border: '#e7e5e4',
    accent: '#292524',
    accentText: '#fafaf9',
    success: '#166534',
    warning: '#a16207',
    danger: '#991b1b'
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
    lg: '0 8px 24px rgba(28,25,23,0.1)'
  },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '120ms ease', normal: '200ms ease', slow: '400ms ease' },
  customCss: ''
}

export const presets: Theme[] = [midnight, solarizedLight, monokai, paper]