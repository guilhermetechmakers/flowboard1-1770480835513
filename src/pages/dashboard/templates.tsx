import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LayoutGrid, Search } from 'lucide-react'

const mockTemplates = [
  { id: '1', name: 'Product Roadmap', description: 'Plan features and milestones', category: 'Product' },
  { id: '2', name: 'Research Synthesis', description: 'Organize research and findings', category: 'Research' },
  { id: '3', name: 'Design System', description: 'Components and patterns', category: 'Design' },
  { id: '4', name: 'Sprint Planning', description: 'Tasks and sprints', category: 'Agile' },
]

export function TemplatesPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2 font-semibold text-foreground">Templates</h1>
        <p className="mt-1 text-muted-foreground">Starter boards and onboarding examples</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden transition-all hover:border-primary/30">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <LayoutGrid className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardHeader>
              <CardTitle className="text-base">{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
              <span className="text-xs text-primary">{template.category}</span>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="sm">Apply template</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
