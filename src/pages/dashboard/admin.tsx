import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, FolderKanban, Sparkles } from 'lucide-react'

const stats = [
  { label: 'Active users', value: '12', icon: Users },
  { label: 'Boards', value: '24', icon: FolderKanban },
  { label: 'AI credits used', value: '1,240', icon: Sparkles },
]

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2 font-semibold text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Org admin controls, billing, compliance</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User management</CardTitle>
            <CardDescription>Invite, roles, deactivate</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Manage users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing & plans</CardTitle>
            <CardDescription>Invoices, upgrade</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>View billing</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security & audit logs</CardTitle>
            <CardDescription>Compliance and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Download audit logs</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature flags</CardTitle>
            <CardDescription>Toggle AI features, integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">All features enabled</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
