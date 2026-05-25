import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'
import CategorySection from '@/components/home/CategorySection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import AboutSnippet from '@/components/home/AboutSnippet'
import SupplierSection from '@/components/home/SupplierSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'ET Distribution — Premium Global Distributor',
  description:
    'ET Distribution is a premier global distributor of electronics, home goods, industrial tools, and apparel. 15,000+ SKUs. 200+ verified suppliers. 48 states served.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <AboutSnippet />
        <SupplierSection />
        <TestimonialsSection />

        {/* CTA Band */}
        <section className="bg-accent py-20 px-6 lg:px-8" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 mb-4">
              Ready to scale?
            </p>
            <h2
              id="cta-heading"
              className="text-display-md font-serif font-bold text-accent-foreground text-balance mb-8"
            >
              Start sourcing smarter today.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-foreground text-accent font-medium text-sm hover:bg-accent-foreground/90 transition-colors duration-200 group"
              >
                Browse Catalog
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-accent-foreground/30 text-accent-foreground font-medium text-sm hover:border-accent-foreground hover:bg-accent-foreground/10 transition-all duration-200"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
