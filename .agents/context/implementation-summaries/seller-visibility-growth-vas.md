# Seller Visibility Growth VAS Implementation Summary

## Implemented

- Added a seller-only visibility entry to the account dropdown in `src/components/header.tsx`:
  - desktop account menu
  - mobile account menu
  - visible only for logged-in users with `role: "seller"`
  - routes to `/seller/visibility`
- Added the new route `src/app/seller/visibility/page.tsx`.
- Added `src/components/seller-visibility-growth.tsx` with the Growth Starter experience:
  - seller-role protection with redirects for logged-out and non-seller users
  - English UI copy
  - page eyebrow: `Growth Starter`
  - page header: `Make your products visible`
  - three package cards: `Debut`, `Trendsetter`, `Category Leader`
  - manual configuration card: `Configure manually`
  - responsive interest popup opened by package/manual selection
  - popup closes by `X`, `OK`, or `Escape`

## Package Copy

- `Debut / 299 PLN`
  - for sellers testing additional visibility with minimal investment risk
  - includes promotion for up to 3 products
  - includes a basic report and basic offer recommendations
- `Trendsetter / 599 PLN`
  - for active sellers who want to increase sales of specific products through offer optimization and analytics
  - first item: `Everything in the Debut package`
  - includes promotion for up to 6 products
  - includes ROAS/click/order reporting, description/image recommendations, and basic price benchmarks
- `Category Leader / 999 PLN`
  - for sellers treating FashionHero as a key growth channel
  - first item: `Everything in the Trendsetter package`
  - includes promotion for up to 9 products
  - includes priority controlled-slot exposure, comprehensive incrementality reporting, and price/category/offer recommendations

## Manual Configuration

- The `Configure manually` card summarizes configurable options across the package capabilities:
  - number of promoted products
  - exposure level and controlled slots
  - report scope for clicks, orders, ROAS, and incrementality
  - offer, description, image, price, and category recommendations
  - price benchmarks

## Responsive Behavior

- Desktop shows the package cards side by side when space allows.
- Mobile uses a package carousel that starts on `999 PLN`.
- Mobile arrow behavior:
  - `999 PLN`: left arrow only
  - `599 PLN`: both arrows
  - `299 PLN`: right arrow only

## Validation Fixes

- Replaced empty-cart internal `<a>` links with Next `Link` in `src/components/cart-drawer.tsx`.
- Updated localStorage-backed `recently-viewed` and `wishlist` state to use `useSyncExternalStore`.
- Moved search modal query clearing out of an effect-triggered synchronous state update.

## Verification

- `npm.cmd run lint` passes with existing unrelated warnings in:
  - `src/components/filter-sidebar.tsx`
  - `src/components/mega-menu.tsx`
- `npm.cmd run build` passes.

## Notes

- `npm run lint` and `npm run build` are blocked by PowerShell execution policy on this machine; use `npm.cmd run lint` and `npm.cmd run build`.
- The production build required network access for Next/font to fetch the configured Geist Google font.
