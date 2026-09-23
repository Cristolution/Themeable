import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export function LayoutPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Layout</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Containers, surfaces, and structural primitives that arrange other content.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        <Card title="Card" action={<span className="pill pill--neutral">surface</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A bordered surface with optional header and action slot. The atomic container for grouped content.
          </p>
          <Card title="Inner card" action={<Button size="sm" variant="ghost">Action</Button>}>
            Cards nest. The inner card uses the same primitive.
          </Card>
        </Card>

        <Card title="Separator" action={<span className="pill pill--neutral">divider</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A horizontal or vertical line that groups or divides content.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div>Section one</div>
            <div className="separator" aria-hidden="true" />
            <div>Section two</div>
            <div className="separator" aria-hidden="true" />
            <div>Section three</div>
          </div>
        </Card>

        <Card title="Aspect Ratio" action={<span className="pill pill--neutral">16:9</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Reserves space for media while loading, preventing layout shift.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <div className="aspect-ratio aspect-ratio--square" style={{ width: 120, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', color: 'var(--color-text-muted)' }}>
              1:1
            </div>
            <div className="aspect-ratio aspect-ratio--video" style={{ width: 200, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', color: 'var(--color-text-muted)' }}>
              16:9
            </div>
          </div>
        </Card>

        <Card title="Resizable" action={<span className="pill pill--neutral">panels</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Two panels separated by a draggable divider — IDE-style side-by-side layouts.
          </p>
          <div className="resizable" style={{ height: 140 }}>
            <div className="resizable__pane" style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
              <strong>Left pane</strong>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', margin: 'var(--space-xs) 0 0' }}>
                File tree or sidebar
              </p>
            </div>
            <div className="resizable__handle" aria-hidden="true" />
            <div className="resizable__pane" style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', flex: 1 }}>
              <strong>Right pane</strong>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', margin: 'var(--space-xs) 0 0' }}>
                Editor or content area
              </p>
            </div>
          </div>
        </Card>

        <Card title="Scroll Area" action={<span className="pill pill--neutral">overflow</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A scrollable region with custom scrollbar styling.
          </p>
          <div className="scroll-area" style={{ height: 100, padding: 'var(--space-sm)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} style={{ padding: 'var(--space-xs) 0', borderBottom: '1px solid var(--color-border)' }}>
                Scroll item {i + 1}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}