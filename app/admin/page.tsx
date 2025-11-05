'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase'

interface Service {
  id: string
  title: string
  is_active: boolean
}

export default function AdminPage() {
  const supabase = createSupabaseBrowserClient()
  const [user, setUser] = useState<any>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      const res = await fetch('/api/services?include_inactive=true')
      if (res.ok) setServices(await res.json())
      setLoading(false)
    }
    load()
  }, [])

  async function toggle(id: string, current: boolean) {
    await fetch(`/api/admin/services/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !current })
    })
    // refresh
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, is_active: !current } : s)))
  }

  if (loading) return <p>Loading...</p>
  // In a real app you should check user.admin flag; this skeleton assumes everyone is admin
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2 px-3">Title</th>
            <th className="py-2 px-3">Active</th>
            <th className="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t">
              <td className="py-2 px-3">{service.title}</td>
              <td className="py-2 px-3">{service.is_active ? 'Yes' : 'No'}</td>
              <td className="py-2 px-3">
                <button
                  onClick={() => toggle(service.id, service.is_active)}
                  className="text-primary underline"
                >
                  {service.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}