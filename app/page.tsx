"use client";

import React, { useState, useRef } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { HomeDashboard } from "@/components/dashboard/HomeDashboard";
import { PosterPreview } from "@/components/qr/PosterPreview";
import { ActionButtons } from "@/components/qr/ActionButtons";
import { InvoiceStudio } from "@/components/invoice/InvoiceStudio";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { AIPosterGenerator } from "@/components/generator/AIPosterGenerator";
import { FinancialMarketplace } from "@/components/marketplace/FinancialMarketplace";
import { MerchantToolbox } from "@/components/toolbox/MerchantToolbox";
import { QRAnalytics } from "@/components/analytics/QRAnalytics";
import { CRMStudio } from "@/components/crm/CRMStudio";
import { InventoryStudio } from "@/components/inventory/InventoryStudio";
import { PresenceStudio } from "@/components/presence/PresenceStudio";
import { MerchantSettings } from "@/components/settings/MerchantSettings";
import { SupportStudio } from "@/components/support/SupportStudio";
import { FloatingCopilot } from "@/components/ai/FloatingCopilot";
import { NamePayData } from "@/types/qr";
import { NavigationTab } from "@/types/suite";
import { Sparkles, Store, User, Phone, DollarSign, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [formData, setFormData] = useState<NamePayData>({
    name: "",
    upiId: "",
    mobile: "",
    address: "",
    note: "",
    amount: "",
    theme: "classic-emerald"
  });

  const posterRef = useRef<HTMLDivElement>(null!);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <HeaderBar setMobileOpen={setMobileOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <HomeDashboard setActiveTab={setActiveTab} />}

          {activeTab === 'payments' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" /> Payment Poster Studio
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Poster Theme Style</label>
                    <select name="theme" value={formData.theme} onChange={handleChange} className="w-full px-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium">
                      <option value="classic-emerald">Classic Emerald</option>
                      <option value="royal-blue">Royal Blue</option>
                      <option value="gold-luxury">Gold Luxury</option>
                      <option value="dark-violet">Dark Violet</option>
                      <option value="festive-red">Festive Red</option>
                      <option value="minimal-white">Minimal White</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Business Name *</label>
                    <input type="text" name="name" placeholder="e.g. Patra General Store" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium" />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">UPI ID (VPA) *</label>
                    <input type="text" name="upiId" placeholder="e.g. merchant@okicici" value={formData.upiId} onChange={handleChange} className="w-full px-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Phone Number</label>
                      <input type="text" name="mobile" placeholder="9876543210" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Fixed Amount (₹)</label>
                      <input type="number" name="amount" placeholder="₹ 0" value={formData.amount} onChange={handleChange} className="w-full px-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">Shop Address / Tagline</label>
                    <input type="text" name="address" placeholder="e.g. Main Market Road, Sector 12" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium" />
                  </div>
                </div>
              </motion.div>

              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center lg:sticky lg:top-24">
                <PosterPreview data={formData} posterRef={posterRef} />
                <ActionButtons posterRef={posterRef} upiId={formData.upiId} name={formData.name || "SmartPay"} />
              </div>
            </div>
          )}

          {activeTab === 'billing' && <InvoiceStudio />}
          {activeTab === 'inventory' && <InventoryStudio />}
          {activeTab === 'ai-center' && <AIAssistant />}
          {activeTab === 'marketing' && <AIPosterGenerator />}
          {activeTab === 'crm' && <CRMStudio />}
          {activeTab === 'online-presence' && <PresenceStudio />}
          {activeTab === 'financial-services' && <FinancialMarketplace />}
          {activeTab === 'merchant-toolbox' && <MerchantToolbox />}
          {activeTab === 'analytics' && <QRAnalytics />}
          {activeTab === 'marketplace' && <FinancialMarketplace />}
          {activeTab === 'business-profile' && <MerchantSettings />}
          {activeTab === 'settings' && <MerchantSettings />}
          {activeTab === 'help-support' && <SupportStudio />}
        </main>
      </div>

      <FloatingCopilot />
    </div>
  );
}
