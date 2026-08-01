import { getAggregateRating } from '@/data/reviews'
import { absoluteUrl, siteConfig } from '@/data/site'
import type { BlogPost } from '@/data/blog'
import { authors } from '@/data/blog'
import type { Collection } from '@/data/collections'
import { productImageAlt } from '@/data/products'
import type { FaqItem, Product } from '@/data/types'

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }
export type JsonLd = Record<string, JsonValue>

const ORG_ID = `${siteConfig.url}/#organization`
const SITE_ID = `${siteConfig.url}/#website`

/* ------------------------------------------------------------------ */
/* Sitewide                                                            */
/* ------------------------------------------------------------------ */

/**
 * Organization — and LocalBusiness only when a real address exists.
 *
 * A fabricated NAP block is worse than none: Google cross-references it
 * against other citations of your business and inconsistency suppresses
 * local visibility. `siteConfig.businessAddress` is null until you fill it in.
 */
export function organizationSchema(): JsonLd {
  const address = siteConfig.businessAddress

  const base: JsonLd = {
    '@type': address ? 'LocalBusiness' : 'Organization',
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/brand/logo-icon-512.png'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl('/brand/og-image.png'),
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    areaServed: { '@type': 'Country', name: 'United States' },
  }

  if (siteConfig.socialsClaimed) {
    base.sameAs = Object.values(siteConfig.socials)
  }

  if (address) {
    base.address = {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    }
    if (address.latitude !== undefined && address.longitude !== undefined) {
      base.geo = {
        '@type': 'GeoCoordinates',
        latitude: address.latitude,
        longitude: address.longitude,
      }
    }
  }

  return base
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** Emitted once in the root layout and referenced by @id elsewhere. */
export function sitewideGraph(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), websiteSchema()],
  }
}

/* ------------------------------------------------------------------ */
/* Breadcrumbs                                                         */
/* ------------------------------------------------------------------ */

export interface Crumb {
  name: string
  href: string
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  }
}

/* ------------------------------------------------------------------ */
/* Product                                                             */
/* ------------------------------------------------------------------ */

const AVAILABILITY = {
  'in-stock': 'https://schema.org/InStock',
  'pre-order': 'https://schema.org/PreOrder',
  'out-of-stock': 'https://schema.org/OutOfStock',
} as const

function shippingDetails(): JsonValue {
  return {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: 0,
      currency: 'USD',
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'US',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 3,
        unitCode: 'DAY',
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 3,
        maxValue: 10,
        unitCode: 'DAY',
      },
    },
  }
}

function returnPolicy(): JsonValue {
  return {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'US',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 30,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/ReturnShippingFees',
  }
}

/**
 * Product + Offer. The Offer is omitted entirely when we have no price —
 * an Offer without a price is invalid, and inventing one to satisfy the
 * validator would put a fake number in front of shoppers.
 *
 * AggregateRating is only attached when real reviews exist (see reviews.ts).
 */
export function productSchema(product: Product): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${absoluteUrl(`/shop/${product.slug}`)}#product`,
    name: product.name,
    description: product.intro,
    image: [product.image],
    sku: product.sku,
    mpn: product.mpn,
    brand: { '@type': 'Brand', name: siteConfig.name },
    category: 'Inflatable Water Slides',
    url: absoluteUrl(`/shop/${product.slug}`),
  }

  if (product.price !== null) {
    schema.offers = {
      '@type': 'Offer',
      url: absoluteUrl(`/shop/${product.slug}`),
      priceCurrency: 'USD',
      price: product.price,
      availability: AVAILABILITY[product.stock],
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
      shippingDetails: shippingDetails(),
      hasMerchantReturnPolicy: returnPolicy(),
    }
  }

  const rating = getAggregateRating(product.slug)
  if (rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      reviewCount: rating.reviewCount,
    }
  }

  return schema
}

export function itemListSchema(products: Product[], collection: Collection): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: collection.h1,
    description: collection.intro,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/shop/${product.slug}`),
      name: product.name,
      image: product.image,
    })),
  }
}

/* ------------------------------------------------------------------ */
/* FAQ, Article, Video                                                 */
/* ------------------------------------------------------------------ */

export function faqSchema(faqs: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function articleSchema(post: BlogPost, imageUrl: string): JsonLd {
  const author = authors[post.authorId]
  const url = absoluteUrl(`/blog/${post.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.h1,
    description: post.metaDescription,
    image: [imageUrl],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': author.type,
      name: author.name,
      description: author.bio,
      url: absoluteUrl(author.url),
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en-US',
    articleSection: post.category,
    keywords: post.tags.join(', '),
  }
}

export function videoSchema(thumbnailUrl: string): JsonLd {
  const { video } = siteConfig
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: video.uploadDate,
    embedUrl: video.embedUrl,
    contentUrl: video.watchUrl,
    publisher: { '@id': ORG_ID },
  }
}

export function productImageAltText(product: Product): string {
  return productImageAlt(product)
}
