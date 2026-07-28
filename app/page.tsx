"use client";

import React, { useState, useRef } from "react";
import { PosterPreview } from "@/components/qr/PosterPreview";
import { ActionButtons } from "@/components/qr/ActionButtons";
import { InvoiceStudio } from "@/components/invoice/InvoiceStudio";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { FinancialMarketplace } from "@/components/marketplace/FinancialMarketplace";
import { NamePayData } from "@/types/qr";
import { ViewMode } from "@/types/suite";
import { 
  QrCode, Sparkles, ShieldCheck, Store, User, Phone, 
  DollarSign, MapPin, Receipt, Wand2, LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ViewMode>('qr-studio');
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Top Suite Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2 rounded-2xl text-white shadow-md">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">
                SmartPay <span className="text-emerald-600">QR Suite</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">India's Free Merchant Ecosystem</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-2xl border">
            <button
              onClick={() => setActiveTab('qr-studio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'qr-studio' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" /> QR Poster
            </button>
            <button
              onClick={() => setActiveTab('invoice-studio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'invoice-studio' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" /> GST Invoicing
            </button>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'ai-assistant' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" /> AI Engine
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'marketplace' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Marketplace
            </button>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> NPCI Verified
          </span>
        </div>
      </header>

      {/* Main Suite Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'qr-studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" /> Payment Poster Customizer
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

        {activeTab === 'invoice-studio' && <InvoiceStudio />}
        {activeTab === 'ai-assistant' && <AIAssistant />}
        {activeTab === 'marketplace' && <FinancialMarketplace />}
      </main>
    </div>
  );
}
