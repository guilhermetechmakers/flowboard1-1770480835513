import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, Paperclip, Tag, MessageSquare, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BoardNode } from '@/types'

export interface NodeDetailPanelProps {
  node: BoardNode
  onClose: () => void
  onUpdate: (updates: Partial<Pick<BoardNode, 'title' | 'content'>>) => void
  className?: string
}

export function NodeDetailPanel({
  node,
  onClose,
  onUpdate,
  className,
}: NodeDetailPanelProps) {
  const [title, setTitle] = useState(node.title)
  const [content, setContent] = useState(node.content ?? '')
  const [showComments, setShowComments] = useState(false)

  const handleTitleBlur = () => {
    if (title !== node.title) onUpdate({ title })
  }

  const handleContentBlur = () => {
    if (content !== (node.content ?? '')) onUpdate({ content })
  }

  return (
    <div
      className={cn(
        'flex w-80 flex-col border-l border-border bg-card shadow-card animate-fade-in',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-lg font-semibold">Node Details</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="node-title">Title</Label>
          <Input
            id="node-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            placeholder="Node title"
            className="transition-colors focus-visible:ring-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="node-content">Content</Label>
          <Textarea
            id="node-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={handleContentBlur}
            placeholder="Add content..."
            rows={4}
            className="min-h-[100px] resize-y transition-colors focus-visible:ring-2"
          />
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Type</p>
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
            {node.type}
          </span>
        </div>

        <Card className="bg-primary/5 border-primary/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium">AI Summary</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Summarize, expand, suggest links, or generate next steps.
          </p>
          <Button size="sm" variant="secondary" className="transition-all hover:scale-[1.02]">
            Summarize
          </Button>
        </Card>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Comments
          </button>
          {showComments && (
            <div className="rounded-md border border-border p-3 mt-2 animate-fade-in">
              <p className="text-sm text-muted-foreground">No comments yet.</p>
              <Input
                placeholder="Add a comment..."
                className="mt-2"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Paperclip className="h-4 w-4" />
            Attachments
          </div>
          <p className="text-xs text-muted-foreground">No attachments</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Tag className="h-4 w-4" />
            Tags
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
              Add tag
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
