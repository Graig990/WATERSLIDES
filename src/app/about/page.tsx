import Link from 'next/link'
import type { Metadata } from 'next'
import { InfoPage } from '@/components/layout/InfoPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/data/site'
import { products } from '@/data/products'

export const metadata: Metadata = buildMetadata({
  title: 'About Us | WaterSlides4Kids',
  description:
    'Who we are, why we only sell commercial-grade 15oz vinyl slides, and the things we refuse to do — fake reviews, invented specs and phantom stock among them.',
  path: '/about',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <InfoPage
        title="About WaterSlides4Kids"
        intro="We sell commercial-grade inflatable water slides to families and rental operators across the United States. That is the whole business."
        crumbs={CRUMBS}
      >
        <h2>Why we only stock commercial grade</h2>
        <p>
          There are two kinds of inflatable water slide on the market, and the price tags overlap
          enough that most buyers never realise it. Consumer units are built from 6 to 9oz PVC with
          double-stitched seams and are engineered for roughly twenty uses. Commercial units are
          15oz PVC, quadruple-stitched, with reinforced stress points, and they are what rental
          companies put through forty weekends a year.
        </p>
        <p>
          We only carry the second kind. Not because it is a nicer thing to sell, but because the
          arithmetic favours the buyer: a cheap slide replaced every second summer costs more across
          five years than a good one bought once — and it fails at a seam, mid-party, with a garden
          full of children waiting. All {products.length} slides in our catalog are built to the
          same material standard. Price differences come from size, lane count and pool
          configuration, never from a thinner grade of vinyl.
        </p>

        <h2>What we will not do</h2>
        <p>
          This industry has some bad habits, and it is easier to say plainly what we avoid than to
          claim a set of virtues.
        </p>
        <ul className="droplet-list">
          <li>
            <strong>No invented reviews or star ratings.</strong> Our reviews section is empty
            because no customer has sent one in yet. When they do, they go up — tied to real orders.
            Until then the space stays blank, and we emit no rating markup to search engines.
          </li>
          <li>
            <strong>No fabricated safety certifications.</strong> We do not claim test results or
            compliance marks we cannot produce paperwork for. If a listing does not mention a
            certification, assume we do not hold documentation for it.
          </li>
          <li>
            <strong>No phantom inventory.</strong> Out of stock means out of stock. You will see
            &ldquo;Call for Availability&rdquo; and an honest note rather than an invented restock
            date designed to capture your card details.
          </li>
          <li>
            <strong>No spec-sheet guesswork presented as fact.</strong> Every specification on this
            site is currently labelled as an example pending supplier confirmation, because that is
            what it is. Always follow the documentation that ships with your unit.
          </li>
        </ul>

        <h2>How we help you choose</h2>
        <p>
          Most of what we do is talk people out of buying too much slide. The single most common
          mistake in this category is buying taller than the household will use — a nineteen-foot
          slide is a long climb, and a six-year-old will ride it four times and go inside. We would
          genuinely rather sell you a 13-footer you use every weekend than a flagship that
          disappoints.
        </p>
        <p>
          If you want the reasoning rather than a recommendation, the{' '}
          <Link href="/blog/best-inflatable-water-slide-buyers-guide">buyer&rsquo;s guide</Link>{' '}
          walks through height, lane count, pool type and vinyl weight in the order they matter. If
          you are buying to rent, the{' '}
          <Link href="/blog/how-to-start-a-water-slide-rental-business">
            rental business guide
          </Link>{' '}
          has the payback math with realistic numbers rather than optimistic ones.
        </p>

        <h2>Buying for a rental business</h2>
        <p>
          A meaningful share of what we ship goes to rental operators, and their requirements differ
          from a family&rsquo;s: throughput matters more than novelty, neutral themes book more
          weekends than character units, and a detachable pool doubles as a second listing in the
          off-season. Talk to us before placing a multi-unit order — there are combinations that
          work considerably better as a fleet than as individual purchases.
        </p>

        <h2>Talk to a person</h2>
        <p>
          Call <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a> during{' '}
          {siteConfig.hours}, email{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>, or use the{' '}
          <Link href="/contact">contact form</Link>. We answer within one business day, and the
          person replying has actually set these units up.
        </p>
      </InfoPage>
    </>
  )
}
