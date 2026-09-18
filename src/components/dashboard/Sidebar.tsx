import { NavLink } from 'react-router-dom'

const sections = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Activity', to: '/activity' },
      { label: 'Calendar', to: '/calendar' }
    ]
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Projects', to: '/projects' },
      { label: 'Tasks', to: '/tasks' },
      { label: 'Files', to: '/files' }
    ]
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile', to: '/profile' },
      { label: 'Settings', to: '/settings' },
      { label: 'Help', to: '/help' }
    ]
  },
  {
    label: 'Demos',
    items: [
      { label: 'Slides', to: '/demos/slides' },
      { label: 'Chat', to: '/demos/chat' },
      { label: 'Kanban', to: '/demos/kanban' },
      { label: 'Gallery', to: '/demos/gallery' },
      { label: 'Habits', to: '/demos/habits' },
      { label: 'Finance', to: '/demos/finance' },
      { label: 'Notes', to: '/demos/notes' },
      { label: 'Quiz', to: '/demos/quiz' },
      { label: 'Social', to: '/demos/social' }
    ]
  }
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
