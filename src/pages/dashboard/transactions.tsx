import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const mockTransactions = [
  { date: 'Feb 1, 2025', amount: '$12.00', status: 'Paid', type: 'Subscription' },
  { date: 'Jan 1, 2025', amount: '$12.00', status: 'Paid', type: 'Subscription' },
  { date: 'Dec 15, 2024', amount: '$0.00', status: 'Credit', type: 'AI credits' },
]

export function TransactionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h2 font-semibold text-foreground">Transaction history</h1>
          <p className="mt-1 text-muted-foreground">Billing and AI credit tracking</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Date, amount, status, invoice link</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="font-medium">{tx.date}</p>
                  <p className="text-sm text-muted-foreground">{tx.type}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span>{tx.amount}</span>
                  <span className="text-sm text-muted-foreground">{tx.status}</span>
                  <Button variant="ghost" size="sm">Invoice</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI credits usage</CardTitle>
          <CardDescription>Breakdown by month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">350 credits remaining this month</p>
        </CardContent>
      </Card>
    </div>
  )
}
