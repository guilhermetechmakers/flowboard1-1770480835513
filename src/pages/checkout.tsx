import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check } from 'lucide-react'

const plans = [
  { id: 'pro-monthly', name: 'Pro', price: 12, period: 'month', annual: false },
  { id: 'pro-annual', name: 'Pro', price: 120, period: 'year', annual: true, save: '17%' },
]

export function CheckoutPage() {
  const [planId, setPlanId] = useState('pro-monthly')

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-h2 font-semibold text-foreground">Checkout</h1>
          <p className="mt-1 text-muted-foreground">Choose your plan and complete payment</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Plan</CardTitle>
            <CardDescription>Monthly or annual billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${
                  planId === plan.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setPlanId(plan.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    planId === plan.id ? 'border-primary bg-primary' : 'border-border'
                  }`}>
                    {planId === plan.id && <Check className="h-2.5 w-2.5 text-white" />}
                  </div>
                  <div>
                    <p className="font-medium">{plan.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${plan.price}/{plan.period}
                      {plan.save && (
                        <span className="ml-2 text-accent">Save {plan.save}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>Card and billing address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Card number</Label>
              <Input className="mt-2" placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry</Label>
                <Input className="mt-2" placeholder="MM/YY" />
              </div>
              <div>
                <Label>CVC</Label>
                <Input className="mt-2" placeholder="123" />
              </div>
            </div>
            <div>
              <Label>Coupon (optional)</Label>
              <Input className="mt-2" placeholder="Enter code" />
            </div>
            <Button className="w-full">Confirm and pay</Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/dashboard">
            <Button variant="ghost">Back to dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
