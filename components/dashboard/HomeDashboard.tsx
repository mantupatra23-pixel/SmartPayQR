"use client";

import React from "react";
import { 
  QrCode, Receipt, Wand2, Calculator, Users, ArrowUpRight, Zap, Sparkles 
} from "lucide-react";
import { NavigationTab } from "@/types/suite";

interface HomeDashboardProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Active Merchant Account
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome to SmartPay AI OS
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Manage your shop payments, generate GST invoices, run AI marketing campaigns, and check pre-approved merchant loan offers.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('payments')}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl text-xs shadow-lg transition active:scale-95 shrink-0"
        >
          <QrCode className="w-4 h-4" /> Open Poster Studio
        </button>
      </div>

      {/* Analytics Overview Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-emerald-600">
            <QrCode className="w-5 h-5" />
            <span className="text-[10px] font-black bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-700">+14%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">1,420</p>
          <p className="text-xs font-bold text-slate-500">QR Scans Today</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-blue-600">
            <Receipt className="w-5 h-5" />
            <span className="text-[10px] font-black bg-blue-50 px-2 py-0.5 rounded-full text-blue-700">+22%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹84,500</p>
          <p className="text-xs font-bold text-slate-500">Invoiced Revenue</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-purple-600">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-black bg-purple-50 px-2 py-0.5 rounded-full text-purple-700">+8%</span>
          </div>
          <p className="text-2xl font-black text-slate-900">248</p>
          <p className="text-xs font-bold text-slate-500">Active Customers</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-amber-600">
            <Zap className="w-5 h-5" />
            <span className="text-[10px] font-black bg-amber-50 px-2 py-0.5 rounded-full text-amber-700">Pre-Approved</span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹5 Lakh</p>
          <p className="text-xs font-bold text-slate-500">Loan Offer Limit</p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => setActiveTab('payments')}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-600 transition">QR Poster Studio</h4>
                <p className="text-[10px] text-slate-500">Generate shop payment QR</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
          </div>

          <div 
            onClick={() => setActiveTab('billing')}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition">AI GST Invoice</h4>
                <p className="text-[10px] text-slate-500">Create & print bills</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
          </div>

          <div 
            onClick={() => setActiveTab('ai-center')}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-purple-600 transition">Groq AI Suite</h4>
                <p className="text-[10px] text-slate-500">Multi-lingual marketing</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition" />
          </div>

          <div 
            onClick={() => setActiveTab('merchant-toolbox')}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-amber-600 transition">Merchant Calculators</h4>
                <p className="text-[10px] text-slate-500">GST, EMI & Margins</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
          </div>
        </div>
      </div>
    </div>
  );
};
