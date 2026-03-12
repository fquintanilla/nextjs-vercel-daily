"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOrActivateSubscriptionAction } from "@/app/actions/subscription";

export function SubscribeButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (pending) return;
    setPending(true);
    try {
      const result = await createOrActivateSubscriptionAction();
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
      className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400`}"
    >
      {pending ? "..." : "Subscribe"}
    </button>
  );
}
