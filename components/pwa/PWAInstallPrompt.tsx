"use client";

import React, { useState, useEffect } from "react";
import { Download, Smartphone, X, Sparkles, CheckCircle2 } from "lucide-react";

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running as standalone app
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Register Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service Worker registered:", reg.scope))
        .catch((err) => console.error("SW Registration failed:", err));
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!sessionStorage.getItem("pwa_prompt_dismissed")) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("pwa_prompt_dismissed", "true");
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md bg-slate-900 text-white p-5 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 rounded-2xl shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Install Android / iOS App
            </div>
            <h4 className="text-sm font-black text-white">SmartPay AI OS App</h4>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-slate-400 hover:text-white p-1">
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        Install SmartPay OS on your phone home screen for offline access to QR Studio, GST Invoicing, and Merchant Calculators.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleInstallClick}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition shadow-lg shadow-emerald-600/20"
        >
          <Download className="w-4 h-4" /> Install App Now
        </button>
        <button
          onClick={handleDismiss}
          className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 font-bold rounded-xl text-xs transition"
        >
          Later
        </button>
      </div>
    </div>
  );
};
