import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // MDX blog bodies live in src/content/blog and are pulled in via dynamic
  // import, so these extensions never create routes of their own.
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // NOTE: these are the suppliers' CDNs. Swap for self-hosted photography
    // before launch — see README "Before you go live".
    remotePatterns: [
      { protocol: 'https', hostname: 'herokiddo.com' },
      { protocol: 'https', hostname: 'www.xjump.com' },
      // YouTube poster frame for the lite-embed facade on the homepage.
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      // Legacy / convenience paths → canonical collection URLs.
      { source: '/collections', destination: '/shop', permanent: true },
      { source: '/products/:slug', destination: '/shop/:slug', permanent: true },
      { source: '/blogs/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/water-slides', destination: '/collections/water-slides', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
