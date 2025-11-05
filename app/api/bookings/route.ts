import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'
import { stripe, platformFeePercent } from '@/lib/stripe'
import { createBookingSchema } from '@/lib/validation'

// GET /api/bookings
export async function GET(request: Request) {
  // In a real app, you would authenticate the user and filter bookings by their role.
  const url = new URL(request.url)
  const role = url.searchParams.get('role')
  const supabase = createSupabaseServerClient()

  let query = supabase
    .from('bookings')
    .select('id, start_at, end_at, status, service:service_id(title), seller_id, buyer_id')
  if (role === 'buyer') {
    // TODO: filter by authenticated buyer
  } else if (role === 'seller') {
    // TODO: filter by authenticated seller
  }
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

// POST /api/bookings
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient()
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  const parse = createBookingSchema.safeParse(body)
  if (!parse.success) return NextResponse.json({ error: parse.error.issues }, { status: 400 })
  const { service_id, start_at, end_at, coupon_code } = parse.data
  // Fetch the service and seller
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('id, title, price_cents, seller:seller_id(id, stripe_account_id)')
    .eq('id', service_id)
    .maybeSingle()
  if (serviceError || !service) return NextResponse.json({ error: serviceError?.message || 'Service not found' }, { status: 404 })
  const priceCents = service.price_cents

  // Apply coupon if provided
  let discounted = priceCents
  if (coupon_code) {
    const { data: coupon } = await supabase
      .from('coupons')
      .select('type,value,active,valid_from,valid_to,usage_limit')
      .eq('code', coupon_code)
      .maybeSingle()
    if (coupon && coupon.active) {
      const now = new Date()
      const validFrom = coupon.valid_from ? new Date(coupon.valid_from) : null
      const validTo = coupon.valid_to ? new Date(coupon.valid_to) : null
      if ((!validFrom || now >= validFrom) && (!validTo || now <= validTo)) {
        if (coupon.type === 'percent') {
          discounted = Math.round(priceCents * (1 - Number(coupon.value)))
        } else {
          discounted = Math.max(0, priceCents - Number(coupon.value))
        }
      }
    }
  }
  // Create a booking row with pending status
  const { data: bookingData, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      service_id,
      buyer_id: null, // TODO: set buyer id from auth
      seller_id: service.seller.id,
      start_at,
      end_at,
      status: 'pending',
      amount_cents: discounted
    })
    .select('id')
    .maybeSingle()
  if (bookingError || !bookingData) {
    return NextResponse.json({ error: bookingError?.message || 'Could not create booking' }, { status: 500 })
  }
  const bookingId = bookingData.id
  // Create a Stripe Checkout session
  const applicationFee = Math.round(discounted * platformFeePercent)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: null,
      line_items: [
        {
          name: service.title,
          amount: discounted,
          currency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'usd',
          quantity: 1
        }
      ],
      payment_intent_data: {
        application_fee_amount: applicationFee,
        transfer_data: {
          destination: service.seller.stripe_account_id || undefined
        }
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${service_id}?canceled=1`
    })
    // Update booking with payment intent/session id
    await supabase
      .from('bookings')
      .update({ payment_intent_id: session.payment_intent || session.id })
      .eq('id', bookingId)
    return NextResponse.json({ checkout_url: session.url })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: 'Error creating Stripe session' }, { status: 500 })
  }
}