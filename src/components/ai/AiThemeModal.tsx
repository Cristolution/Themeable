import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { AiPromptBuilder } from './AiPromptBuilder'
import { extractThemeJson } from '../../theme/aiPrompt'
import { detectAndParse } from '../../theme/io'

type Props = {
  open: boolean
  onClose: () => void
  /** Same handler as the file import — receives the cleaned JSON text. */
  onImportText: (text: string, filename: string) => void
}

export function AiThemeModal({ open, onClose, onImportText }: Props) {
  const [reply, setReply] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleApply = () => {
    const json = extractThemeJson(reply)
    // Validate here first so the error shows inline next to the textarea
    // instead of only as a toast behind the dialog.
    const result = detectAndParse(json, 'ai-theme.json')
    if (!result.ok) {
      setError(result.error)
      return
    }
    onImportText(json, 'ai-theme.json')
    setReply('')
    setError(null)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Generate a theme with AI" className="modal--wide">
      <div className="ai-modal">
        <section className="ai-modal__step">
          <h4 className="ai-modal__step-title"><span className="ai-modal__num">1</span> Copy the prompt</h4>
          <AiPromptBuilder />
        </section>
        <section className="ai-modal__step">
          <h4 className="ai-modal__step-title"><span className="ai-modal__num">2</span> Paste the AI's reply</h4>
          <textarea
            className="field__input ai-modal__reply"
            rows={6}
            placeholder={'Paste the whole reply — code fences and chatter are stripped automatically.\n\n```json\n{ "name": "…", "colors": { … } }\n```'}
            value={reply}
            onChange={e => { setReply(e.target.value); setError(null) }}
            aria-label="AI reply"
            aria-invalid={!!error}
          />
          {error && <p className="ai-modal__error" role="alert">Couldn't import: {error}</p>}
          <div className="ai-builder__actions">
            <Button onClick={handleApply} disabled={!reply.trim()}>Apply theme</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </div>
        </section>
      </div>
    </Modal>
  )
}
