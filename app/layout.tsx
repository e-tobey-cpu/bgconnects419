import '@/app/globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'BGConnects',
  description: 'Campus services marketplace built with Next.js, Supabase and Stripe',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {/* Primary site wrapper */}
        <div className="flex-grow flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}