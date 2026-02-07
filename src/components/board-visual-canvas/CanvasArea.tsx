import { useRef, useEffect, useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import type { BoardNode, BoardEdge } from '@/types'

const GRID_SIZE = 24
const NODE_PADDING = 12
const MINIMAP_SIZE = 160
const MIN_ZOOM = 0.25
const MAX_ZOOM = 2

export interface Viewport {
  x: number
  y: number
  zoom: number
}

export interface CanvasAreaProps {
  nodes: BoardNode[]
  edges: BoardEdge[]
  selectedId: string | null
  onSelectNode: (id: string | null) => void
  onNodeMove: (id: string, x: number, y: number) => void
  viewport: Viewport
  onViewportChange: (viewport: Viewport) => void
  showGrid: boolean
  tool: 'select' | 'pan' | 'connect'
  connectingFrom: string | null
  onConnectStart?: (nodeId: string) => void
  onConnectEnd?: (targetNodeId: string) => void
  onCanvasClick?: () => void
  className?: string
}

function getNodeCenter(node: BoardNode) {
  const w = node.width ?? 200
  const h = node.height ?? 80
  return { x: node.x + w / 2, y: node.y + h / 2 }
}

function isInViewport(
  node: BoardNode,
  vp: Viewport,
  canvasWidth: number,
  canvasHeight: number
) {
  const w = node.width ?? 200
  const h = node.height ?? 80
  const screenLeft = -vp.x / vp.zoom
  const screenTop = -vp.y / vp.zoom
  const screenRight = screenLeft + canvasWidth / vp.zoom
  const screenBottom = screenTop + canvasHeight / vp.zoom
  return (
    node.x + w >= screenLeft &&
    node.x <= screenRight &&
    node.y + h >= screenTop &&
    node.y <= screenBottom
  )
}

export function CanvasArea({
  nodes,
  edges,
  selectedId,
  onSelectNode,
  onNodeMove,
  viewport,
  onViewportChange,
  showGrid,
  tool,
  connectingFrom,
  onConnectStart,
  onConnectEnd,
  onCanvasClick,
  className,
}: CanvasAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const minimapRef = useRef<HTMLCanvasElement>(null)
  const isPanning = useRef(false)
  const lastPan = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragNodeId = useRef<string | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [connectingLineEnd, setConnectingLineEnd] = useState<{ x: number; y: number } | null>(null)
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 600 })
  const rafRef = useRef<number>(0)

  const screenToWorld = useCallback(
    (sx: number, sy: number) => ({
      x: (sx - viewport.x) / viewport.zoom,
      y: (sy - viewport.y) / viewport.zoom,
    }),
    [viewport]
  )

  const getHitNode = useCallback(
    (worldX: number, worldY: number): BoardNode | null => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i]
        const w = n.width ?? 200
        const h = n.height ?? 80
        if (
          worldX >= n.x &&
          worldX <= n.x + w &&
          worldY >= n.y &&
          worldY <= n.y + h
        ) {
          return n
        }
      }
      return null
    },
    [nodes]
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? { width: 800, height: 600 }
      setCanvasSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { w, h } = canvasSize
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, w, h)
    ctx.restore()

    ctx.save()
    ctx.translate(viewport.x, viewport.y)
    ctx.scale(viewport.zoom, viewport.zoom)

    if (showGrid) {
      const left = Math.floor(-viewport.x / viewport.zoom / GRID_SIZE) * GRID_SIZE
      const top = Math.floor(-viewport.y / viewport.zoom / GRID_SIZE) * GRID_SIZE
      const right = left + Math.ceil(w / viewport.zoom / GRID_SIZE) * GRID_SIZE + GRID_SIZE
      const bottom = top + Math.ceil(h / viewport.zoom / GRID_SIZE) * GRID_SIZE + GRID_SIZE
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'
      ctx.lineWidth = 1
      for (let gx = left; gx <= right; gx += GRID_SIZE) {
        ctx.beginPath()
        ctx.moveTo(gx, top)
        ctx.lineTo(gx, bottom)
        ctx.stroke()
      }
      for (let gy = top; gy <= bottom; gy += GRID_SIZE) {
        ctx.beginPath()
        ctx.moveTo(left, gy)
        ctx.lineTo(right, gy)
        ctx.stroke()
      }
    }

    const visibleNodes = nodes.filter((n) =>
      isInViewport(n, viewport, w, h)
    )

    visibleNodes.forEach((node) => {
      const nw = node.width ?? 200
      const nh = node.height ?? 80
      const selected = node.id === selectedId

      ctx.fillStyle = selected ? 'rgba(11, 99, 255, 0.12)' : 'rgb(255, 255, 255)'
      ctx.strokeStyle = selected ? 'rgb(11, 99, 255)' : 'rgb(230, 233, 238)'
      ctx.lineWidth = selected ? 2 : 1
      ctx.beginPath()
      ctx.roundRect(node.x, node.y, nw, nh, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = 'rgb(11, 27, 43)'
      ctx.font = '600 13px Inter, system-ui, sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      const maxTitleWidth = nw - NODE_PADDING * 2
      const title = node.title.length > 25 ? node.title.slice(0, 24) + '…' : node.title
      ctx.fillText(title, node.x + NODE_PADDING, node.y + NODE_PADDING, maxTitleWidth)

      ctx.fillStyle = 'rgb(90, 106, 120)'
      ctx.font = '400 11px Inter, system-ui, sans-serif'
      const content = (node.content || 'Double-click to edit').slice(0, 40)
      ctx.fillText(content, node.x + NODE_PADDING, node.y + NODE_PADDING + 20, maxTitleWidth)

      ctx.fillStyle = 'rgba(90, 106, 120, 0.6)'
      ctx.font = '400 10px Inter, system-ui, sans-serif'
      ctx.fillText(node.type, node.x + nw - NODE_PADDING - 40, node.y + nh - 22, 40)
    })

    edges.forEach((edge) => {
      const src = nodes.find((n) => n.id === edge.source)
      const tgt = nodes.find((n) => n.id === edge.target)
      if (!src || !tgt) return
      const sc = getNodeCenter(src)
      const tc = getNodeCenter(tgt)
      ctx.strokeStyle = 'rgba(90, 106, 120, 0.5)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(sc.x, sc.y)
      ctx.lineTo(tc.x, tc.y)
      ctx.stroke()
    })

    if (connectingFrom && connectingLineEnd) {
      const src = nodes.find((n) => n.id === connectingFrom)
      if (src) {
        const sc = getNodeCenter(src)
        ctx.strokeStyle = 'rgba(11, 99, 255, 0.7)'
        ctx.lineWidth = 2
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(sc.x, sc.y)
        ctx.lineTo(connectingLineEnd.x, connectingLineEnd.y)
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    ctx.restore()
  }, [nodes, edges, viewport, selectedId, showGrid, canvasSize, connectingFrom, connectingLineEnd])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw])

  useEffect(() => {
    const minimap = minimapRef.current
    const ctx = minimap?.getContext('2d')
    if (!minimap || !ctx || nodes.length === 0) return

    const scale = MINIMAP_SIZE / 2000
    const padding = 16
    const mw = MINIMAP_SIZE
    const mh = MINIMAP_SIZE

    ctx.fillStyle = 'rgb(246, 248, 250)'
    ctx.fillRect(0, 0, mw, mh)
    ctx.strokeStyle = 'rgb(230, 233, 238)'
    ctx.strokeRect(0, 0, mw, mh)

    nodes.forEach((node) => {
      const nw = (node.width ?? 200) * scale
      const nh = (node.height ?? 80) * scale
      const nx = node.x * scale + padding
      const ny = node.y * scale + padding
      ctx.fillStyle = node.id === selectedId ? 'rgba(11, 99, 255, 0.5)' : 'rgba(11, 27, 43, 0.15)'
      ctx.fillRect(nx, ny, nw, nh)
    })

    const vx = (viewport.x / viewport.zoom) * scale + padding
    const vy = (viewport.y / viewport.zoom) * scale + padding
    const vw = (canvasSize.w / viewport.zoom) * scale
    const vh = (canvasSize.h / viewport.zoom) * scale
    ctx.strokeStyle = 'rgb(11, 99, 255)'
    ctx.lineWidth = 2
    ctx.strokeRect(vx, vy, vw, vh)
  }, [nodes, selectedId, viewport, canvasSize])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const sx = e.clientX - rect.left
      const sy = e.clientY - rect.top
      const { x: wx, y: wy } = screenToWorld(sx, sy)
      const hit = getHitNode(wx, wy)

      if (tool === 'pan') {
        isPanning.current = true
        lastPan.current = { x: e.clientX, y: e.clientY }
        return
      }

      if (tool === 'connect' && hit && onConnectStart) {
        onConnectStart(hit.id)
        setConnectingLineEnd({ x: wx, y: wy })
        return
      }

      if (connectingFrom && hit && hit.id !== connectingFrom && onConnectEnd) {
        onConnectEnd(hit.id)
        setConnectingLineEnd(null)
        return
      }

      if (hit && tool === 'select') {
        onSelectNode(hit.id)
        isDragging.current = true
        dragNodeId.current = hit.id
        dragOffset.current = { x: hit.x - wx, y: hit.y - wy }
      } else {
        onSelectNode(null)
        onCanvasClick?.()
      }
    },
    [tool, screenToWorld, getHitNode, onSelectNode, onNodeMove, connectingFrom, onConnectStart, onConnectEnd, onCanvasClick]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      if (isPanning.current) {
        const dx = e.clientX - lastPan.current.x
        const dy = e.clientY - lastPan.current.y
        lastPan.current = { x: e.clientX, y: e.clientY }
        onViewportChange({
          ...viewport,
          x: viewport.x + dx,
          y: viewport.y + dy,
        })
        return
      }

      if (connectingFrom) {
        const { x: wx, y: wy } = screenToWorld(e.clientX - rect.left, e.clientY - rect.top)
        setConnectingLineEnd({ x: wx, y: wy })
      }

      if (isDragging.current && dragNodeId.current) {
        const { x: wx, y: wy } = screenToWorld(e.clientX - rect.left, e.clientY - rect.top)
        const nx = wx + dragOffset.current.x
        const ny = wy + dragOffset.current.y
        onNodeMove(dragNodeId.current, Math.max(0, nx), Math.max(0, ny))
      }
    },
    [viewport, onViewportChange, screenToWorld, connectingFrom, onNodeMove, draw]
  )

  const handlePointerUp = useCallback(() => {
    isPanning.current = false
    isDragging.current = false
    dragNodeId.current = null
  }, [])

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const sx = e.clientX - rect.left
      const sy = e.clientY - rect.top
      const { x: wx, y: wy } = screenToWorld(sx, sy)
      const factor = e.deltaY > 0 ? 0.9 : 1.1
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, viewport.zoom * factor))
      const newX = sx - wx * newZoom
      const newY = sy - wy * newZoom
      onViewportChange({ x: newX, y: newY, zoom: newZoom })
    },
    [viewport, screenToWorld, onViewportChange]
  )

  const handleMinimapClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = minimapRef.current?.getBoundingClientRect()
      if (!rect) return
      const mx = (e.clientX - rect.left) / rect.width
      const my = (e.clientY - rect.top) / rect.height
      const scale = 2000 / MINIMAP_SIZE
      const wx = (mx * MINIMAP_SIZE - 16) * scale
      const wy = (my * MINIMAP_SIZE - 16) * scale
      const newX = -wx * viewport.zoom + canvasSize.w * 0.5
      const newY = -wy * viewport.zoom + canvasSize.h * 0.5
      onViewportChange({ ...viewport, x: newX, y: newY })
    },
    [viewport, canvasSize, onViewportChange]
  )

  return (
    <div
      ref={containerRef}
      className={cn('relative flex-1 overflow-hidden bg-muted/30', className)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      style={{ touchAction: 'none' }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.w}
        height={canvasSize.h}
        className="block w-full h-full cursor-crosshair"
        style={{ cursor: tool === 'pan' ? 'grab' : tool === 'connect' ? 'crosshair' : 'default' }}
      />
      <div
        className="absolute bottom-4 right-4 rounded-lg border border-border bg-card p-1 shadow-card overflow-hidden"
        aria-label="Canvas minimap"
      >
        <canvas
          ref={minimapRef}
          width={MINIMAP_SIZE}
          height={MINIMAP_SIZE}
          className="block cursor-pointer"
          onClick={handleMinimapClick}
        />
      </div>
    </div>
  )
}
