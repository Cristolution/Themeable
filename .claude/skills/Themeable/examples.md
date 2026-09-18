# Themeable Theme Examples

Four worked examples spanning different styles. Each example includes the user's request, the design rationale, and the complete JSON.

---

## Example 1: "Cozy autumn"

**User request:** "a warm, rustic theme like a cabin in autumn"

**Design rationale:** Warm browns and oranges. Serif fonts (Source Serif Pro for body, Playfair Display for headings) evoke editorial warmth. Slightly more generous line-height for relaxed reading. Soft shadows with brown tint instead of black.

```json
{
  "name": "Cozy Autumn",
  "direction": "ltr",
  "nightMode": false,
  "colors": {
    "bg": "#faf6f0",
    "bgElevated": "#fffaf3",
    "bgSubtle": "#efe6d6",
    "text": "#3a2418",
    "textMuted": "#7a5d3f",
    "border": "#d4b896",
    "accent": "#b8631e",
    "accentText": "#ffffff",
    "success": "#5a7a3a",
    "warning": "#c4822a",
    "danger": "#a83232",
    "bgHover": "#f0e6d0",
    "bgActive": "#e2d2b0",
    "textInverse": "#fffaf3",
    "borderStrong": "#8a6840",
    "focusRing": "#b8631e",
    "info": "#4a7a8a",
    "link": "#a0501a",
    "codeBg": "#3a2418",
    "overlay": "rgba(58,36,24,0.5)"
  },
  "typography": {
    "fontFamily": {
      "body": "'Source Serif Pro', Georgia, serif",
      "heading": "'Playfair Display', Georgia, serif",
      "mono": "'JetBrains Mono', monospace"
    },
    "fontSize": { "xs": "13px", "sm": "14px", "base": "16px", "lg": "19px", "xl": "23px", "2xl": "30px" },
    "fontWeight": { "normal": 400, "medium": 600, "bold": 700 },
    "lineHeight": { "tight": 1.3, "normal": 1.6, "loose": 1.85 }
  },
  "spacing": { "unit": "4px", "xs": "4px", "sm": "8px", "md": "16px", "lg": "28px", "xl": "40px", "2xl": "56px" },
  "radius": { "none": "0", "sm": "2px", "md": "4px", "lg": "6px", "full": "9999px" },
  "shadows": {
    "none": "none",
    "sm": "0 1px 1px rgba(58,36,24,0.06)",
    "md": "0 2px 6px rgba(58,36,24,0.10)",
    "lg": "0 8px 24px rgba(58,36,24,0.15)",
    "button": "0 1px 2px rgba(58,36,24,0.12)",
    "input": "0 1px 1px rgba(58,36,24,0.06)",
    "card": "0 2px 6px rgba(58,36,24,0.10)",
    "focus": "0 0 0 3px rgba(184,99,30,0.30)",
    "inner": "inset 0 1px 2px rgba(58,36,24,0.08)",
    "glow": "0 0 24px rgba(184,99,30,0.30)"
  },
  "borders": { "width": "1px", "style": "solid" },
  "transitions": { "fast": "120ms ease", "normal": "200ms ease", "slow": "400ms ease" },
  "breakpoints": { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px", "2xl": "1536px" },
  "customCss": ""
}
```

---

## Example 2: "Cyberpunk neon"

**User request:** "high-contrast cyberpunk neon theme, like a Blade Runner UI"

**Design rationale:** Pure black background with electric magenta and cyan accents. Monospace fonts throughout for that terminal aesthetic. Hard, sharp corners (very small radius). Inset glow shadows on interactive elements. Wide letter-spacing for that futuristic feel.

