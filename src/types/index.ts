export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  organizationId?: string
}

export interface Project {
  id: string
  name: string
  description?: string
  thumbnail?: string
  lastActivity?: string
  collaborators: User[]
  boardId?: string
}

export interface Board {
  id: string
  projectId: string
  name: string
  nodes: BoardNode[]
  edges: BoardEdge[]
}

export type NodeType =
  | 'text'
  | 'research_link'
  | 'file'
  | 'image'
  | 'task'
  | 'table'
  | 'code'
  | 'note'

export interface BoardNode {
  id: string
  type: NodeType
  title: string
  content?: string
  x: number
  y: number
  width?: number
  height?: number
  metadata?: Record<string, unknown>
}

export interface BoardEdge {
  id: string
  source: string
  target: string
}

export interface Template {
  id: string
  name: string
  description: string
  thumbnail?: string
  category: string
}

export interface Organization {
  id: string
  name: string
  plan?: string
}
