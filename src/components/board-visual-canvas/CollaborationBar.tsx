import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Share2, Copy, Mail, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const MOCK_COLLABORATORS = [
  { id: '1', name: 'You', color: 'bg-primary' },
  { id: '2', name: 'Sarah', color: 'bg-accent' },
  { id: '3', name: 'Alex', color: 'bg-warning/80' },
]

export interface CollaborationBarProps {
  className?: string
}

export function CollaborationBar({ className }: CollaborationBarProps) {
  const [shareOpen, setShareOpen] = useState(false)

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard')
    })
    setShareOpen(false)
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-card transition-all duration-200',
        className
      )}
      role="group"
      aria-label="Collaboration"
    >
      <div className="flex -space-x-2">
        {MOCK_COLLABORATORS.map((c) => (
          <div
            key={c.id}
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary/20 text-xs font-medium ring-2 ring-background transition-transform hover:scale-110 hover:z-10"
            title={c.name}
          >
            {c.name.slice(0, 1)}
          </div>
        ))}
      </div>
      <DropdownMenu open={shareOpen} onOpenChange={setShareOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Share board"
            className="transition-all hover:scale-[1.02]"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleCopyLink}>
            <Copy className="mr-2 h-4 w-4" />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            Invite via email
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite collaborators
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
