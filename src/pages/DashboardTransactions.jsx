import { useState } from 'react'
import { RefreshCw, ArrowLeftRight } from 'lucide-react'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const MOCK_TXS = [
  { ref: 'PP-A4F2-8D3E', amount: 50000, type: 'credit', recipient: 'Ola Ogunleye', status: 'SUCCESSFUL', date: '2026-06-17' },
  { ref: 'PP-7C1B-3E9A', amount: 2000, type: 'debit', recipient: 'Adekunle Gold', status: 'SUCCESSFUL', date: '2026-06-16' },
  { ref: 'PP-9D0E-5F7C', amount: 15000, type: 'debit', recipient: 'Chioma Okafor', status: 'PENDING', date: '2026-06-15' },
  { ref: 'PP-3B8A-1D4F', amount: 8000, type: 'debit', recipient: 'Emeka Nwosu', status: 'FAILED', date: '2026-06-14' },
  { ref: 'PP-6E2C-9A1B', amount: 25000, type: 'credit', recipient: 'Fatima Bello', status: 'SUCCESSFUL', date: '2026-06-13' },
]

const statusConfig = {
  SUCCESSFUL: { variant: 'success', dot: true },
  PENDING: { variant: 'warning', dot: true },
  FAILED: { variant: 'error', dot: true },
}

export default function DashboardTransactions() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? MOCK_TXS : MOCK_TXS.filter(t => t.status === filter.toUpperCase())

  return (
    <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'successful', 'pending', 'failed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                filter === f
                  ? 'bg-accent/5 text-accent border border-accent/20'
                  : 'text-muted border border-border hover:text-text-primary hover:border-muted'
              }`}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'All' : f.toLowerCase()}
            </button>
          ))}
        </div>
        <Button variant="ghost" size="sm">
          <RefreshCw size={14} /> Refresh
        </Button>
      </div>

      <Card className="overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-elevated">
                  <th className="text-left px-5 py-3.5 text-[10px] font-mono text-muted uppercase tracking-wider">Reference</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-mono text-muted uppercase tracking-wider">Amount</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-mono text-muted uppercase tracking-wider">Recipient</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-mono text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-mono text-muted uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                    <td className="px-5 py-4">
                      <code className="text-xs font-mono text-accent">{tx.ref}</code>
                    </td>
                    <td className={`px-5 py-4 font-medium text-text-primary ${tx.type === 'credit' ? 'text-success' : ''}`}>
                      {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-muted">{tx.recipient}</td>
                    <td className="px-5 py-4">
                      <Badge variant={statusConfig[tx.status].variant} size="md" dot>
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-muted text-xs">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-secondary border border-border flex items-center justify-center mb-4">
              <ArrowLeftRight size={20} className="text-muted" />
            </div>
            <p className="text-sm font-medium text-text-primary mb-1">No transactions found</p>
            <p className="text-xs text-muted">No {filter !== 'all' ? filter : ''} transactions to display.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
