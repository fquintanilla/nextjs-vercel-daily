import type { Metadata } from "next";
import { getArticle } from "@/lib/server/vercel-daily-api";
import { getBaseUrl } from "@/lib/get-base-url";

export async function getArticleMetadata(slug: string): Promise<Metadata> {
  const article = await getArticle(slug);
  if (!article) {
    return { title: "Article Not Found" };
  }
  const baseUrl = getBaseUrl();
  const articleUrl = `${baseUrl}/articles/${article.slug}`;
  const ogImage = article.image ? article.image : undefined;
  return {
    title: article.title ?? "Article",
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title ?? undefined,
      description: article.excerpt ?? undefined,
      url: articleUrl,
      siteName: "The Vercel Daily",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: article.title ?? undefined,
            },
          ]
        : undefined,
      type: "article",
      publishedTime: article.publishedAt ?? undefined,
      authors: article.author?.name ? [article.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title ?? undefined,
      description: article.excerpt ?? undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
