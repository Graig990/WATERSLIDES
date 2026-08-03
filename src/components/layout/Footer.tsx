import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { LogoStacked } from '@/components/ui/Logo'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/ui/SocialIcons'
import { siteConfig } from '@/data/site'
import { paymentMethods } from '@/data/payments'
import { PaymentMethodLogo } from '@/components/ui/PaymentMethodLogo'
import { footerNav } from './navigation'
import { NewsletterForm } from './NewsletterForm'

const SOCIAL_LINKS = [
  { href: siteConfig.socials.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: siteConfig.socials.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: siteConfig.socials.youtube, label: 'YouTube', Icon: YoutubeIcon },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-deep-blue text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-lg text-white">Shop</h2>
            <ul className="space-y-2 text-sm">
              {footerNav.shop.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 hover:text-sunny-yellow">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg text-white">Support</h2>
            <ul className="space-y-2 text-sm">
              {footerNav.support.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 hover:text-sunny-yellow">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg text-white">Company</h2>
            <ul className="space-y-2 text-sm">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 hover:text-sunny-yellow">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg text-white">Newsletter</h2>
            <p className="mb-3 text-sm text-white/80">
              {siteConfig.newsletterOffer}, plus setup tips and restock alerts.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <hr className="my-10 border-white/15" />

        <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-start">
          {/*
            NAP block. The street address is deliberately absent until a real,
            verifiable one is added to siteConfig.businessAddress — a fabricated
            address is worse for local SEO than none at all.
          */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" aria-label="WaterSlides4Kids home">
              <LogoStacked className="brightness-0 invert" />
            </Link>
            <address className="text-sm not-italic text-white/80">
              <p className="font-bold text-white">{siteConfig.legalName}</p>
              <p className="mt-1">{siteConfig.tagline}</p>
              <p className="mt-2">
                <a href={`tel:${siteConfig.phoneE164}`} className="inline-flex items-center gap-2 hover:text-sunny-yellow">
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
              </p>
              <p className="mt-1">
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-sunny-yellow">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  {siteConfig.email}
                </a>
              </p>
              <p className="mt-1 text-white/60">{siteConfig.hours}</p>
            </address>
          </div>

          <div className="lg:px-8">
            <p className="mb-2 text-xs font-extrabold tracking-[0.15em] text-white/60 uppercase">
              We accept
            </p>
            {/* White tiles so each brand's own colours read correctly. */}
            <ul className="flex flex-wrap items-center gap-2">
              {paymentMethods.map((method) => (
                <li
                  key={method.id}
                  className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5"
                  title={method.label}
                >
                  <PaymentMethodLogo method={method} className="h-5" />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-extrabold tracking-[0.15em] text-white/60 uppercase">
              Follow
            </p>
            <ul className="flex gap-2">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/25 bg-white/10 text-white hover:bg-sunny-yellow hover:text-ink"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-white/60">
          © {year} {siteConfig.legalName}. All rights reserved. Slide specifications are examples
          pending supplier confirmation — always follow the documentation shipped with your unit.
        </p>
      </div>
    </footer>
  )
}
