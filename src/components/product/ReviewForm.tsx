'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, Star } from 'lucide-react'
import { fieldErrors, reviewSchema } from '@/lib/validation'
import { cn } from '@/lib/utils'
import { submitForm } from '@/lib/submitForm'
import { siteConfig } from '@/data/site'

const EMPTY = {
  authorName: '',
  email: '',
  rating: 0,
  title: '',
  body: '',
  orderNumber: '',
  website: '',
}

export function ReviewForm({
  productSlug,
  productName,
}: {
  productSlug: string
  productName: string
}) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'>('idle')
  const [mailto, setMailto] = useState('')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)

  function update<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = reviewSchema.safeParse({ ...form, productSlug })
    if (!parsed.success) {
      const issues = fieldErrors(parsed.error)
      setErrors(issues)
      const firstKey = Object.keys(issues)[0]
      if (firstKey) document.getElementById(`review-${firstKey}`)?.focus()
      return
    }

    // Honeypot: a filled `website` field means a bot.
    if (parsed.data.website) {
      setStatus('success')
      setMessage('Thanks for your review.')
      setForm(EMPTY)
      return
    }

    setStatus('submitting')
    const result = await submitForm('review', parsed.data)

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
    setMessage(
      'Thank you — your review has been sent for verification. We check every review against a real order before publishing it, so it may take a day or two to appear.',
    )
    setForm(EMPTY)
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-3xl border-2 border-lime-pop/40 bg-lime-pop/10 p-6 text-center"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto mb-3 h-10 w-10 text-lime-ink" />
        <h3 className="text-xl">Review submitted</h3>
        <p className="mx-auto mt-2 max-w-md text-ink/75">{message}</p>
      </div>
    )
  }

  // No form backend configured, so the review cannot be delivered.
  if (status === 'unconfigured') {
    return (
      <div
        role="alert"
        className="rounded-3xl border-2 border-sunny-yellow bg-sunny-yellow/15 p-6 text-center"
      >
        <h3 className="text-xl">Please email your review instead</h3>
        <p className="mx-auto mt-2 max-w-md text-ink/80">{message}</p>
        <a
          href={mailto}
          className="mt-4 inline-flex min-h-[44px] items-center rounded-2xl bg-ink px-6 font-extrabold text-white hover:bg-deep-blue"
        >
          Open email with your review
        </a>
        <p className="mt-3 text-sm text-ink/70">
          Or call{' '}
          <a href={`tel:${siteConfig.phoneE164}`} className="font-bold underline">
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>
    )
  }

  if (!open) {
    return (
      <div className="rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6 text-center">
        <h3 className="text-xl">Bought the {productName}?</h3>
        <p className="mx-auto mt-2 max-w-lg text-ink/75">
          Tell other buyers how it held up. We verify every review against a real order before it
          goes live, which is why this page will never fill up with reviews we wrote ourselves.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 inline-flex min-h-[44px] items-center rounded-2xl bg-sunny-yellow px-6 font-extrabold text-ink shadow-pop hover:brightness-105"
        >
          Write a review
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-3xl border-2 border-sky-tint bg-white p-6"
    >
      <h3 className="text-xl">Review the {productName}</h3>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="review-website">Leave this field empty</label>
        <input
          id="review-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <fieldset>
        <legend className="mb-2 font-bold">Your rating</legend>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => update('rating', value)}
              aria-label={`${value} ${value === 1 ? 'star' : 'stars'}`}
              aria-pressed={form.rating === value}
              className="grid h-11 w-11 place-items-center rounded-lg hover:bg-sky-tint"
            >
              <Star
                aria-hidden="true"
                className={cn(
                  'h-7 w-7',
                  value <= form.rating ? 'fill-sunny-yellow text-sunny-yellow' : 'text-ink/25',
                )}
              />
            </button>
          ))}
        </div>
        {errors.rating ? (
          <p role="alert" className="mt-1 text-sm font-semibold text-hot-coral">
            {errors.rating}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <ReviewField
          id="authorName"
          label="Your name"
          value={form.authorName}
          onChange={(v) => update('authorName', v)}
          error={errors.authorName}
          autoComplete="name"
        />
        <ReviewField
          id="email"
          label="Email"
          type="email"
          hint="Not published — used only to verify your order."
          value={form.email}
          onChange={(v) => update('email', v)}
          error={errors.email}
          autoComplete="email"
        />
        <ReviewField
          id="orderNumber"
          label="Order number (optional)"
          hint="Speeds up verification."
          className="sm:col-span-2"
          value={form.orderNumber}
          onChange={(v) => update('orderNumber', v)}
          error={errors.orderNumber}
        />
        <ReviewField
          id="title"
          label="Headline"
          className="sm:col-span-2"
          value={form.title}
          onChange={(v) => update('title', v)}
          error={errors.title}
        />
      </div>

      <div>
        <label htmlFor="review-body" className="mb-1.5 block font-bold">
          Your review
        </label>
        <textarea
          id="review-body"
          rows={5}
          value={form.body}
          onChange={(event) => update('body', event.target.value)}
          placeholder="How did setup go? How long have you had it? What would you tell someone deciding between this and a smaller slide?"
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? 'review-body-error' : undefined}
          className={cn(
            'w-full rounded-2xl border-2 bg-white p-3',
            errors.body ? 'border-hot-coral' : 'border-sky-tint focus:border-splash-blue',
          )}
        />
        {errors.body ? (
          <p id="review-body-error" role="alert" className="mt-1 text-sm font-semibold text-hot-coral">
            {errors.body}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <p role="alert" className="rounded-2xl bg-hot-coral/15 p-3 font-semibold text-hot-coral">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-sunny-yellow px-6 font-extrabold text-ink shadow-pop hover:brightness-105 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Submit review'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border-2 border-deep-blue px-6 font-bold text-deep-blue hover:bg-sky-tint"
        >
          Cancel
        </button>
      </div>

      <p className="text-xs text-ink/60">
        Reviews are checked against a real order before publishing. Your email is never displayed.
      </p>
    </form>
  )
}

function ReviewField({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  hint,
  className = '',
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  hint?: string
  className?: string
  autoComplete?: string
}) {
  const describedBy = [error ? `review-${id}-error` : null, hint ? `review-${id}-hint` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      <label htmlFor={`review-${id}`} className="mb-1.5 block font-bold">
        {label}
      </label>
      <input
        id={`review-${id}`}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        className={cn(
          'min-h-[44px] w-full rounded-2xl border-2 bg-white px-3',
          error ? 'border-hot-coral' : 'border-sky-tint focus:border-splash-blue',
        )}
      />
      {hint ? (
        <p id={`review-${id}-hint`} className="mt-1 text-xs text-ink/60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`review-${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-hot-coral">
          {error}
        </p>
      ) : null}
    </div>
  )
}
