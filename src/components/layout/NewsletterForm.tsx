'use client'

import { useState, type FormEvent } from 'react'
import { Check, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { submitForm } from '@/lib/submitForm'
import { newsletterSchema } from '@/lib/validation'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

export function NewsletterForm({
  variant = 'footer',
  className,
}: {
  variant?: 'footer' | 'band'
  className?: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [mailto, setMailto] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = newsletterSchema.safeParse({ email })
    if (!parsed.success) {
      setStatus('error')
      setMessage(parsed.error.issues[0]?.message ?? 'Enter a valid email address.')
      return
    }

    setStatus('submitting')
    const result = await submitForm('newsletter', parsed.data)

    if (result.status === 'unconfigured') {
      setStatus('unconfigured')
      setMailto(result.mailto)
      setMessage(result.message)
      return
    }
    if (result.status === 'error') {
      setStatus('error')
      setMessage(result.message)
      return
    }

    setStatus('success')
    setMessage('You are on the list — your $50 code is on its way.')
    setEmail('')
  }

  const inputId = `newsletter-${variant}`
  const onBand = variant === 'band'

  // No form backend configured yet — say so rather than claiming success.
  if (status === 'unconfigured') {
    return (
      <p
        role="alert"
        className={cn(
          'rounded-2xl px-4 py-3 text-sm font-semibold',
          onBand ? 'bg-white text-ink' : 'bg-white/15 text-white',
          className,
        )}
      >
        {message}{' '}
        <a href={mailto} className="underline">
          Email us to subscribe
        </a>
        .
      </p>
    )
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className={cn(
          'flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-bold',
          onBand ? 'bg-white text-ink' : 'bg-white/15 text-white',
          className,
        )}
      >
        <Check aria-hidden="true" className="h-5 w-5 shrink-0" />
        {message}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} noValidate>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className={cn('flex gap-2', onBand ? 'flex-col sm:flex-row' : 'flex-col')}>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-describedby={status === 'error' ? `${inputId}-error` : undefined}
          className={cn(
            'min-h-[44px] w-full rounded-2xl border-2 px-4 text-base',
            onBand
              ? 'border-white bg-white text-ink placeholder:text-ink/40'
              : 'border-white/25 bg-white/10 text-white placeholder:text-white/50 focus:border-sunny-yellow',
          )}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-2xl px-6 font-extrabold transition disabled:opacity-60',
            onBand
              ? 'bg-ink text-white hover:bg-deep-blue'
              : 'bg-sunny-yellow text-ink hover:brightness-105',
          )}
        >
          <Send aria-hidden="true" className="h-4 w-4" />
          {status === 'submitting' ? 'Sending…' : 'Get $50 Off'}
        </button>
      </div>
      {status === 'error' ? (
        <p
          id={`${inputId}-error`}
          role="alert"
          className={cn('mt-2 text-sm font-semibold', onBand ? 'text-white' : 'text-sunny-yellow')}
        >
          {message}
        </p>
      ) : null}
      <p className={cn('mt-2 text-xs', onBand ? 'text-white/90' : 'text-white/60')}>
        No spam. Unsubscribe anytime.
      </p>
    </form>
  )
}
