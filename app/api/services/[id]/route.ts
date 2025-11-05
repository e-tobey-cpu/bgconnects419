import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { serviceInputSchema } from '@/lib/validation'

interface Params {
  params: { id: string }
}

// GET /api/services/[id]
export async function GET(_request: Request, { params }: Params) {
  const { id } = params
  const { data, error } = await supabaseAdmin
    .from('services')
    .select('id,title,description,price_cents,duration_minutes,category,image_url,is_active')
    .eq('id', id)
    .single()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }
  return NextResponse.json(data, { status: 200 })
}

// PUT /api/services/[id]
export async function PUT(request: Request, { params }: Params) {
  const { id } = params
  const body = await request.json()
  const parsed = serviceInputSchema.partial().safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.issues },
      { status: 400 }
    )
  }
  const { data, error } = await supabaseAdmin
    .from('services')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data, { status: 200 })
}

// DELETE /api/services/[id]
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = params
  const { error } = await supabaseAdmin
    .from('services')
    .update({ is_active: false })
    .eq('id', id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true }, { status: 200 })
}