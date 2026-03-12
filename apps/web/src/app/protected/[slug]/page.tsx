import { listArticles } from "@/lib/server/vercel-daily-api";
import { getArticleMetadata } from "@/lib/server/article-metadata";
import { getArticleDetailData } from "@/lib/server/article-detail-data";
import { notFound } from "next/navigation";
import { ArticleDetailShell } from "@/components/article-detail-shell";
import { RichContent } from "@/components/rich-content";
import { UnsubscribeButton } from "./unsubscribe-button";

export async function generateStaticParams() {
  const { articles } = await listArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

type Props = { params: Promise<{ slug: string }> };
type MetadataProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: MetadataProps): Promise<import("next").Metadata> {
  return getArticleMetadata((await params).slug);
}

export default async function ProtectedArticlePage({ params }: Props) {
  const { slug } = await params;
  const data = await getArticleDetailData(slug);
  if (!data) notFound();

  const { article, categoryLabel, trending, categories } = data;

  return (
    <ArticleDetailShell
      article={article}
      categoryLabel={categoryLabel}
      trending={trending}
      categories={categories}
    >
      <div className="prose prose-neutral max-w-none">
        <RichContent content={article.content ?? []} />
        <UnsubscribeButton />
      </div>
    </ArticleDetailShell>
  );
}
