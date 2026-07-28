"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart3, QrCode, Download, Receipt, Users, 
  Share2, Wand2, MousePointer, ShieldAlert, Loader2, RefreshCw
} from "lucide-react";
import { getRealAnalytics, RealAnalyticsData } from "@/lib/analyticsTracker";

export const QRAnalytics: React.FC = () => {
  const [data, setData] = useState<RealAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = () => {
    setLoading(true);
    const realData = getRealAnalytics();
    setData(realData);
    setLoading(false);
  };

  useEffect(() => {
    fetchMetrics();

    const handleUpdate = () => fetchMetrics();
    window.addEventListener("smartpay_analytics_updated", handleUpdate);
    return () => window.removeEventListener("smartpay_analytics_updated", handleUpdate);
  }, []);

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-200">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
        <p className="text-xs font-bold text-slate-500">Loading real-time merchant metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" /> Real-Time Analytics Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Live database counts driven directly by user actions and system usage.
          </p>
        </div>
        <button 
          onClick={fetchMetrics}
          className="p-2 text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          title="Refresh Metrics"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Grid Cards (No hardcoded values) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-emerald-600">
            <QrCode className="w-5 h-5" />
            <span className="text-[10px] font-black bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-700">Live</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{data.qrGenerations}</p>
          <p className="text-xs font-bold text-slate-500">QR Posters Generated</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-blue-600">
            <Download className="w-5 h-5" />
            <span className="text-[10px] font-black bg-blue-50 px-2 py-0.5 rounded-full text-blue-700">Live</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{data.qrDownloads}</p>
          <p className="text-xs font-bold text-slate-500">Total QR Downloads</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-purple-600">
            <Download className="w-5 h-5" />
            <span className="text-[10px] font-black bg-purple-50 px-2 py-0.5 rounded-full text-purple-700">Live</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{data.pdfDownloads}</p>
          <p className="text-xs font-bold text-slate-500">Total PDF Downloads</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-emerald-600">
            <Receipt className="w-5 h-5" />
            <span className="text-[10px] font-black bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-700">Live</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{data.invoicesCreated}</p>
          <p className="text-xs font-bold text-slate-500">Invoices Created</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-emerald-600">
            <Receipt className="w-5 h-5" />
            <span className="text-[10px] font-black bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-700">₹ Active</span>
          </div>
          <p className="text-2xl font-black text-slate-900">₹{data.invoiceRevenue.toLocaleString()}</p>
          <p className="text-xs font-bold text-slate-500">Invoice Revenue</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-amber-600">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-black bg-amber-50 px-2 py-0.5 rounded-full text-amber-700">Live</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{data.savedCustomers}</p>
          <p className="text-xs font-bold text-slate-500">Saved Customers</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-teal-600">
            <MousePointer className="w-5 h-5" />
            <span className="text-[10px] font-black bg-teal-50 px-2 py-0.5 rounded-full text-teal-700">Live</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{data.marketplaceClicks}</p>
          <p className="text-xs font-bold text-slate-500">Marketplace Clicks</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-purple-600">
            <Wand2 className="w-5 h-5" />
            <span className="text-[10px] font-black bg-purple-50 px-2 py-0.5 rounded-full text-purple-700">Groq AI</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{data.aiGenerationsUsed}</p>
          <p className="text-xs font-bold text-slate-500">AI Generations Used</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-teal-600">
            <Share2 className="w-5 h-5" />
            <span className="text-[10px] font-black bg-teal-50 px-2 py-0.5 rounded-full text-teal-700">Live</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{data.whatsAppShares}</p>
          <p className="text-xs font-bold text-slate-500">WhatsApp Shares</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-indigo-600">
            <Share2 className="w-5 h-5" />
            <span className="text-[10px] font-black bg-indigo-50 px-2 py-0.5 rounded-full text-indigo-700">Live</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{data.posterShares}</p>
          <p className="text-xs font-bold text-slate-500">Poster Shares</p>
        </div>

        {/* Dynamic Scan Notice */}
        <div className="col-span-2 bg-slate-100 p-5 rounded-3xl border border-slate-200 flex items-center gap-3 text-slate-600">
          <ShieldAlert className="w-6 h-6 text-slate-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-800">Total Scans Tracking</p>
            <p className="text-[11px] text-slate-500">Tracking available after enabling Dynamic QR.</p>
          </div>
        </div>
      </div>

      {/* Real-time Activity Log */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-slate-900">Real-Time User Activity Log</h3>
        
        {data.activities.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
            No activity recorded yet. Actions like creating QR posters, generating invoices, or using AI tools will appear here automatically.
          </div>
        ) : (
          <div className="space-y-2.5">
            {data.activities.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3.5 bg-slate-50 rounded-2xl border text-xs font-semibold">
                <span className="text-slate-800">{item.description}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">{item.timestamp}</span>
                  <span className="bg-white px-2 py-1 rounded-lg border text-[10px] font-extrabold text-slate-700">
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
