import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="mb-4 font-bold text-4xl">Article Not Found</h1>
      <p className="mb-4 text-gray-600">
        The article you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="flex gap-4">
        <Link
          href="/search"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Browse Articles
        </Link>
        <Link
          href="/"
          className="rounded bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-800"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
