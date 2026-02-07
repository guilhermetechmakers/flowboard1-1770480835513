import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sparkles,
  LayoutGrid,
  Users,
  Plug,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <LayoutGrid className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold">FlowBoard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-hero font-hero tracking-tight text-foreground animate-fade-in-up">
              AI-Assisted Visual Boards
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                for Your Team
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up [animation-delay:100ms]">
              Organize ideas, research, data, and workflows as connected flowchart nodes.
              Collaborate in real-time with a context-aware AI agent that summarizes,
              proposes next steps, and generates content.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up [animation-delay:200ms]">
              <Link to="/signup">
                <Button size="lg" className="min-w-[160px]">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="secondary" size="lg" className="min-w-[160px]">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features - Bento grid */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-h2 font-semibold text-foreground">Powerful features</h2>
          <p className="mt-4 text-muted-foreground">
            Built for product teams, researchers, and enterprises
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Sparkles,
              title: 'AI Agent',
              description: 'Context-aware assistant that summarizes, proposes next steps, detects gaps, and generates content.',
            },
            {
              icon: LayoutGrid,
              title: 'Visual Board',
              description: 'Infinite canvas with nodes and edges. Text, research links, files, images, tasks, tables, code.',
            },
            {
              icon: Users,
              title: 'Collaboration',
              description: 'Real-time presence, cursors, comments, and assignment. CRDT-based conflict-free editing.',
            },
            {
              icon: Plug,
              title: 'Integrations',
              description: 'Connect Google Drive, Notion, Slack, GitHub. Import and export CSV, JSON, PNG, PDF.',
            },
          ].map((feature, i) => (
            <Card
              key={feature.title}
              className="animate-fade-in-up transition-all duration-300 hover:border-primary/30 [animation-delay:0ms]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Live Demo embed */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card-muted p-8 shadow-card">
          <h2 className="text-h2 font-semibold text-foreground">See it in action</h2>
          <p className="mt-2 text-muted-foreground">
            Preview a sample board. Sign up to create and collaborate.
          </p>
          <div className="mt-8 flex aspect-video items-center justify-center rounded-lg border border-border bg-muted/50">
            <Link to="/demo">
              <Button size="lg" variant="secondary">
                Open Demo Board
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-h2 font-semibold text-foreground">Simple pricing</h2>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade when you need more.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            { name: 'Free', price: '$0', desc: '1–2 collaborators, basic AI', cta: 'Get Started' },
            { name: 'Pro', price: '$12', desc: 'Unlimited collaborators, full AI', cta: 'Start trial', featured: true },
            { name: 'Enterprise', price: 'Custom', desc: 'SSO, audit logs, SLA', cta: 'Contact us' },
          ].map((tier) => (
            <Card
              key={tier.name}
              className={tier.featured ? 'border-primary ring-2 ring-primary/20' : ''}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.desc}</CardDescription>
                <p className="mt-2 text-3xl font-bold">{tier.price}</p>
              </CardHeader>
              <CardContent>
                <Link to={tier.name === 'Free' ? '/signup' : '/checkout'}>
                  <Button className="w-full" variant={tier.featured ? 'default' : 'outline'}>
                    {tier.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-h2 font-semibold text-foreground">Loved by teams</h2>
        </div>
        <div className="mt-16 flex gap-8 overflow-x-auto pb-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="min-w-[320px] shrink-0">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  "FlowBoard transformed how we map product flows. The AI suggestions save hours."
                </p>
                <p className="mt-4 text-sm font-medium">— Product Team, Startup</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <LayoutGrid className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">FlowBoard</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground">Terms</Link>
              <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link to="/about" className="hover:text-foreground">Docs</Link>
              <Link to="/contact" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlowBoard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
