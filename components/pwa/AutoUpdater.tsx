"use client";

import React, { useEffect, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";

export function AutoUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // Check for updates every time app opens or comes to foreground
    const checkForUpdates = async () => {
      try {
        setChecking(true);
        const res = await fetch("/version.json", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const localVersion = localStorage.getItem("smartpay_app_version");
          
          if (!localVersion) {
            localStorage.setItem("smartpay_app_version", data.version);
          } else if (localVersion !== data.version) {
            setUpdateAvailable(true);
          }
        }
      } catch (e) {
        console.log("Offline or update check skipped", e);
      } finally {
        setChecking(false);
      }
    };

    checkForUpdates();
    const interval = setInterval(checkForUpdates, 60000 * 15); // check every 15 mins
    return () => clearInterval(interval);
  }, []);

  const applyUpdate = () => {
    localStorage.removeItem("smartpay_app_version");
    window.location.reload();
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed top-16 left-4 right-4 z-50 bg-[#152935] text-white border-2 border-[#e4a576] p-3.5 rounded-2xl shadow-2xl flex items-center justify-between max-w-md mx-auto animate-bounce">
      <div className="flex items-center gap-2.5">
        <Sparkles className="w-5 h-5 text-[#e4a576]" />
        <div>
          <p className="text-xs font-black">New Update Available!</p>
          <p className="text-[10px] text-zinc-300">Instant features & bug fixes ready.</p>
        </div>
      </div>
      <button
        onClick={applyUpdate}
        className="bg-[#e4a576] text-[#152935] px-3.5 py-1.5 rounded-xl text-xs font-black uppercase flex items-center gap-1 shadow hover:opacity-90"
      >
        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Update Now
      </button>
    </div>
  );
}
