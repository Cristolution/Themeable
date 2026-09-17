import { Card } from '../ui/Card'
import type { Feature } from '../../dashboard/sampleData'

export function FeatureCards({ features }: { features: Feature[] }) {
  return (
    <div className="features-grid">
      {features.map(f => (
        <Card key={f.id}>
          <div className="feature">
            <div className="feature__icon">{f.icon}</div>
            <div className="feature__title">{f.title}</div>
            <div className="feature__desc">{f.description}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}