(async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error("Missing env vars: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY")
    process.exitCode = 1
    return
  }

  try {
    const { createClient } = await import("@supabase/supabase-js")
    const supabase = createClient(url, key)
    const { data, error } = await supabase.from("facts").select().limit(1)
    if (error) {
      console.error("Supabase returned an error:", error)
      process.exitCode = 2
      return
    }
    console.log("Supabase query OK. Sample row:", data)
  } catch (err) {
    console.error("Error running test script:", err && err.message ? err.message : err)
    console.error("If this is 'Cannot find module \"@supabase/supabase-js\"' run `npm install` in the project root.`")
    process.exitCode = 3
  }
})()
