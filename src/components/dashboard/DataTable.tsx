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

  return (
    <Card title={title}>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className="data-table__th--sortable">Name{arrow('name')}</th>
              <th onClick={() => handleSort('status')} className="data-table__th--sortable">Status{arrow('status')}</th>
              <th onClick={() => handleSort('owner')} className="data-table__th--sortable">Owner{arrow('owner')}</th>
              <th onClick={() => handleSort('updated')} className="data-table__th--sortable">Updated{arrow('updated')}</th>
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