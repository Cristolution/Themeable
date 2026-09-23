import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'

const bento = [
  { label: 'Revenue', value: '$48.2k', span: 'big' as const },
  { label: 'Users', value: '2.4k', span: 'normal' as const },
  { label: 'Growth', value: '↑ 12%', span: 'normal' as const },
  { label: 'Signups today', value: '+9', span: 'wide' as const },
  { label: 'Churn', value: '1.2%', span: 'normal' as const },
  { label: 'Sessions', value: '14.7k', span: 'normal' as const }
]

const masonry = [
  { title: 'Onboarding', body: 'Welcome new users with a guided tour. Highlight key features and show value in the first session.', h: 160 },
  { title: 'Pricing', body: 'Three tiers — Starter, Pro, Team. Annual saves 20%.', h: 120 },
  { title: 'Analytics', body: 'Track signups, activations, retention, revenue. Filter by plan, region, and cohort.', h: 200 },
  { title: 'Status', body: 'All systems operational.', h: 80 },
  { title: 'Roadmap', body: 'Q3: Webhooks. Q4: SSO. Q1: Audit logs.', h: 140 },
  { title: 'Changelog', body: 'v4.2 ships today. Adds theme tokens, RTL, night mode.', h: 180 }
]

const marqueeItems = ['✦ Bold ideas', '◆ Built to scale', '⬢ Open by default', '▲ Made for makers', '● Crafted with care']

export function ContainersPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Containers & Layout</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        {/* Card variants */}
        <Card title="Card — basic, with media, with footer">
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The rectangle with media, title, body, and a footer — every part has a name.
          </p>
          <div className="features-grid">
            <div className="card">
              <div className="card__body">
                <h4 style={{ marginBottom: 'var(--space-xs)' }}>Plain card</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                  Just a header and body. Use it for settings panels and short lists.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card__media" aria-hidden="true" />
              <div className="card__body">
                <h4 style={{ marginBottom: 'var(--space-xs)' }}>With media</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                  Media slot above the title. Great for previews and articles.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card__body">
                <h4 style={{ marginBottom: 'var(--space-xs)' }}>With footer</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                  Footer row for actions or metadata.
                </p>
              </div>
              <div className="card__footer">
                <span>Updated 2 hours ago</span>
                <Button size="sm" variant="ghost">View</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Bento */}
        <Card title="Bento Grid" action={<span className="pill pill--neutral">mixed sizes</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            One grid, mixed tile sizes — a layout packed like a bento box.
          </p>
          <div className="bento">
            {bento.map(t => (
              <div key={t.label} className={`bento__tile${t.span === 'big' ? ' bento__tile--big' : t.span === 'wide' ? ' bento__tile--wide' : ''}`}>
                <span className="bento__label">{t.label}</span>
                <span className="bento__value">{t.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Masonry */}
        <Card title="Masonry Layout (Pinterest Grid)" action={<span className="pill pill--neutral">columns</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Cards of different heights packed into columns with no row gaps.
          </p>
          <div className="masonry">
            {masonry.map(m => (
              <div key={m.title} className="masonry__item" style={{ minHeight: m.h }}>
                <h4 style={{ marginBottom: 'var(--space-xs)' }}>{m.title}</h4>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Marquee */}
        <Card title="Marquee" action={<span className="pill pill--neutral">scrolling</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Content that auto-scrolls sideways in an endless loop.
          </p>
          <div className="marquee" aria-label="Highlights">
            <div className="marquee__track">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className="marquee__item">{item}</span>
              ))}
            </div>
          </div>
        </Card>

        {/* Lightbox */}
        <Card title="Lightbox" action={<span className="pill pill--neutral">dialog preview</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The click-to-enlarge image overlay that dims the page behind it.
          </p>
          <button className="lightbox" onClick={() => setLightboxOpen(true)} aria-label="Open image">
            <span className="lightbox__placeholder" aria-hidden="true" />
            <span className="lightbox__caption">Click to enlarge</span>
          </button>
          <Modal open={lightboxOpen} onClose={() => setLightboxOpen(false)} title="Lightbox preview">
            <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, var(--color-accent), var(--color-info))', borderRadius: 'var(--radius-md)' }} />
          </Modal>
        </Card>
      </div>
    </>
  )
}
