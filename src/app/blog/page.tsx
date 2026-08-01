import type { Metadata } from 'next'
import { BlogBrowser, type BlogCard } from '@/components/blog/BlogBrowser'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { JsonLd } from '@/components/ui/JsonLd'
import { blogCategories, getSortedPosts } from '@/data/blog'
import { productsBySlug } from '@/data/products'
import { breadcrumbSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Water Slide Buying Guides & Advice | WaterSlides4Kids',
  description:
    'Decision guides for inflatable water slide buyers — sizing, vinyl grades, blower math, safety checklists, cleaning routines and rental business economics.',
  path: '/blog',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
]

export default function BlogIndexPage() {
  const posts: BlogCard[] = getSortedPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    readingMinutes: post.readingMinutes,
    image: productsBySlug.get(post.featureProductSlug)?.image ?? '',
    tags: post.tags,
  }))

  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <section className="bg-gradient-to-b from-sky-tint to-white pt-6 pb-10">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs crumbs={CRUMBS} className="mb-6" />
          <h1 className="text-4xl leading-tight sm:text-5xl">
            Water Slide Buying Guides &amp; Advice
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/80">
            No listicles, no filler. These are the questions people ask before they spend a thousand
            dollars on a slide — sizing, vinyl grades, blower math, safety, cleaning, and the actual
            economics of renting one out.
          </p>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <BlogBrowser posts={posts} categories={[...blogCategories]} />
        </div>
      </section>
    </>
  )
}
