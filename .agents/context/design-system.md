# Design System

The app uses Tailwind CSS v4 with shadcn/ui token conventions. Global tokens and utility classes live in `src/app/globals.css`.

## Visual Direction

- Warm ecommerce marketplace look with cream backgrounds, charcoal text, restrained borders, and large product imagery.
- Mobile-first responsive layouts.
- Product-first pages: the first viewport should show usable shopping content, not marketing-only filler.

## Tokens

Important custom tokens in `globals.css` include:

- `--color-cream`
- `--color-cream-dark`
- `--color-cream-light`
- `--color-charcoal`
- `--color-charcoal-light`
- `--color-warm-gray`
- `--color-footer-bg`

Use existing tokens and Tailwind utilities before adding new colors. If a new token is needed, add it once in `globals.css` and use it consistently.

## Components

- Use `src/components/ui/button.tsx` where it fits existing button behavior.
- Use lucide icons for new standard icon needs.
- Use existing local icons from `src/components/icons.tsx` when the visual language already exists there.
- Keep cards simple and product-focused. Avoid nesting cards inside cards.
- Keep button text short enough to fit on mobile.

## Imagery

Use local images from `public/images` for product, hero, and collection visuals. New generated or downloaded images should use descriptive paths under `public/images/<domain>/`.

For Next Image, include meaningful `alt` text and stable dimensions or fill behavior so layout does not shift.
