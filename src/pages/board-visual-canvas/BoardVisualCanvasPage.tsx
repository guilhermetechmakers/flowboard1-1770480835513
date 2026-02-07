import { useState, useCallback, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Toolbar,
  CanvasArea,
  NodeTypesPalette,
  NodeDetailPanel,
  RightSidebar,
  CollaborationBar,
  BottomTimeline,
  CommentThreads,
  BoardSearchFilter,
} from '@/components/board-visual-canvas'
import type { BoardNode, BoardEdge, NodeType, Viewport, SearchFilters } from '@/types'
import { filterNodesClient } from '@/api/search'

const NODE_TYPES: { type: NodeType; label: string }[] = [
  { type: 'text', label: 'Text' },
  { type: 'research_link', label: 'Research Link' },
  { type: 'file', label: 'File' },
  { type: 'image', label: 'Image' },
  { type: 'task', label: 'Task' },
  { type: 'table', label: 'Table' },
  { type: 'code', label: 'Code Snippet' },
  { type: 'note', label: 'Note' },
]

const MOCK_NODES: BoardNode[] = [
  {
    id: '1',
    type: 'text',
    title: 'Research Phase',
    content: '',
    x: 100,
    y: 100,
    width: 200,
    height: 80,
  },
  {
    id: '2',
    type: 'task',
    title: 'Design Mockups',
    content: '',
    x: 400,
    y: 100,
    width: 200,
    height: 80,
  },
  {
    id: '3',
    type: 'note',
    title: 'Q1 Goals',
    content: '',
    x: 250,
    y: 280,
    width: 200,
    height: 80,
  },
]

const MOCK_EDGES: BoardEdge[] = [
  { id: 'e1', source: '1', target: '2' },
]

const MOCK_VERSIONS = [
  { id: 'v1', version: 0, label: 'Initial', timestamp: '1h ago' },
  { id: 'v2', version: 1, label: 'Added nodes', timestamp: '30m ago' },
  { id: 'v3', version: 2, label: 'Current', timestamp: 'Now' },
]

type Tool = 'select' | 'pan' | 'connect'

