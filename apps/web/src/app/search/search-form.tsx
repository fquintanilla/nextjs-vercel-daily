"use client";

import type { CategoryItem } from "@/lib/server/vercel-daily-api";

const MIN_CHARS_FOR_AUTO_SEARCH = 3;

type SearchFormProps = {
  query: string;
  category: string;
  categories: CategoryItem[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function SearchForm({
  query,
  category,
  categories,
  onQueryChange,
  onCategoryChange,
  onSubmit,
}: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <label htmlFor="search-input" className="sr-only">
            Search articles
          </label>
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-neutral-950 shadow-sm transition placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/20"
            aria-describedby="search-hint"
          />
        </div>
        <div className="w-full sm:w-48">
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-neutral-950 shadow-sm transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/20"
          >
            <option value="">All</option>
            {categories.map((opt) => (
              <option key={opt.name || "all"} value={opt.slug}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        >
          Search
        </button>
      </div>
      <p id="search-hint" className="mt-1 text-xs text-neutral-500">
        Press Enter or type at least {MIN_CHARS_FOR_AUTO_SEARCH} characters to
        search.
      </p>
    </form>
  );
}
