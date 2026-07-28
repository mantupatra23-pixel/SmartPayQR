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
  LayoutDashboard, Calculator, BarChart3, Users, Settings, Bot, Store, User, Phone, DollarSign, MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('poster-studio');
  
  // 1. CLEAR DEFAULT VALUES (EMPTY BY DEFAULT)
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
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-28 md:pb-12">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2.5 rounded-2xl text-white shadow-md">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">
                SmartPay <span className="text-emerald-600">AI OS</span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">India's Merchant Operating System</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> NPCI Compliant
          </span>
        </div>

        {/* Desktop Top Navigation */}
        <div className="hidden lg:flex items-center justify-center border-t border-slate-100 bg-slate-50/90 px-4 py-2 overflow-x-auto gap-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-md scale-[1.02]' 
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Suite Module Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12">
        {activeTab === 'poster-studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Input Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6"
            >
              <div className="border-b pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" /> Enter Payment Details
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details below. The poster on the right updates live.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Poster Design Theme
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
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Business / Owner Name *
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Patra General Store"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    UPI ID (Virtual Payment Address) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="upiId"
                      placeholder="e.g. merchant@okicici or 9876543210@ibl"
                      value={formData.upiId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="mobile"
                        placeholder="9876543210"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Fixed Amount (Optional)
                    </label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="number"
                        name="amount"
                        placeholder="₹ 0"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Shop Address / Tagline
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="address"
                      placeholder="e.g. Main Market Road, Sector 12"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Desktop Sticky Live QR Preview */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center lg:sticky lg:top-24">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                Live Studio Poster Preview
              </h3>
              <PosterPreview data={formData} posterRef={posterRef} />
              <ActionButtons posterRef={posterRef} upiId={formData.upiId} name={formData.name || "SmartPay"} />
            </div>
          </div>
        )}

        {/* View Switcher Modules */}
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

      {/* Floating Copilot */}
      <FloatingCopilot />

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2.5 px-2 z-50 flex items-center justify-around overflow-x-auto shadow-2xl">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-1 rounded-xl transition min-w-[56px] ${
              activeTab === item.id ? 'text-emerald-600 font-extrabold scale-105' : 'text-slate-500'
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
