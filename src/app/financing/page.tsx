import Link from 'next/link'
import type { Metadata } from 'next'
import { InfoPage } from '@/components/layout/InfoPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Financing & Lease-to-Own | WaterSlides4Kids',
  description:
    'Payment options for commercial inflatable water slides, how rental operators think about financing a unit, and the payback math to run before you borrow.',
  path: '/financing',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Financing', href: '/financing' },
]

export default function FinancingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <InfoPage
        title="Financing & Lease-to-Own"
        intro="Spreading the cost of a commercial slide — what is available, what to watch for, and how to work out whether borrowing makes sense for your situation."
        crumbs={CRUMBS}
      >
        <p className="rounded-2xl bg-sunny-yellow/25 p-4 text-sm">
          <strong>We are not financial advisers</strong>, and nothing on this page is financial
          advice. It describes payment options and the arithmetic involved so you can have a better
          conversation with a lender or your accountant.
        </p>

        <h2>What we currently offer</h2>
        <p>
          Checkout accepts all major cards, Apple Pay and Google Pay. Many buyers spreading the cost
          of a slide do it through their existing card issuer&rsquo;s instalment feature or a
          buy-now-pay-later option offered by their own bank, both of which are outside our
          checkout and entirely between you and them.
        </p>
        <p>
          <strong>Dedicated financing at checkout is not live yet.</strong> We would rather say that
          plainly than advertise a partner we have not signed.{' '}
          {/* TODO: integrate a financing provider (Affirm, Klarna, Shop Pay Installments,
              or a B2B equipment lender for the commercial tier) and replace this section. */}
          If it would change your decision, tell us — demand is what determines which provider we
          integrate and when.
        </p>

        <h2>Business purchases and equipment finance</h2>
        <p>
          If you are buying to rent, a slide is business equipment rather than a consumer purchase,
          and that opens up options a personal card does not: equipment finance, a small business
          line of credit, or lease-to-own through a specialist lender. Rates and terms vary widely,
          and an equipment lender who understands seasonal businesses will structure repayments very
          differently from a generic personal loan.
        </p>
        <p>
          Two things worth knowing before you approach a lender. First, the season is short, so a
          repayment schedule that assumes twelve months of even income will squeeze you in February.
          Second, the equipment itself is often acceptable as collateral, which can materially
          change the rate you are offered.
        </p>

        <h2>Run the payback math first</h2>
        <p>
          Borrowing to buy a rental unit is a reasonable decision when the unit pays for itself
          faster than the finance costs you. That calculation is entirely knowable in advance, and
          we set it out with realistic numbers — not optimistic ones — in the{' '}
          <Link href="/blog/how-to-start-a-water-slide-rental-business">
            water slide rental business guide
          </Link>
          . The short version: work out your realistic bookings per season, not your best weekend
          multiplied by twelve.
        </p>
        <p>
          The same guide covers the costs people forget when they build the model — liability
          insurance, a vehicle that can carry 300 to 700 pounds, cleaning time between bookings, and
          the storage space a unit occupies for eight months of the year.
        </p>

        <h2>The cheaper option nobody mentions</h2>
        <p>
          Buy less slide. A great deal of financing in this category funds the gap between the unit
          somebody needs and the unit they want. Our{' '}
          <Link href="/collections/13-ft-water-slides">12–13ft slides</Link> start at a fraction of
          the flagship price and are built from the identical 15oz commercial vinyl — for a
          household with young children they are frequently the better purchase outright, not just
          the cheaper one.
        </p>

        <h2>Talk it through</h2>
        <p>
          Call <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a> ({siteConfig.hours}) or{' '}
          <Link href="/contact">send us a message</Link>. For multi-unit orders there is usually
          more room to work with on terms than on a single slide.
        </p>
      </InfoPage>
    </>
  )
}
