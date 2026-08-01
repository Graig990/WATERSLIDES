import Link from 'next/link'
import type { Metadata } from 'next'
import { InfoPage } from '@/components/layout/InfoPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Returns & Refunds | WaterSlides4Kids',
  description:
    '30-day returns on unused inflatable water slides, how damaged deliveries are handled, and exactly what to do at the door to make a freight claim simple.',
  path: '/returns',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Returns & Refunds', href: '/returns' },
]

export default function ReturnsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <InfoPage
        title="Returns & Refunds"
        intro="Thirty days to return an unused slide in its original packaging. Damaged or wrong on arrival is on us, entirely."
        crumbs={CRUMBS}
      >
        <h2>The short version</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Situation</th>
                <th scope="col">What happens</th>
                <th scope="col">Who pays return shipping</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Arrived damaged</th>
                <td>Replacement or full refund, your choice</td>
                <td>Us</td>
              </tr>
              <tr>
                <th scope="row">Wrong item sent</th>
                <td>Correct unit shipped immediately</td>
                <td>Us</td>
              </tr>
              <tr>
                <th scope="row">Changed your mind, unused</th>
                <td>Full refund within 30 days</td>
                <td>You</td>
              </tr>
              <tr>
                <th scope="row">Used or set up outdoors</th>
                <td>Not returnable</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Damaged on arrival — do this at the door</h2>
        <p>
          Freight damage is rare but it does happen, and thirty seconds at the door decides whether
          the claim is trivial or painful:
        </p>
        <ol>
          <li>Look at the carton before the driver leaves. Crushing, tears, water staining.</li>
          <li>
            <strong>Write the damage on the delivery paperwork before you sign.</strong> &ldquo;Carton
            torn on one side&rdquo; is enough. Signing clean paperwork for a damaged carton is what
            makes claims difficult.
          </li>
          <li>Photograph the carton before opening it, then the contents after.</li>
          <li>
            Email <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> with
            your order number and the photographs within 7 days.
          </li>
        </ol>
        <p>
          We will ship a replacement or refund you in full, whichever you prefer, and we arrange
          collection of the damaged unit at our cost. You do not need to negotiate with the carrier
          — that is our job.
        </p>

        <h2>Changed your mind</h2>
        <p>
          You have 30 days from delivery. The unit must be unused, unopened where possible, and in
          its original packaging with all components — blower, stakes, ropes, bag and patch kit.
          Contact us for a return authorisation before shipping anything back; unauthorised returns
          are difficult to match to an order and slow your refund down.
        </p>
        <p>
          Return shipping on a change-of-mind return is your responsibility, and it is worth being
          upfront that this is not cheap: these are heavy freight items and return shipping can run
          to a few hundred dollars on the larger units. That is precisely why we would rather spend
          fifteen minutes on the phone before you order than process a return afterwards. Call{' '}
          <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a> and describe your yard.
        </p>

        <h2>Why a used slide cannot come back</h2>
        <p>
          Once a slide has been set up outdoors it has been on grass or concrete, has had water
          through it, and cannot be resold as new. We are not able to accept it back, and we would
          not want to sell you a unit somebody else had already run. This is standard across the
          industry and it is the reason sizing correctly the first time matters so much — the{' '}
          <Link href="/blog/best-inflatable-water-slide-buyers-guide">buyer&rsquo;s guide</Link>{' '}
          exists to prevent exactly this situation.
        </p>
        <p>
          If the unit is faulty rather than unwanted, that is a warranty matter and there is no
          such restriction — see the <Link href="/warranty">warranty page</Link>.
        </p>

        <h2>Refund timing</h2>
        <p>
          Refunds are issued to the original payment method once the returned unit arrives and is
          inspected, typically within 3–5 business days of receipt. Your bank may take a few more
          days to show it. For damaged-on-arrival claims we refund as soon as the claim is agreed —
          we do not wait for the unit to come back.
        </p>

        <h2>Cancellations</h2>
        <p>
          Order not shipped yet? Call or email and we will cancel and refund in full, no questions.
          Once a freight shipment is in motion it has to be treated as a return.
        </p>
      </InfoPage>
    </>
  )
}
