import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: { id: string }
}

async function getService(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/services/${id}`, {
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    return null
  }
  return res.json() as Promise<any>
}

export default async function ServiceDetail({ params }: Props) {
  const service = await getService(params.id)
  if (!service) {
    notFound()
  }
  return (
    <main className="max-w-3xl mx-auto p-4">
      <Link href="/browse" className="text-sm text-primary mb-2 inline-block">
        ← Back to Browse
      </Link>
      <div className="flex flex-col md:flex-row gap-6">
        {service.image_url && (
          <img
            src={service.image_url}
            alt={service.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-md"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-2">{service.title}</h1>
          <p className="text-gray-700 mb-4">{service.description}</p>
          <p className="text-lg font-medium mb-4">Price: ${
            (service.price_cents / 100).toFixed(2)
          }</p>
          <p className="text-sm text-gray-500 mb-4">Duration: {service.duration_minutes} minutes</p>
          {/* TODO: Show reviews and booking form */}
          <button
            disabled
            className="px-4 py-2 bg-primary text-white rounded-md cursor-not-allowed opacity-50"
          >
            Book Now
          </button>
        </div>
      </div>
    </main>
  )
}