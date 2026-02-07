import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LayoutGrid, Search, Plus } from 'lucide-react'

const mockProjects = [
  { id: '1', name: 'Product Roadmap', lastActivity: '2 hours ago', collaborators: 3 },
  { id: '2', name: 'Research Notes', lastActivity: '1 day ago', collaborators: 2 },
  { id: '3', name: 'Design System', lastActivity: '3 days ago', collaborators: 5 },
]

export function ProjectsPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h2 font-semibold text-foreground">Projects</h1>
          <p className="mt-1 text-muted-foreground">Your boards and collaborations</p>
        </div>
        <Link to="/dashboard/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <Link key={project.id} to={`/board/${project.id}`}>
            <Card className="overflow-hidden transition-all hover:border-primary/30 h-full">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <LayoutGrid className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.lastActivity} · {project.collaborators} collaborators
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
