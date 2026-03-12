import {
  getArticle,
  getCategories,
  getTrendingArticles,
  type Article,
  type CategoryItem,
} from "@/lib/server/vercel-daily-api";

export type ArticleDetailData = {
  article: Article;
  categoryLabel: string;
  trending: Article[];
  categories: CategoryItem[];
};

export async function getArticleDetailData(
  slug: string,
): Promise<ArticleDetailData | null> {
  const article = await getArticle(slug);
  if (!article) return null;

  const [trending, categories] = await Promise.all([
    getTrendingArticles({ excludeIds: [article.id] }),
    getCategories(),
  ]);

  const categoryLabel =
    categories.find((c) => c.slug === article.category)?.name ??
    article.category;

  return { article, categoryLabel, trending, categories };
}
