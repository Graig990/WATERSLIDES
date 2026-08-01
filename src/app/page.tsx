import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Fan,
  Headphones,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from 'lucide-react'

import { HeroSlider, type HeroSlide } from '@/components/home/HeroSlider'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { VideoFacade } from '@/components/home/VideoFacade'
import { NewsletterForm } from '@/components/layout/NewsletterForm'
import { ProductCard } from '@/components/product/ProductCard'
import { Bubbles } from '@/components/ui/Bubbles'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { getLatestPosts } from '@/data/blog'
import { heightCollections, topicCollections } from '@/data/collections'
import { getFeaturedProducts, productImageAlt, productsBySlug } from '@/data/products'
import { siteConfig } from '@/data/site'
import { buildMetadata } from '@/lib/seo'
import { videoSchema } from '@/lib/schema'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'Inflatable Water Slides for Sale | Free Shipping | WS4K',
  description:
    'Buy commercial-grade inflatable water slides for sale — 12ft to 19ft, 15oz PVC vinyl, blower included and free shipping sitewide. Shop 26 slides today.',
  path: '/',
})

const YOUTUBE_POSTER = `https://i.ytimg.com/vi/${siteConfig.video.id}/hqdefault.jpg`

/** Exactly the three slides called for in the brief. */
const HERO_SLUGS = [
  'tropical-breeze-15-dual-lane-waterslide',
  'pop-splash-dual-lane-combo-slide-pool',
  'block-party-19-dual-lane-water-slide-deep-pool',
] as const

const HERO_COPY: Record<(typeof HERO_SLUGS)[number], { headline: string; subhead: string }> = {
  'tropical-breeze-15-dual-lane-waterslide': {
    headline: 'Two Lanes. Zero Waiting.',
    subhead:
      'Splash into summer with the 15ft Tropical Breeze — it races two riders at once, so the queue never forms and the afternoon never stalls.',
  },
  'pop-splash-dual-lane-combo-slide-pool': {
    headline: 'Bounce. Climb. Race. Splash.',
    subhead:
      'One combo unit does the job of four attractions — and folds into a single storage bag when the summer ends.',
  },
  'block-party-19-dual-lane-water-slide-deep-pool': {
    headline: 'Nineteen Feet of Nope-Wait-Again.',
    subhead:
      'Our tallest dual-lane flagship, built for school field days, festivals, and rental fleets that want the headline unit.',
  },
}

const TRUST_ITEMS = [
  { Icon: Truck, title: 'Free Shipping', body: 'Every slide, every state, no minimum.' },
  { Icon: ShieldCheck, title: 'Commercial 15oz PVC', body: 'Quadruple-stitched seams, not big-box vinyl.' },
  { Icon: Headphones, title: 'US-Based Support', body: `Real people, ${siteConfig.hours}.` },
  { Icon: Fan, title: 'Blower Included', body: 'Sized to your unit. No separate purchase.' },
]

const WHY_BUY = [
  {
    Icon: ShieldCheck,
    title: 'The vinyl is the whole product',
    body: 'Every slide here is 15oz commercial PVC with quadruple-stitched seams — the same material rental companies run forty weekends a year. A big-box slide at a similar price is 6–9oz vinyl built for about twenty uses.',
  },
  {
    Icon: Wrench,
    title: 'Up in minutes, not hours',
    body: 'Unroll, stake, plug in one blower. Attached-pool slides stand up in three to four minutes; even our flagships are ten to fifteen. Nothing here needs a crew or a manual you have to study.',
  },
  {
    Icon: Ruler,
    title: 'Honest specs, honest stock',
    body: 'Every spec on this site is labelled for what it is, and pending supplier confirmation where it is. Out-of-stock means out of stock — no invented dates, no phantom inventory to capture your card.',
  },
  {
    Icon: Sparkles,
    title: 'No fake reviews. Ever.',
    body: 'You will not find invented testimonials, borrowed star ratings, or safety certifications we cannot produce paperwork for. When real reviews arrive, they go up. Until then, the space stays empty.',
  },
]

const SIZE_GUIDE = [
  {
    href: '/collections/13-ft-water-slides',
    range: '12–13 ft',
    who: 'Ages 3–9',
    body: 'Climbable without a boost, fits a narrow yard, and gets ridden until dinner.',
    accent: 'from-lime-pop/25 to-white',
  },
  {
    href: '/collections/15-ft-water-slides',
    range: '15–16 ft',
    who: 'Ages 5–12',
    body: 'Our best-selling bracket. Enough drop for older kids, still fits a quarter-acre lot.',
    accent: 'from-splash-blue/25 to-white',
  },
  {
    href: '/collections/17-ft-water-slides',
    range: '17 ft & up',
    who: 'Ages 6–13',
    body: 'Real speed, deep pools, two blowers. Check your overhead clearance before you fall in love.',
    accent: 'from-hot-coral/25 to-white',
  },
]

