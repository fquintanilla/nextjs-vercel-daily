export function SearchEmptyState() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center">
      <p className="text-base font-medium text-neutral-950">No results found</p>
      <p className="mt-1 text-sm text-neutral-600">
        Try different keywords or another category.
      </p>
    </div>
  );
}
