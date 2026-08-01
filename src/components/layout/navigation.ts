import { heightCollections, topicCollections } from '@/data/collections'

export const megaMenuTopics = topicCollections.map((collection) => ({
  href: collection.href,
  name: collection.name,
  description: collection.tagline,
}))

export const megaMenuHeights = heightCollections.map((collection) => ({
  href: collection.href,
  name: collection.name,
}))

export const primaryNav = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

/**
 * '/' is a prefix of every route, so it only counts as active on an exact
 * match — otherwise Home highlights on every page of the site.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export const footerNav = {
  shop: [
    { href: '/shop', label: 'All Water Slides' },
    ...topicCollections.map((c) => ({ href: c.href, label: c.name })),
    ...heightCollections.map((c) => ({ href: c.href, label: c.name })),
  ],
  support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping & Delivery' },
    { href: '/warranty', label: 'Warranty' },
    { href: '/returns', label: 'Returns & Refunds' },
    { href: '/financing', label: 'Financing' },
  ],
  company: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}
