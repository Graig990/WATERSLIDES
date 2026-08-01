import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { LogoIcon } from '@/components/ui/Logo'
import { Bubbles } from '@/components/ui/Bubbles'
import { topicCollections } from '@/data/collections'
import { getFeaturedProducts, toCardDataList } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { siteConfig } from '@/data/site'

export default function NotFound() {
  const popular = toCardDataList(getFeaturedProducts().slice(0, 4))

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-splash-blue to-sky-tint py-16">
        <Bubbles className="opacity-60" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <LogoIcon size={96} className="mx-auto mb-6" />
          <p className="text-6xl font-bold text-white drop-shadow-[0_2px_8px_rgba(26,35,64,0.35)] sm:text-7xl">
            404
          </p>
          <h1 className="mt-3 text-3xl text-white drop-shadow-[0_2px_8px_rgba(26,35,64,0.35)] sm:text-4xl">
            That page slid right off the page
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-white drop-shadow-[0_1px_6px_rgba(26,35,64,0.45)]">
            The link you followed does not lead anywhere. The slides, though, are all still here.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/shop" size="lg">
              Shop All Water Slides
            </ButtonLink>
            <ButtonLink href="/" variant="outline-white" size="lg">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-2xl">Try one of these instead</h2>
          <ul className="mb-10 flex flex-wrap justify-center gap-3">
            {topicCollections.map((collection) => (
              <li key={collection.slug}>
                <Link
                  href={collection.href}
                  className="inline-flex min-h-[44px] items-center rounded-2xl border-2 border-deep-blue bg-white px-5 font-bold text-deep-blue hover:bg-deep-blue hover:text-white"
                >
                  {collection.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="inline-flex min-h-[44px] items-center rounded-2xl border-2 border-grape bg-white px-5 font-bold text-grape-ink hover:bg-grape hover:text-white"
              >
                Buying Guides
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center rounded-2xl border-2 border-hot-coral bg-white px-5 font-bold text-hot-coral hover:bg-hot-coral hover:text-white"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          <h2 className="mb-6 text-center text-2xl">Our best sellers</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-ink/70">
            Looking for something specific? Call{' '}
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="font-bold text-splash-blue-ink underline"
            >
              {siteConfig.phone}
            </a>{' '}
            — {siteConfig.hours}.
          </p>
        </div>
      </section>
    </>
  )
}
