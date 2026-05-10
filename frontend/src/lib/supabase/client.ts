import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  // The app will still compile, but Supabase auth will not work until env vars are set.
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

let supabaseClient: SupabaseClient | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient(supabaseUrl ?? '', supabaseAnonKey ?? '')
  }

  return supabaseClient
}

export function createClient() {
  return getSupabaseClient()
}

export const supabase = getSupabaseClient()
