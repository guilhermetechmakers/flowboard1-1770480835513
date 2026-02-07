import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import {
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  FileText,
  Tag,
  Calendar,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SearchFilters, NodeType, NodeSearchResult } from '@/types'
import { searchNodes, filterNodesClient } from '@/api/search'
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

export interface DashboardSearchFilterProps {
  /** Scope: 'global' for all boards, or boardId for board-scoped */
  scope?: 'global' | string
  /** Client-side nodes when scope is boardId (for instant filtering) */
  nodes?: import('@/types').BoardNode[]
  placeholder?: string
  onFiltersChange?: (filters: SearchFilters) => void
  onSearch?: (query: string, filters: SearchFilters) => void
  className?: string
}

export function DashboardSearchFilter({
  scope = 'global',
  nodes,
  placeholder = 'Search nodes by type, tags, assignee...',
  onFiltersChange,
  onSearch,
  className,
}: DashboardSearchFilterProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const [results, setResults] = useState<NodeSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  const hasActiveFilters =
    (filters.types?.length ?? 0) > 0 ||
    (filters.tags?.length ?? 0) > 0 ||
    !!filters.assigneeId ||
    !!filters.dateFrom ||
    !!filters.dateTo

  const runSearch = useCallback(async () => {
    if (!query.trim() && !hasActiveFilters) {
      setResults([])
      setShowResults(false)
      return
    }

    setIsSearching(true)
    setShowResults(true)
    onSearch?.(query, filters)

    if (scope !== 'global' && nodes && nodes.length > 0) {
      const filtered = filterNodesClient(nodes, { ...filters, query: query.trim() || undefined })
      setResults(
        filtered.map((node) => ({
          node,
          boardId: scope,
          boardTitle: undefined,
        }))
      )
      setIsSearching(false)
      return
    }

    try {
      const res = await searchNodes({
        query: query.trim() || undefined,
        ...filters,
        boardId: scope !== 'global' ? scope : undefined,
        limit: 20,
      })
      setResults(res)
    } catch {
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [query, filters, scope, nodes, hasActiveFilters, onSearch])

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
    const t = setTimeout(runSearch, 300)
    setDebounceTimer(() => t)
    return () => clearTimeout(t)
  }, [query, filters, scope])

  const handleFilterChange = useCallback(
    (updates: Partial<SearchFilters>) => {
      const next = { ...filters, ...updates }
      setFilters(next)
      onFiltersChange?.(next)
    },
    [filters, onFiltersChange]
  )

  const toggleType = (type: NodeType) => {
    const current = filters.types ?? []
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type]
    handleFilterChange({ types: next.length ? next : undefined })
  }

  const clearFilters = () => {
    setFilters({})
    onFiltersChange?.({})
  }

  const handleResultSelect = (r: NodeSearchResult) => {
    setShowResults(false)
    setQuery('')
    navigate(`/board-visual-canvas/${r.boardId}`)
  }

  const handleBlur = () => {
    setTimeout(() => setShowResults(false), 150)
  }

  return (
    <div className={cn('relative flex-1 max-w-md', className)}>
      <div className="relative flex items-center gap-1">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
          aria-hidden
        />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => (query || hasActiveFilters) && setShowResults(true)}
          onBlur={handleBlur}
          className="pl-9 pr-20 h-10 rounded-md border border-border bg-background focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Search nodes"
          aria-expanded={showResults}
          aria-autocomplete="list"
          autoComplete="off"
        />
        <div className="absolute right-1 flex items-center gap-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={hasActiveFilters ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8 shrink-0"
                aria-label="Filter options"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Filter by type
              </DropdownMenuLabel>
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
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date range
              </DropdownMenuLabel>
              <div className="px-2 py-1.5 space-y-2" onClick={(e) => e.stopPropagation()}>
                <Input
                  type="date"
                  value={filters.dateFrom ?? ''}
                  onChange={(e) =>
                    handleFilterChange({
                      dateFrom: e.target.value || undefined,
                    })
                  }
                  className="h-8 text-xs"
                />
                <Input
                  type="date"
                  value={filters.dateTo ?? ''}
                  onChange={(e) =>
                    handleFilterChange({
                      dateTo: e.target.value || undefined,
                    })
                  }
                  className="h-8 text-xs"
                />
              </div>
              {hasActiveFilters && (
                <>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-center"
                      onClick={clearFilters}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear filters
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showResults && (query || hasActiveFilters) && (
        <div
          className="absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border border-border bg-background shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95"
          role="listbox"
        >
          {isSearching ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <div className="animate-pulse">Searching...</div>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <LayoutGrid className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No nodes match your search
              </p>
            </div>
          ) : (
            <ul className="max-h-80 overflow-auto py-2">
              {results.map((r) => (
                <li key={`${r.boardId}-${r.node.id}`}>
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors duration-200"
                    onClick={() => handleResultSelect(r)}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{r.node.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {NODE_TYPE_LABELS[r.node.type as NodeType]}
                        {r.boardTitle && ` · ${r.boardTitle}`}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
