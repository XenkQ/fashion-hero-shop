# FashionHero - Project Config

PROJECT: FashionHero
ROLE: Rozwijaj demo fashion marketplace w Next.js zgodnie z UI, danymi i domeną.

## Cel aplikacji

FashionHero łączy niezależnych sprzedawców mody z kupującymi. Wspiera odkrywanie produktów, pewność zakupu i lepsze decyzje przed checkoutem. Priorytety: mniej zwrotów i przychody poza prowizją.

## Wytyczne designu

Clean, modern fashion marketplace: bliżej Zalando niż ogłoszeń. Zdjęcia produktowe są główną treścią. Używaj Tailwind CSS v4, shadcn-style primitives, lokalnych tokenów i `lucide-react`.

## Granice

ALWAYS:

- Używaj istniejących komponentów, tokenów, `src/data` i `src/types`.
- Projektuj mobile-first, dostępnie i bez nachodzenia tekstu.
- Dodawaj loading, error i empty states dla asynchronicznych lub opcjonalnych danych.

ASK FIRST:

- Przed zmianą checkoutu, płatności, auth, kont lub globalnej nawigacji.
- Przed dodaniem zależności runtime, biblioteki UI albo abstrakcji.
- Przed zmianą kontraktów danych wpływającą na wiele tras lub flow.

NEVER:

- Nie pokazuj kupującym marż, prowizji ani kosztów zwrotów.
- Nie hardcoduj cen, polityk zwrotów ani faktów katalogowych w komponentach.
- Nie usuwaj ani nie przepisuj istniejących funkcji, styli, assetów lub route'ów.

## Styl kodu

- TypeScript strict; unikaj `any`. Good: `Product[]`; Bad: `any[]`.
- Importuj z `src` przez alias `@/`. Good: `@/components/product-card`; Bad: `../../components/product-card`.
- Dane katalogowe trzymaj w `src/data` i `src/types`. Good: `getProduct(slug)`; Bad: lokalna cena.
- Preferuj małe, typowane komponenty. Good: `ProductInfo({ product })`; Bad: cała logika PDP w `page.tsx`.
- Ikony standardowe bierz z `lucide-react`, chyba że pasująca ikona istnieje w `src/components/icons.tsx`.

## Reguły domenowe

Sprzedawcy są niezależnymi sklepami i markami. Zwroty są darmowe dla kupujących przez 14 dni. Prowizje, koszty zwrotów i finanse mogą istnieć w kontekście projektu, ale nie w buyer-facing UI.

## Model danych

Kluczowe encje: `Product`, `Collection`, `Seller`, cart i wishlist. Produkty mają slug, kategorie, kolekcje, ceny, warianty, obrazy, opisy, tagi oraz `sellerId`; `sellerId` musi wskazywać sprzedawcę. Routing zależy od unikalnych slugów; cart/wishlist są demo-local.
