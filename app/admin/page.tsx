"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Server, Users, CreditCard, Activity, Database, 
  Lock, AlertTriangle, RefreshCw, Power, CheckCircle2, Search, BarChart2 
} from "lucide-react";

export default function SuperAdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [merchants, setMerchants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, merchRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/merchants"),
      ]);

      if (statsRes.ok) {
        const sData = await statsRes.json();
        setStats(sData.systemMetrics);
      }
      if (merchRes.ok) {
        const mData = await merchRes.json();
        setMerchants(mData.merchants || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleToggleStatus = async (merchantId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "DISABLED" : "ACTIVE";
    try {
      const res = await fetch("/api/admin/merchants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchantId, status: newStatus }),
      });
      if (res.ok) fetchAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredMerchants = merchants.filter(
    (m) =>
      m.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.mobile.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-lg shadow-rose-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Super Admin Control Panel</h1>
            <p className="text-xs text-slate-400">Multi-tenant merchant governance, platform revenue, and SaaS infrastructure oversight.</p>
          </div>
        </div>

        <button
          onClick={fetchAdminData}
          className="bg-slate-800 hover:bg-slate-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Reload Platform Metrics
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Merchants</span>
          <span className="text-2xl font-black text-emerald-400">{stats?.totalMerchants || 0}</span>
          <span className="text-[10px] text-slate-400 block">{stats?.activeMerchants || 0} Active / {stats?.disabledMerchants || 0} Disabled</span>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Platform Gross Sales</span>
          <span className="text-2xl font-black text-blue-400">₹{stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : 0}</span>
          <span className="text-[10px] text-slate-400 block">{stats?.totalPayments || 0} Gateway Payments</span>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">GST Invoices Generated</span>
          <span className="text-2xl font-black text-amber-400">{stats?.totalInvoices || 0}</span>
          <span className="text-[10px] text-slate-400 block">Across all merchants</span>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase block">System Health</span>
          <span className="text-2xl font-black text-emerald-500">{stats?.systemStatus || "HEALTHY"}</span>
          <span className="text-[10px] text-slate-400 block">Uptime: {stats?.uptime || "99.9%"}</span>
        </div>
      </div>

      {/* Merchant Governance Table */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" /> Platform Merchant Directory
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by shop name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3 rounded-l-xl">Shop Name</th>
                <th className="p-3">Merchant</th>
                <th className="p-3">Category</th>
                <th className="p-3">Invoices</th>
                <th className="p-3">Products</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-semibold">
              {filteredMerchants.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No merchant accounts found.
                  </td>
                </tr>
              ) : (
                filteredMerchants.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-white">{m.shopName}</td>
                    <td className="p-3">
                      <div>{m.name}</div>
                      <div className="text-[10px] text-slate-500">{m.email} | {m.mobile}</div>
                    </td>
                    <td className="p-3"><span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{m.category}</span></td>
                    <td className="p-3 font-mono">{m._count?.invoices || 0}</td>
                    <td className="p-3 font-mono">{m._count?.products || 0}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        m.status === "ACTIVE" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-rose-950 text-rose-400 border border-rose-800"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleToggleStatus(m.id, m.status)}
                        className={`px-3 py-1 rounded-xl text-[10px] font-bold transition flex items-center gap-1 ml-auto ${
                          m.status === "ACTIVE" ? "bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-800" : "bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800"
                        }`}
                      >
                        <Power className="w-3 h-3" /> {m.status === "ACTIVE" ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
