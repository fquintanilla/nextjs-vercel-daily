# The Vercel Daily (Web)

Next.js app for **The Vercel Daily** — a news site that consumes the [Vercel Daily News API](https://vercel-daily-news-api.vercel.app) and supports article subscriptions.

Part of the [Next.js Foundations](https://github.com/vercel/nextjs-foundations) Turborepo (marketing site, port 3000).

## Features

- **Home** — Breaking news banner, hero, and featured articles
- **Articles** — Detail pages at `/articles/[slug]` with metadata and Open Graph
- **Subscription** — Cookie-based subscription; subscribers see full article content, others see a paywall CTA
- **Search** — Article search with loading and empty states

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4**
- **Shared packages:** `@repo/ui`, `@repo/api`

## Getting Started

From the **repo root**:

```bash
pnpm install
pnpm dev --filter @repo/web
```

Open [http://localhost:3000](http://localhost:3000).

From this app directory you can also run:

```bash
pnpm dev   # port 3000
pnpm build
pnpm start
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VERCEL_PROTECTION_BYPASS` | Yes | Token for the Vercel Daily News API (Vercel deployment protection bypass). Set in Vercel project settings or `.env.local`. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for Open Graph and metadata. Defaults to `https://${VERCEL_URL}` on Vercel, or `http://localhost:3000` locally. |

Create `.env.local` in the repo root (or in `apps/web`) with at least:

```env
VERCEL_PROTECTION_BYPASS=your-token
```

Pull production env vars from Vercel:

```bash
vercel env pull
```

## Project Structure (relevant to this app)

- `src/app/` — App Router routes: home `(home)/page.tsx`, `articles/[slug]/`, `search/`
- `src/components/` — UI (breaking news, featured/trending articles, subscribe button, rich content, footer, etc.)
- `src/lib/server/` — Server-only API client (`vercel-daily-api.ts`) and subscription helpers (`subscription.ts`)
- `src/lib/get-base-url.ts` — Base URL for metadata/OG

## API Integration

All content comes from `https://vercel-daily-news-api.vercel.app/api`:

- **Breaking news** — `GET /breaking-news` (no cache)
- **Articles** — `GET /articles`, `GET /articles/[id|slug]`, `GET /articles/trending`
- **Categories** — `GET /categories`
- **Subscription** — `GET/POST/DELETE /subscription` with `x-subscription-token`

The client in `src/lib/server/vercel-daily-api.ts` uses `"use cache"` and cache tags where appropriate; breaking news and subscription endpoints use `cache: "no-store"`.

## Learn More

- [Root README / AGENTS.md](../../AGENTS.md) — Monorepo setup, Turborepo, Biome, shared packages
- [Next.js Documentation](https://nextjs.org/docs)
- [Deploy on Vercel](https://vercel.com/new)
