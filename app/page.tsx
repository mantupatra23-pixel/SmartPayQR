"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMerchant } from "@/hooks/useMerchant";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MerchantModal } from "@/components/merchant/MerchantModal";
import { Printer, Volume2, MessageCircle, Smartphone, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { SEO_PAGES } from "@/lib/seoData";

export default function HomeDashboard() {
  const { profile, saveProfile, resetProfile, isLoaded } = useMerchant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between">
      <div>
        <Header profile={profile} onEditProfile={() => setIsModalOpen(true)} />

        <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-10">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-[#152935] via-[#1f3747] to-[#2b4c60] text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="bg-[#e4a576] text-[#152935] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                100% Free • No Login Required
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight">
                Your Free Digital Payment Counter Kit
              </h1>
              <p className="text-sm text-zinc-300 font-medium">
                Create instant print-ready UPI standees, multi-lingual counter voice soundbox alerts, and 1-click WhatsApp bills.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link
                href="/standee"
                className="bg-[#e4a576] hover:bg-[#d89766] text-[#152935] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Printer className="w-4 h-4" /> Open Standee Studio <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/soundbox"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Volume2 className="w-4 h-4 text-[#e4a576]" /> Launch Soundbox
              </Link>
            </div>
          </div>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/standee"
              className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 hover:border-[#152935] transition-all group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#fde5d6] text-[#152935] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Printer className="w-6 h-6 text-[#e4a576]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-[#152935]">QR Standee Studio</h3>
                <p className="text-xs text-zinc-500">Design custom frames with 8 themes, add your logo and export printable A4/A5 PDF standees.</p>
              </div>
              <span className="text-xs font-black text-[#e4a576] flex items-center gap-1">Open Studio →</span>
            </Link>

            <Link
              href="/soundbox"
              className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 hover:border-[#152935] transition-all group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ccd5d2]/40 text-[#152935] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Volume2 className="w-6 h-6 text-[#152935]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-[#152935]">Counter Soundbox</h3>
                <p className="text-xs text-zinc-500">Simulate regional audio alerts in Hindi, Odia, Bengali, Tamil, and English for counter payments.</p>
              </div>
              <span className="text-xs font-black text-[#698ea2] flex items-center gap-1">Launch Terminal →</span>
            </Link>

            <Link
              href="/standee"
              className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 hover:border-[#152935] transition-all group space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-[#152935]">WhatsApp Quick-Bill</h3>
                <p className="text-xs text-zinc-500">Send itemized digital receipts with direct UPI payment links straight to customer WhatsApp.</p>
              </div>
              <span className="text-xs font-black text-emerald-600 flex items-center gap-1">Create Bill →</span>
            </Link>
          </div>

          {/* Programmatic SEO Hubs */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 space-y-4">
            <h3 className="text-xs font-black text-[#152935] uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#e4a576]" /> Popular Regional Merchant Hubs
            </h3>
            <div className="flex flex-wrap gap-2">
              {SEO_PAGES.map((page) => (
                <Link
                  key={page.slug}
                  href={`/tools/${page.slug}`}
                  className="text-xs font-bold bg-[#fde5d6]/50 hover:bg-[#e4a576]/30 text-[#152935] px-3.5 py-2 rounded-xl border border-zinc-200 transition-all"
                >
                  {page.niche} ({page.city})
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <MerchantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profile={profile} onSave={saveProfile} onReset={resetProfile} />
    </div>
  );
}
