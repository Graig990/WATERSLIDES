import type { MetadataRoute } from 'next'
import { allCollections } from '@/data/collections'
import { blogPosts } from '@/data/blog'
import { products } from '@/data/products'
import { absoluteUrl } from '@/data/site'

/**
 * Only URLs that return 200 and are indexable belong here.
 *
 * Deliberately excluded: /cart, /checkout and /order-confirmation (all
 * noindex), and every redirect source in next.config.ts. Listing a noindexed
 * or redirecting URL in a sitemap is a Search Console warning and wastes
 * crawl budget.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/shop'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/shipping'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/warranty'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/returns'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/financing'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: absoluteUrl('/privacy-policy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const collectionPages: MetadataRoute.Sitemap = allCollections.map((collection) => ({
    url: absoluteUrl(collection.href),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/shop/${product.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.updatedAt}T12:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...collectionPages, ...productPages, ...blogPages]
}