export default function HomePage() {
  const featured = getFeaturedProducts()
  const latestPosts = getLatestPosts(3)

  const heroSlides: HeroSlide[] = HERO_SLUGS.flatMap((slug) => {
    const product = productsBySlug.get(slug)
    if (!product) return []
    return [
      {
        ...HERO_COPY[slug],
        image: product.image,
        imageAlt: productImageAlt(product),
        href: `/shop/${product.slug}`,
      },
    ]
  })

  return (
    <>
      <JsonLd data={videoSchema(YOUTUBE_POSTER)} />

      {/* 2. Hero slider */}
      <HeroSlider slides={heroSlides} pageHeading="Inflatable Water Slides for Sale" />

      {/* 3. Trust bar */}
      <section aria-label="Why shop with us" className="bg-white py-8">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map(({ Icon, title, body }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-tint">
                <Icon aria-hidden="true" className="h-6 w-6 text-splash-blue-ink" />
              </span>
              <div>
                <p className="font-extrabold text-deep-blue">{title}</p>
                <p className="text-sm text-ink/70">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Shop by category */}
      <section className="bg-sky-tint/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Find your slide fast">Shop by Category</SectionHeading>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topicCollections.map((collection) => {
              const tile = productsBySlug.get(collection.tileProductSlug)
              return (
                <li key={collection.slug}>
                  <Link
                    href={collection.href}
                    className="card-tilt group block h-full overflow-hidden rounded-3xl border-2 border-white bg-white shadow-card"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden bg-sky-tint">
                      {tile ? (
                        <Image
                          src={tile.image}
                          alt={`${collection.name} — ${productImageAlt(tile)}`}
                          fill
                          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </span>
                    <span className="block p-4">
                      <span className="block text-lg font-bold text-deep-blue">
                        {collection.name}
                      </span>
                      <span className="mt-1 block text-sm text-ink/70">{collection.tagline}</span>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold text-splash-blue-ink">
                        Shop now
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* 5. Best sellers */}
      <section id="best-sellers" className="scroll-mt-32 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Our ten most popular">Best-Selling Water Slides</SectionHeading>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => (
              <li key={product.slug}>
                <ProductCard product={product} priority={index < 2} />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <ButtonLink href="/shop" size="lg">
              View All Water Slides
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 6. Video */}
      <WaveDivider color="blue" />
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-splash-blue to-deep-blue py-16">
        <Bubbles className="opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="60 seconds, no sales pitch" tone="light">
            See It Splash — Watch Our Slides in Action
          </SectionHeading>

          <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[420px_1fr]">
            <div className="mx-auto w-full max-w-[420px]">
              <VideoFacade
                embedUrl={siteConfig.video.embedUrl}
                posterUrl={YOUTUBE_POSTER}
                title={siteConfig.video.title}
              />
            </div>

            <div className="text-white">
              <p className="leading-relaxed">
                Photographs flatten a water slide. They cannot show you how fast the lane actually
                runs once the hose is on, how much water the splash pool throws, or how quickly the
                whole thing stands up from a bag. The clip walks through a commercial-grade slide
                from unrolled vinyl to riders going down it.
              </p>
              <ul className="droplet-list mt-5 [&>li::before]:bg-sunny-yellow">
                <li>The blower runs the entire session — these are constant-airflow units.</li>
                <li>Riders climb the front wall and come down the lane, never crossing paths.</li>
                <li>A few inches of water in the basin is what slows a rider down. That is all it needs.</li>
              </ul>
              <ButtonLink href="/shop" variant="primary" className="mt-6">
                Shop the slides in this video
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <WaveDivider color="white" className="-mt-px bg-deep-blue" />

      {/* 7. Why buy from us */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="What you get that you would not elsewhere">
            Why Buy From Us
          </SectionHeading>
          <ul className="grid gap-6 md:grid-cols-2">
            {WHY_BUY.map(({ Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-4 rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white shadow-card">
                  <Icon aria-hidden="true" className="h-7 w-7 text-splash-blue-ink" />
                </span>
                <div>
                  <h3 className="text-lg">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink/80">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Size guide teaser */}
      <section className="bg-sky-tint/60 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Measure once, buy once">
            Which Slide Fits Your Yard?
          </SectionHeading>
          <ul className="grid gap-6 md:grid-cols-3">
            {SIZE_GUIDE.map((tier) => (
              <li key={tier.href}>
                <Link
                  href={tier.href}
                  className={`card-tilt block h-full rounded-3xl border-2 border-white bg-gradient-to-b ${tier.accent} p-6 shadow-card`}
                >
                  <span className="block text-3xl font-bold text-deep-blue">{tier.range}</span>
                  <span className="mt-1 block text-sm font-extrabold tracking-wide text-hot-coral uppercase">
                    {tier.who}
                  </span>
                  <span className="mt-3 block leading-relaxed text-ink/80">{tier.body}</span>
                  <span className="mt-4 inline-flex items-center gap-1 font-extrabold text-splash-blue-ink">
                    See these slides
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link
              href="/blog/best-inflatable-water-slide-buyers-guide"
              className="font-bold text-splash-blue-ink underline underline-offset-4"
            >
              Read the full buyer’s guide — height, lanes, pools and vinyl explained
            </Link>
          </p>
        </div>
      </section>

      {/* 9. Latest from the blog */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Decision content, not filler">Latest From the Blog</SectionHeading>
          <ul className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => {
              const image = productsBySlug.get(post.featureProductSlug)
              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="card-tilt group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-sky-tint bg-white shadow-card"
                  >
                    <span className="relative block aspect-[16/9] overflow-hidden bg-sky-tint">
                      {image ? (
                        <Image
                          src={image.image}
                          alt=""
                          aria-hidden="true"
                          fill
                          sizes="(min-width: 768px) 380px, 92vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </span>
                    <span className="flex flex-1 flex-col p-5">
                      <span className="mb-2 inline-flex w-fit rounded-full bg-grape/15 px-3 py-1 text-xs font-extrabold text-grape-ink uppercase">
                        {post.category}
                      </span>
                      <span className="block text-lg leading-snug font-bold text-deep-blue">
                        {post.title}
                      </span>
                      <span className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                        {post.excerpt}
                      </span>
                      <span className="mt-4 text-xs text-ink/55">
                        {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-10 text-center">
            <ButtonLink href="/blog" variant="ghost">
              Read all guides
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 10. Reviews */}
      <ReviewsSection />

      {/* 11. Newsletter */}
      <section className="relative isolate overflow-hidden bg-hot-coral py-14">
        <Bubbles className="opacity-25" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-6 px-4 md:grid-cols-2">
          <div className="text-white">
            <h2 className="text-3xl text-white sm:text-4xl">{siteConfig.newsletterOffer}</h2>
            <p className="mt-3 text-white/90">
              One email when we drop a new slide, restock a sold-out unit, or publish a guide worth
              your time. That is the whole list.
            </p>
          </div>
          <NewsletterForm variant="band" />
        </div>
      </section>

      {/* SEO copy — deliberately below the grid so products stay above the fold */}
      <section className="bg-white py-16">
        <div className="prose-splash mx-auto max-w-3xl px-4">
          <h2>Inflatable Water Slides for Sale — What to Know Before You Buy</h2>
          <p>
            An inflatable water slide is the rare purchase where the expensive option is usually the
            cheaper one. The market splits cleanly in two: consumer units built from 6 to 9oz PVC
            and engineered for roughly twenty uses, and commercial units built from 15oz PVC with
            quadruple-stitched seams that rental operators run forty weekends a season. Everything
            we sell is the second kind, and the reason is arithmetic rather than snobbery — a cheap
            slide replaced every second summer costs more across five years than a good one bought
            once, and it fails at a seam, mid-party, with a garden full of children waiting.
          </p>
          <p>
            Beyond material, four decisions determine whether you end up with the right slide.
            Height decides who will actually use it. Lane count decides how fast the queue moves.
            Pool type decides how many months a year the slide earns its keep. And your site — the
            ground you have and, more often the blocker, the sky above it — decides which of those
            options are available to you at all.
          </p>

          <h3>Start with height, and be honest about your riders</h3>
          <p>
            The most common mistake in this category is buying taller than the household will use.
            A nineteen-foot slide is genuinely impressive and it is also a long climb, and for a
            six-year-old the climb is work. Parents report the same pattern constantly: the tall
            slide gets ridden four times and abandoned, the shorter one runs until dinner. Match the
            height to your youngest regular rider unless the oldest is the only one who matters.
          </p>
          <p>
            As a rough map, our{' '}
            <Link href="/collections/13-ft-water-slides">12–13ft slides</Link> suit ages three to
            nine and fit yards nothing else will. The{' '}
            <Link href="/collections/15-ft-water-slides">15–16ft bracket</Link> is where most
            families land and where the widest choice sits. Our{' '}
            <Link href="/collections/17-ft-water-slides">17ft units</Link> are what professional
            rental fleets standardise on, and{' '}
            <Link href="/collections/19-ft-and-taller-water-slides">19ft and taller</Link> is event
            equipment rather than a backyard purchase.
          </p>

          <h3>Then check the sky, not just the lawn</h3>
          <p>
            Overhead clearance disqualifies more residential sites than ground area does, and almost
            nobody checks it before ordering. Mature tree canopy, gutters, floodlights, and the
            overhead service drop from the street all occupy the airspace a slide needs. Walk out to
            where the slide will actually stand — not the patio — and look straight up. A slide that
            rubs a branch every time it shifts in the wind wears through the vinyl long before the
            seams give out.
          </p>
          <p>
            While you are out there, work out where the water goes. Every landing pool drains
            eventually, and several hundred gallons has to end up somewhere that is not your
            foundation or your neighbour&rsquo;s lawn. Site the unit so the drain plug faces downhill.
          </p>

          <h3>One lane or two</h3>
          <p>
            A single lane is wider and more forgiving — riders who go down sideways or off-centre
            have room, which matters for hesitant young children. A{' '}
            <Link href="/collections/dual-lane-water-slides">dual lane slide</Link> changes the
            social dynamic rather than merely doubling capacity: two lanes turn a queue into a race,
            and children self-organise into heats instead of standing in line. The practical
            crossover sits somewhere around eight to ten simultaneous riders.
          </p>

          <h3>Attached pool or detachable</h3>
          <p>
            An attached pool is one continuous inflated chamber with the slide body. Nothing to
            align, nothing to assemble, and no detach seam — which is the joint that gets stressed
            on every fit and removal and the first place a hard-used slide starts to weep. Those
            units set up fastest, in three to four minutes.
          </p>
          <p>
            A detachable pool buys you a second product. Take it off and the slide runs dry onto a
            landing mat, which opens up indoor events, fall festivals, and school days when nobody
            wants to be soaked. For a family that is two or three extra months of use a year; for a{' '}
            <Link href="/blog/how-to-start-a-water-slide-rental-business">rental operator</Link> it
            is a second listing at no extra inventory cost.
          </p>

          <h3>Blowers, power, and the mistake everyone makes</h3>
          <p>
            These are constant-airflow inflatables. The blower runs for the whole session — there is
            no inflate-and-unplug mode — and every slide we sell ships with one sized for that unit.
            The larger flagships and combos need two or more blowers, and those blowers need
            genuinely separate circuits. Two outlets on the same circuit is the single most common
            reason a big inflatable fails to stand up on delivery day, and it takes five minutes of
            planning to avoid. Our{' '}
            <Link href="/blog/water-slide-blower-size">blower sizing guide</Link> covers how to work
            out what you need before the unit arrives rather than after.
          </p>

          <h3>What actually determines lifespan</h3>
          <p>
            Not the price you paid. The drying routine. Vinyl put away damp grows mildew that etches
            the coating, stains permanently, smells, and voids most warranties — and it is the
            leading cause of premature failure by a wide margin. Twenty minutes of drying before the
            slide goes into the bag is the difference between three seasons and ten, and it costs
            nothing but patience. We wrote the{' '}
            <Link href="/blog/how-to-clean-and-store-an-inflatable-water-slide">
              full cleaning and storage routine
            </Link>{' '}
            up separately because it is the highest-leverage thing an owner controls.
          </p>
          <p>
            Anchoring is the other non-negotiable. Every unit ships with stakes and tether ropes,
            and they are the difference between an inflatable and a very large kite. On hard
            surfaces, ballast replaces stakes at every anchor point plus a tarp underneath. Never
            operate an unanchored inflatable, and shut down and deflate before weather arrives
            rather than during it — the{' '}
            <Link href="/blog/inflatable-water-slide-safety-checklist">safety checklist</Link> walks
            through the wind rule and supervision ratios.
          </p>

          <h3>Ready to choose?</h3>
          <p>
            All {26} slides are on <Link href="/shop">the shop page</Link> with filters for height,
            lanes, pool type and availability. If you would rather talk it through, call{' '}
            <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a> — we would genuinely
            rather point you at a smaller slide you will use than sell you a bigger one you will
            not.
          </p>
        </div>
      </section>

      {/* Height collection links — keeps the hub-and-spoke cluster crawlable */}
      <section className="bg-sky-tint/60 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-6 text-2xl">Shop Water Slides by Height</h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {heightCollections.map((collection) => (
              <li key={collection.slug}>
                <Link
                  href={collection.href}
                  className="inline-flex min-h-[44px] items-center rounded-2xl border-2 border-deep-blue bg-white px-5 font-bold text-deep-blue hover:bg-deep-blue hover:text-white"
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