export default function BoardVisualCanvasPage() {
  useParams<{ boardId?: string }>()
  const [nodes, setNodes] = useState<BoardNode[]>(MOCK_NODES)
  const [edges, setEdges] = useState<BoardEdge[]>(MOCK_EDGES)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [tool, setTool] = useState<Tool>('select')
  const [showGrid, setShowGrid] = useState(true)
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 })
  const [showNodePanel, setShowNodePanel] = useState(false)
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [isNodeMenuOpen, setIsNodeMenuOpen] = useState(false)
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null)
  const [versionIndex, setVersionIndex] = useState(2)
  const [comments, setComments] = useState<Record<string, import('@/types').CanvasComment[]>>({})
  const [historyIndex, setHistoryIndex] = useState(0)
  const historyRef = useRef<{ nodes: BoardNode[]; edges: BoardEdge[] }[]>([])
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({})

  const hasActiveFilters =
    !!searchFilters.query?.trim() ||
    (searchFilters.types?.length ?? 0) > 0 ||
    (searchFilters.tags?.length ?? 0) > 0 ||
    !!searchFilters.assigneeId ||
    !!searchFilters.dateFrom ||
    !!searchFilters.dateTo

  const displayedNodes = hasActiveFilters
    ? filterNodesClient(nodes, searchFilters)
    : nodes

  const displayedNodeIds = new Set(displayedNodes.map((n) => n.id))
  const displayedEdges = hasActiveFilters
    ? edges.filter((e) => displayedNodeIds.has(e.source) && displayedNodeIds.has(e.target))
    : edges

  const selectedNode = nodes.find((n) => n.id === selectedId)

  const pushHistory = useCallback(() => {
    const newEntry = {
      nodes: nodes.map((n) => ({ ...n })),
      edges: edges.map((e) => ({ ...e })),
    }
    historyRef.current = historyRef.current.slice(0, historyIndex + 1)
    historyRef.current.push(newEntry)
    if (historyRef.current.length > 50) historyRef.current.shift()
    setHistoryIndex(historyRef.current.length - 1)
  }, [nodes, edges, historyIndex])

  const handleAddNode = useCallback(
    (type: NodeType) => {
      pushHistory()
      const id = String(Date.now())
      const newNode: BoardNode = {
        id,
        type,
        title: `New ${type.replace('_', ' ')}`,
        content: '',
        x: 200 + Math.random() * 200,
        y: 200 + Math.random() * 200,
        width: 200,
        height: 80,
      }
      setNodes((prev) => [...prev, newNode])
      setSelectedId(id)
      setShowNodePanel(true)
    },
    [pushHistory]
  )

  const handleNodeMove = useCallback((id: string, x: number, y: number) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, x, y } : n))
    )
  }, [])

  const handleNodeUpdate = useCallback(
    (updates: Partial<Pick<BoardNode, 'title' | 'content'>>) => {
      if (!selectedId) return
      pushHistory()
      setNodes((prev) =>
        prev.map((n) =>
          n.id === selectedId ? { ...n, ...updates } : n
        )
      )
    },
    [selectedId, pushHistory]
  )

  const handleConnectStart = useCallback((nodeId: string) => {
    setConnectingFrom(nodeId)
  }, [])

  const handleConnectEnd = useCallback(
    (targetId: string) => {
      if (!connectingFrom) return
      pushHistory()
      const id = `e-${Date.now()}`
      setEdges((prev) => [...prev, { id, source: connectingFrom, target: targetId }])
      setConnectingFrom(null)
    },
    [connectingFrom, pushHistory]
  )

  const handleUndo = useCallback(() => {
    if (historyIndex <= 0) return
    const newIdx = historyIndex - 1
    const entry = historyRef.current[newIdx]
    if (entry) {
      setNodes(entry.nodes.map((n) => ({ ...n })))
      setEdges(entry.edges.map((e) => ({ ...e })))
      setHistoryIndex(newIdx)
    }
  }, [historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex >= historyRef.current.length - 1) return
    const newIdx = historyIndex + 1
    const entry = historyRef.current[newIdx]
    if (entry) {
      setNodes(entry.nodes.map((n) => ({ ...n })))
      setEdges(entry.edges.map((e) => ({ ...e })))
      setHistoryIndex(newIdx)
    }
  }, [historyIndex])

  const handleAutoLayout = useCallback(() => {
    pushHistory()
    const cols = Math.ceil(Math.sqrt(nodes.length))
    const gap = 80
    setNodes((prev) =>
      prev.map((n, i) => ({
        ...n,
        x: (i % cols) * (220 + gap),
        y: Math.floor(i / cols) * (100 + gap),
      }))
    )
  }, [nodes.length, pushHistory])

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < historyRef.current.length - 1

  useEffect(() => {
    if (historyRef.current.length === 0) {
      historyRef.current = [
        { nodes: nodes.map((n) => ({ ...n })), edges: edges.map((e) => ({ ...e })) },
      ]
      setHistoryIndex(0)
    }
  }, [])

  useEffect(() => {
    document.title = 'Board - Visual Canvas | FlowBoard'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Collaborative infinite canvas for projects and ideas')
    return () => {
      document.title = 'FlowBoard'
    }
  }, [])

  return (
    <div className="flex h-screen flex-col bg-background">
        <div className="flex flex-1 min-h-0">
          <div className="flex flex-1 flex-col min-w-0 relative">
            <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
              <Toolbar
                tool={tool}
                onToolChange={(t) => setTool(t)}
                onCreateNode={() => setIsNodeMenuOpen((o) => !o)}
                onAutoLayout={handleAutoLayout}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={canUndo}
                canRedo={canRedo}
                zoom={viewport.zoom}
                onZoomIn={() =>
                  setViewport((v) => ({ ...v, zoom: Math.min(2, v.zoom + 0.2) }))
                }
                onZoomOut={() =>
                  setViewport((v) => ({ ...v, zoom: Math.max(0.25, v.zoom - 0.2) }))
                }
                onZoomReset={() =>
                  setViewport((v) => ({ ...v, zoom: 1 }))
                }
                showGrid={showGrid}
                onGridToggle={() => setShowGrid((g) => !g)}
                nodeTypes={NODE_TYPES}
                onAddNode={handleAddNode}
                isNodeMenuOpen={isNodeMenuOpen}
                onNodeMenuToggle={() => setIsNodeMenuOpen((o) => !o)}
              />
              <BoardSearchFilter
                nodes={nodes}
                onFiltersChange={setSearchFilters}
                onNodeSelect={(id) => {
                  setSelectedId(id)
                  setShowNodePanel(true)
                }}
              />
            </div>

            <div className="absolute top-4 right-4 z-20">
              <CollaborationBar />
            </div>

            <div className="flex-1 min-h-0 pt-16">
              <CanvasArea
                nodes={displayedNodes}
                edges={displayedEdges}
                selectedId={selectedId}
                onSelectNode={(id) => {
                  setSelectedId(id)
                  setShowNodePanel(!!id)
                }}
                onNodeMove={handleNodeMove}
                viewport={viewport}
                onViewportChange={setViewport}
                showGrid={showGrid}
                tool={tool}
                connectingFrom={connectingFrom}
                onConnectStart={handleConnectStart}
                onConnectEnd={handleConnectEnd}
                onCanvasClick={() => setSelectedId(null)}
              />
            </div>

            <div className="absolute bottom-4 left-4 z-20">
              <NodeTypesPalette
                nodeTypes={NODE_TYPES}
                onAddNode={handleAddNode}
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              <BottomTimeline
                versions={MOCK_VERSIONS}
                currentVersion={versionIndex}
                onVersionChange={setVersionIndex}
                onPrevVersion={() => setVersionIndex((i) => Math.max(0, i - 1))}
                onNextVersion={() =>
                  setVersionIndex((i) => Math.min(MOCK_VERSIONS.length - 1, i + 1))
                }
                canGoPrev={versionIndex > 0}
                canGoNext={versionIndex < MOCK_VERSIONS.length - 1}
                branchName="main"
              />
            </div>
          </div>

          {showNodePanel && selectedNode && (
            <NodeDetailPanel
              node={selectedNode}
              onClose={() => {
                setShowNodePanel(false)
                setSelectedId(null)
              }}
              onUpdate={handleNodeUpdate}
            />
          )}

          {showAIPanel && (
            <RightSidebar onClose={() => setShowAIPanel(false)} />
          )}
        </div>

        {showNodePanel && selectedId && (
          <div className="border-t border-border p-4 bg-card">
            <CommentThreads
              nodeId={selectedId}
              comments={comments[selectedId] ?? []}
              onAddComment={(nodeId, content) => {
                setComments((prev) => ({
                  ...prev,
                  [nodeId]: [
                    ...(prev[nodeId] ?? []),
                    {
                      id: `c-${Date.now()}`,
                      nodeId,
                      content,
                      authorId: '1',
                      authorName: 'You',
                      createdAt: 'Just now',
                    },
                  ],
                }))
              }}
            />
          </div>
        )}
      </div>
  )
}
