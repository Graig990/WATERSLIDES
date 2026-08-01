'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Single-image gallery with click-to-zoom.
 *
 * The catalog currently ships one photograph per product. Rather than pad the
 * gallery with duplicates, this shows the real image and offers a zoomed view.
 * TODO: add supplier or self-shot alternate angles and this becomes a
 * multi-thumbnail gallery without changing the call site.
 */
export function ProductGallery({
  images,
  alt,
  priority = false,
}: {
  images: string[]
  alt: string
  priority?: boolean
}) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const current = images[active] ?? images[0]
  if (!current) return null

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white bg-sky-tint shadow-card">
        <Image
          src={current}
          alt={alt}
          fill
          priority={priority}
          fetchPriority={priority ? 'high' : 'auto'}
          sizes="(min-width: 1024px) 55vw, 92vw"
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label="Zoom in on product photo"
          className="absolute right-3 bottom-3 inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-white/95 px-4 font-bold text-deep-blue shadow-card hover:bg-white"
        >
          <ZoomIn aria-hidden="true" className="h-5 w-5" />
          Zoom
        </button>
      </div>

      {images.length > 1 ? (
        <ul className="mt-3 flex gap-3">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={index === active}
                className={cn(
                  'relative block h-20 w-24 overflow-hidden rounded-xl border-2',
                  index === active ? 'border-deep-blue' : 'border-sky-tint hover:border-splash-blue',
                )}
              >
                <Image src={image} alt="" aria-hidden="true" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {zoomed ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed product photo"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4"
          onClick={() => setZoomed(false)}
        >
          <div className="relative h-full max-h-[85vh] w-full max-w-5xl">
            <Image src={current} alt={alt} fill sizes="90vw" className="object-contain" />
          </div>
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute top-4 right-4 min-h-[44px] rounded-2xl bg-white px-5 font-extrabold text-ink"
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  )
}
