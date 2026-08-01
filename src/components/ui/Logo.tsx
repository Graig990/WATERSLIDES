import Image from 'next/image'
import Link from 'next/link'

const ALT = 'WaterSlides4Kids — inflatable water slides for sale'

/**
 * Logo lockups. Per the brand guide the primary lockup is never rendered
 * below 40px tall, and the white knockout is used on coral, deep blue, or
 * any photograph.
 */
export function LogoPrimary({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/logo-primary.svg"
      alt={ALT}
      width={807}
      height={220}
      unoptimized
      priority={priority}
      className={`h-[46px] w-auto sm:h-[52px] ${className}`}
    />
  )
}

export function LogoWhite({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-white.svg"
      alt={ALT}
      width={807}
      height={220}
      unoptimized
      className={`h-[46px] w-auto sm:h-[52px] ${className}`}
    />
  )
}

export function LogoStacked({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-stacked.svg"
      alt={ALT}
      width={520}
      height={420}
      unoptimized
      className={`h-auto w-[180px] ${className}`}
    />
  )
}

export function LogoIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/logo-icon.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      unoptimized
      className={className}
    />
  )
}

/**
 * Header lockup — always links home, with clear space around it.
 *
 * On very narrow phones the full lockup would have to render below the 40px
 * minimum height to fit alongside the action buttons, so it switches to the
 * icon mark instead, exactly as the brand guide prescribes.
 */
export function HeaderLogo() {
  return (
    <Link href="/" className="shrink-0 py-1" aria-label="WaterSlides4Kids home">
      <LogoPrimary priority className="hidden xs:block" />
      <span className="block xs:hidden">
        <LogoIcon size={44} className="h-11 w-11" />
      </span>
    </Link>
  )
}
