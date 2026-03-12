"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deactivateSubscriptionAction } from "@/app/actions/subscription";

export function UnsubscribeButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (pending) return;
    setPending(true);
    try {
      const result = await deactivateSubscriptionAction();
      if (result.success) router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
    >
      {pending ? "..." : "Unsubscribe"}
    </button>
  );
}
