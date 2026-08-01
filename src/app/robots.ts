import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/data/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // These are per-visitor pages with nothing to index. They also carry
        // a noindex tag — the disallow just saves the crawl.
        disallow: ['/cart', '/checkout', '/order-confirmation', '/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
