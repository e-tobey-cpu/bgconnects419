'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { featuredBrands } from '@/lib/data'

export default function BrandsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-background py-24 px-6 lg:px-8" aria-labelledby="brands-heading">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] text-accent mb-3"
          >
            Featured Brands &amp; Product Lines
          </motion.p>
          <motion.h2
            id="brands-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-md font-serif font-bold text-foreground text-balance"
          >
            Brands buyers
            <br />
            already trust.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border"
          role="list"
          aria-label="Featured brands and product lines"
        >
          {featuredBrands.map((brand) => (
            <div
              key={brand}
              role="listitem"
              className="bg-background flex items-center justify-center py-10 px-6 group hover:bg-surface transition-colors duration-300"
            >
              <span className="text-lg font-serif font-semibold text-muted group-hover:text-foreground transition-colors duration-300 tracking-wide text-center text-balance">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mt-10 text-pretty"
        >
          ET Distribution sources trusted, recognizable brands and product lines across grocery,
          specialty food, health &amp; wellness, and consumer categories to help our buyers stock
          shelves with confidence.
        </motion.p>
      </div>
    </section>
  )
}
