import Link from 'next/link'

export const metadata = {
  title: 'BGConnects – Find campus services near you',
  description: 'Browse and book services offered by students on your campus.'
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        BGConnects
      </h1>
      <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mb-8">
        A marketplace connecting students and staff who need services with on‑campus sellers.
        Book haircuts, tutoring, photography sessions and more — all in one place.
      </p>
      <Link
        href="/browse"
        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
      >
        Browse Services
      </Link>
    </main>
  )
}