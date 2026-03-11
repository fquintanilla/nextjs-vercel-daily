"use server";

import { listArticles } from "@/lib/server/vercel-daily-api";
import type { Article } from "@/lib/server/vercel-daily-api";

export type SearchArticleCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
};

export async function searchArticles(
  query: string,
  category: string,
): Promise<SearchArticleCard[]> {
  const { articles } = await listArticles({
    search: query.trim(),
    category: category as Article["category"] | undefined,
    limit: 12,
  });
  return articles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    category: a.category,
    image: a.image,
    publishedAt: a.publishedAt,
  }));
}
