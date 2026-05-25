import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductDetailClient from './ProductDetailClient'
import { products } from '@/lib/data'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.shortDescription,
  }
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) notFound()

  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <ProductDetailClient product={product} related={related} />
      </main>
      <Footer />
    </>
  )
}
