'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/products', label: 'Catalog' },
  { href: '/about', label: 'About' },
  { href: '/supplier-inquiry', label: 'Suppliers' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const navBg = scrolled || !isHome
    ? 'bg-background/95 backdrop-blur-md border-b border-border'
    : 'bg-transparent'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="ET Distribution home"
          >
            <span className="text-xl font-serif font-bold tracking-tight text-foreground">
              ET<span className="text-accent">.</span>
            </span>
            <span className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Distribution
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-foreground ${
                    pathname.startsWith(link.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/supplier-inquiry"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200"
            >
              Request Quote
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 text-foreground"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background pt-16 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between py-4 border-b border-border text-xl font-serif font-medium text-foreground hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                  <ChevronRight size={18} className="text-muted" aria-hidden="true" />
                </Link>
              ))}
              <Link
                href="/supplier-inquiry"
                className="mt-6 flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground rounded-sm font-medium"
              >
                Request a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
