"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createOrActivateSubscriptionAction,
  deactivateSubscriptionAction,
} from "@/app/actions/subscription";

type Props = {
  isSubscribed: boolean;
};

export function SubscribeButton({ isSubscribed }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (pending) return;
    setPending(true);
    try {
      if (isSubscribed) {
        const result = await deactivateSubscriptionAction();
        if (result.success) router.refresh();
      } else {
        const result = await createOrActivateSubscriptionAction();
        if (result.success) router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  const classNames = isSubscribed
    ? "inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
    : "inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400`}";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={classNames}
    >
      {pending ? "..." : isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
}
