import Link from 'next/link'
import type { Metadata } from 'next'
import { InfoPage } from '@/components/layout/InfoPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Shipping & Delivery | WaterSlides4Kids',
  description:
    'Free shipping sitewide with no minimum. Dispatch in 1–3 business days, 3–10 in transit, freight delivery explained — including what happens with Alaska and Hawaii.',
  path: '/shipping',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Shipping & Delivery', href: '/shipping' },
]

export default function ShippingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <InfoPage
        title="Shipping & Delivery"
        intro="Free shipping on every slide, to every state in the contiguous US, with no order minimum. It is already in the price you see."
        crumbs={CRUMBS}
      >
        <h2>How long it takes</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">Timing</th>
                <th scope="col">What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Processing</th>
                <td>1–3 business days</td>
                <td>We pick, inspect and pack your unit with its blower, stakes, bag and patch kit.</td>
              </tr>
              <tr>
                <th scope="row">Transit</th>
                <td>3–10 business days</td>
                <td>Varies by distance. West coast to east coast sits at the longer end.</td>
              </tr>
              <tr>
                <th scope="row">Freight scheduling</th>
                <td>Adds 1–3 days</td>
                <td>Larger units ship by freight; the carrier calls you to arrange a window.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Tracking is emailed the moment your order leaves us. If it has been more than three
          business days and you have not seen tracking, contact us — that usually means something
          needs a nudge rather than that something is wrong.
        </p>

        <h2>Why we ask for a phone number</h2>
        <p>
          Every slide we sell weighs between roughly 180 and 690 pounds boxed. The bigger units move
          by freight rather than parcel, and freight carriers will not deliver without calling
          first to arrange a time. A missing or wrong phone number is the single most common cause
          of a delayed delivery on an order that shipped on schedule.
        </p>

        <h2>What arrives</h2>
        <p>
          One carton per slide, containing the vinyl, the blower sized for that unit, ground stakes
          and tether ropes, a storage bag and a repair patch kit, plus the manufacturer&rsquo;s setup
          and safe-operation instructions. Nothing is sold separately — there is no version of an
          order where the air costs extra.
        </p>
        <p>
          Inspect the carton before the driver leaves. If there is visible damage, note it on the
          delivery paperwork and photograph it. That note is what makes a freight damage claim
          straightforward instead of a negotiation, and it is covered in more detail on the{' '}
          <Link href="/returns">returns page</Link>.
        </p>

        <h2>Alaska, Hawaii, and outside the US</h2>
        <p>
          Free shipping covers the contiguous 48 states. We do ship to Alaska and Hawaii, but
          freight to both is genuinely expensive and varies too much to bury in a flat rate. Place
          your order as normal and we will contact you with an exact quote before charging anything
          additional — and if it is more than you want to pay, we will cancel and refund in full, no
          argument.
        </p>
        <p>
          We do not currently ship outside the United States. Delivery to a PO box is not possible
          for any unit in our catalog.
        </p>

        <h2>Expedited shipping</h2>
        <p>
          Choosing expedited at checkout prioritises your order for dispatch where stock allows. It
          does not change the carrier&rsquo;s transit time, so it typically saves a day or two
          rather than a week. If you are buying for a fixed date, tell us the date and we will give
          you an honest read on whether it is achievable rather than an optimistic one.
        </p>

        <h2>Pre-order items</h2>
        <p>
          A pre-order unit is reserved from the next inbound container at the price shown. We do not
          charge a premium for reserving. What we cannot do is promise a date we do not have —
          contact us before reserving if you need it for a specific event and we will tell you what
          we actually know.
        </p>

        <h2>Questions about a specific order</h2>
        <p>
          Call <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a> ({siteConfig.hours}) or
          email <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> with your
          order number and we will chase the carrier for you.
        </p>
      </InfoPage>
    </>
  )
}
