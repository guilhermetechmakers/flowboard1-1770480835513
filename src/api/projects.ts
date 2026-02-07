import { api } from '@/lib/api'
import type { ProjectCardData } from '@/types'

export interface ProjectListItem {
  id: string
  name: string
  thumbnail?: string
  lastActivity: string
  collaboratorsCount: number
  boardId?: string
}

export async function fetchProjects(): Promise<ProjectListItem[]> {
  try {
    const data = await api.get<ProjectListItem[] | unknown>('/projects')
    return Array.isArray(data) ? (data as ProjectListItem[]) : []
  } catch {
    return []
  }
}

export function toProjectCardData(item: ProjectListItem): ProjectCardData {
  return {
    id: item.id,
    name: item.name,
    thumbnail: item.thumbnail,
    lastActivity: item.lastActivity,
    collaboratorsCount: item.collaboratorsCount,
    boardId: item.boardId,
  }
}
