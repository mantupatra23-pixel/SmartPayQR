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
import { 
  QrCode, Sparkles, ShieldCheck, Store, User, Phone, DollarSign, MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
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
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">India's All-in-One Merchant Operating System</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> NPCI Compliant
          </span>
        </div>
      </header>

      {/* Main Suite Content - Continuous Scroll Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-16">
        
        {/* SECTION 1: Payment Poster Studio */}
        <section id="poster-studio" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                Fill in your details below. The payment poster on the right updates live in real-time.
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

          {/* Sticky Live Desktop Preview */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center lg:sticky lg:top-24">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              Live Studio Poster Preview
            </h3>
            <PosterPreview data={formData} posterRef={posterRef} />
            <ActionButtons posterRef={posterRef} upiId={formData.upiId} name={formData.name || "SmartPay"} />
          </div>
        </section>

        {/* SECTION 2-22: Groq AI Merchant Suite */}
        <section id="ai-marketing-suite">
          <AIAssistant />
        </section>

        {/* SECTION 23: Merchant Toolbox */}
        <section id="merchant-toolbox">
          <MerchantToolbox />
        </section>

        {/* SECTION 24: AI Invoice Writer */}
        <section id="invoice-writer">
          <InvoiceStudio />
        </section>

        {/* SECTION 25: AI Poster Generator */}
        <section id="poster-generator">
          <AIPosterGenerator />
        </section>

        {/* SECTION 26: QR Analytics Dashboard */}
        <section id="qr-analytics">
          <QRAnalytics />
        </section>

        {/* SECTION 27: Customer Management */}
        <section id="customer-management">
          <CustomerManagement />
        </section>

        {/* SECTION 28: Financial Marketplace */}
        <section id="marketplace">
          <FinancialMarketplace />
        </section>

        {/* SECTION 29 & 30: Business Profile & Settings */}
        <section id="settings">
          <MerchantSettings />
        </section>

      </main>

      {/* Floating Copilot */}
      <FloatingCopilot />
    </div>
  );
}
