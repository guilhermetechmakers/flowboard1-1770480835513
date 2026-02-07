-- board_nodes table for search/filter support
-- Enables full-text search on node title and content
CREATE TABLE IF NOT EXISTS board_nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID NOT NULL REFERENCES board_visual_canvas(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT[] DEFAULT '{}',
  assignee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  x DOUBLE PRECISION DEFAULT 0,
  y DOUBLE PRECISION DEFAULT 0,
  width DOUBLE PRECISION,
  height DOUBLE PRECISION,
  metadata JSONB DEFAULT '{}'
);

-- Full-text search index
CREATE INDEX IF NOT EXISTS board_nodes_search_idx ON board_nodes
  USING GIN (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, '')));

-- Index for filtered queries
CREATE INDEX IF NOT EXISTS board_nodes_board_id_idx ON board_nodes(board_id);
CREATE INDEX IF NOT EXISTS board_nodes_type_idx ON board_nodes(type);
CREATE INDEX IF NOT EXISTS board_nodes_assignee_idx ON board_nodes(assignee_id);
CREATE INDEX IF NOT EXISTS board_nodes_created_at_idx ON board_nodes(created_at);
CREATE INDEX IF NOT EXISTS board_nodes_tags_idx ON board_nodes USING GIN(tags);

-- Enable RLS
ALTER TABLE board_nodes ENABLE ROW LEVEL SECURITY;

-- Users can read nodes from boards they own
CREATE POLICY "board_nodes_read_own" ON board_nodes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM board_visual_canvas b
      WHERE b.id = board_nodes.board_id AND b.user_id = auth.uid()
    )
  );

-- Users can insert nodes to their boards
CREATE POLICY "board_nodes_insert_own" ON board_nodes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM board_visual_canvas b
      WHERE b.id = board_nodes.board_id AND b.user_id = auth.uid()
    )
  );

-- Users can update nodes in their boards
CREATE POLICY "board_nodes_update_own" ON board_nodes
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM board_visual_canvas b
      WHERE b.id = board_nodes.board_id AND b.user_id = auth.uid()
    )
  );

-- Users can delete nodes from their boards
CREATE POLICY "board_nodes_delete_own" ON board_nodes
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM board_visual_canvas b
      WHERE b.id = board_nodes.board_id AND b.user_id = auth.uid()
    )
  );
