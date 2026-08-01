import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { ProductCard } from '@/components/product/ProductCard'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { allCollections, getCollection, getCollectionProducts } from '@/data/collections'
import { toCardDataList } from '@/data/products'
import { getLatestPosts } from '@/data/blog'
import { siteConfig } from '@/data/site'
import { breadcrumbSchema, faqSchema, itemListSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return allCollections.map((collection) => ({ slug: collection.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const collection = getCollection(slug)
  if (!collection) return {}

  const products = getCollectionProducts(collection)
  const hero = products[0]

  return buildMetadata({
    title: collection.title,
    description: collection.metaDescription,
    path: collection.href,
    image: hero?.image,
    imageAlt: hero ? `${hero.name} — commercial inflatable water slide` : undefined,
  })
}

export default async function CollectionPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const collection = getCollection(slug)
  if (!collection) notFound()

  const products = getCollectionProducts(collection)
  const cardData = toCardDataList(products)
  const relatedPosts = getLatestPosts(3)

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: collection.name, href: collection.href },
  ]

  const siblings = allCollections.filter((item) => item.slug !== collection.slug)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema(products, collection),
          faqSchema(collection.faqs),
        ]}
      />

      <section className="bg-gradient-to-b from-sky-tint to-white pt-6 pb-12">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs crumbs={crumbs} className="mb-6" />
          <h1 className="text-4xl leading-tight sm:text-5xl">{collection.h1}</h1>
          <p className="mt-3 text-lg font-semibold text-hot-coral">{collection.tagline}</p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/80">{collection.intro}</p>
          <p className="mt-4 text-sm font-bold text-ink/60">
            {products.length} {products.length === 1 ? 'slide' : 'slides'} in this collection
          </p>
        </div>
      </section>

      {/* Product grid sits above the copy so products are never pushed down */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-4">
          {products.length === 0 ? (
            <p className="rounded-3xl border-2 border-dashed border-splash-blue/40 bg-sky-tint/50 p-8 text-center text-ink/70">
              Nothing in this collection right now.{' '}
              <Link href="/shop" className="font-bold text-splash-blue-ink underline">
                Browse all slides
              </Link>
              .
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cardData.map((product, index) => (
                <li key={product.slug}>
                  <ProductCard product={product} priority={index < 4} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <WaveDivider color="sky" />

      {/* 800+ words of supporting copy */}
      <section className="bg-sky-tint/40 py-16">
        <div className="prose-splash mx-auto max-w-3xl px-4">
          {collection.sections.map((section) => (
            <div key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="droplet-list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          <h2>Still deciding?</h2>
          <p>
            Call <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a> and we will talk it
            through — or read the{' '}
            <Link href="/blog/best-inflatable-water-slide-buyers-guide">
              full inflatable water slide buyer&rsquo;s guide
            </Link>
            , which covers height, lanes, pool type and vinyl weight in order.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="Common questions" align="left">
            {collection.name} FAQs
          </SectionHeading>
          <FaqAccordion faqs={collection.faqs} />
        </div>
      </section>

      {/* Sibling collections keep the hub-and-spoke cluster tightly linked */}
      <section className="bg-sky-tint/50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Keep browsing">Related Collections</SectionHeading>
          <ul className="flex flex-wrap justify-center gap-3">
            {siblings.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center rounded-2xl border-2 border-deep-blue bg-white px-5 font-bold text-deep-blue hover:bg-deep-blue hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/shop"
                className="inline-flex min-h-[44px] items-center rounded-2xl bg-sunny-yellow px-5 font-extrabold text-ink"
              >
                All 26 slides
              </Link>
            </li>
          </ul>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border-2 border-white bg-white p-4 font-bold text-deep-blue shadow-card hover:border-splash-blue"
              >
                {post.title}
                <span className="mt-1 block text-sm font-normal text-ink/65">{post.excerpt}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
