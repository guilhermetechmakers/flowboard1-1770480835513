import { Link } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'

export function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <LayoutGrid className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">FlowBoard</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-h2 font-semibold">Terms of Service</h1>
        <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-12 prose prose-slate max-w-none">
          <h2>1. Agreement</h2>
          <p>
            By using FlowBoard, you agree to these terms. If you do not agree, do not use our
            services.
          </p>
          <h2>2. Acceptable use</h2>
          <p>
            You may not use our services for illegal purposes or to harm others. We reserve the
            right to suspend accounts that violate these terms.
          </p>
          <h2>3. Liability</h2>
          <p>
            FlowBoard is provided as-is. We are not liable for indirect or consequential damages.
          </p>
          <h2>4. Versioning</h2>
          <p>
            We may update these terms. Continued use after changes constitutes acceptance.
          </p>
        </div>
        <Link to="/" className="mt-12 inline-block text-primary hover:underline">
          Back to home
        </Link>
      </main>
    </div>
  )
}
