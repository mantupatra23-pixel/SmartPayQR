"use client";

import React, { useState } from "react";
import { MerchantProfile, BusinessCategory, SupportedLanguage } from "@/types";
import { X, Store, Check, RotateCcw } from "lucide-react";

interface MerchantModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: MerchantProfile;
  onSave: (p: Partial<MerchantProfile>) => void;
  onReset: () => void;
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

const LANGUAGES: { id: SupportedLanguage; label: string }[] = [
  { id: "hi-IN", label: "Hindi (हिंदी)" },
  { id: "en-IN", label: "English" },
  { id: "or-IN", label: "Odia (ଓଡ଼ିଆ)" },
  { id: "bn-IN", label: "Bengali (বাংলা)" },
  { id: "mr-IN", label: "Marathi (मराठी)" },
  { id: "ta-IN", label: "Tamil (தமிழ்)" },
  { id: "te-IN", label: "Telugu (తెలుగు)" },
  { id: "kn-IN", label: "Kannada (ಕನ್ನಡ)" },
  { id: "ml-IN", label: "Malayalam (മലയാളം)" },
];

export function MerchantModal({ isOpen, onClose, profile, onSave, onReset }: MerchantModalProps) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<MerchantProfile>(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-[#152935] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-zinc-200">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#e4a576]" />
            <h3 className="text-base font-black uppercase tracking-wide">Edit Merchant Profile</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-zinc-100 rounded-full">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#152935]">Shop / Business Name</label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full mt-1 bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#152935]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#152935]">UPI ID / VPA</label>
            <input
              type="text"
              required
              value={formData.upiId}
              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
              className="w-full mt-1 bg-zinc-50 border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#152935]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#152935]">Shop Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as BusinessCategory })}
                className="w-full mt-1 bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#152935]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#152935]">Voice Alert Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value as SupportedLanguage })}
                className="w-full mt-1 bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#152935]"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset all saved shop details?")) {
                  onReset();
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Data
            </button>

            <button
              type="submit"
              className="bg-[#152935] hover:bg-[#223d4e] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide flex items-center gap-1.5 shadow"
            >
              <Check className="w-4 h-4 text-[#e4a576]" /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
