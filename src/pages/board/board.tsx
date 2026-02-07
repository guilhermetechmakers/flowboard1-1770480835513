import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  MousePointer2,
  Hand,
  Link2,
  Plus,
  LayoutGrid,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Minimize2,
  Grid3X3,
  Sparkles,
  Share2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BoardNode, NodeType } from '@/types'

const NODE_TYPES: { type: NodeType; label: string }[] = [
  { type: 'text', label: 'Text' },
  { type: 'research_link', label: 'Link' },
  { type: 'file', label: 'File' },
  { type: 'image', label: 'Image' },
  { type: 'task', label: 'Task' },
  { type: 'table', label: 'Table' },
  { type: 'code', label: 'Code' },
  { type: 'note', label: 'Note' },
]

const mockNodes: BoardNode[] = [
  { id: '1', type: 'text', title: 'Research Phase', content: '', x: 100, y: 100, width: 200, height: 80 },
  { id: '2', type: 'task', title: 'Design Mockups', content: '', x: 400, y: 100, width: 200, height: 80 },
  { id: '3', type: 'note', title: 'Q1 Goals', content: '', x: 250, y: 280, width: 200, height: 80 },
]

export function BoardPage() {
  useParams()
  const [nodes, setNodes] = useState<BoardNode[]>(mockNodes)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [tool, setTool] = useState<'select' | 'pan' | 'connect'>('select')
  const [showGrid, setShowGrid] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [showNodePanel, setShowNodePanel] = useState(false)
  const [showAIPanel, setShowAIPanel] = useState(true)

  const selectedNode = nodes.find((n) => n.id === selectedId)

  const handleAddNode = useCallback((type: NodeType) => {
    const id = String(Date.now())
    const newNode: BoardNode = {
      id,
      type,
      title: `New ${type}`,
      content: '',
      x: 200 + Math.random() * 200,
      y: 200 + Math.random() * 200,
      width: 200,
      height: 80,
    }
    setNodes((prev) => [...prev, newNode])
    setSelectedId(id)
    setShowNodePanel(true)
  }, [])

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1 rounded-lg border border-border bg-card p-1 shadow-card">
        <Button
          variant={tool === 'select' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => setTool('select')}
          title="Select (V)"
        >
          <MousePointer2 className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === 'pan' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => setTool('pan')}
          title="Pan (H)"
        >
          <Hand className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === 'connect' ? 'secondary' : 'ghost'}
          size="icon"
          onClick={() => setTool('connect')}
          title="Connect"
        >
          <Link2 className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-6 w-px bg-border" />
        <Button size="icon" variant="ghost" title="Create node (N)">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" title="Auto layout">
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-6 w-px bg-border" />
        <Button size="icon" variant="ghost" title="Undo">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" title="Redo">
          <Redo2 className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-6 w-px bg-border" />
        <Button size="icon" variant="ghost" onClick={() => setZoom((z) => Math.min(2, z + 0.2))}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setZoom(1)}>
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant={showGrid ? 'secondary' : 'ghost'}
          onClick={() => setShowGrid(!showGrid)}
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
      </div>

      {/* Node types palette */}
      <div className="absolute bottom-4 left-4 z-20 flex gap-1 rounded-lg border border-border bg-card p-2 shadow-card">
        {NODE_TYPES.map(({ type, label }) => (
          <Button
            key={type}
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => handleAddNode(type)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Collaboration bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-card">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 w-8 rounded-full border-2 border-card bg-primary/20 flex items-center justify-center text-xs font-medium"
            >
              {i}
            </div>
          ))}
        </div>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          {showGrid && (
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
          )}
          <div className="absolute inset-0 p-8" style={{ minWidth: 2000, minHeight: 2000 }}>
            {nodes.map((node) => (
              <div
                key={node.id}
                className={cn(
                  'absolute cursor-pointer rounded-lg border-2 bg-card p-3 shadow-card transition-all hover:shadow-card-hover',
                  selectedId === node.id
                    ? 'border-primary shadow-glow'
                    : 'border-border hover:border-primary/50'
                )}
                style={{
                  left: node.x,
                  top: node.y,
                  width: node.width ?? 200,
                  height: node.height ?? 80,
                }}
                onClick={() => {
                  setSelectedId(node.id)
                  setShowNodePanel(true)
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold truncate">{node.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-muted">{node.type}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {node.content || 'Double-click to edit'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Node detail panel */}
      {showNodePanel && selectedNode && (
        <div className="w-80 border-l border-border bg-card flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold">Node: {selectedNode.title}</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowNodePanel(false)}>
              ×
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <input
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
                defaultValue={selectedNode.title}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <textarea
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm min-h-[100px]"
                defaultValue={selectedNode.content}
              />
            </div>
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Summarize, expand, suggest links, or generate next steps.
              </p>
              <Button size="sm" variant="secondary">Summarize</Button>
            </Card>
          </div>
        </div>
      )}

      {/* AI Agent panel */}
      {showAIPanel && (
        <div className="w-80 border-l border-border bg-card flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">AI Agent</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowAIPanel(false)}>
              ×
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Suggestions and action cards will appear here.
            </p>
            <Card className="p-4 border-primary/20">
              <p className="text-sm mb-2">Suggested: Add 3 nodes for "Q1 Goals"</p>
              <Button size="sm" className="mr-2">Apply</Button>
              <Button size="sm" variant="ghost">Dismiss</Button>
            </Card>
          </div>
        </div>
      )}

      {/* Timeline at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 shadow-card">
        <span className="text-xs text-muted-foreground">Version history</span>
        <input type="range" min="0" max="100" className="w-32" />
      </div>
    </div>
  )
}
