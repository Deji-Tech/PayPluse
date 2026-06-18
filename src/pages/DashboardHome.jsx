import { TrendingUp, Wallet, ArrowLeftRight, ArrowUpRight } from 'lucide-react'
import { Badge } from '../components/ui/badge'

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

export default function DashboardHome({ onNavigate }) {
  const totalBalance = MOCK_TXS.reduce((sum, tx) =>
    tx.type === 'credit' ? sum + tx.amount : sum - tx.amount, 0
  )
  const todayTxs = MOCK_TXS.filter(tx => tx.date === '2026-06-17').length

  const stats = [
    { label: 'Total Balance', value: `\u20A6${totalBalance.toLocaleString()}`, change: '+12%', changeLabel: 'from last month', icon: Wallet },
    { label: 'Transactions Today', value: todayTxs.toString(), change: '+8%', changeLabel: 'from yesterday', icon: ArrowLeftRight },
    { label: 'Active Wallets', value: '2', change: '', changeLabel: 'Linked accounts', icon: Wallet },
  ]

  return (
    <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="bg-surface-card border border-border rounded-[20px] p-5 sm:p-6 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">{stat.label}</span>
                <div className="w-9 h-9 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center">
                  <Icon size={16} className="text-accent" />
                </div>
              </div>
              <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.change && (
                  <>
                    <TrendingUp size={12} className="text-success" />
                    <span className="text-success font-medium">{stat.change}</span>
                  </>
                )}
                <span className="text-muted">{stat.changeLabel}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <div className="bg-surface-card border border-border rounded-[20px] overflow-hidden">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-text-primary">Recent Activity</h2>
            <button
              onClick={() => onNavigate('transactions')}
              className="text-xs text-accent hover:text-accent-hover font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded transition-colors"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-border/50">
            {MOCK_TXS.map((tx, i) => {
              const isCredit = tx.type === 'credit'
              return (
                <div key={i} className="flex items-center justify-between px-5 sm:px-6 py-3.5 hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCredit ? 'bg-success/5' : 'bg-error/5'
                    }`}>
                      <ArrowUpRight size={14} className={`${isCredit ? 'text-success' : 'text-error'} ${!isCredit ? 'rotate-90' : ''}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-text-primary truncate">{tx.recipient}</div>
                      <code className="text-[10px] font-mono text-muted">{tx.ref}</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className={`text-sm font-medium ${isCredit ? 'text-success' : 'text-text-primary'}`}>
                      {isCredit ? '+' : '-'}\u20A6{tx.amount.toLocaleString()}
                    </span>
                    <Badge variant={statusConfig[tx.status].variant} size="sm" dot>
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
