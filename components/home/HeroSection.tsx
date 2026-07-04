'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imgRef}
          src="/images/hero-bg.png"
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32 w-full">
        <div className="max-w-4xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.3em] text-accent mb-6 font-medium"
          >
            Global Distribution Partner
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-display-xl font-serif font-bold text-foreground leading-none text-balance mb-6"
          >
            Sourced
            <br />
            <span className="text-accent">Precisely.</span>
            <br />
            Delivered
            <br />
            Reliably.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10 text-pretty"
          >
            ET Distribution connects manufacturers, distributors, retailers, and
            wholesale buyers across grocery, specialty food, health &amp; wellness,
            household essentials, and consumer products. Through trusted supplier
            relationships and scalable sourcing, we help businesses secure reliable
            inventory throughout the United States.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-accent text-accent-foreground font-medium text-sm tracking-wide hover:bg-accent/90 transition-all duration-300 group"
            >
              Browse Catalog
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
            <Link
              href="/supplier-inquiry"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-foreground/30 text-foreground font-medium text-sm tracking-wide hover:border-foreground hover:bg-foreground/5 transition-all duration-300"
            >
              Supplier Inquiry
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="absolute bottom-16 left-6 right-6 lg:left-8 lg:right-8 max-w-7xl"
        >
          <div className="flex flex-wrap gap-8 lg:gap-16">
            {[
              { value: '50+', label: 'Active SKUs' },
              { value: '12+', label: 'Supplier Relationships' },
              { value: '48', label: 'States Served' },
              { value: '10,000+', label: 'Orders Fulfilled' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-foreground">{stat.value}</span>
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-muted"
        aria-hidden="true"
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  )
}
