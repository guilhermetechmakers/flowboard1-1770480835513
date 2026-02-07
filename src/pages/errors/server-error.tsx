import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LayoutGrid, RefreshCw } from 'lucide-react'

export function ServerErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <LayoutGrid className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-semibold">FlowBoard</span>
      </Link>
      <h1 className="text-6xl font-bold text-foreground">500</h1>
      <p className="mt-4 text-xl text-muted-foreground">Something went wrong</p>
      <p className="mt-2 text-muted-foreground text-center max-w-md">
        We're sorry. An unexpected error occurred. Please try again.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
        <Link to="/">
          <Button variant="outline">Go to home</Button>
        </Link>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        <Link to="/contact" className="underline">Contact support</Link>
      </p>
    </div>
  )
}
