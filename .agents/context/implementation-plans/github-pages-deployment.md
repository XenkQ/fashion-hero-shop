# GitHub Pages Deployment Plan

## Summary

- Target deployment URL: `https://XenkQ.github.io/fashion-hero-shop/`.
- Convert the Next.js app to a static export that publishes the generated `out/` folder through GitHub Actions.
- Use `main` as the automatic deployment branch, with manual workflow runs also available.

## Key Changes

- Update `next.config.ts` for GitHub Pages:
  - Set `output: "export"`.
  - Set `trailingSlash: true`.
  - Set `basePath: "/fashion-hero-shop"` for production builds.
  - Set `images.unoptimized: true`, because default Next image optimization is not supported by static export.
  - Expose the same base path through `NEXT_PUBLIC_BASE_PATH`.

- Add a small path helper, for example `src/lib/site-paths.ts`:
  - `withSiteBasePath(src)` prefixes local `/images/...` public assets with `/fashion-hero-shop`.
  - Do not prefix `Link` routes; Next applies `basePath` automatically for `next/link` and router navigation.

- Update all `next/image` local public asset usages to call `withSiteBasePath(...)` for image `src` values.
  - Keep existing data shapes in `src/data`.
  - Do not rewrite catalog image strings globally.

- Make `/collections/[slug]` fully static:
  - Remove server-side `searchParams` usage from `src/app/collections/[slug]/page.tsx`.
  - Keep `generateStaticParams()`.
  - Move the `seller` query handling into a client wrapper using `useSearchParams()` and render it behind `Suspense`.
  - Add `dynamicParams = false` to product and collection dynamic routes to make static export intent explicit.

- Add `.github/workflows/deploy-pages.yml`:
  - Trigger on pushes to `main` and `workflow_dispatch`.
  - Use `actions/checkout`, `actions/setup-node` with npm cache, `npm ci`, `npm run lint`, `npm run build`.
  - Add `out/.nojekyll`.
  - Upload `out/` with `actions/upload-pages-artifact`.
  - Deploy with `actions/deploy-pages` to the `github-pages` environment.

## Test Plan

- Run `npm.cmd run lint`.
- Run `npm.cmd run build`.
- Confirm build creates `out/`.
- Confirm build output has no server-rendered dynamic routes.
- Inspect generated HTML for:
  - `/_next` assets served under `/fashion-hero-shop/_next/...`.
  - public images served under `/fashion-hero-shop/images/...`.
  - product and collection detail pages generated as static files.
- After push, enable GitHub Pages source as GitHub Actions in repository settings.

## Assumptions

- Repository Pages URL is the project page: `https://XenkQ.github.io/fashion-hero-shop/`.
- Automatic deploy branch is `main`.
- Existing `next/font/google` usage can stay; GitHub Actions has network access. Local sandbox builds may need network permission for the font fetch.
- Based on current docs: Next static export is produced through `output: "export"` and writes to `out/`; default image optimization is unsupported for static export; GitHub Pages custom workflows should build, upload a Pages artifact, then deploy it.
