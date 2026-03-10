import Link from "next/link";
import { getCategories, listArticles } from "@/lib/server/vercel-daily-api";
import { ArticleCard } from "@/components/article-card";

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
          <ArticleCard
            key={a.id}
            article={{
              id: a.id,
              title: a.title,
              slug: a.slug,
              excerpt: a.excerpt,
              category: a.category,
              image: a.image,
              publishedAt: a.publishedAt,
            }}
            categoryLabel={slugToName.get(a.category) ?? a.category}
          />
        ))}
      </div>
    </section>
  );
}
