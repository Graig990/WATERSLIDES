import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ButtonLink } from '@/components/ui/Button'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { authors, blogPosts, getBlogPost, getSortedPosts } from '@/data/blog'
import { productImageAlt, productsBySlug, toCardData } from '@/data/products'
import { absoluteUrl } from '@/data/site'
import { articleSchema, breadcrumbSchema, faqSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'

export const dynamicParams = false

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const post = getBlogPost(slug)
  if (!post) return {}

  const image = productsBySlug.get(post.featureProductSlug)?.image

  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image,
    imageAlt: post.title,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  })
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const post = getBlogPost(slug)
  if (!post) notFound()

  // MDX bodies live outside the route tree and are pulled in by slug.
  const { default: PostBody } = await import(`@/content/blog/${slug}.mdx`)

  const author = authors[post.authorId]
  const featureImage = productsBySlug.get(post.featureProductSlug)
  const linkedProducts = post.linkedProductSlugs
    .map((productSlug) => productsBySlug.get(productSlug))
    .filter((product) => product !== undefined)
    .slice(0, 3)

  const moreReading = getSortedPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3)

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ]

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema(post, featureImage?.image ?? absoluteUrl('/brand/og-image.png')),
          faqSchema(post.faqs),
        ]}
      />

      <article>
        <header className="bg-gradient-to-b from-sky-tint to-white pt-6 pb-10">
          <div className="mx-auto max-w-3xl px-4">
            <Breadcrumbs crumbs={crumbs} className="mb-6" />
            <p className="mb-3 inline-flex rounded-full bg-grape/15 px-3 py-1 text-xs font-extrabold text-grape-ink uppercase">
              {post.category}
            </p>
            <h1 className="text-4xl leading-tight sm:text-5xl">{post.h1}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{post.excerpt}</p>
            <p className="mt-5 text-sm text-ink/60">
              By <span className="font-bold text-ink">{author.name}</span> ·{' '}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.updatedAt !== post.publishedAt ? (
                <>
                  {' '}
                  · Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </>
              ) : null}{' '}
              · {post.readingMinutes} min read
            </p>
          </div>
        </header>

        {featureImage ? (
          <div className="mx-auto max-w-4xl px-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border-4 border-white shadow-card">
              <Image
                src={featureImage.image}
                alt={productImageAlt(featureImage)}
                fill
                priority
                sizes="(min-width: 1024px) 900px, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className="bg-white py-12">
          <div className="prose-splash mx-auto max-w-3xl px-4">
            <PostBody />
          </div>
        </div>

        {/* FAQ block — matches the FAQPage schema emitted above */}
        <section className="bg-white pb-12">
          <div className="mx-auto max-w-3xl px-4">
            <SectionHeading as="h2" align="left" eyebrow="Quick answers">
              Frequently asked
            </SectionHeading>
            <FaqAccordion faqs={post.faqs} />
          </div>
        </section>

        <WaveDivider color="sky" />

        {/* Products referenced in this guide */}
        {linkedProducts.length > 0 ? (
          <section className="bg-sky-tint/40 py-14">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeading eyebrow="Mentioned in this guide">Slides Worth a Look</SectionHeading>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {linkedProducts.map((product) => (
                  <li key={product.slug}>
                    <ProductCard
                      product={toCardData(product)}
                      sizes="(min-width: 1024px) 380px, 92vw"
                    />
                  </li>
                ))}
              </ul>
              <div className="mt-10 text-center">
                <ButtonLink href="/shop" size="lg">
                  Shop all 26 water slides
                </ButtonLink>
              </div>
            </div>
          </section>
        ) : null}

        {/* Author */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-3xl px-4">
            <div className="rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6">
              <h2 className="text-xl">About the author</h2>
              <p className="mt-1 font-bold text-deep-blue">{author.name}</p>
              <p className="mt-2 leading-relaxed text-ink/80">{author.bio}</p>
              <Link
                href={author.url}
                className="mt-3 inline-block font-bold text-splash-blue-ink underline underline-offset-4"
              >
                More about us
              </Link>
            </div>
          </div>
        </section>

        {/* Keep reading */}
        <section className="bg-sky-tint/50 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading eyebrow="Keep reading">More Guides</SectionHeading>
            <ul className="grid gap-4 md:grid-cols-3">
              {moreReading.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="block h-full rounded-2xl border-2 border-white bg-white p-5 shadow-card hover:border-splash-blue"
                  >
                    <span className="block font-bold text-deep-blue">{item.title}</span>
                    <span className="mt-1 block text-sm text-ink/70">{item.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </>
  )
}
