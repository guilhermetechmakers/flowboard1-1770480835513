-- board_visual_canvas table
CREATE TABLE IF NOT EXISTS board_visual_canvas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE board_visual_canvas ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "board_visual_canvas_read_own" ON board_visual_canvas
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "board_visual_canvas_insert_own" ON board_visual_canvas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "board_visual_canvas_update_own" ON board_visual_canvas
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "board_visual_canvas_delete_own" ON board_visual_canvas
  FOR DELETE USING (auth.uid() = user_id);
