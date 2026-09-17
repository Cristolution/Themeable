import { Card } from '../ui/Card'
import type { ActivityEntry } from '../../dashboard/sampleData'

export function ActivityFeed({ entries, title = 'Recent Activity' }: { entries: ActivityEntry[]; title?: string }) {
  return (
    <Card title={title}>
      <ul className="activity">
        {entries.map(e => (
          <li key={e.id} className="activity__item">
            <span className={`activity__dot activity__dot--${e.tone}`} aria-hidden />
            <div className="activity__body">
              <div className="activity__line">
                <strong>{e.who}</strong> {e.action} <em>{e.target}</em>
              </div>
              <div className="activity__when">{e.when}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
