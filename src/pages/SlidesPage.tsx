import { useState, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useTheme } from '../state/useTheme'

const slideTitles = ['Welcome', 'Components', 'Theming', 'Responsive', 'Customize']

export function SlidesPage() {
  const { theme } = useTheme()
  const [index, setIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const next = () => setIndex(i => Math.min(i + 1, slideTitles.length - 1))
  const prev = () => setIndex(i => Math.max(i - 1, 0))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className={fullscreen ? 'slides-fullscreen' : ''}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h2>Slide Deck</h2>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
            {index + 1} / {slideTitles.length}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setFullscreen(f => !f)}>
            {fullscreen ? 'Exit' : 'Fullscreen'}
          </Button>
        </div>
      </div>
      <Card>
        <div className="slide-card">
          <h1 className="slide-card__title">{slideTitles[index]}</h1>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: 480 }}>
            {theme.name} theme is active. Use ← → to navigate.
          </p>
        </div>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-md)' }}>
        <Button onClick={prev} disabled={index === 0}>Previous</Button>
        <Button variant="primary" onClick={next} disabled={index === slideTitles.length - 1}>Next</Button>
      </div>
    </div>
  )
}
