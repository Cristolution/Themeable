import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { CodeBlock } from '../components/ui/CodeBlock'
import { Link } from '../components/ui/Link'
import { faqItems, helpExamples } from '../dashboard/sampleData'

export function HelpPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Help</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-md)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Card title="Frequently asked questions">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqItems.map(item => (
                <div key={item.id} style={{ borderBottom: 'var(--border-width) var(--border-style) var(--color-border)' }}>
                  <button
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    style={{
                      width: '100%', textAlign: 'left',
                      background: 'transparent', border: 'none',
                      padding: 'var(--space-md) 0',
                      color: 'var(--color-text)',
                      fontWeight: 'var(--font-weight-medium)',
                      cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}
                  >
                    {item.q}
                    <span style={{ color: 'var(--color-text-muted)' }}>{openId === item.id ? '−' : '+'}</span>
                  </button>
                  {openId === item.id && (
                    <div style={{ paddingBottom: 'var(--space-md)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
          <Card title="Code examples">
            {helpExamples.map(ex => (
              <div key={ex.id} style={{ marginBottom: 'var(--space-md)' }}>
                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-xs)' }}>{ex.label}</div>
                <CodeBlock language={ex.id}>{ex.code}</CodeBlock>
              </div>
            ))}
          </Card>
        </div>
        <Card title="Support">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <div style={{ fontWeight: 'var(--font-weight-medium)' }}>Documentation</div>
              <Link href="https://example.com/docs">Read the full docs →</Link>
            </div>
            <div>
              <div style={{ fontWeight: 'var(--font-weight-medium)' }}>Email</div>
              <Link href="mailto:support@example.com">support@example.com</Link>
            </div>
            <div>
              <div style={{ fontWeight: 'var(--font-weight-medium)' }}>Community</div>
              <Link href="https://example.com/community" external>Join the community</Link>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}