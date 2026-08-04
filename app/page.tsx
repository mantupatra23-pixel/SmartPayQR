"use client";

import { useState } from "react";

export default function SmartPayDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 font-sans pb-20">
      <div className="max-w-5xl mx-auto space-y-5">
        
        {/* Top Header Bar */}
        <header className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
              ⚡
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-none">SmartPay AI OS</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Merchant OS Suite • Free Direct Access</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              🛡️ NPCI Verified
            </span>
            <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold border border-slate-700">
              MP
            </div>
          </div>
        </header>

        {/* AdSense Top Banner */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-2.5 text-center text-xs text-slate-500">
          📢 AdSpace • Google AdSense Banner
        </div>

        {/* Welcome Banner Card */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 rounded-2xl border border-emerald-500/20 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full uppercase tracking-wider">
              ⚡ ACTIVE MERCHANT ACCOUNT
            </span>
            <h2 className="text-xl font-extrabold text-white mt-2">Welcome to SmartPay AI OS</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Manage your shop payments, generate GST invoices, run AI marketing campaigns, and check pre-approved merchant loan offers.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab("qr")}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/20 transition whitespace-nowrap"
          >
            ⚡ Open Poster Studio
          </button>
        </div>

        {/* 4 Analytics Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 relative">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded absolute top-3 right-3">+14%</span>
            <p className="text-xl font-black text-white">1,420</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">QR Scans Today</p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 relative">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded absolute top-3 right-3">+22%</span>
            <p className="text-xl font-black text-white">₹84,500</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Invoiced Revenue</p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 relative">
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded absolute top-3 right-3">+8%</span>
            <p className="text-xl font-black text-white">248</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Active Customers</p>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 relative">
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded absolute top-3 right-3">Pre-Approved</span>
            <p className="text-xl font-black text-white">₹5 Lakh</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Loan Offer Limit</p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">QUICK ACTIONS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            <div 
              onClick={() => setActiveTab("qr")}
              className="bg-slate-900 hover:bg-slate-850 p-4 rounded-2xl border border-slate-800 cursor-pointer transition flex items-center gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg font-bold border border-emerald-500/20 group-hover:scale-105 transition">
                📱
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">QR Poster Studio</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Generate shop payment QR</p>
              </div>
            </div>

            <div className="bg-slate-900 hover:bg-slate-850 p-4 rounded-2xl border border-slate-800 cursor-pointer transition flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-lg font-bold border border-indigo-500/20 group-hover:scale-105 transition">
                🧾
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">AI GST Invoice</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Create & print bills</p>
              </div>
            </div>

            <div className="bg-slate-900 hover:bg-slate-850 p-4 rounded-2xl border border-slate-800 cursor-pointer transition flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg font-bold border border-purple-500/20 group-hover:scale-105 transition">
                🤖
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Grok AI Suite</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Multi-lingual marketing</p>
              </div>
            </div>

            <div className="bg-slate-900 hover:bg-slate-850 p-4 rounded-2xl border border-slate-800 cursor-pointer transition flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg font-bold border border-amber-500/20 group-hover:scale-105 transition">
                🧮
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Merchant Calculators</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">GST, EMI & Margins</p>
              </div>
            </div>

          </div>
        </div>

        {/* Merchant Referral Card */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🎁</span>
              <div>
                <h3 className="text-xs font-bold text-white">Invite Merchants & Unlock Rewards</h3>
                <p className="text-[10px] text-slate-400">Share SmartPay AI OS with other shopkeepers to earn bonus themes and verified badges.</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
              0 Merchants Invited
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">✨ MERCHANT REFERRAL PROGRAM</span>
            <p className="text-xs font-bold text-white">Your Personal Referral Link</p>
            <p className="text-[11px] font-mono text-slate-400 bg-slate-900 p-2 rounded-lg border border-slate-800 truncate">
              https://smartpayqr.in/?ref=merchant_partner
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5">
                💬 Invite via WhatsApp
              </button>
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2 rounded-xl text-xs transition border border-slate-700 flex items-center justify-center gap-1.5">
                📋 Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* AdSense Bottom Banner */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 text-center text-xs text-slate-500">
          📢 AdSpace • Google AdSense Footer Unit
        </div>

      </div>

      {/* Floating AI Copilot Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs border border-emerald-300/40 transition">
          <span>🤖</span>
          <span>Merchant AI Copilot</span>
        </button>
      </div>
    </div>
  );
}
