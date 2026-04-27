# Data Contracts

Shared ecommerce types live in `src/types/`.

## Product

`Product` records power cards, listing pages, detail pages, quick view, cart, wishlist, and search. Required fields include:

- `id`, `name`, `slug`
- `category`: `men`, `women`, or `unisex`
- `productCategory`: `shoes`, `socks`, `apparel`, or `accessories`
- `collections`: collection slugs used for filtering
- `price`, optional `originalPrice`
- `colors`, `sizes`, `images`
- `description`, `features`, `materials`, `care`
- `type`, `material`, `rating`, `reviewCount`, `tags`
- `sellerId`

When adding a product, ensure its collection slugs exist or are intentionally handled by `getProductsByCollection`.

## Collection

`Collection` records provide listing page metadata:

- `id`
- `name`
- `slug`
- `description`
- `heroImage`

Collection routing depends on slug uniqueness.

## Seller

`Seller` records connect marketplace attribution to products:

- `id`
- `name`
- `slug`
- `description`
- `logo`
- `joinedYear`
- `rating`

Every product `sellerId` should match a seller `id`.

## Cart And Wishlist

Cart and wishlist state is demo-local. Do not assume persistence across sessions unless a task explicitly adds storage or a backend.
