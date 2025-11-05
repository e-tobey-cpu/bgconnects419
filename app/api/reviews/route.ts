import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'
import { createReviewSchema } from '@/lib/validation'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const serviceId = url.searchParams.get('service_id')
  const supabase = createSupabaseServerClient()
  let query = supabase
    .from('reviews')
    .select('id,rating,text,created_at, reviewer:reviewer_id(name)')
  if (serviceId) query = query.eq('service_id', serviceId)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  const parse = createReviewSchema.safeParse(body)
  if (!parse.success) return NextResponse.json({ error: parse.error.issues }, { status: 400 })
  const { rating, text, service_id, reviewer_id } = body
  if (!service_id || !reviewer_id) return NextResponse.json({ error: 'service_id and reviewer_id are required' }, { status: 400 })
  const { data, error } = await supabase
    .from('reviews')
    .insert({ service_id, reviewer_id, rating, text })
    .select()
    .maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}