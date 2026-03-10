import { Suspense } from "react";
import SearchContent from "./search-content";

function SearchFallback() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-9 w-48 animate-pulse rounded bg-neutral-200" />
      <p className="mt-2 h-4 w-72 animate-pulse rounded bg-neutral-100" />
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="h-11 flex-1 min-w-[200px] animate-pulse rounded-xl bg-neutral-100" />
        <div className="h-11 w-40 animate-pulse rounded-xl bg-neutral-100" />
        <div className="h-11 w-24 animate-pulse rounded-xl bg-neutral-200" />
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4"
          >
            <div className="aspect-[16/10] w-full animate-pulse rounded-lg bg-neutral-100" />
            <div className="mt-3 h-4 w-20 animate-pulse rounded bg-neutral-100" />
            <div className="mt-3 h-5 w-full animate-pulse rounded bg-neutral-200" />
            <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-neutral-100" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}
