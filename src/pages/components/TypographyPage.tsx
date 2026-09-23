import { Card } from '../../components/ui/Card'

export function TypographyPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Typography</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Headings, body text, code, lists, quotes, and directional helpers.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        <Card title="Headings" action={<span className="pill pill--neutral">H1–H6</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Six levels of headings, from display to caption.
          </p>
          <h1 style={{ margin: 'var(--space-sm) 0' }}>H1 — Display heading</h1>
          <h2 style={{ margin: 'var(--space-sm) 0' }}>H2 — Section heading</h2>
          <h3 style={{ margin: 'var(--space-sm) 0' }}>H3 — Subsection heading</h3>
          <h4 style={{ margin: 'var(--space-sm) 0' }}>H4 — Group heading</h4>
          <h5 style={{ margin: 'var(--space-sm) 0' }}>H5 — Small heading</h5>
          <h6 style={{ margin: 'var(--space-sm) 0' }}>H6 — Caption heading</h6>
        </Card>

        <Card title="Body & Lead" action={<span className="pill pill--neutral">paragraphs</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The default body text and a larger, attention-grabbing lead.
          </p>
          <p className="lead" style={{ marginBottom: 'var(--space-sm)' }}>
            This is a lead paragraph — used to introduce a section with a slightly larger size.
          </p>
          <p style={{ margin: 0 }}>
            This is the default body text. It uses a comfortable line-height and the theme's
            primary font, optimised for reading at length.
          </p>
        </Card>

        <Card title="Muted text" action={<span className="pill pill--neutral">secondary</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Secondary, less-emphasised text for captions, hints, and metadata.
          </p>
          <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
            Last edited 2 hours ago by Ada Lovelace.
          </p>
        </Card>

        <Card title="Blockquote" action={<span className="pill pill--neutral">citation</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A quotation, offset visually from the surrounding text.
          </p>
          <blockquote className="blockquote">
            "The science of operations, as derived from mathematics more especially, is a science of itself,
            and has its own abstract truth and value."
            <footer style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
              — Ada Lovelace
            </footer>
          </blockquote>
        </Card>

        <Card title="Lists" action={<span className="pill pill--neutral">ordered + unordered</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Bulleted and numbered lists.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
            <ul>
              <li>Unordered item one</li>
              <li>Unordered item two</li>
              <li>Unordered item three</li>
            </ul>
            <ol>
              <li>First</li>
              <li>Second</li>
              <li>Third</li>
            </ol>
          </div>
        </Card>

        <Card title="Inline Code & Kbd" action={<span className="pill pill--neutral">monospace</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Inline code, code blocks, and keyboard hints.
          </p>
          <p style={{ marginBottom: 'var(--space-sm)' }}>
            Use <code className="inline-code">useState</code> to manage local component state.
          </p>
          <pre className="code-block">
            <code>{`const [count, setCount] = useState(0)`}</code>
          </pre>
          <p style={{ marginTop: 'var(--space-sm)' }}>
            Press <kbd className="kbd">⌘</kbd> + <kbd className="kbd">K</kbd> to open the command palette.
          </p>
        </Card>

        <Card title="Direction" action={<span className="pill pill--neutral">RTL / LTR</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Bi-directional text support — useful for Arabic and Hebrew content.
          </p>
          <div dir="rtl" style={{ padding: 'var(--space-sm)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ margin: 0 }}>هذا مثال على نص من اليمين إلى اليسار.</p>
          </div>
        </Card>
      </div>
    </>
  )
}