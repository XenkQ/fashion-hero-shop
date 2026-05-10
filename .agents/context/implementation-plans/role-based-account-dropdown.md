# Role-Based Header Account Dropdown

## Summary

Add a click-triggered account dropdown in the header, backed by mock role-aware auth. Buyer users will see `Account`, `Order History`, and `Sign out`. Seller users will see `Account`, `Seller Panel`, and `Sign out`; buyer-only order history will be hidden for sellers. The current combined `/account` page will be split so `Account` shows only account details and saved addresses, while `/account/orders` shows only order history.

## Key Changes

- Replace the header account link with a button/dropdown in `Header`.
  - Logged-out click opens `/account/login`.
  - Logged-in click toggles a positioned dropdown aligned to the top-right account icon.
  - Menu items use keyboard-focusable links/buttons, close after selection, and have hover/focus background and text color changes.
  - Close the dropdown on outside click and `Escape`.
- Extend auth state with roles.
  - Add `role: "user" | "seller"` to the `User` shape.
  - Add mock accounts in the auth provider:
    - User: `user@fashionhero.test` / `user123`
    - Seller: `seller@fashionhero.test` / `seller123`
  - Exact mock emails load the matching role/name; other emails still log in as normal `user` accounts for demo flexibility.
  - New registrations default to `role: "user"`.
  - Existing localStorage users without `role` are treated as `user`.
- Split account content.
  - `/account`: account details + saved addresses only.
  - `/account/orders`: order history only, protected by the same mock auth redirect.
  - Add a lightweight `/seller` page for the seller-only dropdown item with a clear placeholder/dashboard entry point, not product management.
- Add SVGrepo-sourced inline SVG menu icons.
  - `Account`: use SVG from https://www.svgrepo.com/svg/380123/user-account-profile
  - `Order History`: use SVG from https://www.svgrepo.com/svg/6439132/order-history
  - `Seller Panel`: use SVG from https://www.svgrepo.com/vectors/seller/ or a specific seller/store SVG from that set during implementation.
  - `Sign out`: use SVG from https://www.svgrepo.com/svg/379638/sign-out
  - Implement them as local icon components in the existing icon style, with source URLs noted in code comments.

## Interfaces

- `User` becomes:
  - `email: string`
  - `firstName: string`
  - `lastName: string`
  - `role: "user" | "seller"`
- `AuthContextValue` remains mostly stable:
  - `login(email, password)` still returns `Promise<void>`, but may throw for an invalid fixed demo-account password if strict validation is added.
  - `register(...)` creates a buyer user.
  - `logout()` remains unchanged.
- New routes:
  - `/account/orders`
  - `/seller`

## Test Plan

- Run `npm run lint`.
- Run `npm run build`.
- Manual checks:
  - Logged out: account icon routes to `/account/login`.
  - Login as `user@fashionhero.test` / `user123`: dropdown shows `Account`, `Order History`, `Sign out`; no `Seller Panel`.
  - Login as `seller@fashionhero.test` / `seller123`: dropdown shows `Account`, `Seller Panel`, `Sign out`; no `Order History`.
  - `Account` opens only details/addresses; `Order History` opens only orders.
  - `Sign out` clears auth and returns to `/`.
  - Dropdown hover/focus styles visibly change background/text color.
  - Dropdown closes on outside click, `Escape`, and menu selection.
  - Mobile/small desktop header does not overlap wishlist/cart controls.

## Assumptions

- Seller product creation/editing remains out of scope.
- Seller role is only used to demonstrate conditional dropdown rendering.
- The seller route is a lightweight placeholder/dashboard entry, not the Growth VAS feature from the open spec.
- Other non-demo emails remain accepted as buyer accounts to preserve the current mock-login convenience.
