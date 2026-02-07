import { Button } from '@/components/ui/button'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NodeType } from '@/types'

export type Tool = 'select' | 'pan' | 'connect'

export interface ToolbarProps {
  tool: Tool
  onToolChange: (tool: Tool) => void
  onCreateNode: () => void
  onAutoLayout: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomReset: () => void
  showGrid: boolean
  onGridToggle: () => void
  nodeTypes: { type: NodeType; label: string }[]
  onAddNode: (type: NodeType) => void
  isNodeMenuOpen?: boolean
  onNodeMenuToggle?: () => void
  className?: string
}

export function Toolbar({
  tool,
  onToolChange,
  onCreateNode,
  onAutoLayout,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  showGrid,
  onGridToggle,
  nodeTypes,
  onAddNode,
  isNodeMenuOpen,
  onNodeMenuToggle,
  className,
}: ToolbarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-lg border border-border bg-card p-1 shadow-card transition-all duration-200',
        className
      )}
      role="toolbar"
      aria-label="Canvas toolbar"
    >
      <Button
        variant={tool === 'select' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => onToolChange('select')}
        title="Select (V)"
        aria-pressed={tool === 'select'}
      >
        <MousePointer2 className="h-4 w-4" />
      </Button>
      <Button
        variant={tool === 'pan' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => onToolChange('pan')}
        title="Pan (H)"
        aria-pressed={tool === 'pan'}
      >
        <Hand className="h-4 w-4" />
      </Button>
      <Button
        variant={tool === 'connect' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => onToolChange('connect')}
        title="Connect"
        aria-pressed={tool === 'connect'}
      >
        <Link2 className="h-4 w-4" />
      </Button>
      <div className="mx-1 h-6 w-px bg-border" aria-hidden />
      <div className="relative">
        <Button
          size="icon"
          variant={isNodeMenuOpen ? 'secondary' : 'ghost'}
          onClick={onNodeMenuToggle ?? onCreateNode}
          title="Create node (N)"
          aria-expanded={isNodeMenuOpen}
          aria-haspopup="true"
        >
          <Plus className="h-4 w-4" />
        </Button>
        {isNodeMenuOpen && onNodeMenuToggle && (
          <div
            className="absolute top-full left-0 mt-1 z-50 flex flex-col gap-0.5 rounded-lg border border-border bg-card p-1 shadow-card animate-scale-in min-w-[140px]"
            role="menu"
          >
            {nodeTypes.map(({ type, label }) => (
              <button
                key={type}
                type="button"
                role="menuitem"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted text-left transition-colors duration-200"
                onClick={() => {
                  onAddNode(type)
                  onNodeMenuToggle()
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
      <Button
        size="icon"
        variant="ghost"
        onClick={onAutoLayout}
        title="Auto layout"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <div className="mx-1 h-6 w-px bg-border" aria-hidden />
      <Button
        size="icon"
        variant="ghost"
        onClick={onUndo}
        title="Undo"
        disabled={!canUndo}
        aria-label="Undo"
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onRedo}
        title="Redo"
        disabled={!canRedo}
        aria-label="Redo"
      >
        <Redo2 className="h-4 w-4" />
      </Button>
      <div className="mx-1 h-6 w-px bg-border" aria-hidden />
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomIn}
        title="Zoom in"
        aria-label="Zoom in"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomOut}
        title="Zoom out"
        aria-label="Zoom out"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomReset}
        title="Reset zoom"
        aria-label="Reset zoom to 100%"
      >
        <Minimize2 className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant={showGrid ? 'secondary' : 'ghost'}
        onClick={onGridToggle}
        title={showGrid ? 'Hide grid' : 'Show grid'}
        aria-pressed={showGrid}
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <span
        className="ml-2 text-xs text-muted-foreground font-medium tabular-nums"
        aria-live="polite"
      >
        {Math.round(zoom * 100)}%
      </span>
    </div>
  )
}
