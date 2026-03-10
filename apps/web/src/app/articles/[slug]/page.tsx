import TrendingArticles from "@/components/trending-articles";

import {
  getArticle,
  getTrendingArticles,
  listArticles,
} from "@/lib/server/vercel-daily-api";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SubscriptionContent } from "./subscription-content";
import { ArticleBreadcrumb } from "./article-breadcrumb";
import { ArticleMeta } from "./article-meta";
import { ArticleHeroImage } from "./article-hero-image";
import { getBaseUrl } from "@/lib/get-base-url";
import { Metadata } from "next";

export async function generateStaticParams() {
  const { articles } = await listArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

type MetadataProps = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    return {
      title: "Article Not Found",
    };
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

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const trending = await getTrendingArticles({ excludeIds: [article.id] });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article>
          <ArticleBreadcrumb currentTitle={article.title} />

          <ArticleMeta
            category={article.category}
            publishedAt={article.publishedAt ?? ""}
            authorName={article.author?.name}
          />

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-3 text-base leading-relaxed text-neutral-600">
            {article.excerpt}
          </p>

          <ArticleHeroImage
            src={article.image ?? ""}
            alt={article.title ?? ""}
          />

          {/* Only this block is dynamic (subscription + paywall/content + button) */}
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 animate-pulse h-32" />
              }
            >
              <SubscriptionContent article={article} />
            </Suspense>
          </div>
        </article>

        <aside className="lg:pt-2">
          <TrendingArticles trending={trending} />
        </aside>
      </div>
    </main>
  );
}
