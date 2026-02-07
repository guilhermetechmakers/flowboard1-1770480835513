import { Link } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'

export function PrivacyPolicyPage() {
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
        <h1 className="text-h2 font-semibold">Privacy Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-12 prose prose-slate max-w-none">
          <h2>1. Collection</h2>
          <p>
            We collect information you provide when signing up, including name, email, and
            organization details. We also collect usage data to improve our services.
          </p>
          <h2>2. Retention</h2>
          <p>
            We retain your data for as long as your account is active. You may request deletion
            at any time.
          </p>
          <h2>3. Your rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. Contact us for
            data protection inquiries.
          </p>
          <h2>4. Data protection contact</h2>
          <p>privacy@flowboard.example.com</p>
        </div>
        <Link to="/" className="mt-12 inline-block text-primary hover:underline">
          Back to home
        </Link>
      </main>
    </div>
  )
}
