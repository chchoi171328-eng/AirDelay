// 서버 전용 Supabase 클라이언트 (service role). API 라우트에서만 import 하세요.
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const INTAKE_BUCKET = 'intake-files'

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  if (!url.startsWith('http') || !serviceKey) return null
  return createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
}
