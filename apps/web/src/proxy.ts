import { type NextRequest, NextResponse } from "next/server";
import { getSubscriptionCookieName } from "./lib/server/subscription";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const articlesMatch = pathname.match(/^\/articles\/([^/]+)$/);
  if (articlesMatch) {
    const slug = articlesMatch[1];
    if (request.cookies.has(getSubscriptionCookieName())) {
      // Subscriber: show full article via protected route (rewrite, URL stays /articles/...)
      return NextResponse.rewrite(new URL(`/protected/${slug}`, request.url));
    }
  }

  const protectedMatch = pathname.match(/^\/protected\/([^/]+)$/);
  if (protectedMatch) {
    const slug = protectedMatch[1];
    if (!request.cookies.has(getSubscriptionCookieName())) {
      return NextResponse.redirect(new URL(`/articles/${slug}`, request.url));
    }
    return NextResponse.next();
  }

  // No cookie: continue to /articles/[slug] (preview)
  return NextResponse.next();
}

// Configure which paths run the proxy
export const config = {
  matcher: ["/articles/:slug", "/protected/:slug"],
};
