import type { Article } from "@/lib/server/vercel-daily-api";
import type { CategoryItem } from "@/lib/server/vercel-daily-api";
import { ArticleBreadcrumb } from "@/components/article-breadcrumb";
import { ArticleMeta } from "@/components/article-meta";
import { ArticleHeroImage } from "@/components/article-hero-image";
import TrendingArticles from "@/components/trending-articles";

type ArticleDetailShellProps = {
  article: Article;
  categoryLabel: string;
  trending: Article[];
  categories: CategoryItem[];
  children: React.ReactNode;
};

export function ArticleDetailShell({
  article,
  categoryLabel,
  trending,
  categories,
  children,
}: ArticleDetailShellProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article>
          <ArticleBreadcrumb currentTitle={article.title} />

          <ArticleMeta
            category={categoryLabel}
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

          <div className="mt-8">{children}</div>
        </article>

        <aside className="lg:pt-2">
          <TrendingArticles trending={trending} categories={categories} />
        </aside>
      </div>
    </main>
  );
}
