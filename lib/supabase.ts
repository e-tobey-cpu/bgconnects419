import { createClient } from '@supabase/supabase-js'

// Fallbacks keep createClient from throwing during the build's page-data
// collection, when env vars are not injected. Real values are used at runtime.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key'

// Browser client using anon key.  Used from client components to read data.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Factory used by client components — returns the shared browser client.
export function createSupabaseBrowserClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

// Factory used by server components and API routes — uses the service role key.
export function createSupabaseServerClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })
}

// Admin client using service role key.  Only use on the server (API routes).
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

// Helper to fetch the current user session (client side)
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}
