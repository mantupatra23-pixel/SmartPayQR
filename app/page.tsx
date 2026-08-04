"use client";

import React, { useState } from "react";

export default function SmartPayDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [merchantName, setMerchantName] = useState("");
  const [shopName, setShopName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [generated, setGenerated] = useState(false);

  const qrData = upiId 
    ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName || shopName || "Merchant")}${amount ? `&am=${amount}` : ""}&cu=INR`
    : "";

  const qrImageUrl = qrData
    ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`
    : "";

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (upiId) {
      setGenerated(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 font-sans pb-20">
      <div className="max-w-5xl mx-auto space-y-5">
        
        {/* Header */}
        <header className="flex justify-between items-center bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
              ⚡
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-none">SmartPay AI OS</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">100% Free • Direct Merchant Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab(activeTab === "dashboard" ? "qr" : "dashboard")}
              className="text-xs font-semibold px-3 py-1.5 bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition"
            >
              {activeTab === "dashboard" ? "📱 Open QR Studio" : "📊 Open Dashboard"}
            </button>
          </div>
        </header>

        {/* Ad Space Banner */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-2.5 text-center text-xs text-slate-500">
          📢 AdSpace • Google AdSense Banner
        </div>

        {activeTab === "dashboard" ? (
          <>
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full uppercase tracking-wider">
                  ⚡ ACTIVE MERCHANT ACCOUNT
                </span>
                <h2 className="text-xl font-extrabold text-white mt-2">Welcome to SmartPay AI OS</h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Manage shop payments, generate GST invoices, run AI marketing campaigns, and check loan offers.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab("qr")}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition whitespace-nowrap"
              >
                ⚡ Open Poster Studio
              </button>
            </div>

            {/* 4 Analytics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 relative">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded absolute top-3 right-3">+14%</span>
                <p className="text-xl font-black text-white">1,420</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">QR Scans Today</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 relative">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded absolute top-3 right-3">+22%</span>
                <p className="text-xl font-black text-white">₹84,500</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">Invoiced Revenue</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 relative">
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded absolute top-3 right-3">+8%</span>
                <p className="text-xl font-black text-white">248</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">Active Customers</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 relative">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded absolute top-3 right-3">Pre-Approved</span>
                <p className="text-xl font-black text-white">₹5 Lakh</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">Loan Offer Limit</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">QUICK ACTIONS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div onClick={() => setActiveTab("qr")} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 cursor-pointer hover:border-emerald-500/50 transition flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">📱</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">QR Poster Studio</h4>
                    <p className="text-[10px] text-slate-400">Generate shop payment QR</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 cursor-pointer hover:border-indigo-500/50 transition flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-lg">🧾</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">AI GST Invoice</h4>
                    <p className="text-[10px] text-slate-400">Create & print bills</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 cursor-pointer hover:border-purple-500/50 transition flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg">🤖</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Grok AI Suite</h4>
                    <p className="text-[10px] text-slate-400">Multi-lingual marketing</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 cursor-pointer hover:border-amber-500/50 transition flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">🧮</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Merchant Calculators</h4>
                    <p className="text-[10px] text-slate-400">GST, EMI & Margins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Card */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">✨ MERCHANT REFERRAL PROGRAM</span>
              <p className="text-xs font-bold text-white">Share SmartPay OS & Unlock Badges</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded-xl text-xs transition">
                  💬 Invite via WhatsApp
                </button>
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2 rounded-xl text-xs transition border border-slate-700">
                  📋 Copy Link
                </button>
              </div>
            </div>
          </>
        ) : (
          /* QR Generator Studio */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Create UPI QR Poster</h2>
              <form onSubmit={handleGenerate} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Merchant Name *</label>
                  <input type="text" required placeholder="e.g. Mantu Patra" value={merchantName} onChange={(e) => setMerchantName(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Shop Name *</label>
                  <input type="text" required placeholder="e.g. Patra Store" value={shopName} onChange={(e) => setShopName(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">UPI ID *</label>
                  <input type="text" required placeholder="e.g. 9178065739@ybl" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Fixed Amount (Optional)</label>
                  <input type="number" placeholder="Leave empty for open payment" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl transition text-sm">
                  Generate Payment Poster →
                </button>
              </form>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
              {generated && qrImageUrl ? (
                <div className="w-full space-y-4">
                  <div className="bg-gradient-to-b from-emerald-600 to-teal-800 p-6 rounded-2xl text-white shadow-2xl space-y-3">
                    <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase inline-block">ACCEPTED HERE</div>
                    <div>
                      <h3 className="text-xl font-extrabold">{shopName || "Your Shop"}</h3>
                      <p className="text-xs opacity-80">{merchantName}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl inline-block">
                      <img src={qrImageUrl} alt="UPI QR" className="w-44 h-44 mx-auto" />
                    </div>
                    <div className="text-xs font-mono bg-black/30 py-1 px-3 rounded-lg">{upiId}</div>
                  </div>
                  <a href={qrImageUrl} download="UPI-Poster.png" target="_blank" rel="noreferrer" className="w-full inline-block bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-xl transition text-sm border border-slate-700">
                    Download Poster 📥
                  </a>
                </div>
              ) : (
                <div className="py-12 text-slate-500 text-xs">
                  Fill shop details & click <br />
                  <span className="text-emerald-400 font-semibold text-sm">"Generate Payment Poster"</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ad Space Banner Bottom */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 text-center text-xs text-slate-500">
          📢 AdSpace • Google AdSense Footer Unit
        </div>

      </div>
    </div>
  );
}
