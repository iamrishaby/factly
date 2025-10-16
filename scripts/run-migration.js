import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.POSTGRES_URL)

async function runMigration() {
  try {
  console.log("[Factly] Starting database migration...")

    // Read and execute the SQL migration
    const migrationSQL = `
      CREATE TABLE IF NOT EXISTS facts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content TEXT NOT NULL,
        category VARCHAR(50) DEFAULT 'General',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_facts_created_at ON facts(created_at DESC);

      ALTER TABLE facts ENABLE ROW LEVEL SECURITY;

      CREATE POLICY IF NOT EXISTS "Allow public read access" ON facts
        FOR SELECT
        USING (true);

      CREATE POLICY IF NOT EXISTS "Allow public insert access" ON facts
        FOR INSERT
        WITH CHECK (true);

      CREATE POLICY IF NOT EXISTS "Allow public update access" ON facts
        FOR UPDATE
        USING (true)
        WITH CHECK (true);

      CREATE POLICY IF NOT EXISTS "Allow public delete access" ON facts
        FOR DELETE
        USING (true);
    `

    // Execute the migration
    await sql(migrationSQL)

  console.log("[Factly] Migration completed successfully!")
  console.log("[Factly] Facts table has been created with RLS policies")
  } catch (error) {
  console.error("[Factly] Migration failed:", error.message)
    process.exit(1)
  }
}

runMigration()
