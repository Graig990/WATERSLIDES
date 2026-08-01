/**
 * ============================================================================
 * PAYMENT METHODS
 * ============================================================================
 *
 * These are all MANUAL-SETTLEMENT methods. Nothing here is processed by a
 * card gateway, which has three consequences the code depends on:
 *
 *   1. Placing an order does not take money. The customer receives payment
 *      instructions and pays out-of-band; you confirm receipt and then ship.
 *      Orders are therefore "awaiting payment", never "paid".
 *   2. There is no chargeback mechanism and no buyer/seller protection on
 *      any of these rails. Confirm funds have actually cleared before you
 *      ship — Zelle and Cash App payments can be reversed by the sending
 *      bank in fraud cases, and crypto cannot be reversed at all.
 *   3. Zelle, Chime and Cash App are peer-to-peer consumer services. Their
 *      terms generally restrict or exclude business use, and using a personal
 *      account for commercial volume risks the account being frozen. Use a
 *      business account where the provider offers one (Cash App for Business,
 *      Zelle through a business bank account) and check the current terms.
 *
 * ⚠️  WALLET ADDRESSES ARE INTENTIONALLY EMPTY.
 * Crypto sent to a wrong address is gone permanently — there is no recovery,
 * no support line, and no reversal. No placeholder, example, or "test"
 * address appears anywhere in this codebase for that reason.
 *
 * The UI checks `isMethodConfigured()` and will not display payment details
 * for any method that has not been filled in. An unconfigured method tells
 * the customer we will contact them instead. Fill in your real details below
 * and the instructions appear automatically.
 *
 * TODO: replace every empty string with your real handle / address, then
 * verify each one by sending yourself a small test payment BEFORE launch.
 * For crypto, copy-paste the address from your wallet — never retype it.
 * ============================================================================
 */

export type PaymentMethodId = 'zelle' | 'chime' | 'cashapp' | 'apple-pay' | 'crypto'

export interface CryptoAsset {
  /** Ticker shown to the customer. */
  symbol: 'BTC' | 'ETH' | 'USDT'
  name: string
  /**
   * The network the address belongs to. Sending on the wrong network loses
   * the funds, so this is always displayed alongside the address.
   */
  network: string
  /** TODO: paste from your wallet. Empty = not offered. */
  address: string
}

export interface PaymentMethod {
  id: PaymentMethodId
  label: string
  /** Shown on the checkout radio. */
  blurb: string
  /** Emoji marker — these brands' logos are trademarked and not ours to ship. */
  glyph: string
  /** The account identifier the customer sends to. Empty = not configured. */
  handle: string
  /** Displayed above the payment details on the confirmation page. */
  instructions: string[]
  /** Roughly how long funds take to clear, for expectation-setting. */
  clearingTime: string
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'zelle',
    label: 'Zelle',
    blurb: 'Bank-to-bank transfer. Usually clears in minutes.',
    glyph: '⚡',
    handle: '', // TODO: the email or US mobile number registered with Zelle
    clearingTime: 'Usually minutes, occasionally up to 1 business day',
    instructions: [
      'Open your banking app and choose Send Money with Zelle.',
      'Send the exact order total to the details below.',
      'Put your order number in the memo field so we can match the payment.',
    ],
  },
  {
    id: 'chime',
    label: 'Chime',
    blurb: 'Pay by Chime transfer using your $ChimeSign.',
    glyph: '💚',
    handle: '', // TODO: your $ChimeSign, including the leading $
    clearingTime: 'Usually instant between Chime accounts',
    instructions: [
      'Open Chime and go to Pay Anyone.',
      'Send the exact order total to the $ChimeSign below.',
      'Add your order number as the note.',
    ],
  },
  {
    id: 'cashapp',
    label: 'Cash App',
    blurb: 'Pay with your $Cashtag.',
    glyph: '💵',
    handle: '', // TODO: your $Cashtag, including the leading $
    clearingTime: 'Usually instant',
    instructions: [
      'Open Cash App and enter the exact order total.',
      'Send to the $Cashtag below.',
      'Add your order number in the "For" field.',
    ],
  },
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    blurb: 'Pay from Apple Wallet on iPhone, iPad or Mac.',
    glyph: '',
    handle: '', // TODO: the Apple Cash phone number/email, or leave empty
    clearingTime: 'Usually instant',
    instructions: [
      'Open Messages on your Apple device and start a message to the number below.',
      'Tap the Apple Pay button and enter the exact order total.',
      'Include your order number in the message.',
    ],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    blurb: 'BTC, ETH or USDT. Irreversible — check the network carefully.',
    glyph: '₿',
    handle: '',
    clearingTime: 'BTC ~10–60 min · ETH/USDT ~1–5 min after confirmations',
    instructions: [
      'Send the exact USD equivalent at the time of payment.',
      'Check the network before sending — funds sent on the wrong network cannot be recovered.',
      'Email us the transaction hash with your order number so we can match it.',
    ],
  },
]

/**
 * TODO: paste real addresses from your wallet. Leave any asset you do not
 * want to accept as an empty string and it will not be offered.
 */
export const cryptoAssets: CryptoAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin mainnet', address: '' },
  { symbol: 'ETH', name: 'Ethereum', network: 'Ethereum mainnet (ERC-20)', address: '' },
  { symbol: 'USDT', name: 'Tether', network: 'Ethereum (ERC-20)', address: '' },
]

export const paymentMethodsById = new Map(paymentMethods.map((method) => [method.id, method]))

export function getPaymentMethod(id: string): PaymentMethod | undefined {
  return paymentMethodsById.get(id as PaymentMethodId)
}

/** Crypto assets that actually have an address set. */
export function configuredCryptoAssets(): CryptoAsset[] {
  return cryptoAssets.filter((asset) => asset.address.trim().length > 0)
}

/**
 * Whether we can show the customer real payment details for this method.
 * When false the UI promises follow-up by email instead of displaying
 * anything that looks like an account to pay into.
 */
export function isMethodConfigured(method: PaymentMethod): boolean {
  if (method.id === 'crypto') return configuredCryptoAssets().length > 0
  return method.handle.trim().length > 0
}

/** True when nothing at all has been filled in — used to warn in dev. */
export function hasAnyConfiguredMethod(): boolean {
  return paymentMethods.some(isMethodConfigured)
}

/** Footer badges. Crypto expands to the assets we actually accept. */
export function paymentBadges(): string[] {
  const base = paymentMethods.filter((m) => m.id !== 'crypto').map((m) => m.label)
  const crypto = configuredCryptoAssets().map((asset) => asset.symbol)
  return [...base, ...(crypto.length > 0 ? crypto : ['BTC', 'ETH', 'USDT'])]
}
