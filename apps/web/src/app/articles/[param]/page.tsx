import Link from "next/link";

export default function ArticleDetailPage() {
  const isSubscribed = false;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Article */}
        <article>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-neutral-600"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-300">
                /
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-neutral-950 hover:underline underline-offset-4"
                >
                  Articles
                </Link>
              </li>
              <li aria-hidden="true" className="text-neutral-300">
                /
              </li>
              <li className="truncate font-semibold text-neutral-900">
                Vercel Domains overhauled with instant search and at-cost
                pricing
              </li>
            </ol>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
            <span className="rounded-full bg-neutral-100 px-2 py-1 font-semibold text-neutral-700">
              Changelog
            </span>
            <span aria-hidden="true" className="text-neutral-300">
              •
            </span>
            <time dateTime="2026-01-15T09:00:00Z">Jan 15, 2026</time>
            <span aria-hidden="true" className="text-neutral-300">
              •
            </span>
            <span className="font-semibold text-neutral-700">
              Rhys Sullivan
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Vercel Domains overhauled with instant search and at-cost pricing
          </h1>

          {/* Excerpt */}
          <p className="mt-3 text-base leading-relaxed text-neutral-600">
            We&apos;ve rebuilt Vercel Domains end to end, making it faster,
            simpler, and more affordable...
          </p>

          {/* Hero image (static placeholder) */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
            <img
              src="https://placehold.co/1600x900/png"
              alt="Article cover"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="mt-8">
            {isSubscribed ? (
              <div className="prose prose-neutral max-w-none">
                <p>
                  We&apos;ve rebuilt Vercel Domains end to end, making it
                  faster, simpler, and more affordable. The new experience
                  focuses on instant search, clean navigation, and transparent
                  pricing.
                </p>

                <h2>What changed</h2>
                <ul>
                  <li>Instant domain search with improved relevance</li>
                  <li>Simplified management flows for records and renewals</li>
                  <li>At-cost pricing with clearer breakdowns</li>
                </ul>

                <blockquote>
                  “Domains should feel effortless — search, buy, configure, and
                  ship.”
                </blockquote>

                <h2>Why it matters</h2>
                <p>
                  Better search reduces time-to-purchase, while simpler
                  management helps teams move faster without context switching.
                  Transparent pricing reduces surprises and builds trust.
                </p>

                <h2>What&apos;s next</h2>
                <p>
                  We&apos;re expanding bulk workflows and adding more advanced
                  DNS tooling for power users. Stay tuned.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Teaser */}
                <div className="prose prose-neutral max-w-none">
                  <p>
                    We&apos;ve rebuilt Vercel Domains end to end, making it
                    faster, simpler, and more affordable. The new experience
                    focuses on instant search, clean navigation, and transparent
                    pricing.
                  </p>
                </div>

                {/* Paywall */}
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <h2 className="text-lg font-semibold tracking-tight text-neutral-950">
                    Subscribe to continue reading
                  </h2>
                  <p className="mt-2 text-sm text-neutral-600">
                    This article is for subscribers. Subscribe to unlock the
                    full story.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    >
                      Subscribe
                    </button>

                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                    >
                      Back to home
                    </Link>
                  </div>

                  <div className="mt-4 text-xs text-neutral-500">
                    Already subscribed?{" "}
                    <span className="underline underline-offset-4">
                      Sign in
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Trending */}
        <aside className="lg:pt-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
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
              {[
                {
                  title:
                    "Building secure AI agents with a defense-in-depth approach",
                  date: "Jan 12, 2026",
                  category: "Engineering",
                },
                {
                  title:
                    "Edge caching strategies that improve TTFB without sacrificing freshness",
                  date: "Jan 09, 2026",
                  category: "Platform",
                },
                {
                  title:
                    "From prototype to production: shipping polished UX faster",
                  date: "Jan 04, 2026",
                  category: "Product",
                },
                {
                  title:
                    "Middleware patterns for access control without the footguns",
                  date: "Jan 02, 2026",
                  category: "Security",
                },
              ].map((t, idx) => (
                <li key={idx} className="group">
                  <Link href="/articles/example-slug" className="block">
                    <p className="line-clamp-2 text-sm font-semibold text-neutral-950 group-hover:underline underline-offset-4">
                      {t.title}
                    </p>
                    <p className="mt-1 text-xs text-neutral-600">
                      {t.date} • {t.category}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
