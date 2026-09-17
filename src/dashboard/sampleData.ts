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

export const lineData = [
  { name: 'Mon', value: 240 },
  { name: 'Tue', value: 320 },
  { name: 'Wed', value: 280 },
  { name: 'Thu', value: 410 },
  { name: 'Fri', value: 390 },
  { name: 'Sat', value: 520 },
  { name: 'Sun', value: 480 }
]

export const barData = [
  { name: 'Direct',   value: 420 },
  { name: 'Search',   value: 680 },
  { name: 'Social',   value: 310 },
  { name: 'Email',    value: 240 },
  { name: 'Referral', value: 180 },
  { name: 'Other',    value:  90 }
]

export type TableStatus = 'active' | 'pending' | 'archived'
export type TableRow = {
  id: string
  name: string
  status: TableStatus
  owner: string
  updated: string
}

export const tableRows: TableRow[] = [
  { id: '1', name: 'Onboarding flow redesign',   status: 'active',   owner: 'Alex Kim',    updated: '2 hours ago' },
  { id: '2', name: 'Q4 marketing campaign',      status: 'pending',  owner: 'Priya Shah',  updated: 'Yesterday' },
  { id: '3', name: 'Mobile app performance',     status: 'active',   owner: 'Diego Lopez', updated: '3 days ago' },
  { id: '4', name: 'Deprecated payment gateway', status: 'archived', owner: 'Mia Chen',    updated: 'Last week' },
  { id: '5', name: 'Customer support migration', status: 'pending',  owner: 'Sam Patel',   updated: 'Last week' }
]

export type ActivityEntry = {
  id: string
  who: string
  action: string
  target: string
  when: string
  tone: 'success' | 'warning' | 'danger' | 'neutral'
}

export const activity: ActivityEntry[] = [
  { id: '1', who: 'Alex Kim',    action: 'completed',  target: 'Onboarding flow redesign',   when: '2 hours ago', tone: 'success' },
  { id: '2', who: 'Priya Shah',  action: 'commented',  target: 'Q4 marketing campaign',      when: '4 hours ago', tone: 'neutral' },
  { id: '3', who: 'Diego Lopez', action: 'flagged',    target: 'Mobile app performance',     when: 'Yesterday',   tone: 'warning' },
  { id: '4', who: 'Mia Chen',    action: 'archived',   target: 'Deprecated payment gateway', when: '2 days ago',  tone: 'neutral' },
  { id: '5', who: 'Sam Patel',   action: 'failed',     target: 'Deploy pipeline',            when: '3 days ago',  tone: 'danger' }
]

export type Feature = {
  id: string
  icon: string
  title: string
  description: string
}

export const featureCards: Feature[] = [
  { id: 'f1', icon: '⚡', title: 'Live Preview',  description: 'Every theme edit updates the dashboard in real time.' },
  { id: 'f2', icon: '📦', title: 'JSON Export',   description: 'Save and share themes as plain JSON files.' },
  { id: 'f3', icon: '🎨', title: 'Custom CSS',    description: 'Drop in raw CSS for advanced overrides.' }
]