# Payment method logos

Drop the official SVG for each payment method into this folder, then set its
`logoFile` in `src/data/payments.ts`. The site switches from the placeholder
brand chip to the real logo automatically.

## Why these are not already here

Zelle, Chime, Cash App and Apple Pay are registered trademarks. Their artwork
is not ours to redistribute in this repository, and an approximation drawn
from memory would be a distorted fake — worse than showing nothing.

Each company publishes the real files, usually with a short brand guideline
PDF. Download them yourself so you are the one accepting the usage terms.

## Where to get each one

| File to save here | Where to download | Notes |
| --- | --- | --- |
| `zelle.svg` | Zelle's brand/partner assets at **zellepay.com** | Guidelines cover minimum size and clear space. Zelle marks are generally for businesses enrolled through a participating bank. |
| `chime.svg` | Chime's press/brand page at **chime.com** | Ask their support if a public brand kit is not posted. |
| `cashapp.svg` | Cash App / Block brand assets at **cash.app** | Cash App for Business has its own approved badge — use that one if you are on a business account. |
| `applepay.svg` | **developer.apple.com** → Apple Pay Marketing Guidelines | See the warning below before using this. |
| `btc.svg`, `eth.svg`, `usdt.svg` | Not needed | Faithful marks are already drawn in `src/components/ui/PaymentLogos.tsx`. Bitcoin's is public domain and Ethereum publishes its assets for open use. Only add files here to override them. |

## ⚠️ Apple Pay — check this before you use the mark

The Apple Pay mark denotes payment through **Apple Pay**, which merchants
accept via a payment processor. What this site currently describes is a
person-to-person **Apple Cash** transfer sent through Messages — a different
product.

Displaying the Apple Pay logo for that is likely to breach Apple's marketing
guidelines and, more practically, misleads customers about how they will pay.
Either:

- accept genuine Apple Pay through a processor, then use the mark; or
- relabel this method in `src/data/payments.ts` to describe what it actually
  is, and leave the Apple Pay logo off.

## Requirements for the files

- **SVG**, with a transparent background
- Cropped to the artwork, no built-in padding
- Should read clearly at 24px tall — use each brand's compact or icon variant
  where they publish one
- Keep the original colours; do not recolour to match the site

## Once the files are here

```ts
// src/data/payments.ts
{
  id: 'zelle',
  ...
  logoFile: 'zelle.svg',   // resolves to /brand/payments/zelle.svg
}
```

Then rebuild and check the footer and the checkout payment step.
