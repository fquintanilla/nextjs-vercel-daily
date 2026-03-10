"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { BLUR_DATA_URL } from "@/lib/constants";

type ArticleCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
};

const CATEGORIES = [
  { value: "", label: "All categories" },
  { value: "changelog", label: "Changelog" },
  { value: "engineering", label: "Engineering" },
  { value: "customers", label: "Customers" },
  { value: "company-news", label: "Company News" },
  { value: "community", label: "Community" },
] as const;

const MIN_CHARS_FOR_AUTO_SEARCH = 3;

function getDefaultRecentArticles(): ArticleCard[] {
  return [];
}

function getSearchResults(_query: string, _category: string): ArticleCard[] {
  return [];
}

export default function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category") ?? "";

  const [query, setQuery] = useState(q);
  const [category, setCategory] = useState(categoryParam);
  const [results, setResults] = useState<ArticleCard[]>([]);
  const [hasSearched, setHasSearched] = useState(!!q || !!categoryParam);
  const [isLoading, setIsLoading] = useState(false);
  const [showDefault, setShowDefault] = useState(!q && !categoryParam);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrl = useCallback(
    (newQ: string, newCategory: string) => {
      const params = new URLSearchParams();
      if (newQ) params.set("q", newQ);
      if (newCategory) params.set("category", newCategory);
      router.replace(`/search?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  const runSearch = useCallback(
    (searchQuery: string, searchCategory: string) => {
      if (!searchQuery.trim() && !searchCategory) {
        setResults(getDefaultRecentArticles());
        setShowDefault(true);
        setHasSearched(false);
        return;
      }
      setIsLoading(true);
      setShowDefault(false);
      setHasSearched(true);
      setTimeout(() => {
        const items = getSearchResults(searchQuery, searchCategory);
        setResults(items);
        setIsLoading(false);
      }, 400);
    },
    [],
  );

  useEffect(() => {
    setQuery(q);
    setCategory(categoryParam);
    if (q || categoryParam) {
      runSearch(q, categoryParam);
    } else {
      setResults(getDefaultRecentArticles());
      setShowDefault(true);
      setHasSearched(false);
    }
  }, [q, categoryParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(query, category);
    runSearch(query, category);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length >= MIN_CHARS_FOR_AUTO_SEARCH) {
      debounceRef.current = setTimeout(() => {
        updateUrl(value, category);
        runSearch(value, category);
        debounceRef.current = null;
      }, 300);
    } else if (!value && !category) {
      setShowDefault(true);
      setHasSearched(false);
      setResults(getDefaultRecentArticles());
      updateUrl("", category);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    updateUrl(query, value);
    if (query.length >= MIN_CHARS_FOR_AUTO_SEARCH || value) {
      runSearch(query, value);
    } else if (!value) {
      setShowDefault(true);
      setHasSearched(false);
      setResults(getDefaultRecentArticles());
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
        Search
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        Find articles by keyword or category.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <label htmlFor="search-input" className="sr-only">
              Search articles
            </label>
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
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
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-neutral-950 shadow-sm transition focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/20"
            >
              {CATEGORIES.map((opt) => (
                <option key={opt.value || "all"} value={opt.value}>
                  {opt.label}
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

      <section aria-live="polite" className="mt-10">
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950" />
            <p className="text-sm text-neutral-600">Searching...</p>
          </div>
        )}

        {!isLoading && showDefault && !hasSearched && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              Recent articles
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              When you search or pick a category, results will appear here.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.length === 0 ? (
                <p className="col-span-full text-sm text-neutral-500">
                  No recent articles to show. Run a search or choose a category.
                </p>
              ) : (
                results.map((a) => (
                  <article
                    key={a.id}
                    className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <Link href={`/articles/${a.slug}`} className="block">
                      <div className="relative aspect-[16/10] w-full bg-neutral-100">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-[1.02]"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                        />
                      </div>
                      <div className="p-4">
                        <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700">
                          {a.category}
                        </span>
                        <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-neutral-950">
                          {a.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                          {a.excerpt}
                        </p>
                        <time
                          dateTime={a.publishedAt}
                          className="mt-2 block text-xs text-neutral-500"
                        >
                          {formatDate(a.publishedAt)}
                        </time>
                      </div>
                    </Link>
                  </article>
                ))
              )}
            </div>
          </div>
        )}

        {!isLoading && hasSearched && results.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              Results (up to 5)
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, 5).map((a) => (
                <article
                  key={a.id}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <Link href={`/articles/${a.slug}`} className="block">
                    <div className="relative aspect-[16/10] w-full bg-neutral-100">
                      <Image
                        src={a.image}
                        alt={a.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    </div>
                    <div className="p-4">
                      <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700">
                        {a.category}
                      </span>
                      <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-neutral-950">
                        {a.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                        {a.excerpt}
                      </p>
                      <time
                        dateTime={a.publishedAt}
                        className="mt-2 block text-xs text-neutral-500"
                      >
                        {formatDate(a.publishedAt)}
                      </time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {!isLoading && hasSearched && results.length === 0 && (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center">
            <p className="text-base font-medium text-neutral-950">
              No results found
            </p>
            <p className="mt-1 text-sm text-neutral-600">
              Try different keywords or another category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
