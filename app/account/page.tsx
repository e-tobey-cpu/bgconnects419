import { getSession, supabase } from '@/lib/supabase'
import Link from 'next/link'

export const metadata = {
  title: 'Account',
  description: 'Manage your bookings and services'
}

export default async function AccountPage() {
  let session
  try {
    session = await getSession()
  } catch (error) {
    session = null
  }
  if (!session) {
    return (
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Account</h1>
        <p>You need to be signed in to view this page.</p>
        <Link href="/auth/login" className="text-primary underline">
          Sign in
        </Link>
      </main>
    )
  }
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Account</h1>
      <p className="mb-4">Welcome, {session.user?.email}!</p>
      {/* TODO: List bookings, messages, services offered, etc. */}
      <p>Account management features coming soon.</p>
    </main>
  )
}