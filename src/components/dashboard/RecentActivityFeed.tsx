import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare, Sparkles, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ActivityItem } from '@/types'

export interface RecentActivityFeedProps {
  items: ActivityItem[]
  isLoading?: boolean
  emptyMessage?: string
  className?: string
}

function getActivityIcon(type: ActivityItem['type']) {
  switch (type) {
    case 'ai':
      return <Sparkles className="h-4 w-4 text-primary" aria-hidden />
    case 'share':
      return <Share2 className="h-4 w-4 text-accent" aria-hidden />
    case 'comment':
    default:
      return <MessageSquare className="h-4 w-4 text-muted-foreground" aria-hidden />
  }
}

function ActivitySkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="flex items-start gap-4 pt-4">
        <div className="h-8 w-8 shrink-0 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-3 w-1/4 rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}

export function RecentActivityFeed({
  items,
  isLoading = false,
  emptyMessage = 'No recent activity. Start collaborating on a board.',
  className,
}: RecentActivityFeedProps) {
  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <h2 className="text-h3 font-semibold">Recent Activity</h2>
        {[1, 2, 3].map((i) => (
          <ActivitySkeleton key={i} />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={cn('space-y-4', className)}>
        <h2 className="text-h3 font-semibold">Recent Activity</h2>
        <Card className="flex flex-col items-center justify-center py-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <MessageSquare className="h-6 w-6 text-muted-foreground" />
        </div>
        <CardContent className="pt-4 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-h3 font-semibold">Recent Activity</h2>
      {items.map((item) => (
        <Card
          key={item.id}
          className="transition-all duration-300 hover:border-primary/20 hover:shadow-card"
        >
          <CardContent className="flex items-start gap-4 pt-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
              {getActivityIcon(item.type)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm">{item.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
