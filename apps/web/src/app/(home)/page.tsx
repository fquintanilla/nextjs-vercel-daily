import BreakingNewsBanner from "@/components/breaking-news-banner";
import { Suspense } from "react";
import FeaturedArticles from "@/components/featured-articles";
import Hero from "./hero";

export default async function HomePage() {
  return (
    <main className="min-h-dvh bg-white text-neutral-950">
      <Suspense
        fallback={
          <section className="border-b border-neutral-200 bg-neutral-950 text-white">
            <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
              <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide">
                News
              </span>
              <p className="truncate text-sm text-white/90">Loading...</p>
            </div>
          </section>
        }
      >
        <BreakingNewsBanner />
      </Suspense>

      <Hero />

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedArticles />
      </Suspense>
    </main>
  );
}
