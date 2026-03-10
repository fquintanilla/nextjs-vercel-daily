// apps/web/src/app/articles/[slug]/subscription-content.tsx
import { getSubscriptionFromCookie } from "@/lib/server/subscription";
import { SubscribeButton } from "@/components/subscribe-button";
import { RichContent } from "@/components/rich-content";
import Link from "next/link";
import type { Article } from "@/lib/server/vercel-daily-api";

type Props = {
  article: Article;
};

export async function SubscriptionContent({ article }: Props) {
  const subscription = await getSubscriptionFromCookie();
  const isSubscribed = subscription?.status === "active";

  if (isSubscribed) {
    return (
      <div className="prose prose-neutral max-w-none">
        <RichContent content={article.content ?? []} />
        <SubscribeButton isSubscribed={isSubscribed} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
          Subscribe to continue reading
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          This article is for subscribers. Subscribe to unlock the full story.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <SubscribeButton isSubscribed={isSubscribed} />
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
