import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'ET Distribution is a premier global distributor sourcing and delivering premium products across North America since 2008.',
}

const values = [
  {
    title: 'Verified Quality',
    description:
      'Every supplier in our network undergoes a rigorous 14-point vetting process including factory audits, compliance reviews, and sample testing.',
  },
  {
    title: 'Transparent Pricing',
    description:
      'No hidden fees. We quote clearly on unit cost, MOQ, freight, and duties so your procurement team can plan with confidence.',
  },
  {
    title: 'Scalable Logistics',
    description:
      'From pallets to full truckloads, our logistics network is built to scale with your business across 48 US states.',
  },
  {
    title: 'Dedicated Support',
    description:
      'Every account is assigned a dedicated sourcing specialist who knows your category and responds within 24 hours.',
  },
]

const milestones = [
  { year: '2008', event: 'ET Distribution founded in Los Angeles, CA' },
  { year: '2011', event: 'Expanded to electronics and industrial tool categories' },
  { year: '2014', event: 'Opened Miami and New York distribution hubs' },
  { year: '2017', event: 'Surpassed 5,000 active SKUs in catalog' },
  { year: '2020', event: 'Launched digital sourcing platform for wholesale buyers' },
  { year: '2023', event: 'Crossed $2.4B in distributed product value' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-surface border-b border-border pt-36 pb-24 px-6 lg:px-8 overflow-hidden" aria-labelledby="about-hero-heading">
          <div className="absolute inset-0 opacity-5">
            <Image src="/images/about-warehouse.jpg" alt="" fill className="object-cover" aria-hidden="true" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">About ET Distribution</p>
            <h1 id="about-hero-heading" className="text-display-lg font-serif font-bold text-foreground text-balance max-w-3xl mb-6">
              A distributor built for the modern supply chain.
            </h1>
            <p className="text-muted-foreground text-pretty leading-relaxed max-w-2xl text-lg">
              Founded in 2008, ET Distribution has grown into one of North America&apos;s most trusted
              multi-category distributors — connecting global manufacturers with retailers,
              wholesalers, and e-commerce brands at every scale.
            </p>
          </div>
        </section>

        {/* Story + image */}
        <section className="py-28 px-6 lg:px-8" aria-labelledby="story-heading">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Our Story</p>
              <h2 id="story-heading" className="text-display-md font-serif font-bold text-foreground text-balance mb-8">
                15 years of sourcing excellence.
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-pretty">
                <p>
                  ET Distribution was founded on a conviction that wholesale sourcing in America was
                  broken. Fragmented supplier networks, opaque pricing, and unreliable logistics were
                  costing businesses time and money. We set out to fix that.
                </p>
                <p>
                  Today our platform spans four major product verticals — consumer electronics,
                  home goods, industrial tools, and branded apparel — with 200+ vetted manufacturers
                  on five continents. We maintain physical distribution hubs in Los Angeles, Miami,
                  and New York, enabling fast, compliant delivery to 48 US states.
                </p>
                <p>
                  Whether you&apos;re a regional retailer, a national chain, or an e-commerce operator
                  scaling fast, ET Distribution is built to meet you where you are and grow with you.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/about-warehouse.jpg"
                alt="ET Distribution warehouse operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm border border-border p-5">
                <p className="text-3xl font-serif font-bold text-foreground">200+</p>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">Verified Suppliers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="bg-surface border-y border-border py-16 px-6 lg:px-8" aria-label="Company statistics">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              { value: '15,000+', label: 'Active SKUs' },
              { value: '200+', label: 'Verified Suppliers' },
              { value: '48', label: 'States Served' },
              { value: '$2.4B+', label: 'Products Distributed' },
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

        {/* Timeline */}
        <section className="bg-surface border-y border-border py-28 px-6 lg:px-8" aria-labelledby="timeline-heading">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Our History</p>
              <h2 id="timeline-heading" className="text-display-md font-serif font-bold text-foreground text-balance">
                Built over
                <br />
                15 years.
              </h2>
            </div>
            <ol className="relative border-l border-border pl-8 space-y-8">
              {milestones.map((m) => (
                <li key={m.year} className="relative">
                  <div className="absolute -left-[2.125rem] top-0 w-3 h-3 bg-accent border-2 border-background rounded-full" aria-hidden="true" />
                  <p className="text-xs uppercase tracking-[0.2em] text-accent mb-1">{m.year}</p>
                  <p className="text-sm text-foreground">{m.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Team image */}
        <section className="py-28 px-6 lg:px-8" aria-labelledby="team-heading">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/about-team.jpg"
                alt="ET Distribution leadership team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Our Team</p>
              <h2 id="team-heading" className="text-display-md font-serif font-bold text-foreground text-balance mb-6">
                People who know
                <br />
                distribution.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-pretty mb-8">
                Our team is composed of supply chain veterans, sourcing specialists, and logistics
                engineers who have spent careers at the world&apos;s leading distributors and manufacturers.
                When you work with ET Distribution, you get a partner who understands your business
                as well as you do.
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
