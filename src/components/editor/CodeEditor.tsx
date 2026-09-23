import { useEffect, useMemo, useState } from 'react'
import type { Theme } from '../../theme/schema'
import type { ExportFormat, ColorFormat, PartialTheme } from '../../theme/io'
import {
  exportCss, exportTailwind3, exportTailwind4,
  importCss, mergeTheme, parseColor, rgbaToHex,
} from '../../theme/io'
import { validateTheme } from '../../theme/validate'

type Props = {
  theme: Theme
  onChange: (next: Theme) => void
  /** Which format to render the theme as. */
  exportFormat: ExportFormat
  /** Color format used for CSS / Tailwind representations (hex / rgb / hsl / oklch). */
  colorFormat: ColorFormat
}

/**
 * Editor section body — shows the theme as JSON, CSS :root, Tailwind v4 @theme,
 * or Tailwind v3 module.exports. All four modes are editable: edits parse on
 * the fly and push a merged theme back via onChange. Invalid text surfaces an
 * error and leaves the theme untouched.
 */
export function CodeEditor({ theme, onChange, exportFormat, colorFormat }: Props) {
  return (
    <div className="code-editor">
      {exportFormat === 'json' ? (
        <JsonBody theme={theme} onChange={onChange} />
      ) : exportFormat === 'css' ? (
        <EditableBody
          theme={theme}
          onChange={onChange}
          exportFormat="css"
          colorFormat={colorFormat}
        />
      ) : exportFormat === 'tailwind4' ? (
        <EditableBody
          theme={theme}
          onChange={onChange}
          exportFormat="tailwind4"
          colorFormat={colorFormat}
        />
      ) : (
        <EditableBody
          theme={theme}
          onChange={onChange}
          exportFormat="tailwind3"
          colorFormat={colorFormat}
        />
      )}
    </div>
  )
}

// -------------------- JSON (editable, no color format constraint) --------------------

