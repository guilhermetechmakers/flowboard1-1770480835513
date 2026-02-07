import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, Download } from 'lucide-react'

export function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2 font-semibold text-foreground">Billing</h1>
        <p className="mt-1 text-muted-foreground">Manage your subscription and invoices</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current plan</CardTitle>
            <CardDescription>Pro · $12/month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              AI credits: 350 remaining this month
            </p>
            <Link to="/checkout">
              <Button>Upgrade plan</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment method</CardTitle>
            <CardDescription>Card ending in 4242</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Update card
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction history</CardTitle>
          <CardDescription>Invoices and AI credit usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: 'Feb 1, 2025', amount: '$12.00', status: 'Paid' },
              { date: 'Jan 1, 2025', amount: '$12.00', status: 'Paid' },
            ].map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="font-medium">{tx.date}</p>
                  <p className="text-sm text-muted-foreground">{tx.status}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span>{tx.amount}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Link to="/dashboard/transactions">
            <Button variant="ghost" className="mt-4">View all</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
