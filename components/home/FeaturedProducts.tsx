'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Eye, FileText } from 'lucide-react'
import { products } from '@/lib/data'

const featured = products.filter((p) => p.featured)

export default function FeaturedProducts() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-surface py-28 px-6 lg:px-8" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.25em] text-accent mb-3"
            >
              Featured Products
            </motion.p>
            <motion.h2
              id="featured-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-md font-serif font-bold text-foreground text-balance"
            >
              High-velocity
              <br />
              catalog picks.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              aria-label="View all products"
            >
              View All Products
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="group relative flex flex-col bg-background border border-border hover:border-accent/40 transition-all duration-400"
              aria-label={product.name}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-surface-elevated">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Glassmorphism overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-400" />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-accent text-accent-foreground text-xs font-medium uppercase tracking-wide">
                    {product.badge}
                  </div>
                )}

                {/* Action buttons on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-foreground/90 text-background text-xs font-medium backdrop-blur-sm hover:bg-foreground transition-colors duration-200"
                    aria-label={`View ${product.name}`}
                  >
                    <Eye size={12} aria-hidden="true" />
                    View Product
                  </Link>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-muted mb-2">{product.category}</p>
                <h3 className="text-sm font-medium text-foreground leading-snug mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed flex-1">
                  {product.shortDescription}
                </p>

                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-lg font-serif font-semibold text-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted">MOQ: {product.moq} {product.unit}s</p>
                  </div>
                  <p className="text-xs text-muted">SKU: {product.sku}</p>
                </div>

                <Link
                  href={`/supplier-inquiry?product=${product.id}`}
                  className="flex items-center justify-center gap-2 py-2.5 border border-border text-xs font-medium text-muted-foreground hover:border-accent hover:text-accent transition-all duration-200"
                  aria-label={`Request quote for ${product.name}`}
                >
                  <FileText size={12} aria-hidden="true" />
                  Request Quote
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
