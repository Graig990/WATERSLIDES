/**
 * ============================================================================
 * ⚠️  PLACEHOLDER CONTACT DETAILS — SWAP BEFORE LAUNCH
 * ============================================================================
 * Every phone number, email address and social handle on the site is read
 * from this file. Change them here once and the header, footer, contact page,
 * schema.org markup, and transactional copy all follow.
 *
 * `(555) 010-2025` is a reserved fictional-use number and the email addresses
 * do not resolve. Until you replace them:
 *
 *   - No LocalBusiness/PostalAddress JSON-LD is emitted. A fabricated NAP
 *     (name/address/phone) is worse than none — Google cross-references it
 *     against other citations and inconsistency actively suppresses local
 *     visibility. See `businessAddress` below to turn it on.
 *   - The `sameAs` social profiles are omitted from Organization schema
 *     while they point at unclaimed handles.
 * ============================================================================
 */

export const siteConfig = {
  name: 'WaterSlides4Kids',
  legalName: 'WaterSlides4Kids',
  tagline: 'Commercial-Grade Inflatable Water Slides',
  shortTagline: 'Splash Into Summer',
  description:
    'Shop commercial-grade inflatable water slides built from 15oz PVC vinyl. Free shipping sitewide, blower included, US-based support.',

  /** Canonical origin, no trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://waterslides4kids.com').replace(/\/$/, ''),

  /** TODO: replace with your real published number. */
  phone: '(555) 010-2025',
  /** E.164, for `tel:` links and schema. TODO: replace. */
  phoneE164: '+15550102025',

  /** TODO: replace with real mailboxes. */
  email: 'hello@waterslides4kids.com',
  supportEmail: 'support@waterslides4kids.com',
  salesEmail: 'sales@waterslides4kids.com',

  hours: 'Mon–Fri, 8am–6pm CT',

  /**
   * Fill this in with your real, verifiable business address and the
   * LocalBusiness + PostalAddress JSON-LD switches itself on automatically.
   * Leave it `null` and the site ships Organization schema only.
   */
  businessAddress: null as null | {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
    latitude?: number
    longitude?: number
  },

  /**
   * TODO: replace with the profiles you actually control, then set
   * `socialsClaimed` to true so they get emitted as schema `sameAs`.
   */
  socialsClaimed: false,
  socials: {
    facebook: 'https://www.facebook.com/waterslides4kids',
    instagram: 'https://www.instagram.com/waterslides4kids',
    youtube: 'https://www.youtube.com/@waterslides4kids',
    tiktok: 'https://www.tiktok.com/@waterslides4kids',
  },

  /** Placeholder banner copy. */
  announcement: {
    freeShipping: 'FREE SHIPPING SITEWIDE',
    origin: 'Ships from the USA',
  },

  /** Homepage video (YouTube Shorts). */
  video: {
    id: 'ljfRRgLD0Ew',
    embedUrl: 'https://www.youtube.com/embed/ljfRRgLD0Ew',
    watchUrl: 'https://youtube.com/shorts/ljfRRgLD0Ew',
    title: 'See It Splash — WaterSlides4Kids inflatable water slides in action',
    description:
      'A short walkthrough of a commercial-grade inflatable water slide set up and running in a backyard, showing the slide lane, splash pool, and climbing wall in use.',
    /** TODO: confirm the real publish date of the video you own. */
    uploadDate: '2026-05-01',
  },

  newsletterOffer: 'Get $50 off your first slide',
} as const

export type SiteConfig = typeof siteConfig

/** Verification / analytics tags. Each only renders when its env var is set. */
export const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  ga4: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
}

/** Absolute URL helper — canonical tags, OG images, sitemap entries. */
export function absoluteUrl(path = '/'): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
