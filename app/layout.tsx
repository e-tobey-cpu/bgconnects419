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
    default: 'ET Distribution — Premium Global Distributor',
    template: '%s | ET Distribution',
  },
  description:
    'ET Distribution is a premium global distributor sourcing and delivering high-quality products across electronics, home goods, industrial tools, and apparel. Trusted by retailers and wholesalers worldwide.',
  keywords: ['distributor', 'wholesale', 'B2B', 'electronics', 'industrial', 'bulk orders', 'global supply chain'],
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
