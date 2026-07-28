"use client";

import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Store, Globe, Share2, ExternalLink } from "lucide-react";

export default function OnlineStorePage() {
  return (
    <SidebarLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Digital Catalog & Online Store</h2>
              <p className="text-xs text-slate-500">Your self-hosted digital storefront synchronized with inventory stock.</p>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase">Public Storefront Active</span>
              <h3 className="font-black text-lg">smartpayqr.xyz/store/patra-general</h3>
              <p className="text-xs text-slate-400">Customers can order items directly on WhatsApp with UPI prepayment.</p>
            </div>
            <button className="bg-emerald-500 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share Store Link
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
