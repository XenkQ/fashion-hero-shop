# Mobile Flash Deals Prototype Plan

## Summary

Build a session-persistent flash deal campaign with a fixed 20% discount, a 15:00 global countdown, a mobile-first homepage carousel above `Our Favorites`, and a bottom sticky/fixed PDP timer banner for eligible products. Use `zustand` as the state management library because the repo currently has no external state library and this feature needs shared countdown state across routes.

## Key Changes

- Add `zustand` dependency and create a flash-deal store with `endsAt`, `remainingSeconds`, `isFlashDealActive`, sessionStorage persistence, 1-second ticking, and automatic expiration at `00:00`.
- Add shared pricing helpers for 20% discount calculation, original/new price display, and active-only discount behavior.
- Extend `Product` with `isFlashDeal?: boolean`.
- Mark these curated products as flash deals: `Cloud Runner`, `Trail Pacer`, `Dash Sport`, `Lightweight Jacket`, `Street Runner X`, `Stealth Hoodie`.
- Update price rendering so active flash-deal products show original price as strikethrough and discounted price in `text-destructive`; expired deals render original pricing only.

## UI Implementation

- Add `FlashDealCarousel` as a client component and place it directly above `ProductCarousel` / `Our Favorites` in `src/app/page.tsx`.
- Carousel behavior: render only while active, use a high-contrast section background, support mobile-first horizontal scroll with snap cards, and show countdown plus product price deltas.
- Add `FloatingTimerBanner` on PDP: render only for `product.isFlashDeal === true` and active deals, anchor to the bottom viewport, and include countdown, 20% discount message, original price, and discounted price.
- Update existing price surfaces to use the shared helper where relevant: `ProductCard`, `ProductInfo`, `QuickViewModal`, `SearchModal`, cart drawer, and checkout.

## Expiration Behavior

- When countdown reaches `00:00`, `FlashDealCarousel` and `FloatingTimerBanner` return `null` and are removed from the DOM.
- Product, cart, checkout, quick-view, and search prices immediately render the original product price only.

## Test Plan

- Run `npm run lint`.
- Run `npm run build`.
- Manual QA home, PDP, cart, checkout, search, active countdown persistence, and expiration behavior on mobile and desktop.

## Assumptions

- The prototype should use a real external state library, so `zustand` will be added.
- Countdown is session-persistent per browser tab via `sessionStorage`.
- The discount is display/runtime logic only; base catalog `price` values remain unchanged.
- Existing sale products keep their current sale behavior unless explicitly marked as flash deals later.
