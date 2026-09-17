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

export const activityFilters = [
  { id: 'all', label: 'All' },
  { id: 'mentions', label: 'Mentions' },
  { id: 'comments', label: 'Comments' },
  { id: 'system', label: 'System' }
] as const

export const extendedActivity: ActivityEntry[] = [
  { id: '6', who: 'Lena Reed',   action: 'joined',     target: 'Marketing team',         when: '3 hours ago',  tone: 'success' },
  { id: '7', who: 'Omar Diaz',   action: 'closed',     target: 'Q4 retrospective',       when: 'Yesterday',    tone: 'success' },
  { id: '8', who: 'You',         action: 'were mentioned', target: 'in a comment',     when: 'Yesterday',    tone: 'neutral' },
  { id: '9', who: 'System',      action: 'automated backup completed', target: '',       when: '2 days ago',   tone: 'neutral' },
  { id: '10', who: 'Pia Park',   action: 'requested review', target: 'Settings PR #142',   when: '3 days ago',   tone: 'warning' }
]

export const upcomingEvents = [
  { id: 'e1', title: 'Team standup', when: 'Today, 10:00 AM', who: 'Engineering' },
  { id: 'e2', title: 'Design review', when: 'Today, 2:00 PM', who: 'Design' },
  { id: 'e3', title: 'Sprint planning', when: 'Tomorrow, 9:00 AM', who: 'Engineering' },
  { id: 'e4', title: 'Marketing sync', when: 'Thu, 11:00 AM', who: 'Marketing' },
  { id: 'e5', title: 'Quarterly review', when: 'Fri, 3:00 PM', who: 'Leadership' }
] as const

export const projects = [
  { id: 'p1', name: 'Onboarding redesign',  status: 'active',   progress: 72, team: ['AK', 'PS', 'DL'], updated: '2 hours ago' },
  { id: 'p2', name: 'Q4 marketing campaign', status: 'active',   progress: 45, team: ['PS', 'SP'],          updated: 'Yesterday' },
  { id: 'p3', name: 'Mobile app v2',         status: 'active',   progress: 88, team: ['DL', 'MC', 'AK'],    updated: '3 days ago' },
  { id: 'p4', name: 'Customer support migration', status: 'pending', progress: 12, team: ['SP'],                updated: 'Last week' },
  { id: 'p5', name: 'Q1 roadmap planning',   status: 'pending',  progress: 5,  team: ['AK', 'DL', 'MC'],    updated: 'Last week' },
  { id: 'p6', name: 'Legacy gateway shutdown', status: 'archived', progress: 100, team: ['MC'],               updated: 'Last month' }
] as const

export const tasks = [
  { id: 't1', title: 'Wire up sitemap',     priority: 'high',   assignee: 'AK', column: 'todo' },
  { id: 't2', title: 'Define color tokens', priority: 'medium', assignee: 'PS', column: 'todo' },
  { id: 't3', title: 'Update chart colors', priority: 'low',    assignee: 'DL', column: 'todo' },
  { id: 't4', title: 'Add profile API',     priority: 'high',   assignee: 'DL', column: 'progress' },
  { id: 't5', title: 'Refactor editor',     priority: 'medium', assignee: 'AK', column: 'progress' },
  { id: 't6', title: 'Write docs',          priority: 'low',    assignee: 'PS', column: 'progress' },
  { id: 't7', title: 'Deploy v2.1',         priority: 'high',   assignee: 'MC', column: 'done' },
  { id: 't8', title: 'Update changelog',    priority: 'low',    assignee: 'SP', column: 'done' }
] as const

export const files = [
  { id: 'f1', name: 'annual-report-2026.pdf', type: 'PDF',  size: '2.4 MB',  modified: '2 hours ago', owner: 'AK' },
  { id: 'f2', name: 'design-tokens.json',     type: 'JSON', size: '14 KB',   modified: 'Yesterday',   owner: 'PS' },
  { id: 'f3', name: 'marketing-assets.zip',   type: 'ZIP',  size: '156 MB',  modified: '2 days ago',  owner: 'DL' },
  { id: 'f4', name: 'onboarding-flow.fig',    type: 'FIG',  size: '4.1 MB',  modified: '3 days ago',  owner: 'PS' },
  { id: 'f5', name: 'q4-roadmap.md',          type: 'MD',   size: '8 KB',    modified: 'Last week',   owner: 'AK' },
  { id: 'f6', name: 'support-tickets.csv',    type: 'CSV',  size: '342 KB',  modified: 'Last week',   owner: 'SP' },
  { id: 'f7', name: 'logo-final.png',         type: 'PNG',  size: '180 KB',  modified: 'Last month',  owner: 'DL' },
  { id: 'f8', name: 'team-photo.jpg',         type: 'JPG',  size: '3.2 MB',  modified: 'Last month',  owner: 'MC' }
] as const

export const profileStats = [
  { id: 's1', label: 'Projects', value: '12' },
  { id: 's2', label: 'Commits',  value: '1,247' },
  { id: 's3', label: 'Reviews',  value: '89' }
] as const

export const faqItems = [
  { id: 'f1', q: 'How do I create a custom theme?', a: 'Open the editor panel on the right, switch to the Visual tab, and edit any token. Changes apply live. Use the JSON tab for raw editing, then Export JSON to save.' },
  { id: 'f2', q: 'Where are my themes stored?', a: 'Themes are saved in your browser\'s localStorage under the key "td:theme". They persist across reloads but are local to this browser.' },
  { id: 'f3', q: 'Can I share a theme with someone?', a: 'Yes. Click Export JSON in the top bar to download the theme as a .json file. The recipient clicks Import JSON in their editor and selects your file.' },
  { id: 'f4', q: 'What does customCss do?', a: 'The customCss field is appended verbatim after the :root block in the theme variables token. Use it for advanced overrides like ::before pseudo-elements.' },
  { id: 'f5', q: 'How do I reset to a preset?', a: 'Pick a preset chip from the bottom bar. If you have unsaved changes, you will be asked to confirm.' }
] as const

export const helpExamples = [
  { id: 'e1', label: 'Minimal theme JSON', code: '{\n  "name": "My Theme",\n  "colors": { "bg": "#ffffff", ... }\n}' },
  { id: 'e2', label: 'Reading a CSS variable', code: 'const bg = getComputedStyle(document.documentElement)\n  .getPropertyValue("--color-bg")' }
] as const