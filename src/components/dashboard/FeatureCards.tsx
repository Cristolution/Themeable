import { Card } from '../ui/Card'
import type { Feature } from '../../dashboard/sampleData'
import { BoltIcon, BoxIcon, PaletteIcon } from '../ui/Icon'

const iconMap = { bolt: BoltIcon, box: BoxIcon, palette: PaletteIcon }

export function FeatureCards({ features }: { features: Feature[] }) {
  return (
    <div className="features-grid">
      {features.map(f => {
        const Icon = iconMap[f.icon as keyof typeof iconMap]
        return (
          <Card key={f.id}>
            <div className="feature">
              <div className="feature__icon">{Icon ? <Icon size={28} /> : f.icon}</div>
              <div className="feature__title">{f.title}</div>
              <div className="feature__desc">{f.description}</div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}