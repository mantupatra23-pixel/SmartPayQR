"use client";

import React, { useState, useEffect } from "react";
import { 
  CreditCard, Package, Users, Wand2, QrCode, FileText, 
  Sparkles, RefreshCw, ShieldCheck, ArrowUpRight, Plus, Share2 
} from "lucide-react";
import { PaymentStudio } from "@/components/payments/PaymentStudio";
import { InventoryStudio } from "@/components/inventory/InventoryStudio";
import { AIMarketingHub } from "@/components/marketing/AIMarketingHub";
import { CRMStudio } from "@/components/crm/CRMStudio";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "payments" | "inventory" | "marketing" | "crm">("overview");
  const [stats, setStats] = useState({
    qrScansToday: 0,
    invoicedRevenue: 0,
    activeCustomers: 0,
    todayRevenue: 0,
    recentPayments: [] as any[]
  });
  const [loading, setLoading] = useState(false);

  const fetchRealStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Navbar Header */}
      <header className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-md shadow-emerald-600/30">
            SP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900">SmartPay AI OS</h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> NPCI Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">Live Merchant Payment, Inventory & AI Marketing Control</p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border text-xs font-bold gap-1 overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${activeTab === "overview" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${activeTab === "payments" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
          >
            Payments & UPI
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${activeTab === "inventory" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
          >
            Inventory & Stock
          </button>
          <button
            onClick={() => setActiveTab("crm")}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${activeTab === "crm" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
          >
            CRM & Ledger
          </button>
          <button
            onClick={() => setActiveTab("marketing")}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${activeTab === "marketing" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
          >
            AI Marketing Studio
          </button>
        </div>
      </header>

      {/* 1. OVERVIEW DASHBOARD */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
            <div className="space-y-2 z-10">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                ● LIVE DATABASE SYNC
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">Welcome to SmartPay AI OS</h2>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Manage your real shop payments, QR collections, stock inventory, customer ledgers, and AI marketing campaigns from one dashboard.
              </p>
            </div>

            <div className="flex gap-2 z-10">
              <button
                onClick={fetchRealStats}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh DB
              </button>
              <button
                onClick={() => setActiveTab("marketing")}
                className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs border border-white/20"
              >
                Open Poster Studio
              </button>
            </div>
          </div>

          {/* Dynamic Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">QR Posters Created</span>
              <div className="text-2xl font-black text-slate-900">{stats.qrScansToday}</div>
              <span className="text-[10px] text-emerald-600 font-bold">Real DB Count</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Invoiced Revenue</span>
              <div className="text-2xl font-black text-emerald-600">₹{stats.invoicedRevenue.toLocaleString()}</div>
              <span className="text-[10px] text-slate-400 font-bold">Total Verified Payments</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Active CRM Customers</span>
              <div className="text-2xl font-black text-indigo-600">{stats.activeCustomers}</div>
              <span className="text-[10px] text-slate-400 font-bold">Saved Profiles</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Gateway Sales</span>
              <div className="text-2xl font-black text-amber-600">₹{stats.todayRevenue.toLocaleString()}</div>
              <span className="text-[10px] text-emerald-600 font-bold">0% Gateway Fee</span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setActiveTab("payments")}
              className="p-5 bg-white hover:bg-slate-50 border rounded-3xl text-left space-y-2 shadow-sm transition"
            >
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl w-fit">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">UPI Payments</h3>
                <p className="text-[10px] text-slate-500">Collect via Intent & QR</p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("inventory")}
              className="p-5 bg-white hover:bg-slate-50 border rounded-3xl text-left space-y-2 shadow-sm transition"
            >
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl w-fit">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">Stock Inventory</h3>
                <p className="text-[10px] text-slate-500">Manage products & SKUs</p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("crm")}
              className="p-5 bg-white hover:bg-slate-50 border rounded-3xl text-left space-y-2 shadow-sm transition"
            >
              <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl w-fit">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">CRM & Ledger</h3>
                <p className="text-[10px] text-slate-500">Udhaar ledger & reminders</p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("marketing")}
              className="p-5 bg-white hover:bg-slate-50 border rounded-3xl text-left space-y-2 shadow-sm transition"
            >
              <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl w-fit">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">AI Poster Studio</h3>
                <p className="text-[10px] text-slate-500">Groq AI banners & WhatsApp</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 2. PAYMENTS & UPI STUDIO */}
      {activeTab === "payments" && (
        <PaymentStudio merchantName="SmartPay Merchant" upiId="merchant@upi" />
      )}

      {/* 3. INVENTORY & STOCK STUDIO */}
      {activeTab === "inventory" && (
        <InventoryStudio />
      )}

      {/* 4. CRM & LEDGER STUDIO */}
      {activeTab === "crm" && (
        <CRMStudio />
      )}

      {/* 5. AI MARKETING HUB */}
      {activeTab === "marketing" && (
        <AIMarketingHub />
      )}
    </div>
  );
}
