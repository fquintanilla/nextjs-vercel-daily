"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { BLUR_DATA_URL } from "@/lib/constants";
import { CategoryItem } from "@/lib/server/vercel-daily-api";

export type ArticleCardData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
};

export function ArticleCard({
  article,
  categories = [],
}: {
  article: ArticleCardData;
  categories?: CategoryItem[];
}) {
  const categoryLabel =
    categories.find((c) => c.slug === article.category)?.name ??
    article.category;

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full bg-neutral-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>
        <div className="p-4">
          <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-700">
            {categoryLabel}
          </span>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-neutral-950">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
            {article.excerpt}
          </p>
          <time
            dateTime={article.publishedAt}
            className="mt-2 block text-xs text-neutral-500"
          >
            {formatDate(article.publishedAt)}
          </time>
        </div>
      </Link>
    </article>
  );
}
