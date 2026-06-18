import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, MessageCircle, Wallet, ArrowLeftRight, Settings, User
} from 'lucide-react'
import Sidebar from './Sidebar'
import Breadcrumb from './Breadcrumb'
import DashboardHome from '../../pages/DashboardHome'
import DashboardChat from '../../pages/DashboardChat'
import DashboardWallet from '../../pages/DashboardWallet'
import DashboardTransactions from '../../pages/DashboardTransactions'
import DashboardSettings from '../../pages/DashboardSettings'

const navItems = [
  { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const breadcrumbMap = {
  home: [
    { label: 'Dashboard' },
    { label: 'Overview' },
  ],
  chat: [
    { label: 'Dashboard', onClick: 'home' },
    { label: 'Chat' },
  ],
  wallet: [
    { label: 'Dashboard', onClick: 'home' },
    { label: 'Wallet' },
  ],
  transactions: [
    { label: 'Dashboard', onClick: 'home' },
    { label: 'Transactions' },
  ],
  settings: [
    { label: 'Dashboard', onClick: 'home' },
    { label: 'Settings' },
  ],
  profile: [
    { label: 'Dashboard', onClick: 'home' },
    { label: 'Profile' },
  ],
}

export default function DashboardLayout() {
  const [activePage, setActivePage] = useState('home')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      setSidebarCollapsed(w >= 768 && w < 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleNavigate = (page) => {
    setActivePage(page)
  }

  const pages = {
    chat: DashboardChat,
    wallet: DashboardWallet,
    transactions: DashboardTransactions,
    settings: DashboardSettings,
  }

  const PageComponent = pages[activePage]

  const breadcrumbs = (breadcrumbMap[activePage] || []).map(item => ({
    ...item,
    onClick: item.onClick ? () => handleNavigate(item.onClick) : undefined,
  }))

  return (
    <div className="min-h-screen bg-surface-secondary flex">
      <div className="hidden md:flex">
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Breadcrumb items={breadcrumbs} />
        {activePage === 'home' ? (
          <DashboardHome onNavigate={handleNavigate} />
        ) : activePage === 'profile' ? (
          <DashboardProfile />
        ) : (
          <PageComponent />
        )}
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border flex" aria-label="Dashboard navigation">
        {navItems.map(item => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                activePage === item.id ? 'text-accent' : 'text-muted'
              }`}
              aria-current={activePage === item.id ? 'page' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              {item.label}
            </button>
          )
        })}
        <button
          onClick={() => setActivePage('profile')}
          className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
            activePage === 'profile' ? 'text-accent' : 'text-muted'
          }`}
          aria-current={activePage === 'profile' ? 'page' : undefined}
        >
          <User size={20} aria-hidden="true" />
          Profile
        </button>
      </nav>
    </div>
  )
}

function DashboardProfile() {
  return (
    <div className="flex-1 p-6 sm:p-8 max-w-3xl overflow-y-auto">
      <div className="bg-surface-card border border-border rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-xl sm:text-2xl font-bold text-accent flex-shrink-0" aria-hidden="true">
            JD
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">John Doe</h2>
            <p className="text-sm text-muted">john@example.com</p>
            <p className="text-xs text-muted mt-1 font-mono">Member since June 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          {[
            { label: 'Transactions', value: '24' },
            { label: 'Volume', value: '\u20A6142K' },
            { label: 'Wallets', value: '2' },
          ].map((s, i) => (
            <div key={i} className="bg-surface-secondary rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-accent">{s.value}</div>
              <div className="text-xs text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <form className="space-y-4 max-w-md">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-muted uppercase tracking-wider" htmlFor="profile-name">Full Name</label>
            <input
              id="profile-name"
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-muted uppercase tracking-wider" htmlFor="profile-email">Email</label>
            <input
              id="profile-email"
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
            />
          </div>
          <button className="px-6 py-2.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 transition-all">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
