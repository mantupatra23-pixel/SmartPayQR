"use client";

import React, { useState, useRef } from "react";
import { PosterPreview } from "@/components/qr/PosterPreview";
import { ActionButtons } from "@/components/qr/ActionButtons";
import { AffiliateCard } from "@/components/cards/AffiliateCard";
import { MONETIZATION_CARDS } from "@/config/affiliates";
import { NamePayData, PosterTheme } from "@/types/qr";
import { 
  QrCode, Sparkles, ShieldCheck, Store, User, Phone, 
  DollarSign, MapPin, Palette, Wand2, Receipt, LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'poster' | 'invoice' | 'tools'>('poster');
  const [formData, setFormData] = useState<NamePayData>({
    name: "",
    upiId: "",
    mobile: "",
    address: "",
    note: "",
    amount: "",
    theme: "classic-emerald",
    qrColor: "#000000"
  });

  const posterRef = useRef<HTMLDivElement>(null!);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAITagline = () => {
    const taglines = [
      "Quality You Can Trust, Value You Can Count On",
      "Fast & Secure UPI Payments Accepted Here",
      "Your Trusted Local Shop Since Day One",
      "Scan, Pay & Enjoy Hassel-Free Shopping"
    ];
    const random = taglines[Math.floor(Math.random() * taglines.length)];
    setFormData(prev => ({ ...prev, address: random }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sticky Top Fintech Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">
                SmartPay <span className="text-emerald-600">QR</span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">Merchant Business Suite</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('poster')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'poster' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-4 h-4" /> QR Poster Studio
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'tools' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Merchant Utilities
            </button>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> NPCI Verified
          </span>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'poster' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Controls & Customization */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" /> Customize Payment Poster
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill merchant details to generate instant printable poster.
                  </p>
                </div>
                <button
                  onClick={handleAITagline}
                  className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 transition"
                >
                  <Wand2 className="w-3.5 h-3.5" /> AI Tagline
                </button>
              </div>

              <div className="space-y-4">
                {/* Theme Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Poster Design Theme
                  </label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                  >
                    <option value="classic-emerald">Classic Emerald (Recommended)</option>
                    <option value="royal-blue">Royal Blue Corporate</option>
                    <option value="gold-luxury">Gold Luxury Edition</option>
                    <option value="dark-violet">Dark Violet Glass</option>
                    <option value="festive-red">Festive Red Special</option>
                    <option value="minimal-white">Clean Minimal White</option>
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
                      placeholder="e.g. Mantu General Store"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
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
                      placeholder="e.g. 9178065739@ibl / merchant@okicici"
                      value={formData.upiId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
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
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
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
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Shop Address or Tagline
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="address"
                      placeholder="e.g. Main Market Road, City"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Live Poster Studio Preview */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center sticky top-24">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                Live Studio Poster Preview
              </h3>
              <PosterPreview data={formData} posterRef={posterRef} />
              <ActionButtons posterRef={posterRef} upiId={formData.upiId} name={formData.name} />
            </div>

          </div>
        )}

        {/* Merchant Utilities / Affiliate Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Official Merchant Business Tools
              </h2>
              <p className="text-xs text-slate-500">Apply for certified soundbox, POS, current accounts and credit cards.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {MONETIZATION_CARDS.map((card) => (
              <AffiliateCard key={card.id} {...card} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/60 py-6 text-center text-xs text-slate-500 mt-12">
        <p>© 2026 SmartPay QR Studio. Client-Side NPCI Compliant SaaS Platform.</p>
      </footer>
    </div>
  );
}
