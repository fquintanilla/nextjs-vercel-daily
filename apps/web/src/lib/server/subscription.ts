import { cookies } from "next/headers";
import {
  getSubscription,
  type Subscription,
} from "@/lib/server/vercel-daily-api";

const COOKIE_NAME = "subscription_token";

export async function getSubscriptionFromCookie(): Promise<Subscription | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return getSubscription(token);
}

export function getSubscriptionCookieName(): string {
  return COOKIE_NAME;
}
