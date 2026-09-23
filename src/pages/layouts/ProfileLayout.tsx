import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Pill } from '../../components/ui/Pill'

const repos = [
  { name: 'analytical-engine', lang: 'Rust', stars: 12_403, description: 'A general-purpose computing framework.' },
  { name: 'difference-engine', lang: 'TypeScript', stars: 8_122, description: 'Visual programming for tabular data.' },
  { name: 'bernoulli-numbers', lang: 'Python', stars: 4_891, description: 'Number-theoretic utilities.' },
  { name: 'lovelace-lang', lang: 'C++', stars: 3_402, description: 'A language for symbolic computation.' },
]

const langColor: Record<string, string> = {
  Rust: '#f74c00',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  'C++': '#f34b7d',
}

const tabs = ['Overview', 'Repositories', 'Projects', 'Stars', 'Activity']

export function ProfileLayout() {
  const [tab, setTab] = useState(0)

  return (
    <>
      <div className="profile-cover" style={{ height: 160, background: 'linear-gradient(135deg, var(--color-accent), var(--color-bg-subtle))', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-md)', position: 'relative' }}>
        <div className="avatar avatar--xl" style={{ position: 'absolute', bottom: -32, left: 24, border: '4px solid var(--color-bg)', background: 'var(--color-surface)' }}>AD</div>
      </div>

      <div style={{ paddingLeft: 96, marginBottom: 'var(--space-lg)' }}>
        <h1 style={{ margin: 0 }}>Ada Lovelace</h1>
        <p style={{ color: 'var(--color-text-muted)', margin: 'var(--space-xs) 0' }}>@ada · she/her</p>
        <p style={{ margin: 'var(--space-sm) 0' }}>
          First programmer. Working on the analytical engine at <a href="#" style={{ color: 'var(--color-accent)' }}>analytical.engine</a>.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-sm)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          <span><strong style={{ color: 'var(--color-text)' }}>847</strong> followers</span>
          <span><strong style={{ color: 'var(--color-text)' }}>213</strong> following</span>
          <span>📍 London</span>
          <span>✉ ada@analytical.engine</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
        <Button>Follow</Button>
        <Button variant="secondary">Sponsor</Button>
      </div>

      <div className="tabs" style={{ marginBottom: 'var(--space-md)' }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`tabs__trigger${i === tab ? ' tabs__trigger--active' : ''}`}
            onClick={() => setTab(i)}
            aria-selected={i === tab}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-md)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {repos.map(r => (
            <Card key={r.name} title={
              <span>
                <a href="#" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>{r.name}</a>
              </span>
            } action={<span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>⭐ {r.stars.toLocaleString()}</span>}>
              <p style={{ margin: 0 }}>{r.description}</p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-sm)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: langColor[r.lang] }} />
                  {r.lang}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Card title="Highlights">
            <Pill tone="info">★ GitHub Star</Pill>
            <Pill style={{ marginLeft: 'var(--space-xs)' }}>Pro member</Pill>
          </Card>
          <Card title="Organizations">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-xs) 0' }}>
                <div className="avatar avatar--sm">AE</div>
                <span>Analytical Engine</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-xs) 0' }}>
                <div className="avatar avatar--sm">RS</div>
                <span>Royal Society</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}