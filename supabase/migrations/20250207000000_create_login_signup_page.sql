-- login_signup_page table (login_/_signup_page equivalent for valid SQL identifier)
CREATE TABLE IF NOT EXISTS login_signup_page (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE login_signup_page ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "login_signup_page_read_own" ON login_signup_page
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "login_signup_page_insert_own" ON login_signup_page
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "login_signup_page_update_own" ON login_signup_page
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "login_signup_page_delete_own" ON login_signup_page
  FOR DELETE USING (auth.uid() = user_id);
