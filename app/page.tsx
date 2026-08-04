"use client";

import React, { useState } from "react";

export default function SmartPayDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
            ⚡
          </div>
          <span className="font-bold text-white text-sm">SmartPay AI OS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
            🛡️ NPCI Verified
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-4 space-y-5">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-5 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full uppercase">
              ⚡ ACTIVE MERCHANT ACCOUNT
            </span>
            <h1 className="text-xl font-extrabold text-white mt-1">Welcome to SmartPay AI OS</h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage shop payments, generate GST invoices, run AI marketing campaigns, and check loan offers.
            </p>
          </div>
          <button className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow">
            ⚡ Open Poster Studio
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 relative">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded absolute top-3 right-3">+14%</span>
            <p className="text-lg font-black text-white">1,420</p>
            <p className="text-[11px] text-slate-400 mt-0.5">QR Scans Today</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 relative">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded absolute top-3 right-3">+22%</span>
            <p className="text-lg font-black text-white">₹84,500</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Invoiced Revenue</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 relative">
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1 py-0.5 rounded absolute top-3 right-3">+8%</span>
            <p className="text-lg font-black text-white">248</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Active Customers</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 relative">
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded absolute top-3 right-3">Pre-Approved</span>
            <p className="text-lg font-black text-white">₹5 Lakh</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Loan Offer Limit</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">QUICK ACTIONS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-base">📱</div>
              <div>
                <h3 className="text-xs font-bold text-white">QR Poster Studio</h3>
                <p className="text-[10px] text-slate-400">Generate shop payment QR</p>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-base">🧾</div>
              <div>
                <h3 className="text-xs font-bold text-white">AI GST Invoice</h3>
                <p className="text-[10px] text-slate-400">Create & print bills</p>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-base">🤖</div>
              <div>
                <h3 className="text-xs font-bold text-white">Grok AI Suite</h3>
                <p className="text-[10px] text-slate-400">Multi-lingual marketing</p>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-base">🧮</div>
              <div>
                <h3 className="text-xs font-bold text-white">Merchant Calculators</h3>
                <p className="text-[10px] text-slate-400">GST, EMI & Margins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Section */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold text-amber-400 uppercase">✨ MERCHANT REFERRAL PROGRAM</span>
          <p className="text-xs font-bold text-white">Share SmartPay OS & Unlock Badges</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-emerald-600 text-white font-semibold py-2 rounded-lg text-xs">
              💬 Invite via WhatsApp
            </button>
            <button className="flex-1 bg-slate-800 text-slate-200 font-semibold py-2 rounded-lg text-xs border border-slate-700">
              📋 Copy Link
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
