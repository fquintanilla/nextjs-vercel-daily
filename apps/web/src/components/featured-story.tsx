import Link from "next/link";
import Image from "next/image";
import { listArticles } from "@/lib/server/vercel-daily-api";
import { BLUR_DATA_URL } from "@/lib/constants";

export default async function FeaturedStory() {
  const { articles } = await listArticles({
    featured: true,
    page: 1,
    limit: 1,
  });

  if (!articles.length) return null;
  const article = articles[0];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={article?.image || ""}
          alt={article?.title || ""}
          quality={85}
          fill
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Featured story
        </p>
        <p className="mt-2 text-lg font-semibold tracking-tight">
          {article?.title || ""}
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          {article?.excerpt || ""}
        </p>
      </div>
    </div>
  );
}
