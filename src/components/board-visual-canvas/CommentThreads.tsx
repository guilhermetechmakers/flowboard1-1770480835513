import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, AtSign } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CanvasComment } from '@/types'

export interface CommentThreadsProps {
  nodeId: string | null
  comments: CanvasComment[]
  onAddComment?: (nodeId: string, content: string) => void
  onReply?: (commentId: string, content: string) => void
  className?: string
}

function CommentItem({
  comment,
  onReply,
}: {
  comment: CanvasComment
  onReply?: (commentId: string, content: string) => void
}) {
  const [replyContent, setReplyContent] = useState('')
  const [showReply, setShowReply] = useState(false)

  return (
    <div className="flex gap-3 py-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium">
        {comment.authorName.slice(0, 1)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{comment.authorName}</span>
          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
        </div>
        <p className="text-sm mt-0.5">{comment.content}</p>
        <button
          type="button"
          onClick={() => setShowReply(!showReply)}
          className="text-xs text-primary hover:underline mt-1"
        >
          Reply
        </button>
        {showReply && (
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onReply?.(comment.id, replyContent)
                  setReplyContent('')
                  setShowReply(false)
                }
              }}
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={() => {
                onReply?.(comment.id, replyContent)
                setReplyContent('')
                setShowReply(false)
              }}
              disabled={!replyContent.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 mt-2 border-l-2 border-muted pl-4 space-y-2">
            {comment.replies.map((r) => (
              <CommentItem key={r.id} comment={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function CommentThreads({
  nodeId,
  comments,
  onAddComment,
  className,
}: CommentThreadsProps) {
  const [newComment, setNewComment] = useState('')

  const handleMention = (_e: React.KeyboardEvent) => {
    // Placeholder for @ mention support
  }

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border border-border bg-card p-4 shadow-card',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium">Comments</h3>
      </div>

      {!nodeId ? (
        <p className="text-sm text-muted-foreground">
          Select a node to view or add comments.
        </p>
      ) : (
        <>
          <div className="space-y-2 max-h-48 overflow-auto">
            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            ) : (
              comments.map((c) => (
                <CommentItem key={c.id} comment={c} />
              ))
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Input
                placeholder="Add a comment... Use @ to mention"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleMention}
                className="pr-10"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => {
                  if (newComment.trim() && nodeId) {
                    onAddComment?.(nodeId, newComment)
                    setNewComment('')
                  }
                }}
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="icon"
              variant="outline"
              title="Mention someone"
              aria-label="Insert mention"
            >
              <AtSign className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
