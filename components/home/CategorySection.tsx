'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/data'

export default function CategorySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-background py-28 px-6 lg:px-8" aria-labelledby="categories-heading">
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
              Product Categories
            </motion.p>
            <motion.h2
              id="categories-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-md font-serif font-bold text-foreground text-balance"
            >
              Everything your
              <br />
              business needs.
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
              aria-label="View full catalog"
            >
              View Full Catalog
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            >
              <Link
                href={`/products?category=${cat.id}`}
                className="group relative block overflow-hidden aspect-[3/4] bg-surface"
                aria-label={`Browse ${cat.name}`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent/80 mb-2">{cat.count} SKUs</p>
                  <h3 className="text-lg font-serif font-semibold text-foreground leading-tight text-balance">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    {cat.description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={12} className="text-white" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
