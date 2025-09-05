"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  useEffect(() => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    (async () => {
      try {
        const res = await fetch("/api/users/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        console.log("Existing user:", data);
      } catch (err) {
        console.error("User check failed", err);
      }
    })();
  }, [user?.primaryEmailAddress?.emailAddress]);

  return <>{children}</>;
}
