import Link from "next/link";
import Image from "next/image";
import { getCategories, listArticles } from "@/lib/server/vercel-daily-api";
import { BLUR_DATA_URL } from "@/lib/constants";
import { formatDate } from "@/lib/format-date";

export default async function FeaturedArticles() {
  const { articles } = await listArticles({
    featured: false,
    page: 1,
    limit: 6,
  });

  if (!articles.length) return null;

  const categories = await getCategories();
  const slugToName = new Map(categories.map((c) => [c.slug, c.name]));

  return (
    <section className="mx-auto max-w-6xl px-4 pb-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Featured</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Handpicked stories from the team.
          </p>
        </div>

        <Link
          href="/search"
          className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <article
            key={a.id}
            className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <Link href={`/articles/${a.slug}`} className="block">
              <div className="relative aspect-[16/10] w-full bg-neutral-100">
                <Image
                  src={a.image}
                  alt={a.title}
                  quality={85}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>

              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                  <span className="rounded-full bg-neutral-100 px-2 py-1 font-semibold text-neutral-700">
                    {slugToName.get(a.category) ?? a.category}
                  </span>
                  <span aria-hidden="true" className="text-neutral-300">
                    •
                  </span>
                  <time dateTime={a.publishedAt}>
                    {formatDate(a.publishedAt)}
                  </time>
                </div>

                <h3 className="mt-3 line-clamp-2 text-lg font-semibold tracking-tight text-neutral-950">
                  {a.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                  {a.excerpt}
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
        ))}
      </div>
    </section>
  );
}
