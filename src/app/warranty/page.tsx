import Link from 'next/link'
import type { Metadata } from 'next'
import { InfoPage } from '@/components/layout/InfoPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Warranty | WaterSlides4Kids',
  description:
    'What our inflatable water slide warranty covers, what it does not, and the one maintenance habit that voids more claims than anything else.',
  path: '/warranty',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Warranty', href: '/warranty' },
]

export default function WarrantyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <InfoPage
        title="Warranty"
        intro="Every slide we sell carries a one-year warranty against seam and stitching defects from the date of delivery."
        crumbs={CRUMBS}
      >
        <p className="rounded-2xl bg-sunny-yellow/25 p-4 text-sm">
          <strong>Please read the terms shipped with your unit.</strong> Warranty administration for
          these products sits with the manufacturer, and the documentation in your carton is the
          governing document. The summary below describes how we handle claims in practice — where
          the two differ, the manufacturer&rsquo;s terms apply.
        </p>

        <h2>What is covered</h2>
        <ul className="droplet-list">
          <li>Seam separation and stitching failure under normal, correctly-supervised use.</li>
          <li>Manufacturing defects in the vinyl panels present on arrival.</li>
          <li>Blower failure within the manufacturer&rsquo;s stated blower warranty period.</li>
          <li>Missing components from a sealed carton — tell us within 7 days of delivery.</li>
        </ul>

        <h2>What is not covered</h2>
        <ul className="droplet-list">
          <li>
            <strong>Mildew and mould damage.</strong> This is the big one. Vinyl stored damp grows
            mildew that etches the PVC coating permanently. It is the most common cause of premature
            failure on inflatables and it is the most common reason a claim is declined — because it
            is preventable with twenty minutes of drying.
          </li>
          <li>Punctures, tears and abrasion from ground debris, pets, branches or sharp objects.</li>
          <li>
            Damage from operating in wind above the manufacturer&rsquo;s stated limit, or from
            operating the unit unanchored.
          </li>
          <li>Damage from exceeding the stated rider weight limit or rider capacity.</li>
          <li>UV fading and general cosmetic wear over time.</li>
          <li>Damage caused by cleaning with bleach, solvents or a pressure washer.</li>
          <li>Commercial rental use beyond what the manufacturer&rsquo;s terms allow — check yours.</li>
        </ul>

        <h2>The habit that protects your warranty</h2>
        <p>
          Dry the slide completely before it goes into the bag. Every time, without exception. Not
          &ldquo;mostly dry&rdquo; and not &ldquo;dry by tomorrow&rdquo; — completely dry, inflated,
          in moving air. It takes about twenty minutes and it is the difference between a slide that
          lasts three seasons and one that lasts ten. Our{' '}
          <Link href="/blog/how-to-clean-and-store-an-inflatable-water-slide">
            cleaning and storage guide
          </Link>{' '}
          walks through the whole routine including what to do if mildew has already started.
        </p>

        <h2>How to make a claim</h2>
        <ol>
          <li>
            Photograph the problem area clearly, plus one wide shot showing the whole unit inflated.
          </li>
          <li>
            Email <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> with
            your order number, the photographs, and a short description of when the fault appeared
            and what the unit was being used for.
          </li>
          <li>
            We review and respond within one business day. Straightforward seam claims are usually
            resolved without the unit needing to come back.
          </li>
        </ol>

        <h2>Repairs outside warranty</h2>
        <p>
          A puncture is not a disaster. Every slide ships with a repair patch kit, and small
          punctures patched promptly hold for years — vinyl repair is genuinely durable when done on
          a clean, dry surface. If the damage is beyond a patch, contact us before buying a
          replacement and we will tell you honestly whether a repair is worth it.
        </p>

        <p>
          Questions? Call <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a> during{' '}
          {siteConfig.hours}.
        </p>
      </InfoPage>
    </>
  )
}
