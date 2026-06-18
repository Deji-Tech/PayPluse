import { useState } from 'react'
import { Copy, Link, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useToast } from '../components/ui/toast'

export default function DashboardSettings() {
  const [chatId, setChatId] = useState('')
  const [linked, setLinked] = useState(false)
  const { toast } = useToast()

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    toast('Copied to clipboard')
  }

  return (
    <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Backend URL', value: 'http://localhost:8000' },
                { label: 'OPay Sandbox', value: 'https://sandboxapi.opaycheckout.com' },
                { label: 'Merchant ID', value: '256621051120756' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2.5 border-b border-border last:border-0 gap-1.5 sm:gap-0">
                  <span className="text-sm text-muted">{s.label}</span>
                  <code className="text-[10px] sm:text-xs font-mono text-accent bg-surface-secondary px-2.5 py-1 rounded flex items-center gap-2 max-w-full sm:max-w-none overflow-hidden">
                    <span className="truncate">{s.value}</span>
                    <button
                      onClick={() => handleCopy(s.value)}
                      className="text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded flex-shrink-0"
                      aria-label={`Copy ${s.label}`}
                    >
                      <Copy size={12} />
                    </button>
                  </code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>WhatsApp Integration</CardTitle>
            <CardDescription>Link your WhatsApp number for chat-based payments.</CardDescription>
          </CardHeader>
          <CardContent>
            {!linked ? (
              <form onSubmit={e => { e.preventDefault(); if (chatId.trim()) { setLinked(true); toast('WhatsApp number linked successfully') } }} className="flex items-end gap-3 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    label="WhatsApp Number"
                    placeholder="+2347044879145"
                    value={chatId}
                    onChange={e => setChatId(e.target.value)}
                  />
                </div>
                <Button type="submit">
                  <Link size={14} /> Link Number
                </Button>
              </form>
            ) : (
              <div className="bg-success/5 border border-success/20 rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center">
                  <Check size={18} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-success">WhatsApp Linked</p>
                  <p className="text-xs text-muted font-mono">{chatId}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-error/20">
          <CardHeader>
            <CardTitle className="text-error">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
