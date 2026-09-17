import { useState } from 'react'
import type { Theme } from '../../theme/schema'
import { VisualEditor } from './VisualEditor'

type Mode = 'visual' | 'json'

type Props = {
  theme: Theme
  onChange: (next: Theme) => void
  jsonSlot?: React.ReactNode // JsonEditor rendered by App in Task 19
}

export function EditorPanel({ theme, onChange, jsonSlot }: Props) {
  const [mode, setMode] = useState<Mode>('visual')

  return (
    <aside className="editor-panel">
      <div className="editor-panel__tabs">
        <button
          className={`editor-panel__tab ${mode === 'visual' ? 'editor-panel__tab--active' : ''}`}
          onClick={() => setMode('visual')}
        >Visual</button>
        <button
          className={`editor-panel__tab ${mode === 'json' ? 'editor-panel__tab--active' : ''}`}
          onClick={() => setMode('json')}
        >JSON</button>
      </div>
      <div className="editor-panel__body">
        {mode === 'visual' ? <VisualEditor theme={theme} onChange={onChange} /> : jsonSlot}
      </div>
    </aside>
  )
}