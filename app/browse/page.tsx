"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Service {
  id: string
  title: string
  description: string
  price_cents: number
  duration_minutes: number
  category?: string
  is_active?: boolean
  image_url?: string | null
}

export default function Browse() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('recent')

  useEffect(() => {
    const controller = new AbortController()
    async function fetchServices() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (category) params.append('category', category)
        if (sort) params.append('sort', sort)
        const res = await fetch(`/api/services?${params.toString()}`, {
          signal: controller.signal
        })
        const data = await res.json()
        setServices(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
    return () => controller.abort()
  }, [search, category, sort])

  const categories = Array.from(
    new Set(services.map((s) => s.category).filter((c): c is string => !!c))
  )

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Browse Services</h1>
      {/* Search and filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded-md"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="recent">Most recent</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      {loading ? (
        <p>Loading…</p>
      ) : services.length === 0 ? (
        <p>No services yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <li key={service.id} className="border rounded-lg shadow-sm p-4 flex flex-col">
              {service.image_url ? (
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="h-48 w-full object-cover mb-4 rounded-md"
                />
              ) : null}
              <h2 className="text-xl font-semibold mb-2 truncate">{service.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{service.description}</p>
              <div className="mt-auto">
                <p className="font-medium mb-2">${(service.price_cents / 100).toFixed(2)}</p>
                <Link
                  href={`/services/${service.id}`}
                  className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded-md text-center w-full"
                >
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}