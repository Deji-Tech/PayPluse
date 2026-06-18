import { useState } from 'react'
import { Wallet, Check, Link } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useToast } from '../components/ui/toast'

export default function DashboardWallet() {
  const [account, setAccount] = useState('')
  const [linked, setLinked] = useState(false)
  const [linkedAccount, setLinkedAccount] = useState('')
  const { toast } = useToast()

  const handleLink = (e) => {
    e.preventDefault()
    if (account.trim()) {
      setLinked(true)
      setLinkedAccount(account)
      toast('OPay wallet linked successfully')
    }
  }

  return (
    <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Link Your OPay Wallet</CardTitle>
            <CardDescription>Connect your OPay account to enable payments.</CardDescription>
          </CardHeader>
          <CardContent>
            {!linked ? (
              <form onSubmit={handleLink} className="flex items-end gap-3 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    label="OPay Account Number"
                    placeholder="7044879145"
                    value={account}
                    onChange={e => setAccount(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">
                  <Link size={14} /> Link Wallet
                </Button>
              </form>
            ) : (
              <div className="bg-success/5 border border-success/20 rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center">
                  <Check size={18} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-success">Wallet Linked Successfully</p>
                  <p className="text-xs text-muted font-mono">Account: {linkedAccount}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wallet Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2.5 border-b border-border">
                <span className="text-sm text-muted">Merchant ID</span>
                <code className="text-xs font-mono text-accent bg-surface-secondary px-2.5 py-1 rounded">256621051120756</code>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-border">
                <span className="text-sm text-muted">Account</span>
                <code className="text-xs font-mono text-accent bg-surface-secondary px-2.5 py-1 rounded">
                  {linked ? linkedAccount : '\u2014'}
                </code>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-sm text-muted">Status</span>
                {linked ? (
                  <Badge variant="success" size="md" dot>Linked</Badge>
                ) : (
                  <Badge variant="warning" size="md" dot>Not Linked</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
