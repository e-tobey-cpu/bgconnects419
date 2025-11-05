import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createSupabaseServerClient } from '@/lib/supabase'

export const config = {
  api: {
    bodyParser: false
  }
}

// Stripe webhook endpoint
export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature') as string | undefined
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }
  const buf = await request.arrayBuffer()
  const body = Buffer.from(buf)
  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('⚠️  Webhook signature verification failed.', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }
  const supabase = createSupabaseServerClient()
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const paymentIntentId = session.payment_intent || session.id
    // Mark booking as paid
    await supabase
      .from('bookings')
      .update({ status: 'paid' })
      .eq('payment_intent_id', paymentIntentId)
    // TODO: send confirmation email to buyer and notification to seller
  }
  return NextResponse.json({ received: true })
}