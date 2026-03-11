import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";

async function CopyrightYear() {
  await connection(); // Opt out of prerendering - Date.now() needs request time
  const year = new Date().getFullYear();
  return (
    <div className="mt-10 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
      <p>© {year} The Vercel Daily. All rights reserved.</p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950">
                <Image src="/vercel.svg" alt="Vercel" width={18} height={18} />
              </span>
              <span className="text-sm font-semibold tracking-tight">
                The Vercel Daily
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-neutral-600">
              News and insights for modern web developers.
            </p>
          </div>

          <div className="grid gap-2 text-sm">
            <p className="font-semibold text-neutral-900">Explore</p>
            <Link href="/" className="text-neutral-600 hover:text-neutral-900">
              Home
            </Link>
            <Link
              href="/search"
              className="text-neutral-600 hover:text-neutral-900"
            >
              Search
            </Link>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CopyrightYear />
        </Suspense>
      </div>
    </footer>
  );
}
