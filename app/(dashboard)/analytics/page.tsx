"use client";

import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <SidebarLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Merchant Business Analytics</h2>
              <p className="text-xs text-slate-500">Real-time charts for revenue growth, customer retention, and top-selling SKUs.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-slate-50 rounded-2xl border space-y-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <h3 className="font-black text-sm">Revenue Trends</h3>
              <p className="text-xs text-slate-500">Daily, weekly, and monthly payment performance calculated from live transactions.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border space-y-2">
              <Users className="w-6 h-6 text-indigo-600" />
              <h3 className="font-black text-sm">Customer Retention Rate</h3>
              <p className="text-xs text-slate-500">Track repeat customer purchases and VIP customer rankings.</p>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
