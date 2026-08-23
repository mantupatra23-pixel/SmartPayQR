"use client";

import { useEffect, useState } from "react";

export function useWakeLock() {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let sentinel: any = null;

    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          sentinel = await (navigator as any).wakeLock.request("screen");
          setIsLocked(true);
        }
      } catch (err) {
        console.log("WakeLock skipped/unsupported:", err);
      }
    };

    requestWakeLock();

    return () => {
      if (sentinel) {
        sentinel.release().then(() => setIsLocked(false));
      }
    };
  }, []);

  return { isLocked };
}
