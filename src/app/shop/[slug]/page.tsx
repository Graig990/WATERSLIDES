import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AlertTriangle, PackageCheck, Play, Truck } from 'lucide-react'

import { CompareTable } from '@/components/product/CompareTable'
import { NotifyMeForm } from '@/components/product/NotifyMeForm'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGallery } from '@/components/product/ProductGallery'
import { StickyAddToCart } from '@/components/product/StickyAddToCart'
import { PdpBuyBox } from '@/components/product/PdpBuyBox'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { JsonLd } from '@/components/ui/JsonLd'
import { SaveBadge, StockPill } from '@/components/ui/Badges'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { blogPostsBySlug } from '@/data/blog'
import { topicCollections } from '@/data/collections'
import {
  getProduct,
  getRelatedProducts,
  productImageAlt,
  products,
  savingsOf,
  toCardData,
  toCardDataList,
} from '@/data/products'
import { siteConfig } from '@/data/site'
import { breadcrumbSchema, faqSchema, productSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { formatPrice } from '@/lib/utils'

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const product = getProduct(slug)
  if (!product) return {}

  const priceHint =
    product.price !== null ? `${formatPrice(product.price)} · ` : 'Call for availability · '

  return buildMetadata({
    title: `${product.shortName} for Sale | WaterSlides4Kids`,
    description:
      `${priceHint}${product.tagline}. Commercial 15oz PVC vinyl, blower included, free shipping sitewide. Specs, FAQs and comparisons inside.`.slice(
        0,
        160,
      ),
    path: `/shop/${product.slug}`,
    image: product.image,
    imageAlt: productImageAlt(product),
  })
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)
  const savings = savingsOf(product)
  const isOutOfStock = product.stock === 'out-of-stock'
  const cardData = toCardData(product)

  const linkedPosts = product.blogSlugs
    .map((postSlug) => blogPostsBySlug.get(postSlug))
    .filter((post) => post !== undefined)

  const siblingCollection = topicCollections.find((collection) =>
    (product.collections as readonly string[]).includes(collection.slug),
  )

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: product.shortName, href: `/shop/${product.slug}` },
  ]

  return (
    <>
      <JsonLd
        data={[breadcrumbSchema(crumbs), productSchema(product), faqSchema(product.faqs)]}
      />

      <div className="bg-gradient-to-b from-sky-tint to-white pt-6 pb-4">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs crumbs={crumbs} />
        </div>
      </div>

      <section className="bg-white pb-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.15fr_1fr]">
          <ProductGallery images={[product.image]} alt={productImageAlt(product)} priority />

          <div id="pdp-buy-box">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <StockPill status={product.stock} />
              {product.isNew ? (
                <span className="rounded-full bg-sunny-yellow px-3 py-1 text-xs font-extrabold text-ink uppercase">
                  New
                </span>
              ) : null}
              {savings ? <SaveBadge amount={savings} /> : null}
            </div>

            <h1 className="text-3xl leading-tight sm:text-4xl">{product.name}</h1>
            <p className="mt-3 text-lg font-semibold text-hot-coral">{product.tagline}</p>

            <div className="mt-6 rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-5">
              {isOutOfStock ? (
                <>
                  <p className="text-2xl font-extrabold text-ink/70">Call for Availability</p>
                  <p className="mt-2 text-sm text-ink/70">
                    This unit is out of stock and we do not have a current confirmed price. We are
                    not going to invent one — leave your email and you will hear the moment we have
                    real numbers.
                  </p>
                  <div className="mt-4">
                    <NotifyMeForm productSlug={product.slug} productName={product.shortName} />
                  </div>
                  <p className="mt-3 text-sm">
                    Or call{' '}
                    <a
                      href={`tel:${siteConfig.phoneE164}`}
                      className="font-bold text-splash-blue-ink underline"
                    >
                      {siteConfig.phone}
                    </a>{' '}
                    — {siteConfig.hours}.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    {product.msrp !== null ? (
                      <span className="text-lg text-ink/50 line-through">
                        {formatPrice(product.msrp)}
                      </span>
                    ) : null}
                    {product.price !== null ? (
                      <span className="text-4xl font-extrabold text-hot-coral">
                        {formatPrice(product.price)}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-ink/60">
                    Free shipping included. Tax calculated at checkout.
                  </p>

                  <PdpBuyBox product={cardData} />

                  {product.stock === 'pre-order' ? (
                    <p className="mt-3 flex items-start gap-2 rounded-2xl bg-sunny-yellow/30 p-3 text-sm">
                      <AlertTriangle
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                      />
                      <span>
                        Pre-order: your unit is reserved from the next inbound container at this
                        price. Contact us before you order if you need it for a fixed date.
                      </span>
                    </p>
                  ) : null}
                </>
              )}

              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Truck aria-hidden="true" className="h-4 w-4 text-splash-blue-ink" />
                  Free shipping sitewide · ships in 1–3 business days
                </li>
                <li className="flex items-center gap-2">
                  <PackageCheck aria-hidden="true" className="h-4 w-4 text-splash-blue-ink" />
                  Blower, stakes, storage bag and patch kit included
                </li>
              </ul>
            </div>

            <ul className="droplet-list mt-6">
              {product.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-white pb-12">
        <div className="prose-splash mx-auto max-w-3xl px-4">
          <h2>About the {product.shortName}</h2>
          <p>{product.intro}</p>
          {product.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <WaveDivider color="sky" />

      {/* Specs + what's in the box */}
      <section className="bg-sky-tint/40 py-14">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl">Specifications</h2>
            <div className="table-scroll overflow-hidden rounded-2xl border-2 border-white bg-white">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">{product.name} specifications</caption>
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="even:bg-sky-tint/40">
                      <th scope="row" className="p-3 text-left font-bold text-deep-blue">
                        {spec.label}
                      </th>
                      <td className="p-3">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 flex items-start gap-2 rounded-2xl bg-white p-3 text-xs text-ink/70">
              <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-hot-coral" />
              <span>
                <strong>Example values, pending supplier confirmation.</strong> These figures are
                representative of a slide in this class and are not quoted from a manufacturer data
                sheet. Always follow the documentation shipped with your unit — particularly the
                weight limit and age range.
              </span>
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl">What&rsquo;s in the box</h2>
            <ul className="droplet-list rounded-2xl border-2 border-white bg-white p-5">
              {product.inTheBox.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-8 mb-3 text-xl">Shipping &amp; delivery</h3>
            <p className="leading-relaxed text-ink/80">
              Free shipping sitewide to the contiguous United States, no minimum. Orders typically
              leave our warehouse in 1–3 business days with 3–10 business days in transit depending
              on your state. You will get tracking as soon as it ships. Full details on the{' '}
              <Link href="/shipping" className="font-bold text-splash-blue-ink underline">
                shipping page
              </Link>
              .
            </p>

            <h3 className="mt-8 mb-3 text-xl">Setup video</h3>
            <div className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-splash-blue/40 bg-white p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-hot-coral">
                <Play aria-hidden="true" className="h-5 w-5 fill-white text-white" />
              </span>
              <p className="text-sm text-ink/75">
                A unit-specific setup walkthrough is coming. In the meantime, the{' '}
                <Link href="/#best-sellers" className="font-bold text-splash-blue-ink underline">
                  homepage video
                </Link>{' '}
                shows a slide of this class going up from the bag.
                {/* TODO: replace with a per-product setup video once filmed. */}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="Asked and answered" align="left">
            {product.shortName} FAQs
          </SectionHeading>
          <FaqAccordion faqs={product.faqs} />
        </div>
      </section>

      {/* Comparison */}
      {related.length > 0 ? (
        <section className="bg-sky-tint/40 py-14">
          <div className="mx-auto max-w-5xl px-4">
            <SectionHeading eyebrow="Side by side">Compare Similar Slides</SectionHeading>
            <CompareTable current={product} others={related} />
          </div>
        </section>
      ) : null}

      {/* Internal links: blog posts + sibling collection */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-4">
          <SectionHeading eyebrow="Do your homework">Before You Buy</SectionHeading>
          <ul className="grid gap-4 md:grid-cols-2">
            {linkedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full rounded-2xl border-2 border-sky-tint bg-white p-5 shadow-card hover:border-splash-blue"
                >
                  <span className="block font-bold text-deep-blue">{post.title}</span>
                  <span className="mt-1 block text-sm text-ink/70">{post.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>

          {siblingCollection ? (
            <p className="mt-6 text-center">
              <Link
                href={siblingCollection.href}
                className="font-bold text-splash-blue-ink underline underline-offset-4"
              >
                Browse every {siblingCollection.name.toLowerCase()} we carry →
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 ? (
        <section className="bg-sky-tint/50 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading eyebrow="You might also like">Related Water Slides</SectionHeading>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {toCardDataList(related).map((item) => (
                <li key={item.slug}>
                  <ProductCard product={item} sizes="(min-width: 1024px) 380px, 92vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <StickyAddToCart product={cardData} />
      {/* Clearance so the sticky bar never covers the footer on mobile. */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  )
}
