"use client";

import React, { useEffect, useState } from "react";
import { RefreshCw, Sparkles, X } from "lucide-react";

export function AutoUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [newVersion, setNewVersion] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const localVersion = localStorage.getItem("smartpay_app_version");

          if (!localVersion) {
            // First time load
            localStorage.setItem("smartpay_app_version", data.version);
          } else if (localVersion !== data.version) {
            setNewVersion(data.version);
            setUpdateAvailable(true);
          }
        }
      } catch (e) {
        console.warn("Update check error:", e);
      }
    };

    checkForUpdates();
    const interval = setInterval(checkForUpdates, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = () => {
    if (newVersion) {
      localStorage.setItem("smartpay_app_version", newVersion);
    }
    window.location.reload();
  };

  if (!updateAvailable || dismissed) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto bg-[#152935] text-white border-2 border-[#e4a576] p-4 rounded-3xl shadow-2xl flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-[#e4a576]/20 flex items-center justify-center text-[#e4a576]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-black tracking-tight">Naya Update Available Hai!</p>
          <p className="text-[10px] text-zinc-300">Features & UI refresh v{newVersion}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleUpdate}
          className="bg-[#e4a576] hover:bg-[#d89766] text-[#152935] px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Update
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-white/10 rounded-full text-zinc-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
