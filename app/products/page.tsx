import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Product Catalog',
  description:
    'Browse ET Distribution\'s full catalog of 15,000+ SKUs across electronics, home goods, industrial tools, and apparel.',
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Page header */}
        <div className="border-b border-border bg-surface pt-32 pb-14 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Our Catalog</p>
            <h1 className="text-display-lg font-serif font-bold text-foreground text-balance">
              Product Catalog
            </h1>
            <p className="mt-4 text-muted-foreground text-pretty max-w-2xl">
              Explore 15,000+ SKUs from 200+ verified global suppliers. Filter by category, request
              quotes, and connect with our team for custom sourcing needs.
            </p>
          </div>
        </div>
        <ProductsClient />
      </main>
      <Footer />
    </>
  )
}
