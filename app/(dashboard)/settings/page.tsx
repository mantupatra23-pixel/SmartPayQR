"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Settings, Bell, Shield, Lock, Save } from "lucide-react";

export default function SettingsPage() {
  const [emailNotify, setEmailNotify] = useState(true);
  const [lowStockAlert, setLowStockAlert] = useState(true);

  return (
    <SidebarLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-3 bg-slate-100 text-slate-800 rounded-2xl">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Merchant Platform Settings</h2>
              <p className="text-xs text-slate-500">Configure notifications, security rules, and language preferences.</p>
            </div>
          </div>

          <div className="max-w-xl space-y-4 text-xs font-bold text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border space-y-3">
              <h3 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-emerald-600" /> System Notifications
              </h3>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Email alerts on payment receipt</span>
                <input type="checkbox" checked={emailNotify} onChange={(e) => setEmailNotify(e.target.checked)} />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Low inventory stock warning</span>
                <input type="checkbox" checked={lowStockAlert} onChange={(e) => setLowStockAlert(e.target.checked)} />
              </label>
            </div>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
