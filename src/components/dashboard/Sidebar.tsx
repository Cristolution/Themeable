import { NavLink } from 'react-router-dom'

const sections = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: '/dashboard' },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Overview', to: '/components' },
      { label: 'Layout', to: '/components/layout' },
      { label: 'Forms', to: '/components/forms' },
      { label: 'Data Display', to: '/components/data-display' },
      { label: 'Feedback', to: '/components/feedback' },
      { label: 'Overlay', to: '/components/overlay' },
      { label: 'Navigation', to: '/components/navigation' },
      { label: 'Typography', to: '/components/typography' },
      { label: 'Media', to: '/components/media' },
    ],
  },
  {
    label: 'Layouts',
    items: [
      { label: 'Dashboard', to: '/layouts/dashboard' },
      { label: 'Settings', to: '/layouts/settings' },
      { label: 'Profile', to: '/layouts/profile' },
      { label: 'Social', to: '/layouts/social' },
      { label: 'Wiki', to: '/layouts/wiki' },
      { label: 'Rich text', to: '/layouts/rich-text' },
    ],
  },
  {
    label: 'Demos',
    items: [
      { label: 'Slides', to: '/demos/slides' },
      { label: 'Chat', to: '/demos/chat' },
      { label: 'Kanban', to: '/demos/kanban' },
      { label: 'Habits', to: '/demos/habits' },
      { label: 'Finance', to: '/demos/finance' },
      { label: 'Notes', to: '/demos/notes' },
      { label: 'Quiz', to: '/demos/quiz' },
      { label: 'Social', to: '/demos/social' },
    ],
  },
  {
    label: 'Charts',
    items: [
      { label: 'Line', to: '/charts/line' },
      { label: 'Area', to: '/charts/area' },
      { label: 'Pie', to: '/charts/pie' },
      { label: 'Scatter', to: '/charts/scatter' },
      { label: 'Radar', to: '/charts/radar' },
    ],
  },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      {sections.map(s => (
        <div key={s.label} className="sidebar__section">
          <div className="sidebar__heading">{s.label}</div>
          <ul className="sidebar__list">
            {s.items.map(item => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    'sidebar__link' + (isActive ? ' sidebar__link--active' : '')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}