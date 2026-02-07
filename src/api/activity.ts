import { api } from '@/lib/api'
import type { ActivityItem } from '@/types'

export interface ActivityListItem {
  id: string
  type: 'comment' | 'ai' | 'share'
  text: string
  time: string
  metadata?: Record<string, unknown>
}

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  try {
    const data = await api.get<ActivityListItem[] | unknown>('/activity/recent')
    return Array.isArray(data) ? (data as ActivityItem[]) : []
  } catch {
    return []
  }
}
