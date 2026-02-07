import { Button } from '@/components/ui/button'
import { GitBranch, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BoardVersion {
  id: string
  version: number
  label: string
  timestamp: string
}

export interface BottomTimelineProps {
  versions: BoardVersion[]
  currentVersion: number
  onVersionChange: (version: number) => void
  onPrevVersion?: () => void
  onNextVersion?: () => void
  canGoPrev?: boolean
  canGoNext?: boolean
  branchName?: string
  className?: string
}

export function BottomTimeline({
  versions,
  currentVersion,
  onVersionChange,
  onPrevVersion,
  onNextVersion,
  canGoPrev = true,
  canGoNext = true,
  branchName = 'main',
  className,
}: BottomTimelineProps) {
  const maxVersion = versions.length > 0 ? Math.max(...versions.map((v) => v.version)) : 0

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-2 shadow-card transition-all duration-200',
        className
      )}
      role="group"
      aria-label="Version history"
    >
      <div className="flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">{branchName}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevVersion}
          disabled={!canGoPrev}
          aria-label="Previous version"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <input
          type="range"
          min={0}
          max={maxVersion}
          value={currentVersion}
          onChange={(e) => onVersionChange(Number(e.target.value))}
          className="w-32 h-2 rounded-full appearance-none bg-muted cursor-pointer accent-primary"
          aria-label="Version slider"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onNextVersion}
          disabled={!canGoNext}
          aria-label="Next version"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <span className="text-xs text-muted-foreground tabular-nums">
        v{currentVersion}
      </span>
    </div>
  )
}
