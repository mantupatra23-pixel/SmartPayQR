"use client";

import React, { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { 
  CreditCard, Package, Users, Wand2, QrCode, FileText, 
  Sparkles, RefreshCw, ShieldCheck, ArrowUpRight, Plus, Share2, TrendingUp, AlertCircle 
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
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
    <SidebarLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
          <div className="space-y-2 z-10">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              ● LIVE ISOLATED DATABASE SYNC
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">Welcome to SmartPay AI OS</h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Manage your shop payments, stock inventory, udhaar ledger, and AI marketing from your dedicated merchant dashboard.
            </p>
          </div>

          <div className="flex gap-2 z-10 shrink-0">
            <button
              onClick={fetchRealStats}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh DB Stats
            </button>
            <Link
              href="/marketing"
              className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs border border-white/20"
            >
              Poster Studio
            </Link>
          </div>
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">QR Posters Created</span>
            <div className="text-2xl font-black text-slate-900">{stats.qrScansToday}</div>
            <span className="text-[10px] text-emerald-600 font-bold">Isolated Tenant Count</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Invoiced Sales</span>
            <div className="text-2xl font-black text-emerald-600">₹{stats.invoicedRevenue.toLocaleString()}</div>
            <span className="text-[10px] text-slate-400 font-bold">Total Recorded Bills</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Active Customers</span>
            <div className="text-2xl font-black text-indigo-600">{stats.activeCustomers}</div>
            <span className="text-[10px] text-slate-400 font-bold">Directory Profiles</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Gateway Sales</span>
            <div className="text-2xl font-black text-amber-600">₹{stats.todayRevenue.toLocaleString()}</div>
            <span className="text-[10px] text-emerald-600 font-bold">0% Gateway Fee</span>
          </div>
        </div>

        {/* Quick Action Hub */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/payments"
            className="p-5 bg-white hover:bg-slate-50 border rounded-3xl text-left space-y-2 shadow-sm transition group"
          >
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl w-fit group-hover:scale-10 transition">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900">Payments & UPI</h3>
              <p className="text-[10px] text-slate-500">Collect via Intent & QR</p>
            </div>
          </Link>

          <Link
            href="/inventory"
            className="p-5 bg-white hover:bg-slate-50 border rounded-3xl text-left space-y-2 shadow-sm transition group"
          >
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl w-fit group-hover:scale-10 transition">
              <Package className="w-5 h-5" />
            </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">Stock Inventory</h3>
                <p className="text-[10px] text-slate-500">Manage SKUs & Alerts</p>
              </div>
          </Link>

          <Link
            href="/crm"
            className="p-5 bg-white hover:bg-slate-50 border rounded-3xl text-left space-y-2 shadow-sm transition group"
          >
            <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl w-fit group-hover:scale-10 transition">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900">CRM & Ledger</h3>
              <p className="text-[10px] text-slate-500">Udhaar statement & wishes</p>
            </div>
          </Link>

          <Link
            href="/marketing"
            className="p-5 bg-white hover:bg-slate-50 border rounded-3xl text-left space-y-2 shadow-sm transition group"
          >
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl w-fit group-hover:scale-10 transition">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900">AI Poster Studio</h3>
              <p className="text-[10px] text-slate-500">Groq banners & WhatsApp</p>
            </div>
          </Link>
        </div>
      </div>
    </SidebarLayout>
  );
}
