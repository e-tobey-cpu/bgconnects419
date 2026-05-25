'use client'

import Link from 'next/link'
import { Instagram, Linkedin, X, ArrowRight } from 'lucide-react'

const footerLinks = {
  catalog: [
    { href: '/products?category=electronics', label: 'Consumer Electronics' },
    { href: '/products?category=home', label: 'Home & Living' },
    { href: '/products?category=industrial', label: 'Industrial & Tools' },
    { href: '/products?category=apparel', label: 'Apparel & Accessories' },
  ],
  company: [
    { href: '/about', label: 'About ET Distribution' },
    { href: '/supplier-inquiry', label: 'Become a Supplier' },
    { href: '/contact', label: 'Contact Us' },
  ],
  legal: [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Shipping Policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border" role="contentinfo">
      {/* Newsletter banner */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Stay Informed</p>
            <h3 className="text-xl font-serif font-semibold text-foreground text-balance">
              Get new catalog arrivals &amp; supplier updates
            </h3>
          </div>
          <form
            className="flex w-full max-w-md"
            aria-label="Newsletter signup"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your business email"
              className="flex-1 px-4 py-3 bg-background border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors duration-200 shrink-0"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6" aria-label="ET Distribution home">
              <span className="text-2xl font-serif font-bold text-foreground">
                ET<span className="text-accent">.</span>
              </span>
              <span className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Distribution
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs text-pretty">
              A premier global distributor connecting manufacturers and retailers across
              electronics, home goods, industrial tools, and apparel since 2008.
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-border text-muted hover:text-foreground hover:border-accent transition-colors duration-200"
                aria-label="ET Distribution on Instagram"
              >
                <Instagram size={16} aria-hidden="true" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-border text-muted hover:text-foreground hover:border-accent transition-colors duration-200"
                aria-label="ET Distribution on LinkedIn"
              >
                <Linkedin size={16} aria-hidden="true" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center border border-border text-muted hover:text-foreground hover:border-accent transition-colors duration-200"
                aria-label="ET Distribution on Twitter"
              >
                <X size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Catalog</h4>
            <ul className="space-y-3" role="list">
              {footerLinks.catalog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Company</h4>
            <ul className="space-y-3" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Legal</h4>
            <ul className="space-y-3" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} ET Distribution LLC. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Los Angeles, CA &nbsp;&bull;&nbsp; Miami, FL &nbsp;&bull;&nbsp; New York, NY
          </p>
        </div>
      </div>
    </footer>
  )
}
