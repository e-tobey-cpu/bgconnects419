'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, FileText, SlidersHorizontal, X } from 'lucide-react'
import { products, categories } from '@/lib/data'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const allCategories = [{ id: 'all', name: 'All Categories' }, ...categories]

const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'moq-asc', label: 'MOQ: Low to High' },
]

function ProductsGrid() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get('category') ?? 'all'

  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [sort, setSort] = useState('default')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? products : products.filter((p) => p.categoryId === activeCategory)
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'moq-asc') list = [...list].sort((a, b) => a.moq - b.moq)
    return list
  }, [activeCategory, sort])

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        {/* Category filter - desktop */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap" role="tablist" aria-label="Filter by category">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium border transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'border-border text-muted-foreground hover:border-accent/50 hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Mobile filter toggle */}
        <button
          className="sm:hidden flex items-center gap-2 text-sm font-medium text-foreground border border-border px-4 py-2"
          onClick={() => setFilterOpen((o) => !o)}
          aria-label="Toggle filters"
          aria-expanded={filterOpen}
        >
          <SlidersHorizontal size={14} aria-hidden="true" />
          Filters
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{filtered.length} products</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs bg-surface border border-border text-foreground px-3 py-2 outline-none focus:border-accent transition-colors duration-200"
            aria-label="Sort products"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile filter panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden sm:hidden mb-6"
          >
            <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
              {allCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setFilterOpen(false) }}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border text-muted-foreground'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filter badge */}
      {activeCategory !== 'all' && (
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs text-muted-foreground">Showing:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-accent/30 text-accent text-xs font-medium">
            {allCategories.find((c) => c.id === activeCategory)?.name}
            <button
              onClick={() => setActiveCategory('all')}
              aria-label="Clear category filter"
              className="hover:text-foreground transition-colors"
            >
              <X size={11} aria-hidden="true" />
            </button>
          </span>
        </div>
      )}

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.article
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group flex flex-col bg-surface border border-border hover:border-accent/40 transition-all duration-400"
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
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />
                {product.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-accent text-accent-foreground text-xs font-medium uppercase tracking-wide">
                    {product.badge}
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

              {/* Body */}
              <div className="flex flex-col flex-1 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-muted mb-2">{product.category}</p>
                <h2 className="text-sm font-medium text-foreground leading-snug mb-1 line-clamp-2">
                  {product.name}
                </h2>
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
                  <p className="text-xs text-muted">SKU: {product.sku.split('-').pop()}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 flex items-center justify-center py-2.5 border border-border text-xs font-medium text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-200"
                    aria-label={`View details for ${product.name}`}
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/supplier-inquiry?product=${product.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-border text-xs font-medium text-muted-foreground hover:border-accent hover:text-accent transition-all duration-200"
                    aria-label={`Request quote for ${product.name}`}
                  >
                    <FileText size={11} aria-hidden="true" />
                    Quote
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-muted-foreground">No products found in this category.</p>
          <button
            onClick={() => setActiveCategory('all')}
            className="mt-4 text-sm text-accent hover:text-foreground transition-colors duration-200"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}

export default function ProductsClient() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-muted-foreground text-sm">Loading catalog...</div>}>
      <ProductsGrid />
    </Suspense>
  )
}
