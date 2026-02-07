import { Link, useNavigate } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LayoutGrid, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const BOARD_CANVAS_PATH = '/board-visual-canvas'
import type { User } from '@/types'

export interface ProjectWithMeta {
  id: string
  name: string
  thumbnail?: string
  lastActivity: string
  collaborators: User[]
  boardId?: string
}

export interface ProjectCardData {
  id: string
  name: string
  thumbnail?: string
  lastActivity: string
  collaboratorsCount: number
  boardId?: string
}

export interface ProjectGridListProps {
  projects: (ProjectWithMeta | ProjectCardData)[]
  isLoading?: boolean
  onViewAll?: () => void
  viewAllLabel?: string
  emptyMessage?: string
  className?: string
}

function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-card border border-border/60">
      <div className="aspect-video bg-gradient-to-br from-muted to-muted/60 animate-pulse" />
      <CardHeader className="pb-2">
        <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
        <div className="mt-2 h-4 w-1/2 rounded bg-muted animate-pulse" />
      </CardHeader>
    </Card>
  )
}

export function ProjectGridList({
  projects,
  isLoading = false,
  onViewAll,
  viewAllLabel = 'View all',
  emptyMessage = 'No projects yet. Create your first board to get started.',
  className,
}: ProjectGridListProps) {
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="flex items-center justify-between">
          <h2 className="text-h3 font-semibold">Recent Projects</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-fade-in-up [animation-fill-mode:both]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <ProjectCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className={cn('space-y-4', className)}>
        <h2 className="text-h3 font-semibold">Recent Projects</h2>
        <Card className="flex flex-col items-center justify-center py-16 px-6 border-dashed border-2 border-border/80 bg-gradient-to-b from-card to-card-muted/50 transition-all duration-300 hover:border-primary/20">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
            <LayoutGrid className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-center max-w-sm">{emptyMessage}</p>
          <Button asChild className="mt-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
            <Link to="/board-visual-canvas">Create your first board</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-h3 font-semibold">Recent Projects</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => (onViewAll ? onViewAll() : navigate('/dashboard/projects'))}
        >
          {viewAllLabel}
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <Link
            key={project.id}
            to={
              project.boardId
                ? `${BOARD_CANVAS_PATH}/${project.boardId}`
                : `${BOARD_CANVAS_PATH}/${project.id}`
            }
            className="group block animate-fade-in-up [animation-fill-mode:both]"
            style={{ animationDelay: `${Math.min(idx * 60, 200)}ms` }}
          >
            <Card className="h-full overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-0.5 hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-primary border-border/60">
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center relative overflow-hidden">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt=""
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="rounded-xl bg-primary/5 p-4 group-hover:bg-primary/10 transition-colors duration-300">
                    <LayoutGrid className="h-12 w-12 text-primary/60" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-1">{project.name}</CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                  <span>{project.lastActivity}</span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {'collaboratorsCount' in project
                      ? project.collaboratorsCount
                      : project.collaborators.length}{' '}
                    collaborator
                    {('collaboratorsCount' in project
                      ? project.collaboratorsCount
                      : project.collaborators.length) !== 1
                      ? 's'
                      : ''}
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
