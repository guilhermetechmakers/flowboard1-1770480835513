import { api } from '@/lib/api'
import type { BoardVisualCanvas, BoardNode, BoardEdge } from '@/types'

export interface BoardWithData extends BoardVisualCanvas {
  nodes: BoardNode[]
  edges: BoardEdge[]
}

export async function fetchBoard(id: string): Promise<BoardWithData> {
  const board = await api.get<BoardVisualCanvas>(`/boards/${id}`)
  const nodes = await api.get<BoardNode[]>(`/boards/${id}/nodes`)
  const edges = await api.get<BoardEdge[]>(`/boards/${id}/edges`)
  return { ...board, nodes: nodes ?? [], edges: edges ?? [] }
}

export async function createBoard(data: {
  title: string
  description?: string
}): Promise<BoardVisualCanvas> {
  return api.post<BoardVisualCanvas>('/boards', data)
}

export async function updateBoard(
  id: string,
  data: { title?: string; description?: string; status?: string }
): Promise<BoardVisualCanvas> {
  return api.patch<BoardVisualCanvas>(`/boards/${id}`, data)
}

export async function deleteBoard(id: string): Promise<void> {
  return api.delete(`/boards/${id}`)
}

export async function updateBoardNodes(
  boardId: string,
  nodes: BoardNode[]
): Promise<BoardNode[]> {
  return api.put<BoardNode[]>(`/boards/${boardId}/nodes`, { nodes })
}

export async function updateBoardEdges(
  boardId: string,
  edges: BoardEdge[]
): Promise<BoardEdge[]> {
  return api.put<BoardEdge[]>(`/boards/${boardId}/edges`, { edges })
}
