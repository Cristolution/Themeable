import { useMemo, useState } from 'react'
import { Button } from '../ui/Button'
import { AI_PROMPT_IDEAS, buildThemePrompt } from '../../theme/aiPrompt'
import { copyText } from '../../lib/clipboard'

type Props = {
  /** Shown above the textarea. */
  label?: string
}

/**
 * Describe-a-vibe box that builds the AI prompt and copies it. Shared by the
 * landing page and the in-app "AI theme" dialog.
 */
export function AiPromptBuilder({ label = 'Describe the theme you want' }: Props) {
  const [description, setDescription] = useState('')
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle')
  const [showPrompt, setShowPrompt] = useState(false)
  const prompt = useMemo(() => buildThemePrompt(description), [description])

  const handleCopy = async () => {
    const ok = await copyText(prompt)
    setCopied(ok ? 'ok' : 'fail')
    window.setTimeout(() => setCopied('idle'), 2200)
  }

  return (
    <div className="ai-builder">
      <label className="ai-builder__label" htmlFor="ai-builder-input">{label}</label>
      <textarea
        id="ai-builder-input"
        className="field__input ai-builder__input"
        rows={3}
        placeholder="e.g. Cozy coffee shop at golden hour — warm browns, cream paper, rounded serif headings"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="ai-builder__ideas" aria-label="Ideas">
        {AI_PROMPT_IDEAS.map(idea => (
          <button key={idea} type="button" className="ai-builder__idea" onClick={() => setDescription(idea)}>
            {idea.split(':')[0]}
          </button>
        ))}
      </div>
      <div className="ai-builder__actions">
        <Button onClick={handleCopy}>
          {copied === 'ok' ? '✓ Copied to clipboard' : copied === 'fail' ? 'Copy failed — select below' : 'Copy AI prompt'}
        </Button>
        <Button variant="ghost" onClick={() => setShowPrompt(s => !s)} aria-expanded={showPrompt}>
          {showPrompt ? 'Hide prompt' : 'Preview prompt'}
        </Button>
      </div>
      <p className="ai-builder__hint">
        Paste it into ChatGPT, Claude, Gemini or any chat AI. It answers with a theme JSON you can import.
      </p>
      {(showPrompt || copied === 'fail') && (
        <textarea
          className="field__input ai-builder__prompt"
          readOnly
          rows={10}
          value={prompt}
          aria-label="Generated AI prompt"
          onFocus={e => e.currentTarget.select()}
        />
      )}
    </div>
  )
}
