'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function BookServicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [start, setStart] = useState('')
  const [duration, setDuration] = useState(60)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Placeholder: call booking API to create a booking and start Stripe checkout
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service_id: params.id, start_at: start, duration_minutes: duration })
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) {
      // Redirect to Stripe checkout session URL
      window.location.href = data.checkout_url
    } else {
      alert(data.error || 'Error creating booking')
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Book service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select date & time</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            min={15}
            step={15}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Proceed to payment'}
        </button>
      </form>
    </div>
  )
}