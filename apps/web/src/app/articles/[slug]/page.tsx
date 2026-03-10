import TrendingArticles from "@/components/trending-articles";
import { BLUR_DATA_URL } from "@/lib/constants";
import { formatDate } from "@/lib/format-date";
import { getArticle } from "@/lib/server/vercel-daily-api";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import { RichContent } from "@/components/rich-content";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

async function ArticleContent({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const isSubscribed = false;
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article>
          {/* Breadcrumb */}
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
                {article?.title}
              </li>
            </ol>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
            <span className="rounded-full bg-neutral-100 px-2 py-1 font-semibold text-neutral-700">
              {article?.category}
            </span>
            <span aria-hidden="true" className="text-neutral-300">
              •
            </span>
            <time>{formatDate(article?.publishedAt ?? "")}</time>
            <span aria-hidden="true" className="text-neutral-300">
              •
            </span>
            <span className="font-semibold text-neutral-700">
              {article?.author?.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            {article?.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-3 text-base leading-relaxed text-neutral-600">
            {article?.excerpt}
          </p>

          {/* Hero image (static placeholder) */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            <Image
              src={article?.image ?? ""}
              alt={article?.title ?? ""}
              quality={85}
              width={1600}
              height={900}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="mt-8">
            {isSubscribed ? (
              <div className="prose prose-neutral max-w-none">
                <RichContent content={article?.content ?? []} />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Paywall */}
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                    Subscribe to continue reading
                  </h2>
                  <p className="mt-2 text-sm text-neutral-600">
                    This article is for subscribers. Subscribe to unlock the
                    full story.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    >
                      Subscribe
                    </button>

                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    >
                      Back to home
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Trending */}
        <aside className="lg:pt-2">
          <Suspense fallback={<div>Loading...</div>}>
            <TrendingArticles params={params} />
          </Suspense>
        </aside>
      </div>
    </main>
  );
}

export default async function ArticleDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleContent params={params} />
    </Suspense>
  );
}
