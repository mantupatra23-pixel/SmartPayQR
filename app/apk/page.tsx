"use client";

import React, { useState } from "react";
import { useMerchant } from "@/hooks/useMerchant";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MerchantModal } from "@/components/merchant/MerchantModal";
import { Smartphone, Download, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function ApkPage() {
  const { profile, saveProfile, resetProfile, isLoaded } = useMerchant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between">
      <div>
        <Header profile={profile} onEditProfile={() => setIsModalOpen(true)} />
        
        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="bg-[#152935] text-[#e4a576] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
              Android Counter APK
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-black">Download SmartPayQR App</h1>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto">
              Install the standalone Android application on your counter phone for lightning-fast offline access and voice soundbox alerts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-zinc-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#152935]">SmartPayQR v1.0.2 Counter Edition</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Optimized for Android counter tablets and merchant smartphones. Works seamlessly even with fluctuating internet connections.
                </p>
              </div>

              <div className="space-y-2 text-xs font-bold text-zinc-700">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Built-in Web Speech Soundbox</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Local Device Data Encryption</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1-Click PDF Standee Generator</div>
              </div>

              <div className="pt-2">
                <a
                  href="https://github.com/mantupatra23-pixel/SmartPayQR/actions"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#152935] hover:bg-[#223d4e] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider inline-flex items-center gap-2.5 shadow-xl transition-all"
                >
                  <Download className="w-4 h-4 text-[#e4a576]" /> Download Counter APK (Direct)
                </a>
              </div>
            </div>

            <div className="bg-[#ccd5d2]/20 p-6 rounded-3xl border border-zinc-200 space-y-4 text-center">
              <Smartphone className="w-16 h-16 text-[#152935] mx-auto opacity-80" />
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase text-[#152935]">Installation Guide</h4>
                <p className="text-[11px] text-zinc-500">
                  Download the APK file from GitHub Actions, enable "Install from Unknown Sources" on your Android phone, and open the file to install.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <MerchantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profile={profile} onSave={saveProfile} onReset={resetProfile} />
    </div>
  );
}
