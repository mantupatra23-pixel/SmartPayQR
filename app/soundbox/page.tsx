"use client";

import React, { useState } from "react";
import { useMerchant } from "@/hooks/useMerchant";
import { SoundboxPanel } from "@/components/soundbox/SoundboxPanel";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MerchantModal } from "@/components/merchant/MerchantModal";

export default function SoundboxPage() {
  const { profile, saveProfile, resetProfile, isLoaded } = useMerchant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between">
      <div>
        <Header profile={profile} onEditProfile={() => setIsModalOpen(true)} />
        
        <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-serif font-black">Counter Voice Terminal</h1>
            <p className="text-xs text-zinc-500">Simulate multi-lingual payment soundbox audio announcements.</p>
          </div>

          <SoundboxPanel defaultLanguage={profile.language} />
        </main>
      </div>

      <Footer />
      <MerchantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profile={profile} onSave={saveProfile} onReset={resetProfile} />
    </div>
  );
}
