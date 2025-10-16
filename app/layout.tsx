import type { Metadata } from 'next'
import { Coiny } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Footer from '../components/footer'

const coiny = Coiny({ subsets: ['latin'], weight: ['400'], variable: '--font-coiny' })

export const metadata: Metadata = {
  title: 'Factly',
  description: 'Created with Factly',
  generator: 'Factly',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${coiny.variable} ${GeistMono.variable} bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
