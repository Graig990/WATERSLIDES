import Link from 'next/link'
import type { Metadata } from 'next'
import { Clock, Mail, Phone } from 'lucide-react'
import { ContactForm } from '@/components/layout/ContactForm'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us | WaterSlides4Kids',
  description:
    'Questions about sizing, shipping, or a multi-unit rental order? Call, email or send us a message — we reply within one business day.',
  path: '/contact',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <section className="bg-gradient-to-b from-sky-tint to-white pt-6 pb-10">
        <div className="mx-auto max-w-5xl px-4">
          <Breadcrumbs crumbs={CRUMBS} className="mb-6" />
          <h1 className="text-4xl leading-tight sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
            Tell us your yard dimensions and the ages of the riders and we will tell you which slide
            fits — including when the answer is a cheaper one.
          </p>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <ContactForm />

          <aside className="space-y-6 rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6">
            <div>
              <h2 className="text-xl">Reach us directly</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-splash-blue-ink" />
                  <span>
                    <strong className="block">Phone</strong>
                    <a
                      href={`tel:${siteConfig.phoneE164}`}
                      className="font-bold text-splash-blue-ink underline underline-offset-2"
                    >
                      {siteConfig.phone}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-splash-blue-ink" />
                  <span>
                    <strong className="block">Email</strong>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-bold text-splash-blue-ink underline underline-offset-2"
                    >
                      {siteConfig.email}
                    </a>
                    <br />
                    <span className="text-ink/70">
                      Orders &amp; support:{' '}
                      <a href={`mailto:${siteConfig.supportEmail}`} className="underline">
                        {siteConfig.supportEmail}
                      </a>
                    </span>
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-splash-blue-ink" />
                  <span>
                    <strong className="block">Hours</strong>
                    {siteConfig.hours}
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t-2 border-white pt-5">
              <h2 className="text-lg">Faster answers</h2>
              <p className="mt-2 text-sm text-ink/75">
                A lot of questions are already answered in writing:
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="font-bold text-splash-blue-ink underline underline-offset-2">
                    General FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="font-bold text-splash-blue-ink underline underline-offset-2">
                    Shipping &amp; delivery times
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="font-bold text-splash-blue-ink underline underline-offset-2">
                    Returns &amp; refunds
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="font-bold text-splash-blue-ink underline underline-offset-2">
                    Warranty coverage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/best-inflatable-water-slide-buyers-guide"
                    className="font-bold text-splash-blue-ink underline underline-offset-2"
                  >
                    Which slide should I buy?
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