```json
{
  "name": "Cyberpunk Neon",
  "direction": "ltr",
  "nightMode": false,
  "colors": {
    "bg": "#0a0014",
    "bgElevated": "#140024",
    "bgSubtle": "#1f0036",
    "text": "#f5f3ff",
    "textMuted": "#8a7da6",
    "border": "#3a2860",
    "accent": "#ff006e",
    "accentText": "#ffffff",
    "success": "#00ff9d",
    "warning": "#ffcc00",
    "danger": "#ff2e63",
    "bgHover": "#240044",
    "bgActive": "#360060",
    "textInverse": "#0a0014",
    "borderStrong": "#ff006e",
    "focusRing": "#00d9ff",
    "info": "#00d9ff",
    "link": "#00d9ff",
    "codeBg": "#000000",
    "overlay": "rgba(255,0,110,0.2)"
  },
  "typography": {
    "fontFamily": {
      "body": "'JetBrains Mono', ui-monospace, monospace",
      "heading": "'Orbitron', 'JetBrains Mono', monospace",
      "mono": "'JetBrains Mono', monospace"
    },
    "fontSize": { "xs": "11px", "sm": "13px", "base": "14px", "lg": "16px", "xl": "20px", "2xl": "26px" },
    "fontWeight": { "normal": 400, "medium": 600, "bold": 800 },
    "lineHeight": { "tight": 1.2, "normal": 1.45, "loose": 1.7 }
  },
  "spacing": { "unit": "4px", "xs": "2px", "sm": "4px", "md": "12px", "lg": "20px", "xl": "32px", "2xl": "48px" },
  "radius": { "none": "0", "sm": "0", "md": "2px", "lg": "4px", "full": "9999px" },
  "shadows": {
    "none": "none",
    "sm": "0 0 4px rgba(255,0,110,0.4)",
    "md": "0 0 12px rgba(255,0,110,0.5)",
    "lg": "0 0 32px rgba(0,217,255,0.6)",
    "button": "inset 0 0 8px rgba(255,0,110,0.6)",
    "input": "inset 0 0 6px rgba(0,217,255,0.4)",
    "card": "0 0 16px rgba(255,0,110,0.3)",
    "focus": "0 0 0 3px rgba(0,217,255,0.6)",
    "inner": "inset 0 0 8px rgba(0,217,255,0.4)",
    "glow": "0 0 24px rgba(255,0,110,0.7), 0 0 48px rgba(0,217,255,0.4)"
  },
  "borders": { "width": "1px", "style": "solid" },
  "transitions": { "fast": "80ms linear", "normal": "150ms linear", "slow": "300ms linear" },
  "breakpoints": { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px", "2xl": "1536px" },
  "customCss": ""
}
```

---

## Example 3: "Soft pastel SaaS"

**User request:** "light, friendly theme for a productivity app — calm but not boring"

**Design rationale:** Soft purple-indigo hue at moderate saturation. Generous spacing. Round corners. Light shadows. Inter for body (clean sans), Source Serif for headings (subtle elegance). Accent is a confident violet that works on both bg colors.

```json
{
  "name": "Soft Pastel",
  "direction": "ltr",
  "nightMode": false,
  "colors": {
    "bg": "#faf8fc",
    "bgElevated": "#ffffff",
    "bgSubtle": "#f0ecf7",
    "text": "#1c1a2e",
    "textMuted": "#6b6680",
    "border": "#e3dfee",
    "accent": "#6c5ce7",
    "accentText": "#ffffff",
    "success": "#20c997",
    "warning": "#ffa94d",
    "danger": "#fa5252",
    "bgHover": "#f3effa",
    "bgActive": "#e8e2f5",
    "textInverse": "#ffffff",
    "borderStrong": "#c5bee0",
    "focusRing": "#6c5ce7",
    "info": "#339af0",
    "link": "#5f4bd1",
    "codeBg": "#f0ecf7",
    "overlay": "rgba(28,26,46,0.5)"
  },
  "typography": {
    "fontFamily": {
      "body": "'Inter', system-ui, sans-serif",
      "heading": "'Source Serif 4', Georgia, serif",
      "mono": "'JetBrains Mono', monospace"
    },
    "fontSize": { "xs": "12px", "sm": "13px", "base": "15px", "lg": "18px", "xl": "22px", "2xl": "28px" },
    "fontWeight": { "normal": 400, "medium": 500, "bold": 700 },
    "lineHeight": { "tight": 1.3, "normal": 1.55, "loose": 1.8 }
  },
  "spacing": { "unit": "4px", "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "36px", "2xl": "56px" },
  "radius": { "none": "0", "sm": "6px", "md": "10px", "lg": "16px", "full": "9999px" },
  "shadows": {
    "none": "none",
    "sm": "0 1px 2px rgba(108,92,231,0.06)",
    "md": "0 4px 12px rgba(108,92,231,0.08)",
    "lg": "0 12px 32px rgba(108,92,231,0.10)",
    "button": "0 1px 2px rgba(108,92,231,0.10)",
    "input": "0 1px 2px rgba(108,92,231,0.05)",
    "card": "0 2px 8px rgba(108,92,231,0.06)",
    "focus": "0 0 0 3px rgba(108,92,231,0.30)",
    "inner": "inset 0 1px 2px rgba(108,92,231,0.06)",
    "glow": "0 0 24px rgba(108,92,231,0.25)"
  },
  "borders": { "width": "1px", "style": "solid" },
  "transitions": { "fast": "120ms ease", "normal": "200ms ease", "slow": "400ms ease" },
  "breakpoints": { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px", "2xl": "1536px" },
  "customCss": ""
}
```

