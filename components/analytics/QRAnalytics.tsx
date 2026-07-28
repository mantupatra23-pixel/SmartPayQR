"use client";

import React from "react";
import { BarChart3, QrCode, Download, Receipt, TrendingUp, Users } from "lucide-react";

export const QRAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-emerald-600">
            <QrCode className="w-5 h-5" />
            <span className="text-[10px] font-black bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">1,420</p>
          <p className="text-xs font-bold text-slate-500">QR Scans Today</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-blue-600">
            <Download className="w-5 h-5" />
            <span className="text-[10px] font-black bg-blue-50 px-2 py-0.5 rounded-full">+8%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">385</p>
          <p className="text-xs font-bold text-slate-500">Poster Downloads</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-purple-600">
            <Receipt className="w-5 h-5" />
            <span className="text-[10px] font-black bg-purple-50 px-2 py-0.5 rounded-full">+24%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹84,500</p>
          <p className="text-xs font-bold text-slate-500">Invoiced Revenue</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-amber-600">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-black bg-amber-50 px-2 py-0.5 rounded-full">+15%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">248</p>
          <p className="text-xs font-bold text-slate-500">Active Customers</p>
        </div>
      </div>

      {/* Analytics Activity Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" /> Recent Activity Log
        </h3>
        <div className="space-y-3">
          {[
            { action: "A4 Payment Poster Exported", time: "10 mins ago", badge: "PNG Download" },
            { action: "GST Invoice #INV-2026-8821 Generated", time: "1 hour ago", badge: "₹1,250" },
            { action: "Groq AI Diwali Tagline Generated", time: "3 hours ago", badge: "AI Assistant" },
            { action: "UPI QR VPA Copied to Clipboard", time: "5 hours ago", badge: "Copy Event" },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50 rounded-2xl border text-xs font-semibold">
              <span className="text-slate-800">{item.action}</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">{item.time}</span>
                <span className="bg-white px-2 py-1 rounded-lg border text-[10px] font-extrabold text-slate-700">{item.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
