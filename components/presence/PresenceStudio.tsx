"use client";

import React from "react";
import { Globe, Share2, ExternalLink, QrCode, Sparkles, CheckCircle2 } from "lucide-react";

export const PresenceStudio: React.FC = () => {
  const storeUrl = "https://smartpayqr.in/store/mantu-general-store";

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Online Storefront & Digital Presence</h2>
              <p className="text-xs text-slate-500">Your store website, shareable online catalog, and Google Business profile page.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Website Live
          </span>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-300 bg-sky-500/20 px-2.5 py-1 rounded-full border border-sky-400/30">
              Instant Web Store
            </span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Mantu Patra Digital Dukan</h3>
            <p className="text-xs text-slate-300 font-mono mt-1">{storeUrl}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(storeUrl)}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-xl text-xs transition border border-white/10"
            >
              Copy Link
            </button>
            <a
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-xl text-xs transition inline-flex items-center gap-1"
            >
              Visit Store <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
