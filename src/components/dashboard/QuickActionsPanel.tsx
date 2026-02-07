import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { LayoutGrid, FileUp, FolderKanban } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface QuickAction {
  id: string
  label: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  variant?: 'primary' | 'accent' | 'warning'
}

const defaultActions: QuickAction[] = [
  {
    id: 'new-board',
    label: 'New Board',
    description: 'Start from scratch',
    href: '/board/new',
    icon: LayoutGrid,
    variant: 'primary',
  },
  {
    id: 'import',
    label: 'Import',
    description: 'CSV or JSON',
    href: '/dashboard/import',
    icon: FileUp,
    variant: 'accent',
  },
  {
    id: 'templates',
    label: 'Templates',
    description: 'Use a starter',
    href: '/dashboard/templates',
    icon: FolderKanban,
    variant: 'warning',
  },
]

const variantStyles = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  warning: 'bg-warning/20 text-warning',
}

export interface QuickActionsPanelProps {
  actions?: QuickAction[]
  className?: string
}

export function QuickActionsPanel({
  actions = defaultActions,
  className,
}: QuickActionsPanelProps) {
  return (
    <div
      className={cn(
        'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {actions.map((action) => (
        <Link key={action.id} to={action.href} className="group block">
          <Card className="h-full cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-0.5 group-focus-visible:ring-2 group-focus-visible:ring-primary">
            <CardContent className="flex items-center gap-4 pt-6">
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
                  variantStyles[action.variant ?? 'primary']
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-medium">{action.label}</p>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
