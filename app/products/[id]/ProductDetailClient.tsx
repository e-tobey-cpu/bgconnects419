'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Minus, Plus, FileText, ChevronRight,
  Package, Truck, Clock, CheckCircle2,
} from 'lucide-react'
import type { Product } from '@/lib/data'

type Props = { product: Product; related: Product[] }

const tabs = ['Description', 'Specifications', 'Shipping'] as const
type Tab = typeof tabs[number]

export default function ProductDetailClient({ product, related }: Props) {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(product.moq)
  const [activeTab, setActiveTab] = useState<Tab>('Description')

  const adjustQty = (delta: number) => {
    setQuantity((q) => Math.max(product.moq, q + delta))
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-10" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors duration-200">Home</Link>
        <ChevronRight size={12} aria-hidden="true" />
        <Link href="/products" className="hover:text-foreground transition-colors duration-200">Catalog</Link>
        <ChevronRight size={12} aria-hidden="true" />
        <Link href={`/products?category=${product.categoryId}`} className="hover:text-foreground transition-colors duration-200">
          {product.category}
        </Link>
        <ChevronRight size={12} aria-hidden="true" />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        {/* Image gallery */}
        <div className="flex flex-col gap-4">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-square overflow-hidden bg-surface"
          >
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent text-accent-foreground text-xs font-medium uppercase tracking-wide">
                {product.badge}
              </div>
            )}
          </motion.div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 overflow-hidden border-2 transition-colors duration-200 ${
                    activeImage === i ? 'border-accent' : 'border-border hover:border-muted'
                  }`}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={activeImage === i}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight text-balance mb-4">
            {product.name}
          </h1>
          <p className="text-muted-foreground text-pretty leading-relaxed mb-6">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-border">
            <span className="text-4xl font-serif font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">per {product.unit}</span>
          </div>

          {/* Meta fields */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-surface border border-border p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-1.5">SKU</p>
              <p className="text-sm font-medium text-foreground font-mono">{product.sku}</p>
            </div>
            <div className="bg-surface border border-border p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-1.5">MOQ</p>
              <p className="text-sm font-medium text-foreground">{product.moq} {product.unit}s</p>
            </div>
            <div className="bg-surface border border-border p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-1.5">Lead Time</p>
              <p className="text-sm font-medium text-foreground">{product.leadTime}</p>
            </div>
            <div className="bg-surface border border-border p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-1.5">Availability</p>
              <p className={`text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>

          {/* Quantity selector */}
          <div className="mb-6">
            <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-3">
              Quantity (min. {product.moq})
            </label>
            <div className="flex items-center gap-0 border border-border w-fit">
              <button
                onClick={() => adjustQty(-Math.max(1, Math.floor(product.moq / 10)))}
                className="flex items-center justify-center w-11 h-11 text-muted-foreground hover:text-foreground hover:bg-surface transition-colors duration-200 border-r border-border"
                aria-label="Decrease quantity"
              >
                <Minus size={14} aria-hidden="true" />
              </button>
              <span className="w-20 text-center text-sm font-medium text-foreground" aria-live="polite">
                {quantity.toLocaleString()}
              </span>
              <button
                onClick={() => adjustQty(Math.max(1, Math.floor(product.moq / 10)))}
                className="flex items-center justify-center w-11 h-11 text-muted-foreground hover:text-foreground hover:bg-surface transition-colors duration-200 border-l border-border"
                aria-label="Increase quantity"
              >
                <Plus size={14} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href={`/supplier-inquiry?product=${product.id}&qty=${quantity}`}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors duration-200 group"
            >
              <FileText size={15} aria-hidden="true" />
              Request Quote
            </Link>
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center gap-2 py-4 border border-border text-foreground font-medium text-sm hover:border-foreground hover:bg-surface transition-all duration-200"
            >
              Talk to Sales
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-5 text-xs text-muted-foreground">
            {[
              { icon: Package, label: 'MOQ Flexible' },
              { icon: Truck, label: 'Fast Freight' },
              { icon: Clock, label: 'Reliable Lead Times' },
              { icon: CheckCircle2, label: 'Verified Supplier' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={13} className="text-accent" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20 border-t border-border">
        <div className="flex gap-0 border-b border-border" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-10" role="tabpanel" aria-label={activeTab}>
          {activeTab === 'Description' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl text-muted-foreground leading-relaxed text-pretty"
            >
              <p>{product.description}</p>
            </motion.div>
          )}

          {activeTab === 'Specifications' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl"
            >
              <dl>
                {product.specifications.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-start py-4 gap-8 ${i < product.specifications.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <dt className="w-40 shrink-0 text-xs uppercase tracking-[0.12em] text-muted-foreground">{spec.label}</dt>
                    <dd className="text-sm text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}

          {activeTab === 'Shipping' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl space-y-6"
            >
              <div className="bg-surface border border-border p-6">
                <h3 className="text-sm font-medium text-foreground mb-2">Shipping Information</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.shipping}</p>
              </div>
              <div className="bg-surface border border-border p-6">
                <h3 className="text-sm font-medium text-foreground mb-2">Lead Time</h3>
                <p className="text-sm text-muted-foreground">{product.leadTime}</p>
              </div>
              <div className="bg-surface border border-border p-6">
                <h3 className="text-sm font-medium text-foreground mb-2">Custom Logistics</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For orders requiring custom freight, FOB terms, or international shipping,{' '}
                  <Link href="/contact" className="text-accent hover:underline">contact our logistics team</Link>.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-8 border-t border-border pt-16">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Related Products</h2>
            <Link
              href={`/products?category=${product.categoryId}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group"
            >
              View all
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group flex flex-col bg-surface border border-border hover:border-accent/40 transition-all duration-300"
                aria-label={p.name}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-104" sizes="(max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted mb-1">{p.category}</p>
                  <p className="text-sm font-medium text-foreground line-clamp-2">{p.name}</p>
                  <p className="text-base font-serif font-semibold text-foreground mt-2">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-16 pb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
          Back to Catalog
        </Link>
      </div>
    </div>
  )
}
