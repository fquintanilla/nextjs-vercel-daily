import "server-only";

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

const API_BASE = "https://vercel-daily-news-api.vercel.app/api";

// Because the endpoint “may return a different item on each request”,
// it must use cache: "no-store" so Next.js doesn’t cache a random value and serve it repeatedly.
export async function getBreakingNews(): Promise<BreakingNewsItem | null> {
  const token = process.env.VERCEL_PROTECTION_BYPASS;

  if (!token) {
    console.warn("Missing env var: VERCEL_PROTECTION_BYPASS");
    return null;
  }

  const res = await fetch(`${API_BASE}/breaking-news`, {
    method: "GET",
    headers: {
      "x-vercel-protection-bypass": token,
    },
    // Random response per request → don't cache
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = (await res.json()) as BreakingNewsResponse;
  if (!json.success) return null;

  return json.data;
}
