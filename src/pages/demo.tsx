import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LayoutGrid } from 'lucide-react'

export function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <LayoutGrid className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-semibold">FlowBoard</span>
      </Link>
      <Card className="max-w-lg w-full">
        <CardContent className="pt-6">
          <h1 className="text-h2 font-semibold text-center">Request a demo</h1>
          <p className="mt-2 text-muted-foreground text-center">
            See FlowBoard in action. Our team will show you how to organize ideas, collaborate
            in real-time, and leverage AI for your workflows.
          </p>
          <div className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Work email"
              className="w-full rounded-md border border-border px-4 py-3 text-sm"
            />
            <input
              type="text"
              placeholder="Company name"
              className="w-full rounded-md border border-border px-4 py-3 text-sm"
            />
            <Button className="w-full">Request demo</Button>
          </div>
        </CardContent>
      </Card>
      <Link to="/" className="mt-8 text-sm text-muted-foreground hover:text-foreground">
        Back to home
      </Link>
    </div>
  )
}
