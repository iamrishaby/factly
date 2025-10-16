-- Create the facts table for storing quotes and facts
CREATE TABLE IF NOT EXISTS facts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'General',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_facts_created_at ON facts(created_at DESC);

-- Enable Row Level Security (RLS) for security
ALTER TABLE facts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read facts (public access)
CREATE POLICY "Allow public read access" ON facts
  FOR SELECT
  USING (true);

-- Create a policy that allows anyone to insert facts (public access)
CREATE POLICY "Allow public insert access" ON facts
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows anyone to update facts (public access)
CREATE POLICY "Allow public update access" ON facts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create a policy that allows anyone to delete facts (public access)
CREATE POLICY "Allow public delete access" ON facts
  FOR DELETE
  USING (true);