---

## Example 4: "Solar dark green"

**User request:** "dark theme with warm green accents — like a forest at dusk"

**Design rationale:** Deep forest-green bg with warm sage accent. Earthy semantic colors (moss green for success, amber for warning). Serif body for that natural-world feel. Compact spacing for data-density.

```json
{
  "name": "Solar Dark Green",
  "direction": "ltr",
  "nightMode": false,
  "colors": {
    "bg": "#0d1410",
    "bgElevated": "#14201a",
    "bgSubtle": "#1c2b22",
    "text": "#e8efe5",
    "textMuted": "#8a9d8e",
    "border": "#2a3e30",
    "accent": "#a8c97a",
    "accentText": "#0d1410",
    "success": "#7fb069",
    "warning": "#e0a458",
    "danger": "#d96868",
    "bgHover": "#19241c",
    "bgActive": "#223526",
    "textInverse": "#0d1410",
    "borderStrong": "#3a5540",
    "focusRing": "#a8c97a",
    "info": "#6fa8b3",
    "link": "#b8d88a",
    "codeBg": "#0a1108",
    "overlay": "rgba(13,20,16,0.7)"
  },
  "typography": {
    "fontFamily": {
      "body": "'Lora', Georgia, serif",
      "heading": "'Lora', Georgia, serif",
      "mono": "'JetBrains Mono', monospace"
    },
    "fontSize": { "xs": "12px", "sm": "13px", "base": "14px", "lg": "17px", "xl": "21px", "2xl": "28px" },
    "fontWeight": { "normal": 400, "medium": 600, "bold": 700 },
    "lineHeight": { "tight": 1.3, "normal": 1.55, "loose": 1.8 }
  },
  "spacing": { "unit": "4px", "xs": "4px", "sm": "8px", "md": "12px", "lg": "20px", "xl": "28px", "2xl": "44px" },
  "radius": { "none": "0", "sm": "4px", "md": "8px", "lg": "12px", "full": "9999px" },
  "shadows": {
    "none": "none",
    "sm": "0 1px 2px rgba(0,0,0,0.30)",
    "md": "0 4px 12px rgba(0,0,0,0.40)",
    "lg": "0 12px 32px rgba(0,0,0,0.50)",
    "button": "0 1px 2px rgba(0,0,0,0.40)",
    "input": "0 1px 2px rgba(0,0,0,0.25)",
    "card": "0 2px 8px rgba(0,0,0,0.35)",
    "focus": "0 0 0 3px rgba(168,201,122,0.40)",
    "inner": "inset 0 1px 2px rgba(0,0,0,0.40)",
    "glow": "0 0 24px rgba(168,201,122,0.35)"
  },
  "borders": { "width": "1px", "style": "solid" },
  "transitions": { "fast": "120ms ease", "normal": "200ms ease", "slow": "400ms ease" },
  "breakpoints": { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px", "2xl": "1536px" },
  "customCss": ""
}
```

---

## Common variations

**For different moods/eras, swap the palette hue + saturation:**

| Mood | Suggested hue | Saturation |
|---|---|---|
| Nature/eco | Green (100-150) | 30-50% |
| Tech/corporate | Blue (210-230) | 60-80% |
| Luxury/premium | Purple/Black | 20-40% |
| Warm/friendly | Orange/Yellow | 50-70% |
| Cold/minimal | Gray-Blue | 10-20% |
| Bold/editorial | Red/Magenta | 70-90% |
| Vintage/retro | Brown/Sepia | 30-50% |

**For different eras:**

| Era | Typography hint |
|---|---|
| Modern (2020s) | Inter, Geist, IBM Plex Sans, JetBrains Mono |
| Editorial (2010s) | Source Serif Pro, Playfair Display, Lora |
| Retro (1980s-90s) | IBM Plex Mono, Space Grotesk, monospace-heavy |
| Brutalist (current) | Archivo Black, Space Mono, IBM Plex Mono |
| Classic (1950s-70s) | Source Serif Pro, Playfair Display, serif-led |
| Cyberpunk | Orbitron, VT323, JetBrains Mono, monospace |
| Soft SaaS | Inter, SF Pro, system-ui |
