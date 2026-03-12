import Link from "next/link";

type ArticleBreadcrumbProps = {
  currentTitle: string;
};

export function ArticleBreadcrumb({ currentTitle }: ArticleBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-600">
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
          {currentTitle}
        </li>
      </ol>
    </nav>
  );
}
