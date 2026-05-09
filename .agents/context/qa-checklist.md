# QA Checklist

Use this checklist before handing off meaningful code, UI, or data changes.

## Static Checks

- `npm run lint`
- `npm run build`

## Functional Checks

- Home page renders all sections.
- Collection pages render valid slugs and handle invalid slugs appropriately.
- Product detail pages render product info, image gallery, sizing, related products, and recently viewed behavior.
- Cart opens, adds items, updates quantity, and removes items.
- Wishlist toggles from product cards and renders on the wishlist page.
- Search modal opens and returns expected product results.
- Mobile navigation opens, closes, and links correctly.

## Responsive Checks

Check at minimum:

- Desktop: 1440px wide
- Tablet: 768px wide
- Mobile: 390px wide

Look for text overlap, clipped buttons, image distortion, broken grids, and inaccessible controls.

## Visual Reference Checks

For target-driven work:

- Save source screenshots to `.agents/context/`.
- Save extracted specs to `.agents/context/`.
- Compare implementation against references at desktop and mobile sizes.
- Document known mismatches before handoff.
