import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'

const categories = [
  {
    slug: 'layout',
    name: 'Layout',
    description: 'Containers, surfaces, and structural primitives that arrange other content.',
    count: 8,
  },
  {
    slug: 'forms',
    name: 'Forms',
    description: 'Inputs, selects, checkboxes, and the labelled-field pattern.',
    count: 14,
  },
  {
    slug: 'data-display',
    name: 'Data Display',
    description: 'Avatars, badges, tables, charts, and other presentational primitives.',
    count: 14,
  },
  {
    slug: 'feedback',
    name: 'Feedback',
    description: 'Alerts, toasts, spinners, and progress indicators.',
    count: 5,
  },
  {
    slug: 'overlay',
    name: 'Overlay',
    description: 'Dialogs, drawers, menus, popovers, tooltips, and other floating surfaces.',
    count: 10,
  },
  {
    slug: 'navigation',
    name: 'Navigation',
    description: 'Tabs, breadcrumbs, pagination, steps, and on-this-page navigation.',
    count: 7,
  },
  {
    slug: 'typography',
    name: 'Typography',
    description: 'Headings, body text, code, lists, quotes, and directional helpers.',
    count: 10,
  },
  {
    slug: 'media',
    name: 'Media',
    description: 'Charts, calendars, carousels, and rich media primitives.',
    count: 4,
  },
]

export function ComponentsIndexPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Components</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Every primitive in the design system, organised like a real component library.
        Pick a category to see live examples.
      </p>
      <div className="component-category-grid">
        {categories.map(cat => (
          <Link key={cat.slug} to={`/components/${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card title={cat.name} action={<span className="pill pill--neutral">{cat.count}</span>}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
                {cat.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}