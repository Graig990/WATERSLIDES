'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

/**
 * Lite YouTube embed.
 *
 * Renders a poster image and a play button; the iframe — and the ~500KB of
 * YouTube JavaScript behind it — is only injected once someone actually
 * clicks. That keeps the player entirely out of the initial page load, which
 * is the single biggest third-party win available on this page.
 */
export function VideoFacade({
  embedUrl,
  posterUrl,
  title,
  className = '',
}: {
  embedUrl: string
  posterUrl: string
  title: string
  className?: string
}) {
  const [activated, setActivated] = useState(false)

  return (
    <div
      className={`relative aspect-[9/16] w-full overflow-hidden rounded-3xl border-4 border-white bg-ink shadow-pop ${className}`}
    >
      {activated ? (
        <iframe
          src={`${embedUrl}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={posterUrl}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 768px) 420px, 92vw"
            className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-hot-coral shadow-pop transition-transform duration-200 group-hover:scale-110">
              <Play aria-hidden="true" className="h-9 w-9 translate-x-0.5 fill-white text-white" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
