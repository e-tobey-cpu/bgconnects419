import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'ET Distribution LLC is a wholesale sourcing and distribution company based in Woodstock, New York, serving retailers, wholesalers, and business buyers across the United States.',
}

const values = [
  {
    title: 'Verified Quality',
    description:
      'We review every supplier for quality, compliance, and delivery reliability before onboarding, so you can trust the inventory you receive.',
  },
  {
    title: 'Transparent Pricing',
    description:
      'No hidden fees. We quote clearly on unit cost, MOQ, freight, and duties so your procurement team can plan with confidence.',
  },
  {
    title: 'Scalable Logistics',
    description:
      'From single pallets to full truckloads, our sourcing and logistics are built to scale with your business across 48 US states.',
  },
  {
    title: 'Dedicated Support',
    description:
      'Every account works with a sourcing contact who knows your categories and responds quickly to your needs.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-surface border-b border-border pt-36 pb-24 px-6 lg:px-8 overflow-hidden" aria-labelledby="about-hero-heading">
          <div className="absolute inset-0 opacity-5">
            <Image src="/images/about-warehouse.png" alt="" fill className="object-cover" aria-hidden="true" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">About ET Distribution</p>
            <h1 id="about-hero-heading" className="text-display-lg font-serif font-bold text-foreground text-balance max-w-3xl mb-6">
              A distributor built for the modern supply chain.
            </h1>
            <p className="text-muted-foreground text-pretty leading-relaxed max-w-2xl text-lg">
              ET Distribution LLC is a wholesale sourcing and distribution company based in
              Woodstock, New York, connecting manufacturers and suppliers with retailers,
              wholesalers, distributors, and business buyers across the United States.
            </p>
          </div>
        </section>

        {/* Story + image */}
        <section className="py-28 px-6 lg:px-8" aria-labelledby="story-heading">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Our Story</p>
              <h2 id="story-heading" className="text-display-md font-serif font-bold text-foreground text-balance mb-8">
                Sourcing you can rely on.
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-pretty">
                <p>
                  ET Distribution is built on a simple conviction: wholesale sourcing should be
                  transparent, reliable, and built around the buyer&apos;s needs. We help businesses
                  cut through fragmented supplier networks and opaque pricing.
                </p>
                <p>
                  Our sourcing spans grocery, specialty food, health &amp; wellness, household
                  essentials, cleaning products, home goods, and consumer products. Through trusted
                  supplier relationships, we connect businesses with dependable inventory and
                  scalable sourcing solutions across 48 US states.
                </p>
                <p>
                  Whether you&apos;re a regional retailer, a national chain, or an e-commerce operator
                  scaling fast, ET Distribution is built to meet you where you are and grow with you.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/about-warehouse.png"
                alt="ET Distribution warehouse operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm border border-border p-5">
                <p className="text-3xl font-serif font-bold text-foreground">48</p>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">States Served</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="bg-surface border-y border-border py-16 px-6 lg:px-8" aria-label="Company statistics">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              { value: '50+', label: 'Active SKUs' },
              { value: '12+', label: 'Supplier Relationships' },
              { value: '48', label: 'States Served' },
              { value: '10,000+', label: 'Orders Fulfilled' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface flex flex-col items-center justify-center py-12 px-8 text-center">
                <p className="text-4xl font-serif font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-28 px-6 lg:px-8" aria-labelledby="values-heading">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">What We Stand For</p>
              <h2 id="values-heading" className="text-display-md font-serif font-bold text-foreground text-balance">
                Our operating principles.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="flex gap-5 p-8 bg-surface border border-border hover:border-accent/30 transition-colors duration-300 group">
                  <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operations image */}
        <section className="bg-surface border-y border-border py-28 px-6 lg:px-8" aria-labelledby="ops-heading">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/about-team.png"
                alt="ET Distribution logistics operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">How We Work</p>
              <h2 id="ops-heading" className="text-display-md font-serif font-bold text-foreground text-balance mb-6">
                People who know
                <br />
                distribution.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-pretty mb-8">
                We focus on the details that keep supply chains moving: careful supplier vetting,
                accurate inventory, and dependable fulfillment. When you work with ET Distribution,
                you get a partner focused on securing reliable inventory and scalable sourcing for
                your business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 group"
              >
                Get in Touch
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-accent py-20 px-6 lg:px-8" aria-labelledby="about-cta-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="about-cta-heading" className="text-display-md font-serif font-bold text-accent-foreground text-balance mb-6">
              Ready to work together?
            </h2>
            <p className="text-accent-foreground/70 mb-8 text-pretty">
              Contact our team to discuss your sourcing needs, request a catalog walkthrough,
              or become a supplier partner.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-foreground text-accent font-medium text-sm hover:bg-accent-foreground/90 transition-colors duration-200 group"
              >
                Contact Us
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 border border-accent-foreground/30 text-accent-foreground font-medium text-sm hover:border-accent-foreground transition-all duration-200"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
