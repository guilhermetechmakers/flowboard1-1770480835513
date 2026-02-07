import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ProjectGridList,
  RecentActivityFeed,
  QuickActionsPanel,
} from '@/components/dashboard'
import { useDashboardProjects, useDashboardActivity } from '@/hooks/use-dashboard-data'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const navigate = useNavigate()
  const projectsQuery = useDashboardProjects()
  const activityQuery = useDashboardActivity()

  const projects = projectsQuery.data ?? []
  const activity = activityQuery.data ?? []
  const isLoading = projectsQuery.isLoading || activityQuery.isLoading
  const hasError = projectsQuery.isError || activityQuery.isError

  useEffect(() => {
    document.title = 'Dashboard — FlowBoard'
  }, [])

  const handleRetry = () => {
    projectsQuery.refetch()
    activityQuery.refetch()
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-h2 font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Your projects, boards, AI suggestions, and quick actions
        </p>
      </div>

      {hasError && (
        <div
          className={cn(
            'flex items-center justify-between gap-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3'
          )}
          role="alert"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
            <p className="text-sm text-foreground">
              Could not load dashboard data. Please try again.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            Retry
          </Button>
        </div>
      )}

      <QuickActionsPanel />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectGridList
            projects={projects}
            isLoading={isLoading}
            onViewAll={() => navigate('/dashboard/projects')}
            viewAllLabel="View all"
          />
        </div>
        <div>
          <h2 className="text-h3 font-semibold mb-4">Recent Activity</h2>
          <RecentActivityFeed
            items={activity}
            isLoading={isLoading}
            emptyMessage="No recent activity. Start collaborating on a board."
          />
        </div>
      </div>
    </div>
  )
}
