import '@/app/globals.css'
import type { ReactNode } from 'react'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'ET Distribution — Wholesale Sourcing & Distribution',
    template: '%s | ET Distribution',
  },
  description:
    'ET Distribution LLC is a wholesale sourcing and distribution company in Woodstock, NY, connecting retailers, wholesalers, and business buyers with reliable inventory across grocery, specialty food, health & wellness, household essentials, and consumer products throughout the United States.',
  keywords: ['distributor', 'wholesale', 'B2B', 'grocery', 'specialty food', 'health and wellness', 'household essentials', 'consumer products', 'sourcing'],
  icons: { icon: '/favicon.ico' },
}

export const viewport = {
  themeColor: '#0a0a0a',
  userScalable: false,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans text-foreground bg-background antialiased">
        {children}
      </body>
    </html>
  )
}
