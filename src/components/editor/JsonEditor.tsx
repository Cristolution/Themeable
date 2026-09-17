import { useMemo, useState } from 'react'
import type { Theme } from '../../theme/schema'
import { validateTheme } from '../../theme/validate'

type Props = {
  theme: Theme
  onChange: (next: Theme) => void
}

export function JsonEditor({ theme, onChange }: Props) {
  const [text, setText] = useState(() => JSON.stringify(theme, null, 2))
  const [error, setError] = useState<string | null>(null)

  const lineCount = useMemo(() => text.split('\n').length, [text])

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
    <div className="json-editor">
      <div className="json-editor__frame">
        <div className="json-editor__gutter" aria-hidden>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="json-editor__line-no">{i + 1}</div>
          ))}
        </div>
        <textarea
          className="json-editor__textarea"
          value={text}
          onChange={e => handleChange(e.target.value)}
          spellCheck={false}
          wrap="off"
        />
      </div>
      {error && <div className="json-editor__error">{error}</div>}
    </div>
  )
}