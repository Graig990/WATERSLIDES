import type { Metadata, Viewport } from 'next'
import { Fredoka, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { JsonLd } from '@/components/ui/JsonLd'
import { siteConfig, verification } from '@/data/site'
import { sitewideGraph } from '@/lib/schema'

// Self-hosted at build time by next/font — no request ever reaches Google,
// and no render-blocking stylesheet in <head>.
const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Inflatable Water Slides for Sale | WaterSlides4Kids',
    template: '%s',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  alternates: {
    canonical: '/',
    languages: { 'en-US': '/' },
  },
  formatDetection: { telephone: true },
  other: {
    ...(verification.google ? { 'google-site-verification': verification.google } : {}),
    ...(verification.bing ? { 'msvalidate.01': verification.bing } : {}),
  },
}

export const viewport: Viewport = {
  themeColor: '#00B4E6',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${fredoka.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect to the product image CDNs — the hero image is the LCP. */}
        <link rel="preconnect" href="https://herokiddo.com" />
        <link rel="preconnect" href="https://www.xjump.com" />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <AnnouncementBar />
        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <CartDrawer />

        <JsonLd data={sitewideGraph()} />

        {verification.ga4 ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${verification.ga4}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${verification.ga4}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
