import { Card } from '../ui/Card'
import { Pill } from '../ui/Pill'

type Props = {
  label: string
  value: string
  delta: string
  deltaTone: 'success' | 'danger' | 'neutral'
}

export function StatCard({ label, value, delta, deltaTone }: Props) {
  return (
    <Card>
      <div className="stat">
        <div className="stat__label">{label}</div>
        <div className="stat__value">{value}</div>
        <div className="stat__delta">
          <Pill tone={deltaTone}>{delta}</Pill>
        </div>
      </div>
    </Card>
  )
}