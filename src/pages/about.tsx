import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LayoutGrid, BookOpen, Video, HelpCircle } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <LayoutGrid className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">FlowBoard</span>
          </Link>
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-h2 font-semibold">Help & Documentation</h1>
        <p className="mt-1 text-muted-foreground">Getting started guides and support</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary" />
              <CardTitle>Getting started</CardTitle>
              <CardDescription>Guides to create your first board</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View guides</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Video className="h-8 w-8 text-primary" />
              <CardTitle>Video tutorials</CardTitle>
              <CardDescription>Step-by-step video walkthroughs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Watch videos</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <HelpCircle className="h-8 w-8 text-primary" />
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Common questions answered</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View FAQ</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-h3 font-semibold mb-4">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I create a new board?', a: 'Click "New Board" from the dashboard or use the keyboard shortcut N.' },
              { q: 'Can I collaborate with others?', a: 'Yes. Invite collaborators from the project settings. Real-time presence is supported.' },
              { q: 'What file formats can I import?', a: 'CSV and JSON. We support column mapping for structured data.' },
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base">{faq.q}</CardTitle>
                  <CardDescription>{faq.a}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Contact support</CardTitle>
            <CardDescription>Send us a message</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" className="mt-2" placeholder="you@example.com" />
              </div>
              <div>
                <Label>Message</Label>
                <textarea
                  className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Describe your issue..."
                />
              </div>
              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-12 text-sm text-muted-foreground">
          <Link to="/" className="underline">Docs</Link> ·{' '}
          <Link to="/" className="underline">Status</Link>
        </p>
      </main>
    </div>
  )
}
