import { getBreakingNews } from "@/lib/server/vercel-daily-api";
import Link from "next/link";

export default async function BreakingNewsBanner() {
  const breakingNews = await getBreakingNews();

  if (!breakingNews) return null;

  return (
    <section className="border-b border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide">
          {breakingNews?.urgent ? "Breaking" : "News"}
        </span>

        <p className="truncate text-sm text-white/90">
          {breakingNews?.headline}
        </p>

        <Link
          href={`/articles/${breakingNews?.articleId}`}
          className="ml-auto hidden text-xs text-white/70 underline-offset-4 hover:underline sm:inline"
        >
          Read →
        </Link>
      </div>
    </section>
  );
}
