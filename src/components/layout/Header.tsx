'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, Search, ShoppingCart, X } from 'lucide-react'
import { HeaderLogo, LogoStacked } from '@/components/ui/Logo'
import { useCartStore, cartItemCount } from '@/store/cart'
import { useHydrated } from '@/hooks/useHydrated'
import { cn } from '@/lib/utils'
import { megaMenuHeights, megaMenuTopics, primaryNav } from './navigation'

export function Header() {
  const pathname = usePathname()

  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const megaRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const lines = useCartStore((state) => state.lines)
  const lastAddedAt = useCartStore((state) => state.lastAddedAt)
  const openDrawer = useCartStore((state) => state.openDrawer)
  const hydrated = useHydrated()
  const count = hydrated ? cartItemCount(lines) : 0

  // Any navigation closes every panel. Adjusting state during render (rather
  // than in an effect) is React's documented pattern for resetting state when
  // a prop changes — it avoids the extra render pass an effect would cause.
  const [renderedPath, setRenderedPath] = useState(pathname)
  if (renderedPath !== pathname) {
    setRenderedPath(pathname)
    setMegaOpen(false)
    setMobileOpen(false)
    setSearchOpen(false)
  }

  // The mobile panel is a full-screen overlay — stop the page behind it scrolling.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  // Escape closes whichever panel is open; click-away closes the mega menu.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setMegaOpen(false)
      setMobileOpen(false)
      setSearchOpen(false)
    }
    function onPointerDown(event: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(event.target as Node)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-sky-tint bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-3 px-4 sm:gap-5">
        <HeaderLogo />

        {/* Desktop navigation */}
        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          <Link
            href="/shop"
            className={cn(
              'rounded-xl px-3 py-2 font-bold text-deep-blue hover:bg-sky-tint',
              isActive('/shop') && 'bg-sky-tint',
            )}
          >
            Shop
          </Link>

          <div ref={megaRef} className="relative">
            <button
              type="button"
              onClick={() => setMegaOpen((open) => !open)}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              className={cn(
                'flex items-center gap-1 rounded-xl px-3 py-2 font-bold text-deep-blue hover:bg-sky-tint',
                megaOpen && 'bg-sky-tint',
              )}
            >
              Water Slides
              <ChevronDown
                aria-hidden="true"
                className={cn('h-4 w-4 transition-transform', megaOpen && 'rotate-180')}
              />
            </button>

            {megaOpen ? (
              <div className="absolute top-full left-1/2 z-50 mt-2 w-[min(760px,90vw)] -translate-x-1/2 rounded-3xl border-2 border-sky-tint bg-white p-5 shadow-card">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-extrabold tracking-[0.15em] text-splash-blue-ink uppercase">
                      Shop by type
                    </p>
                    <ul className="space-y-1">
                      {megaMenuTopics.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block rounded-xl px-3 py-2 hover:bg-sky-tint"
                          >
                            <span className="block font-bold text-deep-blue">{item.name}</span>
                            <span className="block text-sm text-ink/65">{item.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-extrabold tracking-[0.15em] text-splash-blue-ink uppercase">
                      Shop by height
                    </p>
                    <ul className="space-y-1">
                      {megaMenuHeights.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block rounded-xl px-3 py-2 font-bold text-deep-blue hover:bg-sky-tint"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/shop"
                      className="mt-3 inline-block rounded-xl bg-sunny-yellow px-4 py-2 text-sm font-extrabold text-ink"
                    >
                      View all 26 slides →
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {primaryNav
            .filter((item) => item.href !== '/shop')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-xl px-3 py-2 font-bold text-deep-blue hover:bg-sky-tint',
                  isActive(item.href) && 'bg-sky-tint',
                )}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-expanded={searchOpen}
            aria-label="Search slides"
            className="grid h-11 w-11 place-items-center rounded-xl text-deep-blue hover:bg-sky-tint"
          >
            <Search aria-hidden="true" className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            className="relative grid h-11 w-11 place-items-center rounded-xl text-deep-blue hover:bg-sky-tint"
          >
            <ShoppingCart aria-hidden="true" className="h-5 w-5" />
            {count > 0 ? (
              <span
                key={lastAddedAt ?? 0}
                className="cart-bump absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-hot-coral px-1 text-[11px] font-extrabold text-white"
              >
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="grid h-11 w-11 place-items-center rounded-xl text-deep-blue hover:bg-sky-tint lg:hidden"
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen ? (
        <div className="border-t-2 border-sky-tint bg-sky-tint/60">
          {/*
            A plain GET form rather than router.push: it works without
            JavaScript, and the full navigation is what lets the statically
            prerendered /shop page pick the query up on load.
          */}
          <form
            action="/shop"
            method="get"
            className="mx-auto flex max-w-7xl gap-2 px-4 py-3"
            role="search"
          >
            <label htmlFor="site-search" className="sr-only">
              Search water slides
            </label>
            <input
              ref={searchInputRef}
              id="site-search"
              name="q"
              type="search"
              placeholder="Search slides — try “dual lane” or “15 ft”"
              className="min-h-[44px] w-full rounded-2xl border-2 border-white bg-white px-4 text-base text-ink placeholder:text-ink/40 focus:border-splash-blue"
            />
            <button
              type="submit"
              className="min-h-[44px] shrink-0 rounded-2xl bg-deep-blue px-5 font-bold text-white hover:bg-splash-blue"
            >
              Search
            </button>
          </form>
        </div>
      ) : null}

      {/* Mobile panel */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b-2 border-sky-tint px-4">
            <span className="font-extrabold text-deep-blue">Menu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-xl text-deep-blue hover:bg-sky-tint"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-5">
            <div className="mb-6 flex justify-center">
              <LogoStacked />
            </div>

            <ul className="space-y-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 text-lg font-bold text-deep-blue hover:bg-sky-tint"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 mb-2 px-4 text-xs font-extrabold tracking-[0.15em] text-splash-blue-ink uppercase">
              Shop by type
            </p>
            <ul className="space-y-1">
              {megaMenuTopics.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 font-semibold text-ink hover:bg-sky-tint"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 mb-2 px-4 text-xs font-extrabold tracking-[0.15em] text-splash-blue-ink uppercase">
              Shop by height
            </p>
            <ul className="space-y-1 pb-6">
              {megaMenuHeights.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 font-semibold text-ink hover:bg-sky-tint"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
