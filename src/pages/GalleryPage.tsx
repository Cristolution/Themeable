import { useState } from 'react'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'

// 12 placeholder gradients (deterministic from id)
const items = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  gradient: `linear-gradient(${(i * 30) % 360}deg, hsl(${(i * 37) % 360}, 70%, 60%), hsl(${(i * 67 + 90) % 360}, 60%, 40%))`
}))

export function GalleryPage() {
  const [openId, setOpenId] = useState<number | null>(null)

  const open = items.find(i => i.id === openId)
  const next = () => setOpenId(id => (id ?? 0) % 12 + 1)
  const prev = () => setOpenId(id => ((id ?? 1) - 2 + 12) % 12 + 1)

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Gallery</h2>
      <div className="gallery-grid">
        {items.map(i => (
          <button key={i.id} className="gallery-tile" style={{ background: i.gradient }} onClick={() => setOpenId(i.id)} aria-label={`Open image ${i.id}`} />
        ))}
      </div>
      <Modal open={openId !== null} onClose={() => setOpenId(null)} title={open ? `Image ${open.id}` : ''}>
        {open && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ background: open.gradient, aspectRatio: '16/9', borderRadius: 'var(--radius-md)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={prev}>Previous</Button>
              <span style={{ alignSelf: 'center', color: 'var(--color-text-muted)' }}>{open.id} / 12</span>
              <Button onClick={next}>Next</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
