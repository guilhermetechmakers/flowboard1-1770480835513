import { api } from '@/lib/api'
import type {
  BoardNode,
  NodeSearchResult,
  SearchFilters,
  NodeType,
} from '@/types'

export interface SearchNodesParams extends SearchFilters {
  boardId?: string
  limit?: number
}

export async function searchNodes(
  params: SearchNodesParams
): Promise<NodeSearchResult[]> {
  try {
    const searchParams = new URLSearchParams()
    if (params.query) searchParams.set('q', params.query)
    if (params.boardId) searchParams.set('boardId', params.boardId)
    if (params.types?.length)
      searchParams.set('types', params.types.join(','))
    if (params.tags?.length) searchParams.set('tags', params.tags.join(','))
    if (params.assigneeId) searchParams.set('assigneeId', params.assigneeId)
    if (params.dateFrom) searchParams.set('dateFrom', params.dateFrom)
    if (params.dateTo) searchParams.set('dateTo', params.dateTo)
    if (params.limit) searchParams.set('limit', String(params.limit))

    const data = await api.get<NodeSearchResult[]>(
      `/search/nodes?${searchParams.toString()}`
    )
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function filterNodesClient(
  nodes: BoardNode[],
  filters: SearchFilters
): BoardNode[] {
  let result = nodes

  if (filters.query?.trim()) {
    const q = filters.query.toLowerCase().trim()
    result = result.filter((n) => {
      const titleMatch = n.title?.toLowerCase().includes(q)
      const contentMatch = n.content?.toLowerCase().includes(q)
      const tagMatch = n.tags?.some((t) => t.toLowerCase().includes(q))
      return titleMatch || contentMatch || tagMatch
    })
  }

  if (filters.types?.length) {
    result = result.filter((n) => filters.types!.includes(n.type as NodeType))
  }

  if (filters.tags?.length) {
    result = result.filter((n) =>
      filters.tags!.some((t) => n.tags?.includes(t))
    )
  }

  if (filters.assigneeId) {
    result = result.filter((n) => n.assigneeId === filters.assigneeId)
  }

  if (filters.dateFrom) {
    result = result.filter((n) => {
      const d = n.createdAt ? new Date(n.createdAt).getTime() : 0
      return d >= new Date(filters.dateFrom!).getTime()
    })
  }

  if (filters.dateTo) {
    result = result.filter((n) => {
      const d = n.createdAt ? new Date(n.createdAt).getTime() : 0
      return d <= new Date(filters.dateTo!).getTime()
    })
  }

  return result
}
