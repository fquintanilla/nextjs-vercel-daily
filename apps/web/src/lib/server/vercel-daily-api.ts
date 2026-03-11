import "server-only";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

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

// Subscription types
export type SubscriptionStatus = "active" | "inactive";
export type Subscription = {
  token: string;
  status: SubscriptionStatus;
  subscribedAt: string;
  createdAt: string;
  updatedAt: string;
};
type SubscriptionSuccessResponse = {
  success: true;
  data: Subscription;
};
type SubscriptionResponse = SubscriptionSuccessResponse | ApiErrorResponse;

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
  content?: ArticleContentBlock[];
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

async function apiGet<T>(url: string): Promise<T | null> {
  const res = await fetch(url, {
    method: "GET",
    headers: { "x-vercel-protection-bypass": getToken() },
    // Randomized endpoints should not cache
    cache: "no-store",
  });

  if (!res.ok) return null;
  return (await res.json()) as T;
}

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
  const json = await apiGet<ArticlesResponse | ApiErrorResponse>(
    url.toString(),
  );
  if (!json || !("success" in json) || json.success === false) {
    return { articles: [] };
  }

  console.log("*** listArticles endpoint response ***", params);
  return { articles: json.data, meta: json.meta };
}

type ArticleResponse = { success: true; data: Article } | ApiErrorResponse;
type TrendingResponse = { success: true; data: Article[] } | ApiErrorResponse;

export async function getArticle(idOrSlug: string): Promise<Article | null> {
  "use cache";
  cacheLife("article");

  const json = await apiGet<ArticleResponse>(
    `${API_BASE}/articles/${encodeURIComponent(idOrSlug)}`,
  );

  if (!json || json.success === false) return null;
  return json.data;
}

export async function getTrendingArticles(params?: {
  excludeIds?: string[];
}): Promise<Article[]> {
  "use cache";
  cacheLife("featuredArticles");

  const url = new URL(`${API_BASE}/articles/trending`);

  if (params?.excludeIds?.length) {
    url.searchParams.set("exclude", params.excludeIds.join(","));
  }

  const json = await apiGet<TrendingResponse>(url.toString());
  if (!json || json.success === false) return [];
  return json.data;
}

export type ArticleCategory =
  | "changelog"
  | "engineering"
  | "customers"
  | "company-news"
  | "community";

export type ArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "blockquote"; text: string };

async function subscriptionFetch(
  path: string,
  options: {
    method: "GET" | "POST" | "DELETE";
    subscriptionToken: string;
  },
): Promise<Response> {
  const url = `${API_BASE}${path}`;
  return fetch(url, {
    method: options.method,
    headers: {
      "x-vercel-protection-bypass": getToken(),
      "x-subscription-token": options.subscriptionToken,
    },
    cache: "no-store",
  });
}

export async function getSubscription(
  subscriptionToken: string,
): Promise<Subscription | null> {
  "use cache";
  cacheLife("subscription");
  cacheTag("subscription", `subscription-${subscriptionToken}`);

  const res = await subscriptionFetch("/subscription", {
    method: "GET",
    subscriptionToken,
  });

  if (!res.ok) return null;

  const json = (await res.json()) as SubscriptionResponse;
  if (!json.success) return null;

  return json.data;
}

export async function activateSubscription(
  subscriptionToken: string,
): Promise<Subscription | null> {
  const res = await subscriptionFetch("/subscription", {
    method: "POST",
    subscriptionToken,
  });

  if (!res.ok) return null;

  const json = (await res.json()) as SubscriptionResponse;
  if (!json.success) return null;

  return json.data;
}

export async function deactivateSubscription(
  subscriptionToken: string,
): Promise<Subscription | null> {
  const res = await subscriptionFetch("/subscription", {
    method: "DELETE",
    subscriptionToken,
  });

  if (!res.ok) return null;

  const json = (await res.json()) as SubscriptionResponse;
  if (!json.success) return null;

  revalidateTag(`subscription-${subscriptionToken}`, "max");

  return json.data;
}

export type CreateSubscriptionResult =
  | { success: true; data: Subscription; tokenFromHeader: string | null }
  | { success: false; error: ApiErrorResponse["error"] };

export async function createSubscription(): Promise<CreateSubscriptionResult> {
  const res = await fetch(`${API_BASE}/subscription/create`, {
    method: "POST",
    headers: {
      "x-vercel-protection-bypass": getToken(),
    },
    cache: "no-store",
  });

  const json = (await res.json()) as SubscriptionResponse;

  if (!res.ok || !json.success) {
    return {
      success: false,
      error: json.success === false ? json.error : undefined,
    };
  }

  const tokenFromHeader = res.headers.get("x-subscription-token");

  return {
    success: true,
    data: json.data,
    tokenFromHeader,
  };
}

// Publication config (for SEO, features, social links)
export type PublicationConfig = {
  publicationName: string;
  language: string;
  features: {
    newsletter: boolean;
    bookmarks: boolean;
    comments: boolean;
    darkMode: boolean;
    searchSuggestions: boolean;
  };
  socialLinks: {
    twitter?: string;
    github?: string;
    discord?: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
  };
};

type PublicationConfigResponse =
  | { success: true; data: PublicationConfig }
  | { success: false; error?: string };

export async function getPublicationConfig(): Promise<PublicationConfig | null> {
  "use cache";
  cacheLife("publicationConfig");

  const res = await fetch(`${API_BASE}/publication/config`, {
    method: "GET",
    headers: {
      "x-vercel-protection-bypass": getToken(),
    },
  });

  if (!res.ok) return null;

  const json = (await res.json()) as PublicationConfigResponse;
  if (!json.success || !json.data?.seo) return null;

  return json.data;
}

export type CategoryItem = {
  slug: string;
  name: string;
  articleCount: number;
};

type CategoriesResponse =
  | { success: true; data: CategoryItem[] }
  | { success: false; error?: string };

export async function getCategories(): Promise<CategoryItem[]> {
  "use cache";
  cacheLife("categories");

  const res = await fetch(`${API_BASE}/categories`, {
    method: "GET",
    headers: {
      "x-vercel-protection-bypass": getToken(),
    },
  });
  if (!res.ok) return [];
  const json = (await res.json()) as CategoriesResponse;
  if (!json.success || !Array.isArray(json.data)) return [];
  return json.data;
}
