import { Button } from '@/components/ui/button'
import {
  Type,
  Link2,
  FileText,
  Image,
  CheckSquare,
  Table2,
  Code2,
  StickyNote,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NodeType } from '@/types'

const NODE_ICONS: Record<NodeType, React.ComponentType<{ className?: string }>> = {
  text: Type,
  research_link: Link2,
  file: FileText,
  image: Image,
  task: CheckSquare,
  table: Table2,
  code: Code2,
  note: StickyNote,
}

export interface NodeTypesPaletteProps {
  nodeTypes: { type: NodeType; label: string }[]
  onAddNode: (type: NodeType) => void
  className?: string
}

export function NodeTypesPalette({
  nodeTypes,
  onAddNode,
  className,
}: NodeTypesPaletteProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 rounded-lg border border-border bg-card p-3 shadow-card transition-all duration-200',
        className
      )}
      role="group"
      aria-label="Add node types"
    >
      {nodeTypes.map(({ type, label }) => {
        const Icon = NODE_ICONS[type]
        return (
          <Button
            key={type}
            variant="ghost"
            size="sm"
            className="h-9 gap-2 text-xs transition-all duration-200 hover:scale-[1.02] hover:shadow-card"
            onClick={() => onAddNode(type)}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </Button>
        )
      })}
    </div>
  )
}
