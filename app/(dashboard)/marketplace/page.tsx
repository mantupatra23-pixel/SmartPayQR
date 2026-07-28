"use client";

import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { ShoppingBag, CreditCard, Sparkles, Building2 } from "lucide-react";

export default function MarketplacePage() {
  return (
    <SidebarLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Merchant Marketplace & Loans</h2>
              <p className="text-xs text-slate-500">Pre-approved business loans, POS machines, soundboxes, and corporate cards.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl space-y-3">
              <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded uppercase">Pre-Approved</span>
              <h3 className="font-black text-base">₹5,00,000 Business Line</h3>
              <p className="text-xs text-slate-300">Instant disbursal based on daily SmartPay UPI transaction volume.</p>
              <button className="w-full bg-emerald-500 text-slate-950 font-black py-2 rounded-xl text-xs">Apply Now</button>
            </div>

            <div className="p-5 bg-slate-50 rounded-3xl border space-y-3">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h3 className="font-black text-sm">Soundbox & Smart POS</h3>
              <p className="text-xs text-slate-500">Voice alert speaker for instant UPI payment confirmation in noisy shops.</p>
              <button className="w-full bg-slate-900 text-white font-bold py-2 rounded-xl text-xs">Order Hardware</button>
            </div>

            <div className="p-5 bg-slate-50 rounded-3xl border space-y-3">
              <CreditCard className="w-6 h-6 text-purple-600" />
              <h3 className="font-black text-sm">Merchant Corporate Card</h3>
              <p className="text-xs text-slate-500">1% cashback on inventory supplier payments and GST filings.</p>
              <button className="w-full bg-slate-900 text-white font-bold py-2 rounded-xl text-xs">Request Card</button>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
