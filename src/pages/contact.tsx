import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LayoutGrid } from 'lucide-react'

export function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <LayoutGrid className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">FlowBoard</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-h2 font-semibold">Contact</h1>
        <p className="mt-1 text-muted-foreground">Get in touch with our team</p>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
            <CardDescription>We'll respond within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input className="mt-2" placeholder="Your name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" className="mt-2" placeholder="you@example.com" />
              </div>
              <div>
                <Label>Message</Label>
                <textarea
                  className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm min-h-[120px]"
                  placeholder="How can we help?"
                />
              </div>
              <Button>Send</Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-8 text-muted-foreground">
          <Link to="/" className="underline">Back to home</Link>
        </p>
      </main>
    </div>
  )
}
