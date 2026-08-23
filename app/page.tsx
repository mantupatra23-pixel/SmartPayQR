"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMerchant } from "@/hooks/useMerchant";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MerchantModal } from "@/components/merchant/MerchantModal";
import { CITIES, NICHES } from "@/data/seoData";
import { 
  Printer, Volume2, MessageCircle, Smartphone, ArrowRight, 
  BookOpen, Calculator, ShieldCheck, Zap, Sparkles, ChevronDown, CheckCircle2 
} from "lucide-react";

export default function ProductionHomePage() {
  const { profile, saveProfile, resetProfile, isLoaded } = useMerchant();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!isLoaded) return null;

  const faqs = [
    {
      q: "Is SmartPayQR completely free?",
      a: "Yes. SmartPayQR is 100% free with zero hidden subscriptions, zero payment commissions, and zero monthly rental fees.",
    },
    {
      q: "Do I need to create an account or provide bank login?",
      a: "No. SmartPayQR requires zero login and zero backend. Your store profile and settings are saved securely on your own device.",
    },
    {
      q: "Does the voice soundbox verify actual bank payments?",
      a: "No. The soundbox is a merchant-triggered audio utility that speaks the payment amount for counter convenience. It does not verify banking transactions.",
    },
    {
      q: "Can I print the QR standee in A4 and A5 sizes?",
      a: "Yes! The Standee Studio generates high-resolution, print-ready PDF files formatted for standard A4 and A5 acrylic counter stands.",
    },
    {
      q: "How does the Daily Khata Ledger work?",
      a: "You can track Cash vs UPI sales with single-tap entries. The daily summary calculates totals and exports directly to WhatsApp.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between">
      <div>
        <Header profile={profile} onEditProfile={() => setIsModalOpen(true)} />

        <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-16">
          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-[#152935] via-[#1f3747] to-[#28485c] text-white p-8 md:p-14 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-4 max-w-2xl z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3.5 py-1 rounded-full text-xs font-bold text-[#e4a576]">
                <Sparkles className="w-3.5 h-3.5" /> Free Indian Digital Payment Counter Kit
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight">
                Create QR Standees. Track Daily Khata. Send Bills.
              </h1>
              <p className="text-sm md:text-base text-zinc-300 font-medium leading-relaxed">
                SmartPayQR empowers small merchants, chai tapris, kirana stores, cafes, and freelancers to create high-converting payment standees, simulate voice alerts, manage cash-UPI ledgers, and send WhatsApp receipts without any login or KYC.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/standee"
                  className="bg-[#e4a576] hover:bg-[#d89766] text-[#152935] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl transition-all"
                >
                  <Printer className="w-4 h-4" /> Open Standee Studio <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/khata"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#e4a576]" /> Open Daily Khata
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-72 bg-white text-[#152935] p-6 rounded-3xl shadow-2xl border-4 border-[#e4a576] flex flex-col items-center space-y-3 z-10 text-center">
              <span className="bg-[#152935] text-white text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase">Instant Preview</span>
              <h3 className="font-black text-base truncate">{profile.businessName}</h3>
              <div className="w-36 h-36 bg-[#ccd5d2]/30 rounded-2xl border border-zinc-200 flex items-center justify-center font-mono text-xs text-zinc-400">
                [ UPI QR CODE ]
              </div>
              <p className="text-[10px] font-mono font-bold text-zinc-500">{profile.upiId}</p>
              <Link href="/standee" className="w-full py-2 bg-[#152935] text-white text-xs font-bold rounded-xl">Customize Standee</Link>
            </div>
          </div>

          {/* Core Tools Grid (5 Production Tools) */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl md:text-3xl font-serif font-black text-[#152935]">Complete Counter Toolset</h2>
              <p className="text-xs text-zinc-500">Everything Indian shopkeepers need for modern counter operations.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/standee"
                className="bg-white p-6 rounded-3xl border border-zinc-200 hover:border-[#152935] transition-all group space-y-3 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#fde5d6] text-[#152935] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Printer className="w-6 h-6 text-[#e4a576]" />
                </div>
                <h3 className="text-base font-black text-[#152935]">1. QR Standee Studio</h3>
                <p className="text-xs text-zinc-600">8 theme presets, logo upload, and print-ready A4/A5 PDF generation.</p>
                <span className="text-xs font-black text-[#e4a576] flex items-center gap-1">Open Studio →</span>
              </Link>

              <Link
                href="/khata"
                className="bg-white p-6 rounded-3xl border border-zinc-200 hover:border-[#152935] transition-all group space-y-3 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-base font-black text-[#152935]">2. Daily Khata Ledger</h3>
                <p className="text-xs text-zinc-600">Track Cash vs UPI payments locally with 1-click WhatsApp daily report export.</p>
                <span className="text-xs font-black text-amber-600 flex items-center gap-1">Open Khata →</span>
              </Link>

              <Link
                href="/soundbox"
                className="bg-white p-6 rounded-3xl border border-zinc-200 hover:border-[#152935] transition-all group space-y-3 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#ccd5d2]/40 text-[#152935] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Volume2 className="w-6 h-6 text-[#152935]" />
                </div>
                <h3 className="text-base font-black text-[#152935]">3. Voice Soundbox Alert</h3>
                <p className="text-xs text-zinc-600">Loud payment audio alerts in 9 Indian languages (Hindi, Odia, Bengali, etc.).</p>
                <span className="text-xs font-black text-[#698ea2] flex items-center gap-1">Launch Terminal →</span>
              </Link>

              <Link
                href="/whatsapp-bill"
                className="bg-white p-6 rounded-3xl border border-zinc-200 hover:border-[#152935] transition-all group space-y-3 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-base font-black text-[#152935]">4. WhatsApp Quick-Bill</h3>
                <p className="text-xs text-zinc-600">Itemized bills with auto-calculated totals and embedded UPI deep payment links.</p>
                <span className="text-xs font-black text-emerald-600 flex items-center gap-1">Create Invoice →</span>
              </Link>

              <Link
                href="/loan"
                className="bg-white p-6 rounded-3xl border border-zinc-200 hover:border-[#152935] transition-all group space-y-3 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-base font-black text-[#152935]">5. Loan & EMI Planner</h3>
                <p className="text-xs text-zinc-600">Calculate business loan EMIs and daily counter pocket collection targets.</p>
                <span className="text-xs font-black text-blue-600 flex items-center gap-1">Calculate EMI →</span>
              </Link>

              <Link
                href="/apk"
                className="bg-white p-6 rounded-3xl border border-zinc-200 hover:border-[#152935] transition-all group space-y-3 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#152935] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6 text-[#e4a576]" />
                </div>
                <h3 className="text-base font-black text-[#152935]">6. Android APK Center</h3>
                <p className="text-xs text-zinc-600">Download standalone APK for counter phones with instant offline access.</p>
                <span className="text-xs font-black text-[#152935] flex items-center gap-1">Download APK →</span>
              </Link>
            </div>
          </div>

          {/* Mass Programmatic SEO Traversal Grid */}
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-[#152935] uppercase tracking-wide">
                Popular Regional Merchant Hubs (100+ Cities)
              </h2>
              <p className="text-xs text-zinc-500">Instant printable QR standees tailored for local businesses across India.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CITIES.slice(0, 12).map((city) => (
                <div key={city.slug} className="contents">
                  {NICHES.slice(0, 3).map((niche) => (
                    <Link
                      key={`${city.slug}-${niche.slug}`}
                      href={`/tools/${city.slug}/${niche.slug}`}
                      className="text-xs font-semibold bg-[#fde5d6]/40 hover:bg-[#e4a576]/30 text-[#152935] px-3.5 py-1.5 rounded-xl border border-zinc-200 transition-all"
                    >
                      {niche.name} in {city.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-200 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-black text-[#152935]">Frequently Asked Questions</h2>
              <p className="text-xs text-zinc-500">Everything you need to know about SmartPayQR.</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-zinc-200 rounded-2xl p-4 transition-all">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex items-center justify-between text-left font-black text-sm text-[#152935]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  {activeFaq === index && (
                    <p className="mt-3 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                      {faq.a}
                    </p>
                  )}
                </div>
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
