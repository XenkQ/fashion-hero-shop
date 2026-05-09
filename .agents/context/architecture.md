# Architecture

FashionHero is a client-heavy ecommerce demo built on the Next.js App Router. Most domain state is local React state backed by static TypeScript data.

## Routing

- `src/app/page.tsx` assembles the homepage sections.
- `src/app/collections/[slug]/page.tsx` renders product listing pages from collection slugs.
- `src/app/products/[slug]/page.tsx` renders product detail pages from product slugs.
- `src/app/wishlist/page.tsx`, `src/app/checkout/page.tsx`, and `src/app/account/*` cover demo commerce flows.

## Shell And Providers

`src/components/shell.tsx` wraps pages with:

- `AuthProvider`
- `CartProvider`
- `WishlistProvider`
- `QuickViewProvider`
- `AnnouncementBar`
- `Header`
- `Footer`

When adding page-level features, place cross-page state in a provider only if multiple routes or overlays need it.

## Component Organization

- Homepage sections live in `src/components/sections/`.
- Ecommerce primitives such as product cards, filters, cart drawer, search modal, and product detail UI live in `src/components/`.
- Shared shadcn-style primitives live in `src/components/ui/`.
- Utility helpers live in `src/lib/`.

Prefer focused components that accept typed props. Avoid large page files when behavior belongs to a reusable component.

## Styling And Assets

Global Tailwind CSS v4 and shadcn/ui token wiring lives in `src/app/globals.css`. Existing custom tokens include `--color-cream`, `--color-cream-dark`, `--color-cream-light`, `--color-charcoal`, `--color-charcoal-light`, `--color-warm-gray`, and `--color-footer-bg`.

Use `src/components/ui/button.tsx` where it fits existing button behavior. Use `lucide-react` for new standard icon needs, unless `src/components/icons.tsx` already contains a matching local icon.

Use local images from `public/images` for product, hero, and collection visuals. New generated or downloaded images should use descriptive paths under `public/images/<domain>/`.

## Data Flow

Static data lives in `src/data/` and is queried by small helper functions such as `getProduct`, `getCollection`, and `getSellerById`. Route params select records by slug, then pass full typed objects into components.

Do not duplicate catalog facts in components. Add data to `src/data` and update `src/types` first.
