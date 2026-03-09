import Image from "next/image";
import Link from "next/link";
import BreakingNewsBanner from "@/components/breaking-news-banner";
import { Suspense } from "react";
import FeaturedArticles from "@/components/featured-articles";

export default async function HomePage() {
  return (
    <main className="min-h-dvh bg-white text-neutral-950">
      <Suspense fallback={<div>Loading...</div>}>
        <BreakingNewsBanner />
      </Suspense>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              The Vercel Daily
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              News and insights for modern web developers.
            </h1>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-neutral-600">
              Changelogs, engineering deep dives, customer stories, and
              community updates — all in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                Browse articles
              </Link>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                Subscribe
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:gap-6">
              <div>
                <p className="text-sm font-semibold">Weekly drops</p>
                <p className="text-sm text-neutral-600">
                  Curated reads, no noise.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Built for mobile</p>
                <p className="text-sm text-neutral-600">
                  Clean, fast, accessible.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80"
                alt="Abstract tech illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Featured story
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight">
                A practical guide to shipping faster with modern rendering
                patterns
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                A short, skimmable overview to kick off your week.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedArticles />
      </Suspense>
    </main>
  );
}
