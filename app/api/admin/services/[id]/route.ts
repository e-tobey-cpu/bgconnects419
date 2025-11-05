import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServerClient()
  const body = await request.json().catch(() => null)
  if (!body || typeof body.is_active !== 'boolean') {
    return NextResponse.json({ error: 'is_active boolean required' }, { status: 400 })
  }
  const { error } = await supabase
    .from('services')
    .update({ is_active: body.is_active })
    .eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}