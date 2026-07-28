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
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <HeaderBar setMobileOpen={setMobileOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <HomeDashboard setActiveTab={setActiveTab} />}

          {activeTab === 'payments' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6"
              >
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" /> Payment Poster Studio
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in details below. The poster preview updates live in real-time.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Poster Theme Style
                    </label>
                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="classic-emerald">Classic Emerald</option>
                      <option value="royal-blue">Royal Blue</option>
                      <option value="gold-luxury">Gold Luxury</option>
                      <option value="dark-violet">Dark Violet</option>
                      <option value="festive-red">Festive Red</option>
                      <option value="minimal-white">Minimal White</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Business Name *</label>
                    <div className="relative">
                      <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Patra General Store"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">UPI ID (VPA) *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="upiId"
                        placeholder="e.g. merchant@okicici"
                        value={formData.upiId}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          name="mobile"
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Fixed Amount (Optional)</label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="number"
                          name="amount"
                          placeholder="₹ 0"
                          value={formData.amount}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Shop Address / Tagline</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="address"
                        placeholder="e.g. Main Market Road, Sector 12"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center lg:sticky lg:top-24">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">Live Studio Poster Preview</h3>
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
          {activeTab === 'help-support' && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Merchant Help & Support</h2>
              <p className="text-xs text-slate-500">Need help setting up your merchant account, QR posters, or GST invoices?</p>
              <p className="text-xs font-semibold text-emerald-600">Contact Support: support@smartpayqr.in</p>
            </div>
          )}
        </main>
      </div>

      <FloatingCopilot />
    </div>
  );
}
