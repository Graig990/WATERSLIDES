'use client'

import { useState } from 'react'
import { AlertTriangle, Check, Copy, Mail } from 'lucide-react'
import { configuredCryptoAssets, getPaymentMethod } from '@/data/payments'
import { CryptoAssetLogo, PaymentMethodLogo } from '@/components/ui/PaymentMethodLogo'
import { siteConfig } from '@/data/site'
import { formatPrice } from '@/lib/utils'

export interface OrderPayment {
  method: string
  label: string
  configured: boolean
  cryptoAsset: string | null
}

function CopyableValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="rounded-2xl border-2 border-sky-tint bg-white p-3">
      <p className="text-xs font-extrabold tracking-[0.12em] text-splash-blue-ink uppercase">
        {label}
      </p>
      <div className="mt-1.5 flex items-center gap-2">
        <code className="min-w-0 flex-1 font-mono text-sm break-all text-ink">{value}</code>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            } catch {
              // Clipboard can be blocked; the value is selectable on screen.
            }
          }}
          aria-label={`Copy ${label}`}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-xl border-2 border-deep-blue px-3 text-sm font-bold text-deep-blue hover:bg-sky-tint"
        >
          {copied ? (
            <>
              <Check aria-hidden="true" className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy aria-hidden="true" className="h-4 w-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ''}
      </span>
    </div>
  )
}

/**
 * Payment instructions for a manual-settlement order.
 *
 * Nothing has been charged at this point — the customer pays out-of-band and
 * we ship once it clears. If the chosen method has no configured account, we
 * say we will email the details rather than displaying anything that looks
 * like an account to pay into. Showing a placeholder here would send real
 * money to nowhere.
 */
export function PaymentInstructions({
  payment,
  orderNumber,
  amount,
}: {
  payment: OrderPayment
  orderNumber: string
  amount: number
}) {
  const method = getPaymentMethod(payment.method)
  if (!method) return null

  const isCrypto = method.id === 'crypto'
  const asset = isCrypto
    ? configuredCryptoAssets().find((item) => item.symbol === payment.cryptoAsset)
    : undefined

  const canShowDetails = isCrypto ? Boolean(asset) : method.handle.trim().length > 0

  return (
    <section className="mt-8 rounded-3xl border-2 border-sunny-yellow bg-sunny-yellow/10 p-6">
      <h2 className="flex flex-wrap items-center gap-2 text-xl">
        {isCrypto && asset ? (
          <CryptoAssetLogo symbol={asset.symbol} className="h-7 w-7" />
        ) : (
          <PaymentMethodLogo method={method} className="h-7" />
        )}
        Pay by {isCrypto && asset ? asset.name : method.label} to complete your order
      </h2>

      <p className="mt-2 text-ink/80">
        Your order is reserved but <strong>not yet paid</strong>. Send{' '}
        <strong>{formatPrice(amount)}</strong> using the details below and quote order{' '}
        <strong>{orderNumber}</strong>. We ship as soon as the payment clears —{' '}
        {method.clearingTime.toLowerCase()}.
      </p>

      <ol className="mt-5 space-y-2">
        {method.instructions.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-deep-blue text-xs font-extrabold text-white">
              {index + 1}
            </span>
            <span className="text-ink/85">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 space-y-3">
        {canShowDetails ? (
          <>
            {isCrypto && asset ? (
              <>
                <div className="flex items-start gap-2 rounded-2xl bg-hot-coral/12 p-3 text-sm">
                  <AlertTriangle
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-hot-coral"
                  />
                  <span>
                    <strong>Send only {asset.symbol} on {asset.network}.</strong> Crypto
                    transactions cannot be reversed, and funds sent on a different network or to a
                    different asset are permanently lost. Copy the address — never retype it.
                  </span>
                </div>
                <CopyableValue label={`${asset.name} (${asset.symbol}) address`} value={asset.address} />
                <CopyableValue label="Network" value={asset.network} />
              </>
            ) : (
              <CopyableValue label={`${method.label} details`} value={method.handle} />
            )}
            <CopyableValue label="Reference / memo" value={orderNumber} />
            <CopyableValue label="Amount" value={formatPrice(amount)} />
          </>
        ) : (
          /*
           * No account configured for this method. Deliberately shows no
           * payment target at all — a placeholder handle or wallet address
           * here would cost a customer real money.
           */
          <div className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-deep-blue/40 bg-white p-4">
            <Mail aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-splash-blue-ink" />
            <div>
              <p className="font-bold text-deep-blue">
                We will email your {method.label} payment details
              </p>
              <p className="mt-1 text-sm text-ink/75">
                Your order is saved. Rather than publish payment details that might be out of
                date, we send them directly — usually within one business hour during{' '}
                {siteConfig.hours}. If you would rather not wait, call{' '}
                <a
                  href={`tel:${siteConfig.phoneE164}`}
                  className="font-bold text-splash-blue-ink underline"
                >
                  {siteConfig.phone}
                </a>{' '}
                and quote {orderNumber}.
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="mt-5 text-sm text-ink/70">
        Once you have sent payment, email{' '}
        <a
          href={`mailto:${siteConfig.supportEmail}?subject=Payment%20sent%20-%20${encodeURIComponent(orderNumber)}`}
          className="font-bold text-splash-blue-ink underline"
        >
          {siteConfig.supportEmail}
        </a>{' '}
        {isCrypto ? 'with the transaction hash ' : ''}
        so we can match it to your order straight away.
      </p>
    </section>
  )
}
