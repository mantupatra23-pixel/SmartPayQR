"use client";

import React, { useState, useRef } from "react";
import { PosterPreview } from "@/components/qr/PosterPreview";
import { ActionButtons } from "@/components/qr/ActionButtons";
import { InvoiceStudio } from "@/components/invoice/InvoiceStudio";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { AIPosterGenerator } from "@/components/generator/AIPosterGenerator";
import { FinancialMarketplace } from "@/components/marketplace/FinancialMarketplace";
import { MerchantToolbox } from "@/components/toolbox/MerchantToolbox";
import { QRAnalytics } from "@/components/analytics/QRAnalytics";
import { CustomerManagement } from "@/components/customers/CustomerManagement";
import { MerchantSettings } from "@/components/settings/MerchantSettings";
import { FloatingCopilot } from "@/components/ai/FloatingCopilot";
import { NamePayData } from "@/types/qr";
import { NavigationTab } from "@/types/suite";
import { 
  QrCode, Sparkles, ShieldCheck, Receipt, Wand2, Image as ImageIcon,
  LayoutDashboard, Calculator, BarChart3, Users, Settings, Bot
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('poster-studio');
  const [formData, setFormData] = useState<NamePayData>({
    name: "Mantu Patra General Store",
    upiId: "9178065739@ibl",
    mobile: "9178065739",
    address: "At-Bartini, Odisha",
    note: "Thank you!",
    amount: "500",
    theme: "classic-emerald"
  });

  const posterRef = useRef<HTMLDivElement>(null!);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'poster-studio', label: 'Poster Studio', icon: <QrCode className="w-4 h-4" /> },
    { id: 'invoice-writer', label: 'AI Invoice', icon: <Receipt className="w-4 h-4" /> },
    { id: 'marketing-hub', label: 'Marketing Hub', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'poster-generator', label: 'Poster Designer', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'business-assistant', label: 'AI Copilot', icon: <Bot className="w-4 h-4" /> },
    { id: 'merchant-toolbox', label: 'Toolbox', icon: <Calculator className="w-4 h-4" /> },
    { id: 'qr-analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'customer-management', label: 'Customers', icon: <Users className="w-4 h-4" /> },
    { id: 'marketplace', label: 'Marketplace', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-20 md:pb-8">
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2 rounded-2xl text-white shadow-md">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">
                SmartPay <span className="text-emerald-600">AI OS</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">India's Merchant Operating System</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> NPCI Compliant
          </span>
        </div>

        {/* Desktop Top Navigation Bar */}
        <div className="hidden lg:flex items-center justify-center border-t border-slate-100 bg-slate-50/80 px-4 py-2 overflow-x-auto gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Suite Module Renderer */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'poster-studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" /> Payment Poster Studio
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Poster Theme Style</label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-medium"
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
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Business Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">UPI ID (VPA) *</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Fixed Amount (₹)</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Shop Address / Tagline</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-medium"
                  />
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center">
              <PosterPreview data={formData} posterRef={posterRef} />
              <ActionButtons posterRef={posterRef} upiId={formData.upiId} name={formData.name} />
            </div>
          </div>
        )}

        {activeTab === 'invoice-writer' && <InvoiceStudio />}
        {activeTab === 'marketing-hub' && <AIAssistant />}
        {activeTab === 'poster-generator' && <AIPosterGenerator />}
        {activeTab === 'business-assistant' && <AIAssistant />}
        {activeTab === 'merchant-toolbox' && <MerchantToolbox />}
        {activeTab === 'qr-analytics' && <QRAnalytics />}
        {activeTab === 'customer-management' && <CustomerManagement />}
        {activeTab === 'marketplace' && <FinancialMarketplace />}
        {activeTab === 'settings' && <MerchantSettings />}
      </main>

      {/* Floating AI Copilot Assistant */}
      <FloatingCopilot />

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 z-50 flex items-center justify-around overflow-x-auto">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-1 rounded-xl transition min-w-[56px] ${
              activeTab === item.id ? 'text-emerald-600 font-bold' : 'text-slate-500'
            }`}
          >
            {item.icon}
            <span className="text-[10px] truncate">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
