export function SearchLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950" />
      <p className="text-sm text-neutral-600">Searching...</p>
    </div>
  );
}
