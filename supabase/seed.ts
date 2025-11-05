import { createClient } from '@supabase/supabase-js'

// Seed script to insert a demo user, seller and service.  Run with
// `npm run seed` after setting your SUPABASE_SERVICE_ROLE_KEY in .env.local

async function seed() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    {
      auth: { persistSession: false }
    }
  )

  const demoEmail = 'demo@bgconnect.biz'
  let sellerId: string
  // Create user if not exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', demoEmail)
    .single()
  if (!existingUser) {
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({ email: demoEmail, role: 'seller', name: 'Demo Seller' })
      .select()
      .single()
    if (userError || !user) {
      console.error(userError?.message)
      process.exit(1)
    }
    sellerId = user.id
    await supabase.from('sellers').insert({ id: sellerId, display_name: 'Demo Seller', active: true })
  } else {
    sellerId = existingUser.id
  }
  // Create service if not exists
  const { data: existingService } = await supabase
    .from('services')
    .select('id')
    .eq('title', 'Campus Haircut')
    .single()
  if (!existingService) {
    await supabase.from('services').insert({
      seller_id: sellerId,
      title: 'Campus Haircut',
      description: 'Clean fade by a fellow student.',
      price_cents: 2500,
      duration_minutes: 45,
      category: 'Hair',
      is_active: true
    })
  }
  console.log('Seed complete')
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})