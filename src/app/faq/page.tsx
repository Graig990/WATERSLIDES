import Link from 'next/link'
import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { breadcrumbSchema, faqSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/data/site'
import type { FaqItem } from '@/data/types'

export const metadata: Metadata = buildMetadata({
  title: 'Inflatable Water Slide FAQ | WaterSlides4Kids',
  description:
    'Answers on sizing, setup, blowers, safety, shipping and warranty for commercial inflatable water slides — including the questions people ask after they buy.',
  path: '/faq',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'FAQ', href: '/faq' },
]

const GROUPS: { heading: string; faqs: FaqItem[] }[] = [
  {
    heading: 'Choosing a slide',
    faqs: [
      {
        question: 'What size inflatable water slide should I buy?',
        answer:
          'Match the height to your youngest regular rider, not your oldest. Ages 3–9 are best served by a 12–13ft slide, ages 5–12 by a 15–16ft, and 17ft and up suits older kids and rental fleets. Buying taller than the household will use is the most common mistake in this category — the climb is work, and a tall slide often gets ridden four times and abandoned.',
      },
      {
        question: 'Is a dual lane water slide worth the extra money?',
        answer:
          'With two or more children close in age, or parties above roughly eight to ten kids, yes — two lanes turn a queue into a race and remove the waiting that causes most of the arguing. For an only child or small gatherings, a single lane is wider, more forgiving and cheaper.',
      },
      {
        question: 'Attached pool or detachable pool?',
        answer:
          'Attached pools set up faster and have no detach seam, which is the joint most likely to leak after heavy use. Detachable pools let the slide run dry for indoor and shoulder-season use, effectively giving you two products. Neither is better in the abstract.',
      },
      {
        question: 'What does 15oz PVC vinyl actually mean?',
        answer:
          'It is the weight of a square yard of the coated fabric. 15oz commercial PVC has a thicker base cloth and heavier coating than the 6–9oz vinyl used in big-box inflatables, which is why it survives repeated commercial use instead of about twenty outings.',
      },
    ],
  },
  {
    heading: 'Setup and power',
    faqs: [
      {
        question: 'How long does an inflatable water slide take to set up?',
        answer:
          'Three to four minutes for a single-lane slide with an attached pool. Add a couple of minutes for a detachable pool, six to twelve for a combo, and ten to fifteen for the 19ft flagships. The 45ft obstacle course needs twenty to thirty minutes and two people.',
      },
      {
        question: 'Does the blower run the whole time?',
        answer:
          'Yes. These are constant-airflow inflatables — the blower stays on for the entire session. There is no inflate-and-unplug mode, and every slide ships with a blower sized for that unit.',
      },
      {
        question: 'Can I run two blowers from one outlet?',
        answer:
          'No. Two blowers need two separate circuits, not two outlets on the same circuit. This is the single most common reason a large inflatable fails to stand up on delivery day, and it is entirely avoidable with five minutes of planning.',
      },
      {
        question: 'Can I set up an inflatable water slide on concrete?',
        answer:
          'Yes, using sandbags or ballast at every anchor point instead of stakes, plus a tarp underneath to protect the vinyl from abrasion. Never operate an unanchored inflatable on any surface.',
      },
      {
        question: 'How much water does it use?',
        answer:
          'A garden hose running at low pressure is enough — the lane needs a film of water, not a torrent, and the splash basin only needs a few inches. Turning the hose up wastes water without making the slide faster.',
      },
    ],
  },
  {
    heading: 'Safety and supervision',
    faqs: [
      {
        question: 'How many adults should supervise?',
        answer:
          'At least one adult watching continuously, positioned to see both the platform and the pool. A combo with a separate bounce chamber needs two, because one person cannot properly watch two zones. Supervision is not optional on any unit we sell.',
      },
      {
        question: 'What wind speed is too high?',
        answer:
          'Manufacturers commonly specify shutting down somewhere in the 15–25 mph range, and your unit’s own documentation governs. Deflate and secure before the weather arrives rather than during it — wind is the leading cause of serious inflatable incidents.',
      },
      {
        question: 'Do I need a permit for an inflatable water slide?',
        answer:
          'Private, non-commercial use on your own property is generally treated differently from public or commercial operation, but the rules are set locally and can also be affected by HOA covenants. Check with your local building or permitting office — we have a general overview but it is no substitute for asking your own jurisdiction.',
      },
      {
        question: 'Are the specs on your product pages confirmed?',
        answer:
          'Not yet. Every specification currently shown is labelled as an example representative of that class of slide, pending supplier confirmation. Always follow the documentation shipped with your unit, especially the weight limit and age range.',
      },
    ],
  },
  {
    heading: 'Ordering, shipping and after',
    faqs: [
      {
        question: 'Is shipping really free?',
        answer:
          'Yes, sitewide to the contiguous US with no order minimum, already included in the price shown. Alaska and Hawaii need a freight quote, which we provide before charging anything extra.',
      },
      {
        question: 'How long until it arrives?',
        answer:
          '1–3 business days to process, then 3–10 business days in transit depending on distance. Larger units ship by freight and the carrier calls to arrange a delivery window, which is why we ask for a phone number.',
      },
      {
        question: 'What does “Call for Availability” mean?',
        answer:
          'The unit is out of stock and we do not have a current confirmed price. Rather than display a stale figure or invent a restock date, we say so and let you join the notify list.',
      },
      {
        question: 'What is covered by the warranty?',
        answer:
          'One year against seam and stitching defects from delivery. Mildew damage from storing the slide damp is the most common exclusion — and the most preventable.',
      },
      {
        question: 'How long will a slide last?',
        answer:
          'That depends more on your drying routine than on the price you paid. Vinyl put away completely dry lasts many seasons; vinyl put away damp grows mildew that etches the coating and fails early.',
      },
      {
        question: 'Why do you have no customer reviews?',
        answer:
          'Because no customer has sent one in yet, and we will not invent them. Fabricated reviews are an FTC problem before they are an SEO problem. The section goes live the moment we have real ones.',
      },
    ],
  },
]

const ALL_FAQS = GROUPS.flatMap((group) => group.faqs)

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema(CRUMBS), faqSchema(ALL_FAQS)]} />

      <section className="bg-gradient-to-b from-sky-tint to-white pt-6 pb-10">
        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs crumbs={CRUMBS} className="mb-6" />
          <h1 className="text-4xl leading-tight sm:text-5xl">
            Inflatable Water Slide FAQ
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">
            The questions we actually get asked, answered properly. If yours is not here,{' '}
            <Link href="/contact" className="font-bold text-splash-blue-ink underline">
              ask us
            </Link>{' '}
            and we will add it.
          </p>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-3xl space-y-12 px-4">
          {GROUPS.map((group) => (
            <div key={group.heading}>
              <SectionHeading as="h2" align="left" className="mb-5">
                {group.heading}
              </SectionHeading>
              <FaqAccordion faqs={group.faqs} />
            </div>
          ))}

          <div className="rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6 text-center">
            <h2 className="text-2xl">Still stuck?</h2>
            <p className="mt-3 text-ink/75">
              Call <a href={`tel:${siteConfig.phoneE164}`} className="font-bold text-splash-blue-ink underline">{siteConfig.phone}</a>{' '}
              during {siteConfig.hours}, or read the{' '}
              <Link href="/blog" className="font-bold text-splash-blue-ink underline">
                full guides
              </Link>{' '}
              — sizing, blowers, safety, cleaning and rental economics all have their own article.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
