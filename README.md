# FashionHero Shop

FashionHero Shop is a course project and educational template created for Wojtek's AI Product Heroes workshops: <https://www.aiproductheroes.pl/>.

It gives students a professional-looking ecommerce starting point they can study, customize, and extend while learning how to work with AI across the full product-building workflow. The project is intentionally practical: instead of starting from an empty folder, participants work with a realistic Next.js storefront that already includes catalog pages, product details, cart and wishlist flows, account screens, reusable UI components, static product data, and local image assets.

## About AI Product Heroes

AI Product Heroes is an intensive product-building program focused on using AI to move from product discovery to a working prototype. The course is built around hands-on work, live sessions, practical case studies, feedback, and a final project rather than passive video consumption.

During the program, participants learn how to:

- use AI as part of a complete product workflow, from discovery to prototyping, testing, and iteration;
- identify user problems worth solving before investing in solutions;
- analyze interviews, market context, competitors, and qualitative research with AI tools;
- make product decisions using prioritization frameworks, data, and clear product reasoning;
- build working prototypes with AI-assisted tools and coding workflows;
- document product ideas with lightweight PRDs, roadmaps, metrics, and stakeholder-facing narratives;
- test prototypes with analytics, feature flags, A/B tests, session recordings, and feedback loops;
- communicate learnings and next steps through demos, pitches, and product strategy artifacts.

The course challenges students to define a business or user problem, shape it into a product opportunity, build a prototype, test it, learn from the results, and present the outcome. This repository supports that journey by acting as a realistic ecommerce base that can be redesigned, rebuilt, extended, or used as a reference implementation for AI-assisted product work.

## What Students Can Practice Here

- Reworking an existing ecommerce experience into a new brand, category, or product concept.
- Extending product, seller, collection, and cart data models.
- Building and refining product listing pages, product detail pages, checkout-adjacent flows, and account areas.
- Using AI agents to inspect references, write component specs, implement UI changes, and run visual QA.
- Practicing product-builder workflows: research, specification, implementation, validation, and iteration.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript strict
- Tailwind CSS v4 with shadcn/ui conventions
- `lucide-react` for icons
- Static catalog data in TypeScript files under `src/data`

## Getting Started

```bash
npm install
npm run dev
```

Open the dev server URL printed by Next.js.

For a live-reload server while editing files, you can also run:

```bash
npm run live
```

Then open <http://localhost:3000>. Next.js refreshes the browser as you save changes.

## Commands

```bash
npm run dev    # Start development server
npm run live   # Start live-reload development server
npm run build  # Local production build
npm run preview  # Build and preview locally on http://localhost:3002
npm run start  # Preview an existing local build on http://localhost:3002
npm run build:github  # Static export for GitHub Pages
npm run lint   # ESLint check
```

## Project Structure

```text
src/app/                Next.js routes
src/components/         Shared UI and ecommerce components
src/data/               Static product, collection, seller, and hero data
src/types/              TypeScript contracts
public/images/          Local image assets
.agents/context/        Agent-facing project documentation, research, specs, and visual references
.agents/context/implementation-plans/     Generated implementation plans
.agents/context/implementation-summaries/ Generated implementation summaries
.agents/skills/         Vendor-neutral reusable agent skills
```

## Working With AI Agents

Agents should read `AGENTS.md` first. For website rebuild or template work, fill out `TARGET.md` when available, inspect the target into `.agents/context/`, implement from specs, and verify with `npm run lint` plus `npm run build` for code changes.

This repo intentionally avoids vendor-specific agent files. Reusable agent workflows live under `.agents/skills/` using `SKILL.md`.

## License

MIT

---

# FashionHero Shop

FashionHero Shop to projekt kursowy i edukacyjny szablon przygotowany do pracy w ramach warsztatów Wojtka AI Product Heroes: <https://www.aiproductheroes.pl/>.

Repozytorium daje uczestnikom profesjonalnie wyglądający punkt startowy ecommerce, który można analizować, przebudowywać i rozwijać podczas nauki pracy z AI w pełnym procesie tworzenia produktu. Projekt jest celowo praktyczny: zamiast zaczynać od pustego katalogu, uczestnicy pracują na realistycznym sklepie w Next.js, który zawiera już katalog, strony listingu, strony produktu, koszyk, wishlistę, ekrany konta, komponenty UI, statyczne dane produktowe i lokalne assety graficzne.

