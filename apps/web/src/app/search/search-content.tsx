"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CategoryItem } from "@/lib/server/vercel-daily-api";
import { searchArticles } from "../actions/search";
import { SearchForm } from "./search-form";
import { SearchLoading } from "./search-loading";
import { ArticleCard } from "./article-card";
import { SearchEmptyState } from "./search-empty-state";

type SearchContentProps = {
  categories: CategoryItem[];
  defaultArticles: ArticleCard[];
};

type ArticleCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
};

const MIN_CHARS_FOR_AUTO_SEARCH = 3;

export default function SearchContent({
  categories,
  defaultArticles,
}: SearchContentProps) {
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
    async (searchQuery: string, searchCategory: string) => {
      if (!searchQuery.trim() && !searchCategory) {
        setResults(defaultArticles);
        setShowDefault(true);
        setHasSearched(false);
        return;
      }
      setIsLoading(true);
      setShowDefault(false);
      setHasSearched(true);
      try {
        const items = await searchArticles(searchQuery, searchCategory);
        setResults(items);
      } catch (e) {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [defaultArticles],
  );

  useEffect(() => {
    setQuery(q);
    setCategory(categoryParam);
    if (q || categoryParam) {
      runSearch(q, categoryParam);
    } else {
      setResults(defaultArticles);
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
      setResults(defaultArticles);
      updateUrl("", category);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    updateUrl(query, value);
    runSearch(query, value);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
        Search
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        Find articles by keyword or category.
      </p>

      <SearchForm
        query={query}
        category={category}
        categories={categories}
        onQueryChange={handleQueryChange}
        onCategoryChange={handleCategoryChange}
        onSubmit={handleSubmit}
      />

      <section aria-live="polite" className="mt-10">
        {isLoading && <SearchLoading />}

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
                results.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    categories={categories}
                  />
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
              {results.slice(0, 5).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  categories={categories}
                />
              ))}
            </div>
          </div>
        )}

        {!isLoading && hasSearched && results.length === 0 && (
          <SearchEmptyState />
        )}
      </section>
    </main>
  );
}
