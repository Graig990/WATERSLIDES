import Link from 'next/link'
import type { Metadata } from 'next'
import { InfoPage } from '@/components/layout/InfoPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service | WaterSlides4Kids',
  description:
    'The terms covering purchases from WaterSlides4Kids — orders and pricing, product specifications, your safe-use responsibilities, warranty, returns and liability.',
  path: '/terms',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Terms of Service', href: '/terms' },
]

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <InfoPage
        title="Terms of Service"
        intro="The agreement between you and WaterSlides4Kids when you buy from this site."
        crumbs={CRUMBS}
        updated="August 1, 2026"
      >
        <p className="rounded-2xl bg-hot-coral/12 p-4 text-sm">
          <strong>Template — have this reviewed before you launch.</strong> These terms are a
          starting point, not legal advice, and they have not been reviewed by an attorney. Because
          you are selling children&rsquo;s recreational equipment, the liability, safe-use and
          indemnity sections in particular deserve professional review. Update the governing-law
          section and the business details in <code>src/data/site.ts</code> before going live.
        </p>

        <h2>1. Agreement</h2>
        <p>
          By using this site or placing an order you agree to these terms. If you do not agree,
          please do not use the site.
        </p>

        <h2>2. Products and specifications</h2>
        <p>
          Product photographs are representative; colours vary between production runs and between
          screens. <strong>All specifications currently shown on this site are labelled as example
          values pending supplier confirmation</strong> and must not be relied upon as final. The
          documentation shipped with your unit is the governing specification, particularly for
          rider weight limits, rider capacity and age range.
        </p>
        <p>
          We do not claim any safety certification, test result or compliance mark that is not
          explicitly documented in the paperwork supplied with your unit.
        </p>

        <h2>3. Orders and pricing</h2>
        <p>
          Prices are in US dollars and include free shipping to the contiguous United States. We may
          correct pricing errors and cancel affected orders with a full refund. Placing an order is
          an offer to buy; our acceptance occurs when we dispatch the goods.
        </p>
        <p>
          Where an item is shown as out of stock and priced &ldquo;Call for Availability&rdquo;, no
          price is being offered and no order can be placed for that item.
        </p>

        <h2>4. Safe use — your responsibilities</h2>
        <p>
          Inflatable water slides carry inherent risk. By purchasing you accept responsibility for:
        </p>
        <ul className="droplet-list">
          <li>Reading and following the manufacturer&rsquo;s setup and operating instructions.</li>
          <li>
            Anchoring the unit at every anchor point, on every use, without exception — stakes on
            grass, ballast on hard surfaces.
          </li>
          <li>
            Providing continuous competent adult supervision whenever the unit is in use, and more
            than one supervisor where the unit has separate zones.
          </li>
          <li>Observing the stated rider weight limits, capacity limits and age range.</li>
          <li>
            Ceasing operation and deflating in high wind, lightning, or any weather the
            manufacturer&rsquo;s documentation identifies as unsafe.
          </li>
          <li>
            Determining and complying with any permit, inspection or insurance requirements that
            apply where you are — see our{' '}
            <Link href="/blog/inflatable-water-slide-permit-guide">general permit overview</Link>,
            which is not a substitute for checking with your own jurisdiction.
          </li>
        </ul>

        <h2>5. Commercial and rental use</h2>
        <p>
          If you operate a unit commercially you are responsible for your own liability insurance,
          any state or municipal registration and inspection requirements, and the training of your
          staff. Requirements differ substantially between states.
        </p>

        <h2>6. Warranty</h2>
        <p>
          Warranty coverage is set out on the <Link href="/warranty">warranty page</Link> and in the
          documentation supplied with your unit. Except as stated there, and to the fullest extent
          permitted by law, products are supplied without further warranties of any kind.
        </p>

        <h2>7. Returns</h2>
        <p>
          Returns are governed by our <Link href="/returns">returns and refunds policy</Link>, which
          forms part of these terms.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by applicable law, our total liability arising from any
          order is limited to the amount you paid for the product concerned. We are not liable for
          indirect or consequential losses. Nothing in these terms excludes liability that cannot
          lawfully be excluded, including liability for death or personal injury caused by
          negligence.
        </p>

        <h2>9. Intellectual property</h2>
        <p>
          Site content, the WaterSlides4Kids name and the logo are our property and may not be
          reproduced without permission.
        </p>

        <h2>10. Governing law</h2>
        <p>
          {/* TODO: set your actual state of incorporation and venue with counsel. */}
          These terms are governed by the laws of the state in which {siteConfig.legalName} is
          established, without regard to conflict-of-law principles.
        </p>

        <h2>11. Changes</h2>
        <p>
          We may update these terms; the date at the top of this page reflects the current version.
          Orders are governed by the terms in force when the order was placed.
        </p>

        <h2>12. Contact</h2>
        <p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ·{' '}
          <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a> · {siteConfig.hours}
        </p>
      </InfoPage>
    </>
  )
}
