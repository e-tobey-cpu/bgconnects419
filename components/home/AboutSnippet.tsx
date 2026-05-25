'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export default function AboutSnippet() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-background py-28 px-6 lg:px-8" aria-labelledby="about-snippet-heading">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1"
        >
          <Image
            src="/images/about-warehouse.jpg"
            alt="ET Distribution warehouse operations"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-background/20" />

          {/* Floating stat card */}
          <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm border border-border p-5">
            <p className="text-3xl font-serif font-bold text-foreground">15+</p>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">Years in Distribution</p>
          </div>
        </motion.div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] text-accent mb-4"
          >
            Who We Are
          </motion.p>
          <motion.h2
            id="about-snippet-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-md font-serif font-bold text-foreground text-balance mb-6"
          >
            Built for serious
            <br />
            buyers &amp; sellers.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-pretty"
          >
            <p>
              ET Distribution was founded on a simple principle: sourcing and logistics should be
              transparent, reliable, and built around the buyer&apos;s needs. Over 15 years, we&apos;ve grown
              into one of North America&apos;s most trusted multi-category distributors.
            </p>
            <p>
              Our network spans 200+ verified manufacturers across electronics, home goods,
              industrial tools, and branded apparel. We maintain strict quality controls, competitive
              MOQs, and flexible logistics for buyers of every scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 gap-6 pb-10 border-b border-border"
          >
            {[
              { value: '200+', label: 'Verified Suppliers' },
              { value: '48', label: 'States Served' },
              { value: '15,000+', label: 'Active SKUs' },
              { value: '$2.4B+', label: 'Distributed' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-serif font-bold text-foreground">{s.value}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 group"
            >
              Learn More About Us
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
