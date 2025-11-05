import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { serviceInputSchema } from '@/lib/validation'

// GET /api/services
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'recent'

  let query = supabaseAdmin
    .from('services')
    .select('id,title,description,price_cents,duration_minutes,category,image_url,is_active')
    .eq('is_active', true)

  if (search) {
    // ilike pattern to match title or description
    query = query.ilike('title', `%${search}%`).or(`description.ilike.%${search}%`)
  }
  if (category) {
    query = query.eq('category', category)
  }
  // sorting
  if (sort === 'price-asc') {
    query = query.order('price_cents', { ascending: true })
  } else if (sort === 'price-desc') {
    query = query.order('price_cents', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }
  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data || [], { status: 200 })
}

// POST /api/services
export async function POST(request: Request) {
  const body = await request.json()
  const parsed = serviceInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.issues },
      { status: 400 }
    )
  }
  // TODO: ensure user is authenticated and is a seller
  const { data, error } = await supabaseAdmin
    .from('services')
    .insert([
      {
        ...parsed.data,
        is_active: true,
        // Use a placeholder seller_id; in production set this to session.user.id
        seller_id: null
      }
    ])
    .select()
    .single()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 201 })
}