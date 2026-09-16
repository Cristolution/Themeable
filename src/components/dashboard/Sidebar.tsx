const sections = [
  { label: 'Overview', items: ['Dashboard', 'Activity', 'Calendar'] },
  { label: 'Workspace', items: ['Projects', 'Tasks', 'Files'] },
  { label: 'Account', items: ['Profile', 'Settings', 'Help'] }
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      {sections.map(s => (
        <div key={s.label} className="sidebar__section">
          <div className="sidebar__heading">{s.label}</div>
          <ul className="sidebar__list">
            {s.items.map((item, i) => (
              <li key={item}>
                <a href="#" className={`sidebar__link ${s.label === 'Overview' && i === 0 ? 'sidebar__link--active' : ''}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
}
