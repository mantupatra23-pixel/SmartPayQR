"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Download, Printer } from "lucide-react";
import { WhatsAppBroadcast } from "@/components/viral/WhatsAppBroadcast";

export const AIPosterGenerator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Festival Offer");
  const [headline, setHeadline] = useState("DIWALI MEGA DHAMAKA SALE");
  const [discountText, setDiscountText] = useState("UP TO 50% OFF ON ALL ITEMS");

  const templates = [
    { title: "Festival Offer", bg: "from-amber-600 via-rose-700 to-red-900" },
    { title: "Grand Opening", bg: "from-blue-700 via-indigo-800 to-slate-900" },
    { title: "Discount Banner", bg: "from-emerald-600 via-teal-700 to-slate-900" },
    { title: "New Arrival", bg: "from-purple-600 via-pink-700 to-slate-900" },
  ];

  const currentTemplate = templates.find(t => t.title === selectedCategory) || templates[0];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-2.5 bg-rose-100 text-rose-700 rounded-2xl">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">AI Poster & Banner Designer</h2>
              <p className="text-xs text-slate-500">Create promotional banners & festival flyers for your shop.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Banner Type</label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map(t => (
                  <button
                    key={t.title}
                    onClick={() => setSelectedCategory(t.title)}
                    className={`p-3 text-xs font-bold rounded-xl border text-left transition ${
                      selectedCategory === t.title ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Main Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Discount Tagline</label>
              <input
                type="text"
                value={discountText}
                onChange={(e) => setDiscountText(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-bold"
              />
            </div>
          </div>
        </div>

        {/* Live Banner Preview */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center">
          <div className={`w-full max-w-[360px] min-h-[480px] bg-gradient-to-br ${currentTemplate.bg} text-white rounded-3xl p-6 shadow-2xl flex flex-col justify-between items-center text-center relative overflow-hidden`}>
            <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-amber-300 border border-white/20">
              {selectedCategory}
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-md">
                {headline || "YOUR BANNER TITLE"}
              </h3>
              <p className="text-sm font-extrabold text-amber-300 bg-black/30 py-2 px-4 rounded-xl border border-white/10">
                {discountText || "SPECIAL OFFER"}
              </p>
            </div>

            <div className="text-[10px] font-medium text-slate-200/90 border-t border-white/10 pt-3 w-full">
              Created free via <span className="underline font-bold">SmartPayQR.in</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-[360px] mt-4">
            <button onClick={() => alert("Downloading HD Poster...")} className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs shadow-md">
              <Download className="w-4 h-4" /> Download PNG
            </button>
            <button onClick={() => window.print()} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs shadow-md">
              <Printer className="w-4 h-4" /> Print Banner
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Broadcast Module */}
      <WhatsAppBroadcast />
    </div>
  );
};
