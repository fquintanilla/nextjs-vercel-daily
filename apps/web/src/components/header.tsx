import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950">
            <Image
              src="/vercel.svg"
              alt="Vercel"
              width={18}
              height={18}
              priority
            />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            The Vercel Daily
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
          >
            Search
          </Link>

          <button
            type="button"
            className="ml-1 inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            Subscribe
          </button>
        </nav>
      </div>
    </header>
  );
}
