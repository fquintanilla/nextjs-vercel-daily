// apps/web/src/app/articles/[slug]/page.tsx
import TrendingArticles from "@/components/trending-articles";
import { BLUR_DATA_URL } from "@/lib/constants";
import { formatDate } from "@/lib/format-date";
import {
  getArticle,
  getTrendingArticles,
  listArticles,
} from "@/lib/server/vercel-daily-api";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SubscriptionContent } from "./subscription-content";

export async function generateStaticParams() {
  const { articles } = await listArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

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
          {/* Breadcrumb — static */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-neutral-600"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-300">
                /
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Articles
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-300">
                /
              </li>
              <li className="truncate font-semibold text-neutral-900">
                {article.title}
              </li>
            </ol>
          </nav>

          {/* Meta — static */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
            <span className="rounded-full bg-neutral-100 px-2 py-1 font-semibold text-neutral-700">
              {article.category}
            </span>
            <span aria-hidden="true" className="text-neutral-300">
              •
            </span>
            <time>{formatDate(article.publishedAt ?? "")}</time>
            <span aria-hidden="true" className="text-neutral-300">
              •
            </span>
            <span className="font-semibold text-neutral-700">
              {article.author?.name}
            </span>
          </div>

          {/* Title — static */}
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            {article.title}
          </h1>

          {/* Excerpt — static */}
          <p className="mt-3 text-base leading-relaxed text-neutral-600">
            {article.excerpt}
          </p>

          {/* Hero image — static */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            <Image
              src={article.image ?? ""}
              alt={article.title ?? ""}
              quality={85}
              width={1600}
              height={900}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="h-full w-full object-cover"
            />
          </div>

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

        {/* Trending — static */}
        <aside className="lg:pt-2">
          <TrendingArticles trending={trending} />
        </aside>
      </div>
    </main>
  );
}
