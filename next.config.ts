import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /*
   * Static export — the site is hosted on GitHub Pages, which serves files
   * and cannot run a Node server. `next build` writes a complete static site
   * to `out/`, which the GitHub Actions workflow publishes.
   *
   * Three consequences, all handled elsewhere in the codebase:
   *   1. No API routes. Form submissions and order creation run client-side
   *      or POST to a third-party endpoint — see src/lib/placeOrder.ts and
   *      src/data/forms.ts.
   *   2. No `redirects()` or `headers()` below; neither survives export.
   *      Legacy paths get static meta-refresh stubs instead — see
   *      scripts/generate-redirects.mjs.
   *   3. No on-demand image optimisation, hence `unoptimized` below.
   */
  output: 'export',

  // MDX blog bodies live in src/content/blog and are pulled in via dynamic
  // import, so these extensions never create routes of their own.
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  poweredByHeader: false,

  /*
   * Pages serves `/shop/` as `/shop/index.html`. Without trailing slashes the
   * export emits `/shop.html`, which Pages will not resolve from `/shop`.
   */
  trailingSlash: true,

  images: {
    /*
     * The optimiser is a server feature. Images are emitted as plain <img>
     * pointing at their original source.
     *
     * TODO: this is the single biggest performance cost of static hosting —
     * the supplier CDNs serve full-size JPEGs with no AVIF/WebP conversion
     * and no resizing. Self-hosting resized images under public/ (which you
     * need to do anyway for copyright) recovers most of it.
     */
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'herokiddo.com' },
      { protocol: 'https', hostname: 'www.xjump.com' },
      // YouTube poster frame for the lite-embed facade on the homepage.
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
