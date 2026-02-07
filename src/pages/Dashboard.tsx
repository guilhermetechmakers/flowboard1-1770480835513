import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ProjectGridList,
  RecentActivityFeed,
  QuickActionsPanel,
} from '@/components/dashboard'
import type { ProjectCardData, ActivityItem } from '@/types'

const MOCK_PROJECTS: ProjectCardData[] = [
  {
    id: '1',
    name: 'Product Roadmap',
    lastActivity: '2 hours ago',
    collaboratorsCount: 3,
  },
  {
    id: '2',
    name: 'Research Notes',
    lastActivity: '1 day ago',
    collaboratorsCount: 2,
  },
  {
    id: '3',
    name: 'Design System',
    lastActivity: '3 days ago',
    collaboratorsCount: 5,
  },
]

const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    type: 'comment',
    text: 'Sarah commented on "Q1 Goals"',
    time: '10m ago',
  },
  {
    id: '2',
    type: 'ai',
    text: 'AI suggested 3 new nodes for your flowchart',
    time: '1h ago',
  },
  {
    id: '3',
    type: 'share',
    text: 'Alex shared updates on the research board',
    time: '2h ago',
  },
]

export default function DashboardPage() {
  const [projects, setProjects] = useState<ProjectCardData[]>([])
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Dashboard — FlowBoard'
  }, [])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        await new Promise((r) => setTimeout(r, 400))
        setProjects(MOCK_PROJECTS)
        setActivity(MOCK_ACTIVITY)
      } catch {
        setProjects([])
        setActivity([])
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-h2 font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Your projects, boards, AI suggestions, and quick actions
        </p>
      </div>

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
