import { formatDate } from "@/lib/format-date";

type ArticleMetaProps = {
  category: string;
  publishedAt: string;
  authorName?: string | null;
};

export function ArticleMeta({
  category,
  publishedAt,
  authorName,
}: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
      <span className="rounded-full bg-neutral-100 px-2 py-1 font-semibold text-neutral-700">
        {category}
      </span>
      <span aria-hidden="true" className="text-neutral-300">
        •
      </span>
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      {authorName != null && authorName !== "" && (
        <>
          <span aria-hidden="true" className="text-neutral-300">
            •
          </span>
          <span className="font-semibold text-neutral-700">{authorName}</span>
        </>
      )}
    </div>
  );
}
