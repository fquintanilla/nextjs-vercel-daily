import Image from "next/image";
import Link from "next/link";
import BreakingNewsBanner from "@/components/breaking-news-banner";
import { Suspense } from "react";

type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  image: {
    src: string;
    alt: string;
  };
};

const mockFeatured: Article[] = [
  {
    id: "1",
    slug: "react-server-components-in-practice",
    title:
      "React Server Components in Practice: What Changes (and What Doesn’t)",
    category: "Engineering",
    publishedAt: "2026-01-14T10:00:00.000Z",
    image: {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
      alt: "Code on a screen",
    },
  },
  {
    id: "2",
    slug: "designing-for-performance-budgets",
    title: "Designing with Performance Budgets: A Practical Checklist",
    category: "Design",
    publishedAt: "2026-01-11T14:30:00.000Z",
    image: {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
      alt: "Laptop with code editor",
    },
  },
  {
    id: "3",
    slug: "the-new-basics-of-caching",
    title: "The New Basics of Caching: When to Cache, What to Cache, and Why",
    category: "Platform",
    publishedAt: "2026-01-08T09:15:00.000Z",
    image: {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
      alt: "Server racks",
    },
  },
  {
    id: "4",
    slug: "middleware-patterns-for-access-control",
    title: "Middleware Patterns for Access Control Without the Footguns",
    category: "Security",
    publishedAt: "2026-01-06T16:05:00.000Z",
    image: {
      src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80",
      alt: "Lock icon representing security",
    },
  },
  {
    id: "5",
    slug: "suspense-boundaries-that-scale",
    title: "Suspense Boundaries That Scale: A Mental Model for Teams",
    category: "Engineering",
    publishedAt: "2026-01-04T11:45:00.000Z",
    image: {
      src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80",
      alt: "Abstract visualization",
    },
  },
  {
    id: "6",
    slug: "from-prototype-to-production",
    title: "From Prototype to Production: Shipping Polished UX Faster",
    category: "Product",
    publishedAt: "2026-01-02T08:20:00.000Z",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
      alt: "Team collaborating",
    },
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default async function HomePage() {
  return (
    <main className="min-h-dvh bg-white text-neutral-950">
      <Suspense fallback={<div>Loading...</div>}>
        <BreakingNewsBanner />
      </Suspense>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              The Vercel Daily
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              News and insights for modern web developers.
            </h1>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-neutral-600">
              Changelogs, engineering deep dives, customer stories, and
              community updates — all in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                Browse articles
              </Link>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                Subscribe
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:gap-6">
              <div>
                <p className="text-sm font-semibold">Weekly drops</p>
                <p className="text-sm text-neutral-600">
                  Curated reads, no noise.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold">Built for mobile</p>
                <p className="text-sm text-neutral-600">
                  Clean, fast, accessible.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80"
                alt="Abstract tech illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Featured story
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight">
                A practical guide to shipping faster with modern rendering
                patterns
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                A short, skimmable overview to kick off your week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
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
          {mockFeatured.map((a) => (
            <article
              key={a.id}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <Link href={`/articles/${a.slug}`} className="block">
                <div className="relative aspect-[16/10] w-full bg-neutral-100">
                  <Image
                    src={a.image.src}
                    alt={a.image.alt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                    <span className="rounded-full bg-neutral-100 px-2 py-1 font-semibold text-neutral-700">
                      {a.category}
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
                    Read the full story with details, context, and practical
                    takeaways.
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
    </main>
  );
}
