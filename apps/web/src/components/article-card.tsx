"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/format-date";
import { BLUR_DATA_URL } from "@/lib/constants";

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
  categoryLabel,
}: {
  article: ArticleCardData;
  categoryLabel: string;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] w-full bg-neutral-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            quality={85}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
            <span className="rounded-full bg-neutral-100 px-2 py-1 font-semibold text-neutral-700">
              {categoryLabel}
            </span>
            <span aria-hidden="true" className="text-neutral-300">
              •
            </span>
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold tracking-tight text-neutral-950">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
            {article.excerpt}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900">
            Read more
            <span
              aria-hidden="true"
              className="transition group-hover:translate-x-0.5"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
