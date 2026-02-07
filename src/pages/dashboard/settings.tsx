import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { User, Building2, Bot, Bell, Plug } from 'lucide-react'

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2 font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">User and organization preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="org" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Plug className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Name, avatar, email, password, 2FA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input className="mt-2" defaultValue="Jane Doe" />
              </div>
              <div>
                <Label>Email</Label>
                <Input className="mt-2" type="email" defaultValue="jane@example.com" />
              </div>
              <Separator />
              <div>
                <Label>New password</Label>
                <Input className="mt-2" type="password" placeholder="••••••••" />
              </div>
              <Button>Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="org" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>Members, roles, SSO, billing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage your organization settings.</p>
              <Button className="mt-4">Invite members</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI settings</CardTitle>
              <CardDescription>Model selection, credit usage, privacy toggles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Model</Label>
                <Input className="mt-2" defaultValue="GPT-4" readOnly />
              </div>
              <p className="text-sm text-muted-foreground">AI credits: 150 / 500 used this month</p>
              <Button>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Google Drive, Notion, Slack, GitHub</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">Connect Google Drive</Button>
                <Button variant="outline" className="w-full justify-start">Connect Notion</Button>
                <Button variant="outline" className="w-full justify-start">Connect Slack</Button>
                <Button variant="outline" className="w-full justify-start">Connect GitHub</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Email, in-app, webhooks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure notification preferences.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
