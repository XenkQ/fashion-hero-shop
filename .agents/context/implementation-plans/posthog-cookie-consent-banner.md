# Cookie Banner And PostHog Consent Plan

## Summary

Add an EU/Poland-style opt-in cookie banner for PostHog. PostHog must not initialize, capture events, call `/flags`, or create `ph_*` cookies/localStorage until the visitor accepts analytics. Rejection must keep analytics disabled, while acceptance enables full PostHog product analytics under one "Analytics" consent choice.

Sources used: PostHog JS docs on opt-in/out and config, PostHog persistence docs, PostHog Next.js docs, EDPB ePrivacy tracking guidance, and European Commission consent/cookie guidance.

## Key Changes

- Add a consent model: `AnalyticsConsent = "accepted" | "rejected"` stored as `fashionhero_cookie_consent_v1` with `status`, `version`, and `updatedAt`.
- Add a cookie banner plus settings UI:
  - Buttons: `Accept analytics`, `Reject`, `Manage preferences`.
  - One toggle: `Analytics`, covering PostHog pageviews, interactions, feature flags, and session replay if enabled in PostHog.
  - Add a persistent footer link/button: `Cookie settings`.
- Add a Cookie/Privacy details page or section explaining:
  - Vendor: PostHog EU Cloud via `NEXT_PUBLIC_POSTHOG_HOST`.
  - Purpose: product analytics, feature performance, behavior analysis, session replay if enabled.
  - Storage: PostHog may use `ph_<project_api_key>_posthog`, localStorage, device/session IDs, feature flag state, and event queues after consent.
  - Retention note: PostHog default cookie expiry is 365 days unless project config changes.
  - Withdrawal: users can reopen settings and reject analytics.

## PostHog Implementation

- Refactor `src/components/posthog-provider.tsx` so PostHog is not initialized at module load.
- Initialize only when:
  - consent is `accepted`,
  - `NEXT_PUBLIC_POSTHOG_KEY` exists,
  - host is not `localhost` or `127.0.0.1`.
- Use config defaults:
  - `defaults: "2026-01-30"`
  - `api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST`
  - `capture_pageview: false`
  - `capture_pageleave: true`
  - `autocapture: true`
  - `rageclick: true`
  - `capture_dead_clicks: true`
  - `capture_copied_text: false`
  - `enable_recording_console_log: false`
  - `person_profiles: "identified_only"`
  - `mask_all_text: true`
  - `mask_all_element_attributes: true`
- Keep the existing manual App Router `$pageview` capture, but run it only after PostHog is initialized and consent is accepted.
- On rejection or withdrawal:
  - call `posthog.opt_out_capturing()` if initialized,
  - call `posthog.set_config({ persistence: "memory" })`,
  - call `posthog.reset()`,
  - remove known `ph_` PostHog localStorage keys and project cookies where safely possible.

## Banner Copy

Use English copy matching the current storefront:

> We use PostHog analytics to understand how visitors use FashionHero, improve the shopping experience, measure feature performance, and, if enabled, review session replays. With your consent, PostHog may store analytics cookies/local storage and collect page views, interactions, device/browser information, and feature usage. You can accept, reject, or change your choice anytime.

Button labels:

- `Accept analytics`
- `Reject`
- `Manage preferences`
- Settings modal save button: `Save preferences`

## Test Plan

- `npm run lint`
- `npm run build`
- `npm run build:github`
- Before any consent:
  - no requests to `eu.i.posthog.com` or configured PostHog host,
  - no `ph_` cookies/localStorage,
  - banner is visible.
- Reject:
  - banner disappears,
  - no PostHog requests/storage,
  - reload keeps analytics disabled.
- Accept:
  - PostHog initializes,
  - `$pageview` is captured on initial page and route changes,
  - `ph_` storage appears only after consent.
- Cookie settings:
  - reopening works from footer,
  - switching from accepted to rejected stops future capture and clears PostHog persistence.
- Local dev:
  - `npm run dev` loads the banner,
  - accepting consent does not send PostHog events from localhost.

## Assumptions

- This is a compliance-oriented implementation plan, not legal advice.
- Target legal baseline is EU/Poland strict opt-in.
- One analytics toggle is acceptable for v1, but the copy must explicitly mention session replay if it can be enabled in PostHog.
- No new dependency or external CMP will be added.
