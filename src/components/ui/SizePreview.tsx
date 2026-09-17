type Props = {
  kind: 'spacing' | 'fontSize' | 'radius'
  value: string  // e.g., "16px"
}

function parseNum(v: string): number {
  const m = v.trim().match(/^(-?\d*\.?\d+)/)
  return m ? parseFloat(m[1]) : 0
}

export function SizePreview({ kind, value }: Props) {
  const num = parseNum(value)
  const px = Math.max(2, Math.min(num, 200))  // cap for display

  if (kind === 'spacing') {
    return (
      <div className="size-preview" aria-hidden>
        <div style={{ width: px, height: 8, background: 'var(--color-accent)', borderRadius: 'var(--radius-sm)' }} />
      </div>
    )
  }

  if (kind === 'fontSize') {
    return (
      <div className="size-preview" aria-hidden>
        <span style={{ fontSize: Math.min(px, 32), color: 'var(--color-text)' }}>Aa</span>
      </div>
    )
  }

  // radius
  return (
    <div className="size-preview" aria-hidden>
      <div style={{
        width: 32,
        height: 32,
        background: 'var(--color-bg-subtle)',
        border: '2px solid var(--color-accent)',
        borderRadius: `${Math.min(px, 32)}px`
      }} />
    </div>
  )
}
