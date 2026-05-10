---
name: Urban Edge Commerce
colors:
  surface: "#fcf9f2"
  surface-dim: "#dddad3"
  surface-bright: "#fcf9f2"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f6f3ec"
  surface-container: "#f1eee7"
  surface-container-high: "#ebe8e1"
  surface-container-highest: "#e5e2db"
  on-surface: "#1c1c18"
  on-surface-variant: "#444748"
  inverse-surface: "#31312c"
  inverse-on-surface: "#f4f0e9"
  outline: "#747878"
  outline-variant: "#c4c7c7"
  surface-tint: "#5f5e5e"
  primary: "#0a0a0a"
  on-primary: "#ffffff"
  primary-container: "#212121"
  on-primary-container: "#898888"
  inverse-primary: "#c8c6c5"
  secondary: "#bb0012"
  on-secondary: "#ffffff"
  secondary-container: "#e32225"
  on-secondary-container: "#fffbff"
  tertiary: "#000921"
  on-tertiary: "#ffffff"
  tertiary-container: "#0f2041"
  on-tertiary-container: "#7888af"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#e5e2e1"
  primary-fixed-dim: "#c8c6c5"
  on-primary-fixed: "#1b1c1c"
  on-primary-fixed-variant: "#474746"
  secondary-fixed: "#ffdad6"
  secondary-fixed-dim: "#ffb4ab"
  on-secondary-fixed: "#410002"
  on-secondary-fixed-variant: "#93000c"
  tertiary-fixed: "#d8e2ff"
  tertiary-fixed-dim: "#b6c6f0"
  on-tertiary-fixed: "#081a3b"
  on-tertiary-fixed-variant: "#364669"
  background: "#fcf9f2"
  on-background: "#1c1c18"
  surface-variant: "#e5e2db"
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: "600"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: "500"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: "500"
    lineHeight: "1.3"
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: "400"
    lineHeight: "1.5"
  label-caps:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: 0.1em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.1"
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: "500"
    lineHeight: "1.2"
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
  card-gap: 20px
---

## Brand & Style

The design system is rooted in a **Minimalist Modern** aesthetic, tailored for high-end streetwear and fashion-forward audiences. The visual language prioritizes large, immersive photography and crisp typography to create a premium, gallery-like feel.

The personality is confident, clean, and technical, evoking a sense of curated excellence. By utilizing a monochromatic foundation with strategic high-energy accents, the system directs focus toward product craftsmanship and brand status. The use of generous whitespace and a strict grid ensures that even dense product listings feel organized and breathable.

Pages should remain product-first. The first viewport should show usable shopping content, strong product or collection imagery, and clear commerce actions rather than marketing-only filler.

## Colors

This design system utilizes a high-contrast monochromatic base supported by a warm neutral for structural sectioning.

- **Primary**: A deep, near-black used for all primary text, icons, and solid UI elements to maintain a grounded, premium feel.
- **Secondary (Accent)**: A vibrant, saturated red reserved exclusively for high-priority labels such as "Bestseller" and "New" tags, creating immediate visual hierarchy.
- **Tertiary**: A muted navy used sparingly for subtle state changes or secondary information.
- **Neutral**: A warm off-white/beige used as a background for specific content sections (like product carousels or featured banners) to provide subtle visual separation from the white background.

Prefer the existing palette before adding new color values. If a new color is needed, define it once in the global token layer and use it consistently.

## Typography

The system relies exclusively on **Geist**, a technical sans-serif that balances precision with modern fashion editorial sensibilities.

- **Headlines**: Use tight line heights and slight negative letter-spacing for large display text to create a high-impact, "poster" effect.
- **Body Text**: Maintain generous line heights (1.6) to ensure legibility against various background tones.
- **Labels**: Small, uppercase labels with increased tracking are used for metadata like "Sold by" or secondary navigation links, providing a technical, catalog-like appearance.

## Layout & Spacing

The layout follows a **12-column fixed-width grid** for desktop, centering the content with wide margins to emphasize the gallery aesthetic.

- **Grid System**: Product galleries use a 5-column grid for standard browsing and a 2-column or 3-column split for featured "hero" lifestyle blocks.
- **Sectioning**: Sections are separated by significant vertical padding (80px+) to allow the eye to rest and to differentiate between product categories and marketing features.
- **Rhythm**: A 4px baseline grid ensures consistent alignment of text elements within cards and navigation.
- **Mobile Adaptation**: On mobile devices, the grid collapses to a 2-column view for products, and margins are reduced to 16px to maximize image real estate.

## Elevation & Depth

The design system avoids traditional shadows in favor of **Tonal Layers and Flat Design**. Depth is created through:

- **Surface Tiers**: Alternating between `#FFFFFF` and `#ECE9E2` backgrounds to distinguish between different content zones (e.g., the transition from a hero banner to a product carousel).
- **Textural Contrast**: High-quality imagery provides the "depth," while UI elements (buttons, labels) sit strictly on top as flat, crisp overlays.
- **Ghost Borders**: Thin, low-opacity white or black outlines (1px) are used on buttons and tags to provide definition without adding visual weight.

## Shapes

The shape language is primarily **Soft (0.25rem)**, bordering on sharp. This maintains the clean, architectural feel of the brand while providing just enough refinement to feel modern.

- **Buttons & Tags**: Feature a consistent 4px corner radius.
- **Product Images**: These remain sharp (0px) to mimic physical photographs and maintain the grid's structural integrity.
- **Input Fields**: Use the same soft 4px radius for consistency across functional elements.

## Components

### Buttons

- **Primary**: Solid white or black with thin contrast borders. Labels are centered, uppercase, and use the `body-sm` font style.
- **Ghost**: Transparent background with a 1px border. Used primarily for secondary actions on top of image backgrounds.
- Keep button text short enough to fit on mobile.

### Tags & Badges

- **Status Tags**: Rectangular, sharp corners, and high-contrast. Use the secondary red for "Bestseller" and "New" to pop against white/neutral backgrounds.
- **Product Details**: Small labels for "Sold by" use the `label-caps` typography style to denote professional metadata.

### Cards

- **Product Cards**: Vertical orientation. Top-aligned image followed by left-aligned product name, category, and price. Minimal padding between image and text.
- **Feature Cards**: Large-scale images with centered or bottom-left typography overlays. These often span multiple columns.
- Avoid nesting cards inside cards. Cards should stay simple, flat, and product-focused.

### Inputs

- **Footer Inputs**: Minimalist design with a thin bottom border or a subtle contained background. Buttons inside or adjacent to inputs are often pill-shaped or sharp-edged depending on the context of the container.

## Imagery

Use large product, collection, and lifestyle images as the primary visual signal. Images should have meaningful alt text and stable dimensions or fill behavior so layouts do not shift.

## Agent Design Guidelines

- Aim for a clean, modern fashion marketplace experience. Think Zalando, not a general classifieds or auction interface.
- Product photos are primary content. Give imagery enough space and avoid clutter around product cards, galleries, and hero sections.
- Design mobile-first because most shoppers browse on phones.
- Keep interfaces practical and commerce-focused: clear navigation, readable product information, visible pricing, accessible actions, and predictable states.
- Reuse existing components, CSS tokens, layout patterns, and shadcn-style primitives before creating custom UI.
- Use icons from `lucide-react` for new controls unless the project already has a matching local icon.
