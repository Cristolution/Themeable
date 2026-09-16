export type Kpi = {
  id: string
  label: string
  value: string
  delta: string
  deltaTone: 'success' | 'danger' | 'neutral'
}

export const kpis: Kpi[] = [
  { id: 'rev',   label: 'Revenue',      value: '$48,210', delta: '+12.4%', deltaTone: 'success' },
  { id: 'users', label: 'Active Users', value: '2,341',   delta: '+5.1%',  deltaTone: 'success' },
  { id: 'conv',  label: 'Conversion',   value: '3.62%',   delta: '-0.8%',  deltaTone: 'danger' },
  { id: 'aov',   label: 'Avg. Order',   value: '$84.10',  delta: '0.0%',   deltaTone: 'neutral' }
]