import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/data/site'

// Required under `output: 'export'` — generated at build time rather than
// served by a running route handler.
export const dynamic = 'force-static'

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
