import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle } from 'lucide-react'

export function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2 font-semibold text-foreground">Profile</h1>
        <p className="mt-1 text-muted-foreground">Account management and connected apps</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile summary</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl text-primary font-medium">
              U
            </div>
            <div>
              <p className="font-medium">User</p>
              <p className="text-sm text-muted-foreground">user@example.com</p>
            </div>
          </div>
          <div>
            <Label>Display name</Label>
            <Input className="mt-2" defaultValue="User" />
          </div>
          <Button>Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected apps</CardTitle>
          <CardDescription>Manage linked integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No connected apps</p>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger zone
          </CardTitle>
          <CardDescription>Account deletion and data export</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">Export my data</Button>
          <Button variant="destructive">Delete account</Button>
        </CardContent>
      </Card>
    </div>
  )
}
