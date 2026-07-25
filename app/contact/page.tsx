'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const officeLocations = [
  {
    city: 'Woodstock, New York',
    address: 'Woodstock, New York, United States',
    phone: '(555) 555-5555',
    email: 'etdistributionllc@gmail.com',
    linkedin: '[LinkedIn Placeholder]',
    hours: 'Mon–Fri 9am–5pm EST',
    type: 'Headquarters',
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Prevent empty submissions: required fields must be filled.
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email, and message before sending.')
      return
    }

    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error || 'Something went wrong. Please try again.')
        return
      }
      // Only show the success screen once the email actually sends.
      setSubmitted(true)
    } catch {
      setError('We could not send your message. Please check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-border pt-36 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Get in Touch</p>
            <h1 className="text-display-lg font-serif font-bold text-foreground text-balance">
              Contact Us
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl text-pretty">
              Reach out about sourcing inquiries, catalog questions, account setup, or partnership
              opportunities. Our team responds within 24 business hours.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <CheckCircle2 size={48} className="text-accent mb-6" aria-hidden="true" />
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Message received.</h2>
                  <p className="text-muted-foreground max-w-sm text-pretty">
                    Thank you for reaching out. A member of our team will be in touch within 24 business hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setError(''); setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' }) }}
                    className="mt-8 text-sm text-accent hover:text-foreground transition-colors duration-200"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Full Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="subject" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm outline-none focus:border-accent transition-colors duration-200"
                    >
                      <option value="">Select a subject...</option>
                      <option>Product / Catalog Inquiry</option>
                      <option>Pricing &amp; Quotes</option>
                      <option>Logistics &amp; Shipping</option>
                      <option>Account Setup</option>
                      <option>Supplier Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your sourcing needs, desired categories, estimated volume..."
                      className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200 resize-none"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="mb-5 text-sm text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors duration-200 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Sending…' : 'Send Message'}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-8">
              {/* Quick links */}
              <div className="bg-surface border border-border p-6">
                <h2 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    href="/supplier-inquiry"
                    className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group py-2 border-b border-border"
                  >
                    Supplier Inquiry
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/products"
                    className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group py-2 border-b border-border"
                  >
                    Browse Catalog
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group py-2"
                  >
                    About Us
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Offices */}
              <div className="space-y-4">
                {officeLocations.map((office) => (
                  <div key={office.city} className="bg-surface border border-border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-sm font-semibold text-foreground">{office.city}</h3>
                      <span className="text-xs text-accent">{office.type}</span>
                    </div>
                    <div className="space-y-2.5 text-xs text-muted-foreground">
                      <div className="flex items-start gap-2.5">
                        <MapPin size={13} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{office.address}</span>
                      </div>
                      {office.phone && (
                        <div className="flex items-center gap-2.5">
                          <Phone size={13} className="text-accent shrink-0" aria-hidden="true" />
                          <a href={`tel:${office.phone}`} className="hover:text-foreground transition-colors duration-200">{office.phone}</a>
                        </div>
                      )}
                      <div className="flex items-center gap-2.5">
                        <Mail size={13} className="text-accent shrink-0" aria-hidden="true" />
                        <a href={`mailto:${office.email}`} className="hover:text-foreground transition-colors duration-200">{office.email}</a>
                      </div>
                      {office.linkedin && (
                        <div className="flex items-center gap-2.5">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-accent shrink-0" aria-hidden="true">
                            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                          </svg>
                          <span>{office.linkedin}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2.5">
                        <Clock size={13} className="text-accent shrink-0" aria-hidden="true" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
