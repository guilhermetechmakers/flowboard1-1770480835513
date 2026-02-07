import { useQuery } from '@tanstack/react-query'
import type { ProjectCardData, ActivityItem } from '@/types'
import { fetchProjects, toProjectCardData } from '@/api/projects'
import { fetchRecentActivity } from '@/api/activity'

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

async function loadProjects(): Promise<ProjectCardData[]> {
  const items = await fetchProjects()
  if (items.length > 0) {
    return items.map(toProjectCardData)
  }
  await new Promise((r) => setTimeout(r, 400))
  return MOCK_PROJECTS
}

async function loadActivity(): Promise<ActivityItem[]> {
  const items = await fetchRecentActivity()
  if (items.length > 0) {
    return items
  }
  await new Promise((r) => setTimeout(r, 400))
  return MOCK_ACTIVITY
}

export const DASHBOARD_QUERY_KEYS = {
  projects: ['dashboard', 'projects'] as const,
  activity: ['dashboard', 'activity'] as const,
}

export function useDashboardProjects() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.projects,
    queryFn: loadProjects,
    staleTime: 60 * 1000,
  })
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.activity,
    queryFn: loadActivity,
    staleTime: 30 * 1000,
  })
}
