'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { testimonials } from '@/lib/data'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1"
          className="text-accent"
          aria-hidden="true"
        >
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-background py-28 px-6 lg:px-8" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] text-accent mb-3"
          >
            Client Testimonials
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-md font-serif font-bold text-foreground text-balance"
          >
            Trusted by industry leaders.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="relative flex flex-col bg-surface border border-border p-8 hover:border-accent/30 transition-colors duration-400 group"
            >
              {/* Decorative quote mark */}
              <span className="absolute top-6 right-8 font-serif text-6xl text-border leading-none select-none" aria-hidden="true">
                &ldquo;
              </span>

              <StarRating rating={t.rating} />

              <p className="mt-6 text-sm text-muted-foreground leading-relaxed text-pretty flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              <footer className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-surface-elevated flex items-center justify-center font-serif font-semibold text-sm text-accent border border-border">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-medium text-foreground">{t.name}</cite>
                    <p className="text-xs text-muted-foreground">{t.title}, {t.company}</p>
                  </div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
