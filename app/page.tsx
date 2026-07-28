// app/page.tsx
"use client";

import React, { useState, useRef } from "react";
import { PosterPreview } from "@/components/qr/PosterPreview";
import { ActionButtons } from "@/components/qr/ActionButtons";
import { AffiliateCard } from "@/components/cards/AffiliateCard";
import { MONETIZATION_CARDS } from "@/config/affiliates";
import { NamePayData } from "@/types/qr";
import { QrCode, Sparkles, ShieldCheck } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState<NamePayData>({
    name: "",
    upiId: "",
    mobile: "",
    address: "",
    note: "",
    amount: ""
  });

  const posterRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-xl text-white">
              <QrCode size={20} />
            </div>
            <div>
              <h1 className="font-black text-lg text-slate-900 tracking-tight leading-none">
                SmartPay <span className="text-emerald-600">QR</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">Free Printable UPI Generator</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck size={12} /> 100% Secure
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Inputs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 border-b pb-3">
            <Sparkles size={16} className="text-emerald-600" /> Enter Payment Details
          </h2>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Business / Personal Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Patra General Store"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              UPI ID *
            </label>
            <input
              type="text"
              name="upiId"
              placeholder="e.g. merchant@okicici"
              value={formData.upiId}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="9876543210"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Fixed Amount (Optional)
              </label>
              <input
                type="number"
                name="amount"
                placeholder="₹ 0"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Shop Address (Optional)
            </label>
            <input
              type="text"
              name="address"
              placeholder="e.g. Main Market, City"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Live Preview & Download Controls */}
        <div className="flex flex-col items-center">
          <PosterPreview data={formData} posterRef={posterRef} />
          <ActionButtons posterRef={posterRef} upiId={formData.upiId} />
        </div>
      </div>

      {/* Monetization / Affiliate Banners Section */}
      <section className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-sm font-bold text-slate-700 mb-4 tracking-wide uppercase">
          Recommended Merchant Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {MONETIZATION_CARDS.map((card) => (
            <AffiliateCard key={card.id} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
}
