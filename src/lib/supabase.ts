import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Case, BlogPost } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Only create the client if we have valid credentials
let supabase: SupabaseClient | null = null
if (supabaseUrl.startsWith('http')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

// ─── Cases ────────────────────────────────────────────────────────

export async function getFeaturedCases(): Promise<Case[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
  if (error) { console.error(error); return [] }
  return data ?? []
}

export async function getAllCases(type?: string): Promise<Case[]> {
  if (!supabase) return []
  let query = supabase.from('cases').select('*').order('created_at', { ascending: false })
  if (type) query = query.eq('type', type)
  const { data, error } = await query
  if (error) { console.error(error); return [] }
  return data ?? []
}

export async function getCaseById(id: string): Promise<Case | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('cases').select('*').eq('id', id).single()
  if (error) { console.error(error); return null }
  return data
}

// ─── Blog Posts ───────────────────────────────────────────────────

export async function getPublishedPosts(category?: string): Promise<BlogPost[]> {
  if (!supabase) return []
  let query = supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false })
  if (category) query = query.eq('category', category)
  const { data, error } = await query
  if (error) { console.error(error); return [] }
  return data ?? []
}

export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('blog_posts').select('*').eq('published', true)
    .order('created_at', { ascending: false }).limit(limit)
  if (error) { console.error(error); return [] }
  return data ?? []
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('blog_posts').select('*').eq('id', id).single()
  if (error) { console.error(error); return null }
  return data
}
