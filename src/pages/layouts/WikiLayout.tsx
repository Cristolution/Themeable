import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Pill } from '../../components/ui/Pill'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'history', label: 'History' },
  { id: 'design', label: 'Design principles' },
  { id: 'usage', label: 'Usage examples' },
  { id: 'criticism', label: 'Criticism' },
  { id: 'references', label: 'References' },
]

export function WikiLayout() {
  const [active, setActive] = useState('overview')

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 'var(--space-xl)' }}>
        <article>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>From the encyclopedia</div>
          <h1 style={{ margin: 'var(--space-xs) 0' }}>Analytical Engine</h1>
          <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', margin: '0 0 var(--space-lg)' }}>
            A proposed mechanical general-purpose computer designed by Charles Babbage,
            with contributions from Ada Lovelace.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
            <Pill tone="info">computing</Pill>
            <Pill>history</Pill>
            <Pill>19th century</Pill>
          </div>

          <section id="overview" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2>Overview</h2>
            <p>
              The Analytical Engine was a proposed mechanical general-purpose computer,
              conceived in 1837. It used punched cards inspired by the Jacquard loom for
              input and output, and would have been capable of arbitrary computational
              sequences including conditional branching, loops, and memory.
            </p>
            <p>
              The design was never completed in Babbage's lifetime, but Lovelace's notes on
              it are widely considered the first computer program.
            </p>
          </section>

          <section id="history" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2>History</h2>
            <p>
              Babbage began the project in 1837, after his earlier Difference Engine.
              The machine was intended to be steam-powered, about the size of a locomotive,
              and use brass gears and rods for arithmetic.
            </p>
            <p>
              Funding disputes with the British government halted construction around 1842.
              A partial mill and printing apparatus were assembled in 1906 and again in 1991,
              demonstrating that the design was buildable.
            </p>
          </section>

          <section id="design" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2>Design principles</h2>
            <p>The Analytical Engine separated its components into four distinct parts:</p>
            <ul>
              <li><strong>The Mill</strong> — the arithmetic logic unit, performing all calculations</li>
              <li><strong>The Store</strong> — memory, holding up to 1,000 numbers of 50 digits each</li>
              <li><strong>The Reader</strong> — input via punched cards</li>
              <li><strong>The Printer</strong> — output, also via punched cards or printed pages</li>
            </ul>
            <p>
              This separation of storage from processing would not be matched in commercial
              computers until the 1960s.
            </p>
          </section>

          <section id="usage" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2>Usage examples</h2>
            <p>
              Lovelace's Note G includes a detailed algorithm for the computation of
              Bernoulli numbers on the Engine — often called the first computer program.
            </p>
            <pre className="code-block">
              <code>{`function bernoulli(n) {
  // Note G, Lovelace 1843
  let A = 1
  for (let i = 1; i <= n; i++) {
    A = A * (n - i + 1) / i
  }
  return A
}`}</code>
            </pre>
          </section>

          <section id="criticism" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2>Criticism</h2>
            <p>
              The Engine was never built at scale, leading some historians to question
              whether it would have functioned reliably. Modern reconstructions in 1991
              answered part of that concern, but the original design's mechanical tolerances
              would have been challenging to mass-produce with 19th-century tooling.
            </p>
            <blockquote className="blockquote">
              "The Analytical Engine might have been a marvel, but the difference between
              a working prototype and a working product is the difference between a curiosity
              and a revolution."
              <footer style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                — Historian's Quarterly, 1942
              </footer>
            </blockquote>
          </section>

          <section id="references" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2>References</h2>
            <ol>
              <li>Babbage, C. (1864). <em>Passages from the Life of a Philosopher</em>.</li>
              <li>Lovelace, A. (1843). <em>Notes on the Analytical Engine</em>.</li>
              <li>Swade, D. (2000). <em>The Cogwheel Brain</em>.</li>
            </ol>
          </section>
        </article>

        <aside style={{ position: 'sticky', top: 'var(--space-md)', alignSelf: 'start' }}>
          <Card title="On this page">
            <nav aria-label="On this page">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {sections.map(s => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setActive(s.id)
                        document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className={`sidebar__link${active === s.id ? ' sidebar__link--active' : ''}`}
                      style={{ width: '100%', textAlign: 'left', background: active === s.id ? 'var(--color-bg-subtle)' : 'transparent', border: 'none', cursor: 'pointer', padding: 'var(--space-xs) var(--space-sm)', borderRadius: 'var(--radius-sm)' }}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </Card>
        </aside>
      </div>
    </>
  )
}