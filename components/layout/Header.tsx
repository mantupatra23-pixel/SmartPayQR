"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Smartphone, ShieldCheck, UserCheck } from "lucide-react";
import { MerchantProfile } from "@/types";

interface HeaderProps {
  profile: MerchantProfile;
  onEditProfile: () => void;
}

export function Header({ profile, onEditProfile }: HeaderProps) {
  return (
    <header className="w-full bg-[#152935] text-white px-4 md:px-8 py-3.5 sticky top-0 z-40 shadow-md border-b border-[#223d4e]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand & Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#e4a576] flex items-center justify-center text-[#152935] font-black text-xl shadow-inner group-hover:scale-105 transition-transform">
            ₹
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif font-black tracking-tight text-white">
                SmartPay<span className="text-[#e4a576] font-sans font-extrabold">QR</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                NO LOGIN
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 hidden md:block">
              Free Digital Payment Counter Kit for Indian Merchants
            </p>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Merchant Profile Chip */}
          <button
            onClick={onEditProfile}
            className="flex items-center gap-2 bg-[#223d4e] hover:bg-[#2b4c60] border border-white/10 px-3 py-1.5 rounded-xl transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-[#e4a576] text-[#152935] flex items-center justify-center font-black text-xs">
              {profile.businessName.charAt(0) || "S"}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-white truncate max-w-[120px]">{profile.businessName}</p>
              <p className="text-[9px] text-[#e4a576] font-mono leading-none">{profile.category}</p>
            </div>
          </button>

          {/* GitHub APK Artifacts / Install Link */}
          <a
            href="https://github.com/mantupatra23-pixel/SmartPayQR/actions"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-black bg-[#e4a576] text-[#152935] px-3.5 py-2 rounded-xl shadow hover:bg-[#d89766] active:scale-95 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span> APK
          </a>
        </div>
      </div>
    </header>
  );
}
