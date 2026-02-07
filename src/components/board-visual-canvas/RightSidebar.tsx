import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Sparkles, Send, X, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AISuggestion } from '@/types'

const MOCK_SUGGESTIONS: AISuggestion[] = [
  {
    id: '1',
    type: 'action',
    title: 'Add 3 nodes for "Q1 Goals"',
    description: 'Break down Q1 goals into actionable sub-nodes',
    nodeIds: ['3'],
  },
  {
    id: '2',
    type: 'summary',
    title: 'Summarize research phase',
    description: 'Generate a concise summary of the research nodes',
    nodeIds: ['1'],
  },
]

const MOCK_HISTORY = [
  { id: '1', text: 'Created "Research Phase" node', time: '2m ago' },
  { id: '2', text: 'Connected Research Phase to Design Mockups', time: '5m ago' },
]

export interface RightSidebarProps {
  onClose: () => void
  className?: string
}

export function RightSidebar({ onClose, className }: RightSidebarProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text: input.trim() }])
    setInput('')
  }

  return (
    <div
      className={cn(
        'flex w-80 flex-col border-l border-border bg-card shadow-card animate-fade-in',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">AI Agent</h2>
            <p className="text-xs text-muted-foreground">Project assistant</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close panel">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Suggestions</h3>
          <div className="space-y-2">
            {MOCK_SUGGESTIONS.map((s) => (
              <Card
                key={s.id}
                className="p-4 border-primary/20 hover:border-primary/40 transition-colors duration-200"
              >
                <p className="text-sm font-medium mb-1">{s.title}</p>
                <p className="text-xs text-muted-foreground mb-3">{s.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="transition-all hover:scale-[1.02]">
                    Apply
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </h3>
          <div className="space-y-2 max-h-32 overflow-auto">
            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Ask the AI to summarize nodes, suggest connections, or generate content.
              </p>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-lg p-2 text-sm',
                    m.role === 'user'
                      ? 'bg-primary/10 text-primary ml-4'
                      : 'bg-muted mr-4'
                  )}
                >
                  {m.text}
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Ask the AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">History</h3>
          <div className="space-y-2">
            {MOCK_HISTORY.map((h) => (
              <div
                key={h.id}
                className="rounded-md border border-border px-3 py-2 text-sm"
              >
                <p>{h.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{h.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
