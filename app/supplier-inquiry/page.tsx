'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, CheckCircle2, Building2, Globe, Package, TrendingUp } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const benefits = [
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Access to retailers and distributors across North America, Europe, and Asia-Pacific.',
  },
  {
    icon: Package,
    title: 'Streamlined Logistics',
    description: 'Our fulfillment network handles warehousing, shipping, and returns management.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Partnership',
    description: 'Marketing support, demand forecasting, and dedicated account management.',
  },
  {
    icon: Building2,
    title: 'Compliance Support',
    description: 'We guide you through certifications, labeling, and regulatory requirements.',
  },
]

const categories = [
  'Consumer Electronics',
  'Home & Living',
  'Industrial & Tools',
  'Apparel & Accessories',
  'Health & Wellness',
  'Automotive Parts',
  'Other',
]

export default function SupplierInquiryPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    category: '',
    productDescription: '',
    annualVolume: '',
    currentMarkets: '',
    certifications: '',
    additionalInfo: '',
  })

  const benefitsRef = useRef(null)
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-80px' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-surface border-b border-border pt-36 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">Partner With Us</p>
            <h1 className="text-display-lg font-serif font-bold text-foreground text-balance">
              Become a Supplier
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl text-pretty">
              Join our network of 200+ verified manufacturers and reach thousands of retailers
              worldwide. We handle logistics, compliance, and customer relationships so you can
              focus on what you do best.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <section ref={benefitsRef} className="py-20 px-6 lg:px-8 border-b border-border" aria-labelledby="benefits-heading">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              id="benefits-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-2xl font-serif font-bold text-foreground mb-12 text-center"
            >
              Why Partner with ET Distribution?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-surface border border-border p-6 hover:border-accent/50 transition-colors duration-300"
                >
                  <benefit.icon size={24} className="text-accent mb-4" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <CheckCircle2 size={48} className="text-accent mb-6" aria-hidden="true" />
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Application Received</h2>
              <p className="text-muted-foreground max-w-md text-pretty">
                Thank you for your interest in partnering with ET Distribution. Our supplier
                relations team will review your application and contact you within 3-5 business days.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setForm({
                    companyName: '',
                    contactName: '',
                    email: '',
                    phone: '',
                    website: '',
                    category: '',
                    productDescription: '',
                    annualVolume: '',
                    currentMarkets: '',
                    certifications: '',
                    additionalInfo: '',
                  })
                }}
                className="mt-8 text-sm text-accent hover:text-foreground transition-colors duration-200"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Supplier Application</h2>
                <p className="text-muted-foreground text-sm max-w-lg mx-auto text-pretty">
                  Complete the form below and our team will evaluate your products for inclusion
                  in our distribution network.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate aria-label="Supplier application form" className="space-y-8">
                {/* Company Information */}
                <fieldset className="border border-border p-6">
                  <legend className="text-xs uppercase tracking-[0.15em] text-accent px-2">Company Information</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
                    <div>
                      <label htmlFor="companyName" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Company Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="Your Company LLC"
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactName" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Primary Contact <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        required
                        value={form.contactName}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Business Email <span aria-hidden="true">*</span>
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
                        Phone Number
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
                    <div className="sm:col-span-2">
                      <label htmlFor="website" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Company Website
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        value={form.website}
                        onChange={handleChange}
                        placeholder="https://www.yourcompany.com"
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Product Information */}
                <fieldset className="border border-border p-6">
                  <legend className="text-xs uppercase tracking-[0.15em] text-accent px-2">Product Information</legend>
                  <div className="space-y-5 mt-4">
                    <div>
                      <label htmlFor="category" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Primary Product Category <span aria-hidden="true">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm outline-none focus:border-accent transition-colors duration-200"
                      >
                        <option value="">Select a category...</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="productDescription" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Product Description <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="productDescription"
                        name="productDescription"
                        required
                        rows={4}
                        value={form.productDescription}
                        onChange={handleChange}
                        placeholder="Describe your main products, unique features, and target market..."
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200 resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="annualVolume" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                          Estimated Annual Volume (USD)
                        </label>
                        <select
                          id="annualVolume"
                          name="annualVolume"
                          value={form.annualVolume}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm outline-none focus:border-accent transition-colors duration-200"
                        >
                          <option value="">Select range...</option>
                          <option value="<100k">Under $100,000</option>
                          <option value="100k-500k">$100,000 - $500,000</option>
                          <option value="500k-1m">$500,000 - $1,000,000</option>
                          <option value="1m-5m">$1,000,000 - $5,000,000</option>
                          <option value="5m+">Over $5,000,000</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="currentMarkets" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                          Current Markets
                        </label>
                        <input
                          id="currentMarkets"
                          name="currentMarkets"
                          type="text"
                          value={form.currentMarkets}
                          onChange={handleChange}
                          placeholder="e.g., USA, Canada, EU"
                          className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="certifications" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Certifications / Compliance
                      </label>
                      <input
                        id="certifications"
                        name="certifications"
                        type="text"
                        value={form.certifications}
                        onChange={handleChange}
                        placeholder="e.g., ISO 9001, CE, FCC, UL, FDA"
                        className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Additional Info */}
                <fieldset className="border border-border p-6">
                  <legend className="text-xs uppercase tracking-[0.15em] text-accent px-2">Additional Information</legend>
                  <div className="mt-4">
                    <label htmlFor="additionalInfo" className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                      Anything else you&apos;d like us to know?
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={4}
                      value={form.additionalInfo}
                      onChange={handleChange}
                      placeholder="Tell us about your manufacturing capabilities, lead times, or any specific partnership goals..."
                      className="w-full px-4 py-3 bg-surface border border-border text-foreground text-sm placeholder:text-muted outline-none focus:border-accent transition-colors duration-200 resize-none"
                    />
                  </div>
                </fieldset>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <p className="text-xs text-muted-foreground text-pretty">
                    By submitting, you agree to our terms and privacy policy.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors duration-200 group shrink-0"
                  >
                    Submit Application
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
