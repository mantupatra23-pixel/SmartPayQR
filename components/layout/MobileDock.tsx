"use client";

import React from "react";
import { Printer, Volume2, QrCode, MessageCircle, MoreHorizontal } from "lucide-react";

export type NavTab = "standee" | "soundbox" | "whatsapp" | "receipt" | "more";

interface MobileDockProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export function MobileDock({ activeTab, setActiveTab }: MobileDockProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-zinc-200 py-2 px-4 z-50 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <button
          onClick={() => setActiveTab("standee")}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === "standee" ? "text-[#152935]" : "text-zinc-400"
          }`}
        >
          <Printer className="w-5 h-5" />
          <span className="text-[9px] font-black">Standee</span>
        </button>

        <button
          onClick={() => setActiveTab("soundbox")}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === "soundbox" ? "text-[#152935]" : "text-zinc-400"
          }`}
        >
          <Volume2 className="w-5 h-5" />
          <span className="text-[9px] font-black">Soundbox</span>
        </button>

        {/* Elevated Center QR Button */}
        <button
          onClick={() => setActiveTab("standee")}
          className="flex flex-col items-center -mt-6"
        >
          <div className="w-13 h-13 p-3 rounded-full bg-[#152935] border-4 border-white text-[#e4a576] flex items-center justify-center shadow-xl active:scale-95 transition-all">
            <QrCode className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-black text-[#152935] mt-0.5">My QR</span>
        </button>

        <button
          onClick={() => setActiveTab("whatsapp")}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === "whatsapp" ? "text-[#152935]" : "text-zinc-400"
          }`}
        >
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-[9px] font-black">Quick Bill</span>
        </button>

        <button
          onClick={() => setActiveTab("more")}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === "more" ? "text-[#152935]" : "text-zinc-400"
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[9px] font-black">More</span>
        </button>
      </div>
    </nav>
  );
}
