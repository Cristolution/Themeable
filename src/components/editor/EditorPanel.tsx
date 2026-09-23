import { useState } from 'react'
import type { Theme } from '../../theme/schema'
import type { ExportFormat, ColorFormat } from '../../theme/io'
import { VisualEditor } from './VisualEditor'
import { CodeEditor } from './CodeEditor'

type Mode = 'visual' | 'editor'

type Props = {
  theme: Theme
  onChange: (next: Theme) => void
  exportFormat: ExportFormat
  colorFormat: ColorFormat
}

/**
 * Returns a short label for the export format, used to name the "Editor" tab.
 * Examples: "JSON", "CSS", "Tailwind v4", "Tailwind v3".
 */
function labelForFormat(fmt: ExportFormat): string {
  switch (fmt) {
    case 'json': return 'JSON'
    case 'css': return 'CSS'
    case 'tailwind4': return 'Tailwind v4'
    case 'tailwind3': return 'Tailwind v3'
  }
}

/**
 * Right-side editor rail. Two modes:
 *   - Visual: form-based token editor
 *   - Editor: text representation of the theme (JSON editable, others preview-only)
 *
 * The "Editor" tab label tracks the currently selected export format so users
 * know what they're looking at.
 */
export function EditorPanel({ theme, onChange, exportFormat, colorFormat }: Props) {
  const [mode, setMode] = useState<Mode>('visual')

  return (
    <aside className="editor-panel">
      <div className="editor-panel__tabs">
        <button
          className={`editor-panel__tab ${mode === 'visual' ? 'editor-panel__tab--active' : ''}`}
          onClick={() => setMode('visual')}
        >Visual</button>
        <button
          className={`editor-panel__tab ${mode === 'editor' ? 'editor-panel__tab--active' : ''}`}
          onClick={() => setMode('editor')}
          title={`Theme as ${labelForFormat(exportFormat)}`}
        >Editor ({labelForFormat(exportFormat)})</button>
      </div>
      <div className="editor-panel__body">
        {mode === 'visual'
          ? <VisualEditor theme={theme} onChange={onChange} />
          : <CodeEditor theme={theme} onChange={onChange} exportFormat={exportFormat} colorFormat={colorFormat} />
        }
      </div>
    </aside>
  )
}
