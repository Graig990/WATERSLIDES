import Link from 'next/link'
import type { Metadata } from 'next'
import { InfoPage } from '@/components/layout/InfoPage'
import { JsonLd } from '@/components/ui/JsonLd'
import { breadcrumbSchema, type Crumb } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy | WaterSlides4Kids',
  description:
    'What data WaterSlides4Kids collects, why we collect it, who it is shared with, and the choices you have. We never see card numbers or sell personal data.',
  path: '/privacy-policy',
})

const CRUMBS: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <InfoPage
        title="Privacy Policy"
        intro="What we collect, why we collect it, and what we do not do with it."
        crumbs={CRUMBS}
        updated="August 1, 2026"
      >
        <p className="rounded-2xl bg-hot-coral/12 p-4 text-sm">
          <strong>Template — have this reviewed before you launch.</strong> This policy describes
          how the site is actually built, but it is not legal advice and it has not been reviewed by
          an attorney. Your obligations depend on where you and your customers are located (CCPA/CPRA
          in California and GDPR for any EU visitors both impose specific requirements). Have
          counsel review this and update the contact details in{' '}
          <code>src/data/site.ts</code> before going live.
        </p>

        <h2>What we collect</h2>
        <ul className="droplet-list">
          <li>
            <strong>Order information</strong> — name, email, phone, and shipping address, collected
            at checkout because we cannot deliver a 300lb slide without them.
          </li>
          <li>
            <strong>Email address</strong> — if you subscribe to the newsletter or ask to be
            notified when a product is back in stock.
          </li>
          <li>
            <strong>Message contents</strong> — whatever you write in the contact form.
          </li>
          <li>
            <strong>Analytics data</strong> — only if analytics is enabled on this deployment. See
            below.
          </li>
        </ul>

        <h2>What we deliberately do not do</h2>
        <ul className="droplet-list">
          <li>
            <strong>We do not see or store card numbers.</strong> Payment is handled entirely by
            Stripe on their own checkout. Card details never touch this site&rsquo;s servers.
          </li>
          <li>
            <strong>We do not write your email address or message contents into server logs.</strong>{' '}
            A log file is not a mailing list, and treating it as one is how data leaks happen.
          </li>
          <li>
            <strong>We do not sell or rent personal information</strong> to anyone, for any purpose.
          </li>
        </ul>

        <h2>Cookies and analytics</h2>
        <p>
          The site stores your cart in your own browser&rsquo;s local storage so it survives a
          reload. That data never leaves your device and is not accessible to us.
        </p>
        <p>
          Google Analytics 4 loads only when a measurement ID is configured for the deployment. When
          it is enabled it sets cookies and collects usage data under{' '}
          <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
            Google&rsquo;s privacy policy
          </a>
          . If it is not configured, no analytics script loads at all.
        </p>

        <h2>Who we share data with</h2>
        <ul className="droplet-list">
          <li><strong>Stripe</strong> — payment processing.</li>
          <li><strong>Shipping carriers</strong> — your name, address and phone, to deliver the order.</li>
          <li><strong>Google Analytics</strong> — usage data, only if enabled on this deployment.</li>
        </ul>
        <p>
          Each of these processes data under its own privacy policy. We share the minimum required
          for the service to function and nothing beyond it.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Order records are kept as long as required for tax, accounting and warranty purposes.
          Newsletter subscriptions are kept until you unsubscribe. Contact messages are kept as long
          as needed to resolve your enquiry.
        </p>

        <h2>Your choices</h2>
        <p>
          You can unsubscribe from marketing email at any time using the link in any message. To
          request access to, correction of, or deletion of your personal information, email{' '}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and we will respond within
          the timeframe your jurisdiction requires. California residents have specific rights under
          the CCPA/CPRA, including the right to know and the right to delete.
        </p>

        <h2>Children</h2>
        <p>
          We sell products intended for children, but this site is intended for use by adults making
          a purchase. We do not knowingly collect personal information from anyone under 13. If you
          believe a child has provided information, contact us and we will delete it.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes materially we will update the date at the top of this page. See
          also our <Link href="/terms">terms of service</Link>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{' '}
          <a href={`tel:${siteConfig.phoneE164}`}>{siteConfig.phone}</a>.
        </p>
      </InfoPage>
    </>
  )
}
