import Link from "next/link";
import BreakingNewsBanner from "@/components/breaking-news-banner";
import { Suspense } from "react";
import FeaturedArticles from "@/components/featured-articles";
import FeaturedStory from "@/components/featured-story";

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
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              The Vercel Daily
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
            </div>
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <FeaturedStory />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedArticles />
      </Suspense>
    </main>
  );
}
