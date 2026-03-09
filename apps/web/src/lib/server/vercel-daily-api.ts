import { cacheLife } from "next/cache";

import "server-only";

const API_BASE = "https://vercel-daily-news-api.vercel.app/api";

function getToken() {
  const token = process.env.VERCEL_PROTECTION_BYPASS;
  if (!token) throw new Error("Missing env var: VERCEL_PROTECTION_BYPASS");
  return token;
}

export type BreakingNewsItem = {
  id: string;
  headline: string;
  summary: string;
  articleId: string;
  category: string;
  publishedAt: string;
  urgent: boolean;
};

type BreakingNewsResponse =
  | { success: true; data: BreakingNewsItem }
  | { success: false; error?: string };

// Because the endpoint “may return a different item on each request”,
// it must use cache: "no-store" so Next.js doesn’t cache a random value and serve it repeatedly.
export async function getBreakingNews(): Promise<BreakingNewsItem | null> {
  const res = await fetch(`${API_BASE}/breaking-news`, {
    method: "GET",
    headers: {
      "x-vercel-protection-bypass": getToken(),
    },
    // Random response per request → don't cache
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = (await res.json()) as BreakingNewsResponse;
  if (!json.success) return null;

  return json.data;
}

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category:
    | "changelog"
    | "engineering"
    | "customers"
    | "company-news"
    | "community";
  author: { name: string; avatar: string };
  image: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
};

type ArticlesResponse = {
  success: true;
  data: Article[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
};

type ApiErrorResponse = {
  success: false;
  error?: { code: string; message: string; details: unknown };
};

export async function listArticles(params?: {
  page?: number;
  limit?: number;
  category?: Article["category"];
  search?: string;
  featured?: boolean;
}): Promise<{ articles: Article[]; meta?: ArticlesResponse["meta"] }> {
  "use cache";
  cacheLife("featuredArticles");

  const url = new URL(`${API_BASE}/articles`);

  if (params?.page) url.searchParams.set("page", String(params.page));
  if (params?.limit) url.searchParams.set("limit", String(params.limit));
  if (params?.category) url.searchParams.set("category", params.category);
  if (params?.search) url.searchParams.set("search", params.search);
  if (typeof params?.featured === "boolean") {
    url.searchParams.set("featured", params.featured ? "true" : "false");
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: { "x-vercel-protection-bypass": getToken() },
    // Safe default: always fetch fresh for now
    cache: "no-store",
  });

  if (!res.ok) {
    return { articles: [] };
  }

  const json = (await res.json()) as ArticlesResponse | ApiErrorResponse;
  if (!("success" in json) || json.success === false) return { articles: [] };

  return { articles: json.data, meta: json.meta };
}
