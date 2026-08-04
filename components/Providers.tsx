"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const dummySession = {
    user: {
      name: "Merchant",
      email: "merchant@smartpay.ai",
      image: "",
    },
    expires: "2099-01-01T00:00:00.000Z",
  };

  return (
    <SessionProvider session={dummySession}>
      {children}
    </SessionProvider>
  );
}
