'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Lock } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { LogoIcon } from '@/components/ui/Logo'
import { cartSubtotal, useCartStore } from '@/store/cart'
import { useHydrated } from '@/hooks/useHydrated'
import { formatPrice } from '@/lib/utils'
import { fieldErrors, shippingAddressSchema } from '@/lib/validation'
import { US_STATES, isNonContiguous } from '@/lib/us-states'

const SHIPPING_METHODS = [
  {
    value: 'standard',
    label: 'Standard — Free',
    detail: 'Ships in 1–3 business days, 3–10 business days in transit.',
  },
  {
    value: 'expedited',
    label: 'Expedited — Free',
    detail: 'Prioritised dispatch where stock allows. We will confirm timing by email.',
  },
] as const

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  shippingMethod: 'standard' as 'standard' | 'expedited',
  notes: '',
}

export function CheckoutForm() {
  const router = useRouter()
  const lines = useCartStore((state) => state.lines)
  const clear = useCartStore((state) => state.clear)
  const hydrated = useHydrated()

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  function update<K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) {
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
    setFormError('')

    // Validate client-side first for instant inline errors; the API runs the
    // exact same schema again, because client validation is a convenience,
    // not a security boundary.
    const parsed = shippingAddressSchema.safeParse(form)
    if (!parsed.success) {
      const issues = fieldErrors(parsed.error)
      setErrors(issues)
      const firstKey = Object.keys(issues)[0]
      if (firstKey) document.getElementById(firstKey)?.focus()
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: parsed.data,
          lines: lines.map((line) => ({ slug: line.slug, quantity: line.quantity })),
        }),
      })

      const data: {
        ok?: boolean
        message?: string
        errors?: Record<string, string>
        mode?: 'demo' | 'stripe'
        orderNumber?: string
        redirectUrl?: string
        subtotal?: number
      } = await response.json()

      if (!response.ok || !data.ok || !data.redirectUrl) {
        setErrors(data.errors ?? {})
        setFormError(data.message ?? 'We could not process that. Please try again.')
        setSubmitting(false)
        return
      }

      if (data.mode === 'demo') {
        // Hand the confirmation page a snapshot before the cart is cleared.
        // sessionStorage, not localStorage: it should not outlive the tab.
        sessionStorage.setItem(
          'ws4k-last-order',
          JSON.stringify({
            orderNumber: data.orderNumber,
            email: parsed.data.email,
            firstName: parsed.data.firstName,
            shippingMethod: parsed.data.shippingMethod,
            state: parsed.data.state,
            subtotal: data.subtotal ?? cartSubtotal(lines),
            lines: lines.map((line) => ({
              slug: line.slug,
              name: line.name,
              image: line.image,
              price: line.price,
              quantity: line.quantity,
            })),
          }),
        )
        clear()
        router.push(data.redirectUrl)
        return
      }

      // Stripe: leave the cart intact until payment actually succeeds.
      window.location.href = data.redirectUrl
    } catch {
      setFormError('Network error. Please check your connection and try again.')
      setSubmitting(false)
    }
  }

  if (!hydrated) {
    return <p className="py-16 text-center text-ink/60">Loading checkout…</p>
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl border-2 border-dashed border-splash-blue/40 bg-sky-tint/40 px-6 py-16 text-center">
        <LogoIcon size={100} />
        <h2 className="text-2xl">There is nothing to check out</h2>
        <p className="max-w-md text-ink/70">Add a slide to your cart and come back.</p>
        <ButtonLink href="/shop" size="lg">
          Shop Water Slides
        </ButtonLink>
      </div>
    )
  }

  const subtotal = cartSubtotal(lines)
  const nonContiguous = form.state !== '' && isNonContiguous(form.state)

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div className="space-y-8">
        <fieldset className="rounded-3xl border-2 border-sky-tint bg-white p-5">
          <legend className="px-2 text-lg font-bold text-deep-blue">1. Contact</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="firstName"
              label="First name"
              value={form.firstName}
              onChange={(value) => update('firstName', value)}
              error={errors.firstName}
              autoComplete="given-name"
            />
            <Field
              id="lastName"
              label="Last name"
              value={form.lastName}
              onChange={(value) => update('lastName', value)}
              error={errors.lastName}
              autoComplete="family-name"
            />
            <Field
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => update('email', value)}
              error={errors.email}
              autoComplete="email"
            />
            <Field
              id="phone"
              label="Phone"
              type="tel"
              hint="The freight carrier needs this to schedule delivery."
              value={form.phone}
              onChange={(value) => update('phone', value)}
              error={errors.phone}
              autoComplete="tel"
            />
          </div>
        </fieldset>

        <fieldset className="rounded-3xl border-2 border-sky-tint bg-white p-5">
          <legend className="px-2 text-lg font-bold text-deep-blue">2. Shipping address</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="address1"
              label="Street address"
              className="sm:col-span-2"
              value={form.address1}
              onChange={(value) => update('address1', value)}
              error={errors.address1}
              autoComplete="address-line1"
            />
            <Field
              id="address2"
              label="Apartment, suite (optional)"
              className="sm:col-span-2"
              required={false}
              value={form.address2}
              onChange={(value) => update('address2', value)}
              error={errors.address2}
              autoComplete="address-line2"
            />
            <Field
              id="city"
              label="City"
              value={form.city}
              onChange={(value) => update('city', value)}
              error={errors.city}
              autoComplete="address-level2"
            />

            <div>
              <label htmlFor="state" className="mb-1.5 block font-bold">
                State
              </label>
              <select
                id="state"
                value={form.state}
                onChange={(event) => update('state', event.target.value)}
                aria-invalid={Boolean(errors.state)}
                aria-describedby={errors.state ? 'state-error' : undefined}
                className={`min-h-[44px] w-full rounded-2xl border-2 bg-white px-3 ${
                  errors.state ? 'border-hot-coral' : 'border-sky-tint focus:border-splash-blue'
                }`}
              >
                <option value="">Choose a state…</option>
                {US_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.state ? (
                <p id="state-error" role="alert" className="mt-1 text-sm font-semibold text-hot-coral">
                  {errors.state}
                </p>
              ) : null}
            </div>

            <Field
              id="zip"
              label="ZIP code"
              inputMode="numeric"
              value={form.zip}
              onChange={(value) => update('zip', value)}
              error={errors.zip}
              autoComplete="postal-code"
            />
          </div>

          {nonContiguous ? (
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-sunny-yellow/30 p-3 text-sm">
              <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Free shipping covers the contiguous US. We will contact you with a freight quote for{' '}
                {form.state === 'AK' ? 'Alaska' : 'Hawaii'} before charging anything extra.
              </span>
            </p>
          ) : null}
        </fieldset>

        <fieldset className="rounded-3xl border-2 border-sky-tint bg-white p-5">
          <legend className="px-2 text-lg font-bold text-deep-blue">3. Shipping method</legend>
          <div className="space-y-3">
            {SHIPPING_METHODS.map((method) => (
              <label
                key={method.value}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 ${
                  form.shippingMethod === method.value
                    ? 'border-deep-blue bg-sky-tint/50'
                    : 'border-sky-tint hover:border-splash-blue'
                }`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.value}
                  checked={form.shippingMethod === method.value}
                  onChange={() => update('shippingMethod', method.value)}
                  className="mt-1 h-5 w-5 accent-[#0057B8]"
                />
                <span>
                  <span className="block font-bold">{method.label}</span>
                  <span className="block text-sm text-ink/70">{method.detail}</span>
                </span>
              </label>
            ))}
          </div>

          <div className="mt-4">
            <label htmlFor="notes" className="mb-1.5 block font-bold">
              Delivery notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(event) => update('notes', event.target.value)}
              placeholder="Gate codes, access restrictions, best delivery window…"
              className="w-full rounded-2xl border-2 border-sky-tint bg-white p-3 focus:border-splash-blue"
            />
          </div>
        </fieldset>

        <fieldset className="rounded-3xl border-2 border-sky-tint bg-white p-5">
          <legend className="px-2 text-lg font-bold text-deep-blue">4. Payment</legend>
          <p className="flex items-start gap-2 text-sm text-ink/75">
            <Lock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-lime-ink" />
            <span>
              Card details are entered on Stripe&rsquo;s secure checkout, never on this site. We
              never see or store your card number.
            </span>
          </p>
        </fieldset>
      </div>

      <aside className="rounded-3xl border-2 border-sky-tint bg-sky-tint/40 p-6 lg:sticky lg:top-28">
        <h2 className="text-xl">Order summary</h2>

        <ul className="mt-4 space-y-3">
          {lines.map((line) => (
            <li key={line.slug} className="flex gap-3">
              <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
                <Image
                  src={line.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1 text-sm">
                <span className="block font-bold">{line.shortName}</span>
                <span className="block text-ink/60">Qty {line.quantity}</span>
              </span>
              <span className="text-sm font-extrabold">
                {formatPrice(line.price * line.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-5 space-y-2 border-t-2 border-white pt-4 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-bold">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="font-bold text-lime-ink">Free</dd>
          </div>
          <div className="flex justify-between text-ink/70">
            <dt>Estimated tax</dt>
            <dd>Calculated at payment</dd>
          </div>
          <div className="flex justify-between border-t-2 border-white pt-3 text-lg">
            <dt className="font-extrabold">Total</dt>
            <dd className="font-extrabold">{formatPrice(subtotal)}</dd>
          </div>
        </dl>

        {formError ? (
          <p role="alert" className="mt-4 rounded-2xl bg-hot-coral/15 p-3 text-sm font-semibold text-hot-coral">
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-sunny-yellow px-6 text-lg font-extrabold text-ink shadow-pop transition hover:brightness-105 disabled:opacity-60"
        >
          {submitting ? 'Starting checkout…' : `Place order · ${formatPrice(subtotal)}`}
        </button>

        <p className="mt-3 text-center text-xs text-ink/60">
          By placing your order you agree to our{' '}
          <Link href="/terms" className="underline">
            terms
          </Link>{' '}
          and{' '}
          <Link href="/returns" className="underline">
            returns policy
          </Link>
          .
        </p>
      </aside>
    </form>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  inputMode,
  hint,
  className = '',
  required = true,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  autoComplete?: string
  inputMode?: 'numeric' | 'text' | 'tel' | 'email'
  hint?: string
  className?: string
  required?: boolean
}) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-bold">
        {label}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        className={`min-h-[44px] w-full rounded-2xl border-2 bg-white px-3 ${
          error ? 'border-hot-coral' : 'border-sky-tint focus:border-splash-blue'
        }`}
      />
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-ink/60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-hot-coral">
          {error}
        </p>
      ) : null}
    </div>
  )
}
