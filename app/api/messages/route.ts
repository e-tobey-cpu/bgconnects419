import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'

// GET /api/messages?conversation_id=
export async function GET(request: Request) {
  const url = new URL(request.url)
  const conversationId = url.searchParams.get('conversation_id')
  const supabase = createSupabaseServerClient()
  if (!conversationId) {
    return NextResponse.json({ error: 'conversation_id is required' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('messages')
    .select('id,body,created_at,sender_id')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

// POST /api/messages
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  const { conversation_id, sender_id, text } = body
  if (!conversation_id || !sender_id || !text) {
    return NextResponse.json({ error: 'conversation_id, sender_id and text are required' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('messages')
    .insert({ conversation_id, sender_id, body: text })
    .select()
    .maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}