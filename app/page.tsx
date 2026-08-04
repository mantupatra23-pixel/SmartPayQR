"use client";

import { useState } from "react";

export default function SmartPayApp() {
  const [merchantName, setMerchantName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [shopName, setShopName] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div>
            <span className="text-xs text-emerald-400 font-semibold uppercase">
              100% FREE • NO LOGIN REQUIRED
            </span>
            <h1 className="text-2xl font-bold mt-1">SmartPay AI OS</h1>
            <p className="text-xs text-slate-400 mt-1">
              Instant UPI Posters & GST Invoicing Tool
            </p>
          </div>
        </header>

        {/* Ad Banner Placeholder */}
        <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-3 text-center text-xs text-slate-400">
          📢 AdSpace • Google AdSense Ready
        </div>

        {/* Quick Instant Poster Generator */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Generate Instant Payment QR</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Merchant Name</label>
              <input 
                type="text" 
                placeholder="e.g. Mantu Patra"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Shop Name</label>
              <input 
                type="text" 
                placeholder="e.g. Patra Store"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">UPI ID / VPA</label>
              <input 
                type="text" 
                placeholder="e.g. 9178065739@ybl"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition text-sm">
            Generate QR & Download Poster PDF →
          </button>
        </div>
      </div>
    </div>
  );
}