## Czym Jest AI Product Heroes

AI Product Heroes to intensywny program dla osób, które chcą opanować nowoczesny workflow budowania produktów z pomocą AI: od discovery, przez prototypowanie, testowanie i analizę danych, aż po prezentację efektów. Kurs jest oparty na praktyce, sesjach live, case studies, feedbacku i własnym projekcie zaliczeniowym, a nie tylko na oglądaniu materiałów wideo.

W trakcie programu uczestnicy uczą się:

- używać AI w pełnym procesie produktowym, od discovery po prototyp, testy i iterację;
- rozpoznawać problemy użytkowników warte rozwiązania, zanim zespół zainwestuje w konkretne rozwiązanie;
- analizować wywiady, rynek, konkurencję i dane jakościowe z pomocą narzędzi AI;
- podejmować decyzje produktowe na podstawie danych, priorytetyzacji i jasnego rozumowania produktowego;
- budować działające prototypy z pomocą narzędzi AI i workflow wspierających kodowanie;
- dokumentować pomysły przez lekkie PRD, roadmapy, metryki i materiały dla interesariuszy;
- testować prototypy z użyciem analityki, feature flagów, testów A/B, nagrań sesji i feedbacku;
- prezentować wnioski, demo i plan dalszego rozwoju produktu.

Wyzwanie kursowe polega na zdefiniowaniu problemu biznesowego lub użytkownika, przełożeniu go na okazję produktową, zbudowaniu prototypu, przetestowaniu go, wyciągnięciu wniosków i zaprezentowaniu efektów. To repozytorium wspiera ten proces jako realistyczna baza ecommerce, którą można dostosować do własnego pomysłu, przebudować wizualnie, rozszerzyć funkcjonalnie albo potraktować jako referencyjny przykład pracy produktowej z AI.

## Co Można Ćwiczyć W Tym Projekcie

- Przebudowę istniejącego doświadczenia ecommerce pod nową markę, kategorię lub koncept produktowy.
- Rozszerzanie modeli danych produktów, sprzedawców, kolekcji i koszyka.
- Budowę i dopracowywanie listingów, stron produktu, ścieżek okołozakupowych i ekranów konta.
- Pracę z agentami AI przy inspekcji referencji, pisaniu specyfikacji komponentów, implementacji UI i visual QA.
- Pełny workflow product buildera: research, specyfikacja, implementacja, walidacja i iteracja.

## Stack Technologiczny

- Next.js 16 App Router
- React 19
- TypeScript strict
- Tailwind CSS v4 z konwencjami shadcn/ui
- `lucide-react` dla ikon
- Statyczne dane katalogowe w plikach TypeScript w `src/data`

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz adres lokalnego serwera wypisany przez Next.js.

## Komendy

```bash
npm run dev    # Uruchamia serwer developerski
npm run build  # Sprawdza lokalny build produkcyjny
npm run preview  # Buduje i uruchamia lokalny podglad na http://localhost:3002
npm run start  # Uruchamia istniejacy lokalny build na http://localhost:3002
npm run build:github  # Tworzy statyczny export dla GitHub Pages
npm run lint   # Uruchamia ESLint
```

## Struktura Projektu

```text
src/app/                Routing Next.js
src/components/         Wspólne komponenty UI i ecommerce
src/data/               Statyczne dane produktów, kolekcji, sprzedawców i hero
src/types/              Kontrakty TypeScript
public/images/          Lokalne assety graficzne
.agents/context/        Dokumentacja projektu dla agentów, research, specyfikacje i referencje wizualne
.agents/context/implementation-plans/     Wygenerowane plany implementacji
.agents/context/implementation-summaries/ Wygenerowane podsumowania implementacji
.agents/skills/         Neutralne narzędziowo workflow agentów
```

## Praca Z Agentami AI

Agenci powinni najpierw przeczytać `AGENTS.md`. Przy pracy nad przebudową strony lub szablonu wypełnij `TARGET.md`, jeśli jest dostępny, wykonaj inspekcję do `.agents/context/`, implementuj na podstawie specyfikacji, a przy zmianach w kodzie sprawdź wynik przez `npm run lint` i `npm run build`.

Repozytorium celowo nie zawiera plików instrukcji specyficznych dla jednego vendora narzędzi AI. Powtarzalne workflow agentów znajdują się w `.agents/skills/` jako pliki `SKILL.md`.

## Licencja

MIT
