"use client";

import React, { useState } from "react";
import { MerchantProfile, StandeeTheme, BusinessCategory } from "@/types";
import { STANDEE_THEMES } from "@/lib/themes";
import { Store, Palette, Image as ImageIcon, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface QRGeneratorProps {
  profile: MerchantProfile;
  onUpdateProfile: (p: Partial<MerchantProfile>) => void;
  amount: string;
  setAmount: (a: string) => void;
  selectedTheme: StandeeTheme;
  onSelectTheme: (t: StandeeTheme) => void;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logoUrl?: string;
  onRemoveLogo: () => void;
}

const CATEGORIES: BusinessCategory[] = [
  "Kirana Store",
  "Chai Stall",
  "Cafe",
  "Restaurant",
  "Salon",
  "Freelancer",
  "Boutique",
  "Pharmacy",
  "Electronics",
  "Street Vendor",
  "Other",
];

export function QRGenerator({
  profile,
  onUpdateProfile,
  amount,
  setAmount,
  selectedTheme,
  onSelectTheme,
  onLogoUpload,
  logoUrl,
  onRemoveLogo,
}: QRGeneratorProps) {
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
  const isUpiValid = upiRegex.test(profile.upiId);

  return (
    <div className="space-y-6">
      {/* 1. Theme Picker Tray */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-[#152935] uppercase tracking-wide flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-[#e4a576]" /> Select Standee Theme
          </label>
          <span className="text-[10px] font-bold text-zinc-400">8 Presets Available</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STANDEE_THEMES.map((thm) => (
            <button
              key={thm.id}
              onClick={() => onSelectTheme(thm)}
              className={`p-2.5 rounded-2xl text-left border transition-all ${
                selectedTheme.id === thm.id
                  ? "bg-[#152935] text-white border-[#152935] shadow-md"
                  : "bg-zinc-50 border-zinc-200 text-[#152935] hover:bg-zinc-100"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-3 h-3 rounded-full border border-black/10 inline-block"
                  style={{ backgroundColor: thm.accent }}
                />
                <span className="text-xs font-bold truncate">{thm.name}</span>
              </div>
              <p className={`text-[9px] line-clamp-1 ${selectedTheme.id === thm.id ? "text-zinc-300" : "text-zinc-500"}`}>
                {thm.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Standee Details Input Form */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <h2 className="text-sm font-black text-[#152935] uppercase tracking-wide flex items-center gap-2">
            <Store className="w-4 h-4 text-[#698ea2]" /> Standee Configuration
          </h2>
          <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">
            Live Preview
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#152935]">Shop / Business Name</label>
            <input
              type="text"
              value={profile.businessName}
              onChange={(e) => onUpdateProfile({ businessName: e.target.value })}
              className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
              placeholder="e.g. Royal Cafe"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#152935]">UPI ID / VPA</label>
              {isUpiValid ? (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Valid
                </span>
              ) : (
                <span className="text-[10px] text-red-500 font-bold flex items-center gap-0.5">
                  <AlertCircle className="w-3 h-3" /> Format: name@bank
                </span>
              )}
            </div>
            <input
              type="text"
              value={profile.upiId}
              onChange={(e) => onUpdateProfile({ upiId: e.target.value })}
              className={`w-full mt-1 bg-zinc-50 border rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#152935] focus:outline-none ${
                isUpiValid ? "border-zinc-200 focus:border-[#152935]" : "border-red-400 focus:border-red-500"
              }`}
              placeholder="e.g. merchant@okaxis"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#152935]">Category</label>
            <select
              value={profile.category}
              onChange={(e) => onUpdateProfile({ category: e.target.value as BusinessCategory })}
              className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#152935]">Custom Header Tagline</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => onUpdateProfile({ tagline: e.target.value })}
              className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
              placeholder="e.g. Scan & Pay Any UPI"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="text-xs font-bold text-[#152935]">Preset Amount (Optional ₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Leave blank for dynamic price"
              className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#152935] flex items-center justify-between">
              <span>Shop Logo (Optional)</span>
              {logoUrl && (
                <button
                  type="button"
                  onClick={onRemoveLogo}
                  className="text-[10px] text-red-500 font-bold hover:underline"
                >
                  Remove
                </button>
              )}
            </label>
            <label className="w-full mt-1 bg-zinc-50 border border-dashed border-zinc-300 hover:border-[#152935] cursor-pointer rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-500 flex items-center justify-center gap-2 transition-colors">
              <ImageIcon className="w-4 h-4 text-[#e4a576]" />
              <span className="truncate">{logoUrl ? "Change Logo Image" : "Upload PNG/JPG Logo"}</span>
              <input type="file" accept="image/*" onChange={onLogoUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
