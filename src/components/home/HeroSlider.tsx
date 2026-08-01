'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Bubbles } from '@/components/ui/Bubbles'
import { usePrefersReducedMotion } from '@/hooks/useHydrated'
import { cn } from '@/lib/utils'

export interface HeroSlide {
  headline: string
  subhead: string
  image: string
  imageAlt: string
  href: string
}

const AUTOPLAY_MS = 6000
const SWIPE_THRESHOLD_PX = 50

const HEADING_PILL =
  'mb-3 inline-block rounded-full bg-white/85 px-4 py-1.5 text-xs font-extrabold tracking-[0.15em] text-deep-blue uppercase sm:text-sm'

export function HeroSlider({
  slides,
  pageHeading,
}: {
  slides: HeroSlide[]
  /** The page's single H1. Rendered on the active slide only. */
  pageHeading: string
}) {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)

  // Autoplay is decoration. If the user has asked for reduced motion, the
  // carousel simply stops advancing on its own — the arrows and dots still work.
  const prefersReducedMotion = usePrefersReducedMotion()
  const paused = hovered || prefersReducedMotion

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  )

  useEffect(() => {
    if (paused || slides.length < 2) return

    // Autoplay pauses whenever the tab is hidden — a slider ticking in a
    // background tab is wasted main-thread work.
    if (typeof document !== 'undefined' && document.hidden) return

    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, slides.length, index])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured water slides"
      className="relative isolate overflow-hidden bg-gradient-to-b from-splash-blue to-sky-tint"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current
        const end = event.changedTouches[0]?.clientX
        if (start === null || end === undefined) return
        const delta = end - start
        if (Math.abs(delta) > SWIPE_THRESHOLD_PX) go(delta < 0 ? index + 1 : index - 1)
        touchStartX.current = null
      }}
    >
      <Bubbles className="z-0 opacity-70" />

      {slides.map((slide, slideIndex) => {
        const isActive = slideIndex === index
        return (
          <div
            key={slide.headline}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${slides.length}`}
            aria-hidden={!isActive}
            // Inactive slides stay mounted but are collapsed, so the container
            // height is fixed by the active slide and nothing shifts.
            className={cn(
              'transition-opacity duration-500',
              isActive ? 'relative z-10 opacity-100' : 'pointer-events-none absolute inset-0 opacity-0',
            )}
          >
            <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16 lg:gap-12">
              <div className="text-center md:text-left">
                {/*
                  Only the active slide carries the <h1>; the others render the
                  same text as a <p>. All three slides stay mounted so the
                  container height is stable, and one H1 per page is
                  non-negotiable for search.
                */}
                {isActive ? (
                  <h1 className={HEADING_PILL}>{pageHeading}</h1>
                ) : (
                  <p className={HEADING_PILL}>{pageHeading}</p>
                )}
                <p className="text-4xl leading-[1.05] font-bold text-white drop-shadow-[0_2px_8px_rgba(26,35,64,0.35)] sm:text-5xl lg:text-6xl">
                  {slide.headline}
                </p>
                <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-white drop-shadow-[0_1px_6px_rgba(26,35,64,0.45)] md:mx-0">
                  {slide.subhead}
                </p>
                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                  <ButtonLink href="/shop" size="lg">
                    Shop Water Slides
                  </ButtonLink>
                  <ButtonLink href="#best-sellers" variant="outline-white" size="lg">
                    View Best Sellers
                  </ButtonLink>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white shadow-pop">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  // The first slide is the LCP element on the homepage.
                  priority={slideIndex === 0}
                  fetchPriority={slideIndex === 0 ? 'high' : 'auto'}
                  loading={slideIndex === 0 ? 'eager' : 'lazy'}
                  sizes="(min-width: 768px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )
      })}

      {/* Controls */}
      <div className="relative z-20 flex items-center justify-center gap-3 pb-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-white/25 text-white backdrop-blur hover:bg-white hover:text-deep-blue"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((slide, dotIndex) => (
            <button
              key={slide.headline}
              type="button"
              onClick={() => go(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              aria-current={dotIndex === index}
              className={cn(
                'h-3 rounded-full border-2 border-white transition-all',
                dotIndex === index ? 'w-8 bg-white' : 'w-3 bg-white/30 hover:bg-white/60',
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-white/25 text-white backdrop-blur hover:bg-white hover:text-deep-blue"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}
