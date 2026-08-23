"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Printer, Volume2, MessageCircle, BookOpen, Calculator, Smartphone, Home } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as installed PWA or Android APK wrapper
    const checkStandalone = () => {
      const isPwa = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone;
      setIsStandalone(Boolean(isPwa));
    };
    checkStandalone();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between pb-20 md:pb-0">
      <div>{children}</div>

      {/* If running as APK / PWA Standalone, show dedicated bottom tab navigation */}
      {isStandalone && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-zinc-200 py-2.5 px-4 z-50 shadow-2xl">
          <div className="max-w-md mx-auto flex items-center justify-between text-center">
            <Link href="/" className="flex flex-col items-center gap-0.5 text-zinc-600 hover:text-[#152935]">
              <Home className="w-5 h-5" />
              <span className="text-[9px] font-black">Home</span>
            </Link>
            <Link href="/standee" className="flex flex-col items-center gap-0.5 text-zinc-600 hover:text-[#152935]">
              <Printer className="w-5 h-5 text-[#e4a576]" />
              <span className="text-[9px] font-black">Standee</span>
            </Link>
            <Link href="/soundbox" className="flex flex-col items-center gap-0.5 text-zinc-600 hover:text-[#152935]">
              <Volume2 className="w-5 h-5 text-[#698ea2]" />
              <span className="text-[9px] font-black">Soundbox</span>
            </Link>
            <Link href="/khata" className="flex flex-col items-center gap-0.5 text-zinc-600 hover:text-[#152935]">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span className="text-[9px] font-black">Khata</span>
            </Link>
            <Link href="/whatsapp-bill" className="flex flex-col items-center gap-0.5 text-zinc-600 hover:text-[#152935]">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-[9px] font-black">Bills</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
