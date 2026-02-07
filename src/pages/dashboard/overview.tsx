import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LayoutGrid,
  FileUp,
  FolderKanban,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

const mockProjects = [
  { id: '1', name: 'Product Roadmap', lastActivity: '2 hours ago', collaborators: 3 },
  { id: '2', name: 'Research Notes', lastActivity: '1 day ago', collaborators: 2 },
]

const mockActivity = [
  { type: 'comment', text: 'Sarah commented on "Q1 Goals"', time: '10m ago' },
  { type: 'ai', text: 'AI suggested 3 new nodes for your flowchart', time: '1h ago' },
]

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2 font-semibold text-foreground">Overview</h1>
        <p className="mt-1 text-muted-foreground">Your projects and recent activity</p>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/dashboard/projects/new">
          <Card className="cursor-pointer transition-all hover:border-primary/30">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">New Board</p>
                <p className="text-sm text-muted-foreground">Start from scratch</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/dashboard/import">
          <Card className="cursor-pointer transition-all hover:border-primary/30">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <FileUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="font-medium">Import</p>
                <p className="text-sm text-muted-foreground">CSV or JSON</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/dashboard/templates">
          <Card className="cursor-pointer transition-all hover:border-primary/30">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/20">
                <FolderKanban className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="font-medium">Templates</p>
                <p className="text-sm text-muted-foreground">Use a starter</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Project grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-h3 font-semibold">Recent Projects</h2>
            <Link to="/dashboard/projects">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {mockProjects.map((project) => (
              <Link key={project.id} to={`/board/${project.id}`}>
                <Card className="overflow-hidden transition-all hover:border-primary/30">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <LayoutGrid className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <CardDescription>
                      {project.lastActivity} · {project.collaborators} collaborators
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div>
          <h2 className="text-h3 font-semibold">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {mockActivity.map((item, i) => (
              <Card key={i}>
                <CardContent className="flex items-start gap-4 pt-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    {item.type === 'ai' ? (
                      <Sparkles className="h-4 w-4 text-primary" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
