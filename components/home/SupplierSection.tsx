'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { segments } from '@/lib/data'

export default function SupplierSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-surface py-24 px-6 lg:px-8 border-y border-border" aria-labelledby="suppliers-heading">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] text-accent mb-3"
          >
            Our Network
          </motion.p>
          <motion.h2
            id="suppliers-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-md font-serif font-bold text-foreground text-balance"
          >
            Trusted by the world&apos;s
            <br />
            leading manufacturers.
          </motion.h2>
        </div>

        {/* Logo wall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border"
          role="list"
          aria-label="Supplier partners"
        >
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              role="listitem"
              className="bg-surface flex items-center justify-center py-10 px-8 group hover:bg-surface-elevated transition-colors duration-300"
            >
              <span className="text-lg font-serif font-semibold text-muted group-hover:text-foreground transition-colors duration-300 tracking-wide">
                {supplier.name}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 pt-10 border-t border-border"
        >
          <p className="text-sm text-muted-foreground text-balance text-center sm:text-left max-w-md">
            ET Distribution works with 200+ verified global manufacturers. We vet every
            supplier for quality, compliance, and delivery reliability before onboarding.
          </p>
          <Link
            href="/supplier-inquiry"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 group shrink-0"
          >
            Become a Supplier
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
