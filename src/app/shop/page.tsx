import Link from 'next/link'
import type { Metadata } from 'next'

import { ShopBrowser } from '@/components/shop/ShopBrowser'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { heightCollections, topicCollections } from '@/data/collections'
import { products, toCardDataList } from '@/data/products'
import { siteConfig } from '@/data/site'
import { breadcrumbSchema, faqSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Commercial Inflatable Water Slides for Sale | WS4K',
  description:
    'Browse all 26 commercial inflatable water slides for sale — filter by height, lanes, pool type and availability. 15oz PVC vinyl, blower included, free shipping.',
  path: '/shop',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
]

const SHOP_FAQS = [
  {
    question: 'How many inflatable water slides do you sell?',
    answer:
      'Twenty-six, spanning 12ft backyard units to a 19ft dual-lane flagship and a 45ft wet/dry obstacle course. Every one of them is on this page — we do not hide inventory behind category clicks.',
  },
  {
    question: 'Do all your water slides come with a blower?',
    answer:
      'Yes, every single one, sized for that specific unit. Stakes, tether ropes, a storage bag and a repair patch kit are included as well.',
  },
  {
    question: 'Is shipping really free on every slide?',
    answer:
      'Free shipping applies sitewide to the contiguous United States with no order minimum. It is already in the price shown — there is no shipping surprise at checkout.',
  },
  {
    question: 'What does “Call for Availability” mean?',
    answer:
      'That unit is out of stock and we do not have a current confirmed price for it. Rather than show a stale figure or invent a restock date, we list it honestly and let you join the notify list.',
  },
  {
    question: 'Can I buy these for a rental business?',
    answer:
      'Yes — every slide here is commercial grade, which is what makes repeat rental cycling viable. Talk to us about multi-unit orders before you place one.',
  },
]

export default function ShopPage() {
  const cardData = toCardDataList(products)

  return (
    <>
      <JsonLd data={[breadcrumbSchema(CRUMBS), faqSchema(SHOP_FAQS)]} />

      <section className="bg-gradient-to-b from-sky-tint to-white pt-6 pb-12">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs crumbs={CRUMBS} className="mb-6" />
          <h1 className="text-4xl leading-tight sm:text-5xl">
            Commercial Inflatable Water Slides for Sale
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/80">
            All {products.length} slides we carry, on one page. Filter by height, lane count, pool
            type or availability — every unit is 15oz commercial PVC with a blower included and free
            shipping sitewide.
          </p>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-4">
          {/*
            ShopBrowser is a client component but is prerendered at build time,
            so the static HTML contains all 26 products. Filters and search run
            purely client-side and never alter the URL — /shop stays the single
            indexable version of this page.
          */}
          <ShopBrowser products={cardData} />
        </div>
      </section>

      <WaveDivider color="sky" />

      <section className="bg-sky-tint/50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Narrow it down">Shop by Height or Type</SectionHeading>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg">By height</h3>
              <ul className="flex flex-wrap gap-2">
                {heightCollections.map((collection) => (
                  <li key={collection.slug}>
                    <Link
                      href={collection.href}
                      className="inline-flex min-h-[44px] items-center rounded-2xl border-2 border-deep-blue bg-white px-4 font-bold text-deep-blue hover:bg-deep-blue hover:text-white"
                    >
                      {collection.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg">By type</h3>
              <ul className="flex flex-wrap gap-2">
                {topicCollections.map((collection) => (
                  <li key={collection.slug}>
                    <Link
                      href={collection.href}
                      className="inline-flex min-h-[44px] items-center rounded-2xl border-2 border-splash-blue bg-white px-4 font-bold text-splash-blue-ink hover:bg-splash-blue hover:text-white"
                    >
                      {collection.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="Before you order" align="left">
            Shop FAQs
          </SectionHeading>
          <FaqAccordion faqs={SHOP_FAQS} />

          <div className="prose-splash mt-12">
            <h2>Buying a commercial inflatable water slide</h2>
            <p>
              Every slide on this page is built to the same material standard: 15oz commercial PVC
              vinyl with quadruple-stitched seams and reinforced stress points. That is the spec
              rental operators buy, and it is the single biggest difference between a slide that
              lasts a decade and one that splits at a seam in its second summer. Price differences
              across this catalog come from size, lane count and pool configuration — never from a
              cheaper grade of material.
            </p>
            <p>
              If you are not sure where to start, start with height. Our{' '}
              <Link href="/collections/13-ft-water-slides">12–13ft slides</Link> are right for ages
              three to nine and fit yards nothing else will. The{' '}
              <Link href="/collections/15-ft-water-slides">15–16ft bracket</Link> is our
              best-selling range and covers most families. The{' '}
              <Link href="/collections/17-ft-water-slides">17ft units</Link> are what professional
              fleets standardise on, and{' '}
              <Link href="/collections/19-ft-and-taller-water-slides">19ft and taller</Link> is
              event equipment that needs serious clearance and two blower circuits.
            </p>
            <p>
              Still weighing options? The{' '}
              <Link href="/blog/best-inflatable-water-slide-buyers-guide">
                full buyer&rsquo;s guide
              </Link>{' '}
              walks through all four decisions in order, or call{' '}
              <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a> and we will talk it
              through with you.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

