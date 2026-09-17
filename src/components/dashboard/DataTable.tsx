import { useState } from 'react'
import { Card } from '../ui/Card'
import { Pill } from '../ui/Pill'
import type { TableRow } from '../../dashboard/sampleData'

type SortKey = 'name' | 'status' | 'owner' | 'updated'
type SortDir = 'asc' | 'desc'

const statusToTone = {
  active: 'success',
  pending: 'warning',
  archived: 'neutral'
} as const

const columns: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
  { key: 'updated', label: 'Updated' }
]

export function DataTable({ rows, title = 'Recent Projects' }: { rows: TableRow[]; title?: string }) {
  const [sortKey, setSortKey] = useState<SortKey>('updated')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...rows].sort((a, b) => {
    const av = a[sortKey]
    const bv = b[sortKey]
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return sortDir === 'asc' ? cmp : -cmp
  })

  const arrow = (key: SortKey) => (sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '')

  const ariaSortFor = (key: SortKey): 'ascending' | 'descending' | 'none' => {
    if (sortKey !== key) return 'none'
    return sortDir === 'asc' ? 'ascending' : 'descending'
  }

  return (
    <Card title={title}>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} aria-sort={ariaSortFor(col.key)} className="data-table__th--sortable">
                  <button
                    type="button"
                    className="data-table__sort-button"
                    onClick={() => handleSort(col.key)}
                    aria-label={`Sort by ${col.label}${sortKey === col.key ? `, currently ${sortDir === 'asc' ? 'ascending' : 'descending'}` : ''}`}
                  >
                    {col.label}{arrow(col.key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td><Pill tone={statusToTone[r.status]}>{r.status}</Pill></td>
                <td>{r.owner}</td>
                <td className="data-table__muted">{r.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
