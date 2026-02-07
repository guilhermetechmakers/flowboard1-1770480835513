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

export interface LoginSignupPage {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

export interface Dashboard {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

export interface ActivityItem {
  id: string
  type: 'comment' | 'ai' | 'share'
  text: string
  time: string
  metadata?: Record<string, unknown>
}

export interface ProjectWithMeta extends Project {
  lastActivity: string
  thumbnail?: string
}

export interface ProjectCardData {
  id: string
  name: string
  thumbnail?: string
  lastActivity: string
  collaboratorsCount: number
  boardId?: string
}

export interface BoardVisualCanvas {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

export interface BoardVersion {
  id: string
  boardId: string
  version: number
  nodes: BoardNode[]
  edges: BoardEdge[]
  createdAt: string
}

export interface CanvasComment {
  id: string
  nodeId: string
  content: string
  authorId: string
  authorName: string
  createdAt: string
  replies?: CanvasComment[]
}

export interface AISuggestion {
  id: string
  type: 'action' | 'summary' | 'expand'
  title: string
  description: string
  nodeIds?: string[]
}

export interface Viewport {
  x: number
  y: number
  zoom: number
}
