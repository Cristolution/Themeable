import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { HomeIcon, SearchIcon, PlusIcon, ChatIcon, UserIcon, CheckIcon } from '../../components/ui/Icon'

const tabs = [
  { Icon: HomeIcon, label: 'Home' },
  { Icon: SearchIcon, label: 'Search' },
  { Icon: PlusIcon, label: 'New' },
  { Icon: ChatIcon, label: 'Inbox' },
  { Icon: UserIcon, label: 'Profile' },
]

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'setup', label: 'Setup' },
  { id: 'usage', label: 'Usage' },
  { id: 'api', label: 'API' },
  { id: 'changelog', label: 'Changelog' },
]

const steps = [
  { label: 'Cart', state: 'done' as const },
  { label: 'Shipping', state: 'done' as const },
  { label: 'Payment', state: 'current' as const },
  { label: 'Review', state: 'upcoming' as const },
  { label: 'Confirm', state: 'upcoming' as const },
]

const commandItems = [
  { id: 1, label: 'Toggle theme…', shortcut: '⌘ T' },
  { id: 2, label: 'Switch preset…', shortcut: '⌘ P' },
  { id: 3, label: 'Export as JSON', shortcut: '⌘ E' },
  { id: 4, label: 'Open editor', shortcut: '⌘ .' },
]

export function NavigationCategoryPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeSection, setActiveSection] = useState('overview')
  const [page, setPage] = useState(2)
  const [openAccordion, setOpenAccordion] = useState<string | null>('one')

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Navigation</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Tabs, breadcrumbs, pagination, steps, and on-this-page navigation.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        <Card title="Tabs" action={<span className="pill pill--neutral">top-level</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Switch between related views at the same level.
          </p>
          <div className="tabs">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                className={`tabs__trigger${i === activeTab ? ' tabs__trigger--active' : ''}`}
                onClick={() => setActiveTab(i)}
                aria-selected={i === activeTab}
                role="tab"
              >
                <span className="tab-bar__icon" aria-hidden="true"><tab.Icon size={16} /></span>
                {tab.label}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Bottom Navigation (Tab Bar)" action={<span className="pill pill--neutral">mobile</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The row of three to five icons pinned to the bottom of a phone app.
          </p>
          <nav className="tab-bar" aria-label="Primary">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                className={`tab-bar__item${i === activeTab ? ' tab-bar__item--active' : ''}`}
                onClick={() => setActiveTab(i)}
                aria-current={i === activeTab ? 'page' : undefined}
              >
                <span className="tab-bar__icon" aria-hidden="true"><tab.Icon size={20} /></span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </Card>

        <Card title="Breadcrumb" action={<span className="pill pill--neutral">web</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A trail showing where you are in a hierarchy.
          </p>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="#" className="breadcrumb__link">Home</a>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <a href="#" className="breadcrumb__link">Components</a>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__link breadcrumb__link--current" aria-current="page">Navigation</span>
          </nav>
        </Card>

        <Card title="Steps" action={<span className="pill pill--neutral">checkout / wizard</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Numbered circles showing progress through a multi-step flow.
          </p>
          <ol className="steps" aria-label="Checkout progress">
            {steps.map((s, i) => (
              <li key={s.label} className={`steps__item steps__item--${s.state}`}>
                <span className="steps__circle" aria-hidden="true">
                  {s.state === 'done' ? <CheckIcon size={14} /> : i + 1}
                </span>
                <span>{s.label}</span>
                {i < steps.length - 1 && <span className="steps__connector" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Pagination" action={<span className="pill pill--neutral">lists</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Numbered page buttons under a list.
          </p>
          <nav className="pagination" aria-label="Pagination">
            <button
              className="pagination__btn"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                className={`pagination__btn${n === page ? ' pagination__btn--active' : ''}`}
                onClick={() => setPage(n)}
                aria-current={n === page ? 'page' : undefined}
              >
                {n}
              </button>
            ))}
            <span className="pagination__dots" aria-hidden="true">…</span>
            <button className="pagination__btn" onClick={() => setPage(8)}>8</button>
            <button
              className="pagination__btn"
              onClick={() => setPage(p => Math.min(8, p + 1))}
              aria-label="Next page"
            >
              ›
            </button>
          </nav>
        </Card>

        <Card title="Scrollspy (On-this-page)" action={<span className="pill pill--neutral">docs</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A side rail whose active link follows the reader's position.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-lg)', alignItems: 'flex-start' }}>
            <nav aria-label="On this page" style={{ minWidth: 180 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                {sections.map(s => (
                  <li key={s.id}>
                    <button
                      onClick={() => setActiveSection(s.id)}
                      className={`sidebar__link${activeSection === s.id ? ' sidebar__link--active' : ''}`}
                      style={{ width: '100%', textAlign: 'left', background: activeSection === s.id ? 'var(--color-bg-subtle)' : 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div style={{ flex: 1, padding: 'var(--space-md)', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', minHeight: 140, color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
              Currently viewing: <strong style={{ color: 'var(--color-text)' }}>{sections.find(s => s.id === s.id)?.label ?? sections.find(s => s.id === activeSection)?.label}</strong>
            </div>
          </div>
        </Card>

        <Card title="Accordion" action={<span className="pill pill--neutral">expandable list</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Vertically stacked, collapsible sections. One or many open at once.
          </p>
          <div className="accordion">
            {[
              { id: 'one', title: 'Is it accessible?', body: 'Yes. WAI-ARIA compliant.' },
              { id: 'two', title: 'Is it styled?', body: 'Yes. Uses theme tokens.' },
              { id: 'three', title: 'Is it animated?', body: 'Yes. Smooth transitions.' },
            ].map(item => (
              <div key={item.id} className="accordion__item">
                <button
                  className="accordion__trigger"
                  aria-expanded={openAccordion === item.id}
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                >
                  {item.title}
                  <span aria-hidden="true">{openAccordion === item.id ? '−' : '+'}</span>
                </button>
                {openAccordion === item.id && (
                  <div className="accordion__content">{item.body}</div>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card title="Command (⌘K)" action={<span className="pill pill--neutral">command palette</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A keyboard-driven launcher with fuzzy search.
          </p>
          <div className="command">
            <input className="command__input" placeholder="Type a command or search…" />
            <ul className="command__list">
              {commandItems.map(item => (
                <li key={item.id} className="command__item">
                  <span>{item.label}</span>
                  <kbd className="kbd">{item.shortcut}</kbd>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card title="Navigation Menu" action={<span className="pill pill--neutral">mega menu</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A horizontal menu with hover-flyouts for nested content.
          </p>
          <nav className="nav-menu">
            <button className="nav-menu__trigger">Products ▾</button>
            <button className="nav-menu__trigger">Solutions ▾</button>
            <button className="nav-menu__trigger">Pricing</button>
            <button className="nav-menu__trigger">Docs</button>
          </nav>
        </Card>
      </div>
    </>
  )
}