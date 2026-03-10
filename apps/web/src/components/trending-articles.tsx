import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import type { Article } from "@/lib/server/vercel-daily-api";

type Props = {
  trending: Article[];
  categories: { slug: string; name: string }[];
};

export default function TrendingArticles({ trending, categories }: Props) {
  if (!trending.length) return null;

  const slugToName = new Map(categories.map((c) => [c.slug, c.name]));

  return (
    <aside className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-neutral-950">
          Trending
        </h2>
        <Link
          href="/search"
          className="text-xs font-semibold text-neutral-700 underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </div>

      <ul className="mt-4 space-y-3">
        {trending.map((a) => (
          <li key={a.id} className="group">
            <Link href={`/articles/${a.slug}`} className="block">
              <p className="line-clamp-2 text-sm font-semibold text-neutral-950 group-hover:underline underline-offset-4">
                {a.title}
              </p>
              <p className="mt-1 text-xs text-neutral-600">
                {formatDate(a.publishedAt)} •{" "}
                {slugToName.get(a.category) ?? a.category}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
