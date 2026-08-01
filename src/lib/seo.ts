import type { Metadata } from 'next'
import { absoluteUrl, siteConfig } from '@/data/site'

interface BuildMetadataArgs {
  title: string
  description: string
  /** Site-relative path, e.g. '/shop/foo'. Drives canonical + og:url. */
  path: string
  /** Absolute or remote image URL. Falls back to the brand OG card. */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noindex?: boolean
  publishedTime?: string
  modifiedTime?: string
}

/**
 * Single place that builds page metadata, so every URL gets a unique title,
 * a unique description, a self-referencing canonical, and an OG image.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = 'website',
  noindex = false,
  publishedTime,
  modifiedTime,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path)
  const ogImage = image ?? absoluteUrl('/brand/og-image.png')

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
        },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt ?? title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/** Titles must stay under 60 characters to avoid SERP truncation. */
export function assertTitleLength(title: string): string {
  if (process.env.NODE_ENV !== 'production' && title.length > 60) {
    console.warn(`[seo] Title exceeds 60 chars (${title.length}): "${title}"`)
  }
  return title
}
