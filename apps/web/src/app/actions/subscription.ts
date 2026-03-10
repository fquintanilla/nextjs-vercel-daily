"use server";

import { cookies } from "next/headers";
import {
  createSubscription,
  activateSubscription,
  deactivateSubscription,
} from "@/lib/server/vercel-daily-api";
import { getSubscriptionCookieName } from "@/lib/server/subscription";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: "/",
};

export async function createOrActivateSubscriptionAction(): Promise<
  { success: true; status: string } | { success: false; error?: string }
> {
  const [cookieStore, result] = await Promise.all([
    cookies(),
    createSubscription(),
  ]);

  if (!result.success) {
    return {
      success: false,
      error: result.error?.message ?? "Failed to create subscription",
    };
  }

  const token = result.tokenFromHeader ?? result.data.token;
  if (!token) {
    return { success: false, error: "No token in response" };
  }

  cookieStore.set(getSubscriptionCookieName(), token, COOKIE_OPTIONS);

  const activateResult = await activateSubscription(token);
  if (!activateResult) {
    return { success: false, error: "Failed to activate subscription" };
  }

  return { success: true, status: activateResult.status };
}

export async function deactivateSubscriptionAction(): Promise<
  { success: true } | { success: false; error?: string }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSubscriptionCookieName())?.value;
  if (!token) {
    return { success: false, error: "No subscription token" };
  }

  const result = await deactivateSubscription(token);
  if (!result) {
    return { success: false, error: "Failed to deactivate" };
  }

  cookieStore.delete(getSubscriptionCookieName());
  return { success: true };
}
