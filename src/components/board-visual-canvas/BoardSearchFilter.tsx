import { useState, useCallback, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SearchFilters, NodeType, BoardNode } from '@/types'
import { filterNodesClient } from '@/api/search'

const NODE_TYPE_LABELS: Record<NodeType, string> = {
  text: 'Text',
  research_link: 'Research Link',
  file: 'File',
  image: 'Image',
  task: 'Task',
  table: 'Table',
  code: 'Code',
  note: 'Note',
}

export interface BoardSearchFilterProps {
  nodes: BoardNode[]
  onFiltersChange: (filters: SearchFilters) => void
  onNodeSelect?: (nodeId: string) => void
  className?: string
}

export function BoardSearchFilter({
  nodes,
  onFiltersChange,
  onNodeSelect,
  className,
}: BoardSearchFilterProps) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [showResults, setShowResults] = useState(false)

  const hasActiveFilters =
    !!query.trim() ||
    (filters.types?.length ?? 0) > 0 ||
    (filters.tags?.length ?? 0) > 0 ||
    !!filters.assigneeId ||
    !!filters.dateFrom ||
    !!filters.dateTo

  const filteredNodes = filterNodesClient(nodes, {
    ...filters,
    query: query.trim() || undefined,
  })

  useEffect(() => {
    onFiltersChange({
      ...filters,
      query: query.trim() || undefined,
    })
  }, [query, filters, onFiltersChange])

  const handleFilterChange = useCallback(
    (updates: Partial<SearchFilters>) => {
      setFilters((prev) => ({ ...prev, ...updates }))
    },
    []
  )

  const toggleType = (type: NodeType) => {
    const current = filters.types ?? []
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type]
    handleFilterChange({ types: next.length ? next : undefined })
  }

  const clearFilters = () => {
    setQuery('')
    setFilters({})
    setShowResults(false)
  }

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 shadow-card">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
        <Input
          type="search"
          placeholder="Filter nodes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 150)}
          className="h-8 w-48 border-0 bg-transparent px-2 py-1 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="Filter nodes on canvas"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={filters.types?.length ? 'secondary' : 'ghost'}
              size="icon"
              className="h-7 w-7 shrink-0"
              aria-label="Filter options"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(NODE_TYPE_LABELS) as NodeType[]).map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={filters.types?.includes(type)}
                onCheckedChange={() => toggleType(type)}
              >
                {NODE_TYPE_LABELS[type]}
              </DropdownMenuCheckboxItem>
            ))}
            {hasActiveFilters && (
              <>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear filters
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showResults && hasActiveFilters && filteredNodes.length > 0 && (
        <div
          className="absolute top-full left-0 mt-1 z-50 w-64 max-h-60 overflow-auto rounded-lg border border-border bg-card shadow-lg py-2 animate-in fade-in-0 zoom-in-95"
          role="listbox"
        >
          {filteredNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted transition-colors duration-200"
              onClick={() => {
                onNodeSelect?.(node.id)
                setShowResults(false)
              }}
            >
              <span className="truncate">{node.title}</span>
              <span className="text-xs text-muted-foreground shrink-0">
                {NODE_TYPE_LABELS[node.type as NodeType]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
