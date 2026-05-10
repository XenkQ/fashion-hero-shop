# Role-Based Account Dropdown Implementation Summary

## Implemented

- Added role-aware mock auth in `src/components/auth-provider.tsx`:
  - `role: "user" | "seller"` on the user shape
  - buyer demo login: `user@fashionhero.test` / `user123`
  - seller demo login: `seller@fashionhero.test` / `seller123`
  - non-demo emails still log in as buyer users
  - new registrations default to buyer users
  - stored users without a role normalize to `user`
- Replaced the desktop account link in `src/components/header.tsx` with a click-triggered dropdown.
- Added desktop dropdown behavior:
  - logged-out account click routes to `/account/login`
  - logged-in click toggles the menu
  - closes on outside click, `Escape`, menu selection, and sign out
  - buyer menu: `Account`, `Order History`, `Sign out`
  - seller menu: `Account`, `Sign out`
  - hover/focus styles and pointer cursor on menu items
- Added mobile account navigation inside the existing hamburger drawer:
  - logged-out users see `ACCOUNT` as a login link
  - logged-in buyers see expandable `ACCOUNT` with `Account`, `Order History`, `Sign out`
  - logged-in sellers see expandable `ACCOUNT` with `Account`, `Sign out`
- Split account routes:
  - `/account` now shows only account details and saved addresses
  - `/account/orders` now shows buyer order history
- Added lightweight `/seller` placeholder route for seller-role redirects and future seller dashboard work.
- Added local inline SVG menu icons in `src/components/icons.tsx` with SVGrepo source comments.
- Updated `src/app/account/login/page.tsx` to surface invalid demo-account password errors.

## Behavior

- Buyer-only order history is hidden from seller dropdowns and mobile account menu.
- Sellers who reach `/account/orders` are redirected to `/seller`.
- Non-sellers who reach `/seller` are redirected to `/account`.
- Sign out clears the mock auth user and returns to `/`.
- Mobile account options follow the same expandable pattern as the mobile Men/Women/Sale/New hamburger navigation.

## Verification

- `npm.cmd run build` passes.
- `npm.cmd run lint` still fails on unrelated existing issues outside this implementation:
  - `src/components/cart-drawer.tsx` uses raw `<a>` links for internal navigation.
  - `src/components/recently-viewed.tsx`, `src/components/search-modal.tsx`, and `src/components/wishlist-provider.tsx` trip `react-hooks/set-state-in-effect`.
  - `src/components/filter-sidebar.tsx` and `src/components/mega-menu.tsx` have unused-variable warnings.

## Notes

- `npm run lint` and `npm run build` are blocked by PowerShell execution policy on this machine; use `npm.cmd run lint` and `npm.cmd run build`.
- Production build required permission for Next/font to fetch the configured Google font.
- A first-pass `useSyncExternalStore` auth snapshot caused a runtime loop because parsed localStorage objects had unstable identity. The auth provider now caches the raw storage value and parsed user snapshot.