function JsonBody({ theme, onChange }: { theme: Theme; onChange: (next: Theme) => void }) {
  const [text, setText] = useState(() => JSON.stringify(theme, null, 2))
  const [error, setError] = useState<string | null>(null)

  // Signature of the theme — used to detect when the parent has supplied a new
  // theme (e.g. preset selection, import) without comparing full objects on
  // every keystroke.
  const themeSignature = useMemo(() => JSON.stringify(theme), [theme])

  // Sync text from prop changes. Rules:
  //   1. If current text parses and canonicalizes to the incoming theme, leave it
  //      alone — the user already has matching content (avoid cursor jumps).
  //   2. If current text is invalid (mid-edit), leave it alone — don't stomp on
  //      the user's in-flight edits.
  //   3. Otherwise, replace text with the canonical JSON for the new theme.
  useEffect(() => {
    let parsed: unknown
    try {
      parsed = JSON.parse(text)
    } catch {
      return // invalid — preserve
    }
    if (JSON.stringify(parsed) === themeSignature) return // already matches
    setText(JSON.stringify(theme, null, 2))
    // We intentionally depend on `themeSignature` rather than `theme` to avoid
    // firing on every render. `theme` is the canonical source for the reset.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeSignature])

  const handleChange = (next: string) => {
    setText(next)
    try {
      const parsed: unknown = JSON.parse(next)
      const result = validateTheme(parsed)
      if (result.ok) {
        setError(null)
        onChange(result.theme)
      } else {
        setError(result.errors.join('; '))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'invalid JSON')
    }
  }

  return (
    <BodyFrame
      value={text}
      onChange={handleChange}
      error={error}
      ariaLabel="Theme JSON"
    />
  )
}

// -------------------- CSS / Tailwind editable bodies --------------------

function EditableBody({
  theme,
  onChange,
  exportFormat,
  colorFormat,
}: {
  theme: Theme
  onChange: (next: Theme) => void
  exportFormat: 'css' | 'tailwind4' | 'tailwind3'
  colorFormat: ColorFormat
}) {
  const exported = useMemo(() => {
    switch (exportFormat) {
      case 'css': return exportCss(theme, colorFormat).text
      case 'tailwind4': return exportTailwind4(theme, colorFormat).text
      case 'tailwind3': return exportTailwind3(theme, colorFormat).text
    }
  }, [theme, exportFormat, colorFormat])

  const [text, setText] = useState(exported)
  const [error, setError] = useState<string | null>(null)

  // Signature of the *exported* text — used to detect when the parent supplied
  // a new theme and we should reset. Comparing exported text avoids resetting
  // when the user has typed edits that produce the same export (e.g. trailing
  // whitespace changes).
  const exportedSignature = useMemo(() => exported, [exported])

  useEffect(() => {
    // When the parent supplies a new theme or switches the color format, the
    // exported text changes. Reset the textarea to the canonical export — unless
    // the user has edits in flight that produce the same canonical output (e.g.
    // they edited comments that don't affect the export). In that case the
    // text they're looking at is still useful; leave it alone.
    if (text === exportedSignature) return
    // Check whether the user's current text, when re-parsed and re-exported,
    // matches the new canonical form. If so, they're effectively in sync.
    const result = tryParse(text, theme, colorFormat)
    if (result.ok && result.exportedText === exportedSignature) return
    // Either the user's text is invalid, or it canonicalizes to something
    // different from what the parent now wants. Reset to the new export.
    setText(exportedSignature)
    if (result.ok) {
      setError(null)
      onChange(result.merged)
    } else {
      setError(result.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportedSignature])

  const handleChange = (next: string) => {
    setText(next)
    const result = tryParse(next, theme, colorFormat)
    if (result.ok) {
      setError(null)
      onChange(result.merged)
    } else {
      setError(result.error)
    }
  }

  return (
    <BodyFrame
      value={text}
      onChange={handleChange}
      error={error}
      ariaLabel={`Theme ${exportFormat}`}
      hint={
        <>
          Editable {exportFormat.toUpperCase()} — colors use{' '}
          <strong>{colorFormat}</strong>. Edits parse on the fly.
        </>
      }
    />
  )
}

// -------------------- Shared frame --------------------

function BodyFrame({
  value,
  onChange,
  error,
  ariaLabel,
  hint,
}: {
  value: string
  onChange: (next: string) => void
  error: string | null
  ariaLabel: string
  hint?: React.ReactNode
}) {
  const lineCount = useMemo(() => value.split('\n').length, [value])
  return (
    <div className="json-editor">
      {hint && <div className="json-editor__hint" role="status">{hint}</div>}
      <div className="json-editor__frame">
        <div className="json-editor__gutter" aria-hidden>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="json-editor__line-no">{i + 1}</div>
          ))}
        </div>
        <textarea
          className="json-editor__textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
          spellCheck={false}
          wrap="off"
          aria-label={ariaLabel}
        />
      </div>
      {error && <div className="json-editor__error">{error}</div>}
    </div>
  )
}

// -------------------- Parse helper --------------------

type ParseResult =
  | { ok: true; merged: Theme; exportedText: string }
  | { ok: false; error: string }

function tryParse(text: string, theme: Theme, colorFormat: ColorFormat): ParseResult {
  const result = importCss(text)
  if (!result.ok) {
    return { ok: false, error: result.error }
  }

  // The theme stores colors as hex (except `overlay`, which can be rgba).
  // Convert whatever color format the user typed back to hex so the merged
  // theme passes validateTheme.
  const partial = result.partial
  if (partial.colors) {
    const colorError = convertColorsToHex(partial, colorFormat)
    if (colorError) return { ok: false, error: colorError }
  }

  const merged = mergeTheme(theme, partial)
  // Validate the merged result against the full schema before pushing it up.
  const fullValidation = validateTheme(merged)
  if (!fullValidation.ok) {
    return { ok: false, error: fullValidation.errors[0] ?? 'invalid theme after merge' }
  }

  // Re-export the merged theme to canonicalize the textarea text (so re-emitted
  // CSS matches what the exporter would produce). Used by the prop-sync effect.
  const exportedText = exportCss(fullValidation.theme, colorFormat).text
  return { ok: true, merged: fullValidation.theme, exportedText }
}

function convertColorsToHex(partial: PartialTheme, colorFormat: ColorFormat): string | null {
  if (!partial.colors) return null
  const colors = partial.colors as Record<string, unknown>
  for (const [slot, value] of Object.entries(colors)) {
    if (typeof value !== 'string') {
      return `colors.${slot} must be a string`
    }
    const rgba = parseColor(value)
    if (!rgba) return `colors.${slot} is not a valid color: ${value}`
    // Require the typed value to match the chosen format. This keeps the
    // editor and the exporter in agreement — no surprise round-trip.
    if (!matchesFormat(value, colorFormat)) {
      return `colors.${slot} = "${value}" is not in ${colorFormat} format`
    }
    // Normalize to hex for storage. `overlay` is allowed to stay in rgba form
    // per the schema, so we only convert non-overlay slots.
    if (slot !== 'overlay') {
      colors[slot] = rgbaToHex(rgba)
    } else {
      // overlay: preserve the user-typed string (rgba/rgb/hex)
      colors[slot] = value
    }
  }
  return null
}

function matchesFormat(value: string, fmt: ColorFormat): boolean {
  const v = value.trim()
  switch (fmt) {
    case 'hex':
      return /^#[0-9a-fA-F]{3,8}$/.test(v)
    case 'rgb':
      return /^rgba?\(/i.test(v)
    case 'hsl':
      return /^hsla?\(/i.test(v)
    case 'oklch':
      return /^oklch\(/i.test(v)
  }
}
