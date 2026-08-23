"use client";

import React, { useState } from "react";
import { useMerchant } from "@/hooks/useMerchant";
import { QRCodeSVG } from "qrcode.react";
import { announcePayment, stopSpeech } from "@/lib/voiceEngine";
import { useWakeLock } from "@/hooks/useWakeLock";
import { useToast } from "@/components/ui/Toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MerchantModal } from "@/components/merchant/MerchantModal";
import { Volume2, RotateCcw, Sparkles, Smartphone, CheckCircle2, Lock } from "lucide-react";

export default function CounterPOSPage() {
  const { profile, saveProfile, resetProfile, isLoaded } = useMerchant();
  const { showToast } = useToast();
  const { isLocked } = useWakeLock();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputAmount, setInputAmount] = useState("");
  const [customerFacing, setCustomerFacing] = useState(false);

  if (!isLoaded) return null;

  const handleNumpad = (val: string) => {
    if (inputAmount.length < 6) {
      setInputAmount((prev) => (prev === "0" ? val : prev + val));
    }
  };

  const handleClear = () => {
    setInputAmount("");
    stopSpeech();
  };

  const handleBackspace = () => {
    setInputAmount((prev) => prev.slice(0, -1));
  };

  const handleAnnounce = () => {
    if (!inputAmount || Number(inputAmount) <= 0) {
      showToast("Please enter an amount first", "error");
      return;
    }
    announcePayment(inputAmount, profile.language);
    showToast(`Announced ₹${inputAmount} payment`, "success");
  };

  const paymentUrl = `upi://pay?pa=${encodeURIComponent(profile.upiId)}&pn=${encodeURIComponent(
    profile.businessName
  )}${inputAmount ? `&am=${encodeURIComponent(inputAmount)}` : ""}&cu=INR`;

  return (
    <div className="min-h-screen bg-[#152935] text-white flex flex-col justify-between">
      <div>
        <Header profile={profile} onEditProfile={() => setIsModalOpen(true)} />

        <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold tracking-wide text-zinc-300">COUNTER ACTIVE</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#e4a576]">
              {isLocked && <span className="flex items-center gap-1 font-mono text-[10px]">● Screen Kept ON</span>}
              <button
                onClick={() => setCustomerFacing(!customerFacing)}
                className="bg-[#e4a576] text-[#152935] px-3 py-1 rounded-xl text-xs font-black uppercase"
              >
                {customerFacing ? "Switch to Numpad" : "Show Full QR"}
              </button>
            </div>
          </div>

          {customerFacing ? (
            /* Customer Facing Large QR Display */
            <div className="bg-white text-[#152935] p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-4 max-w-sm mx-auto text-center animate-fade-in">
              <span className="bg-[#152935] text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase">
                {profile.businessName}
              </span>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
                <QRCodeSVG value={paymentUrl} size={220} level="H" />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-zinc-500 font-bold">SCAN & PAY</span>
                <p className="text-3xl font-serif font-black text-[#152935]">
                  ₹{inputAmount ? Number(inputAmount).toLocaleString("en-IN") : "Any Amount"}
                </p>
                <p className="text-xs font-mono text-zinc-400">{profile.upiId}</p>
              </div>
            </div>
          ) : (
            /* Split Numpad & Quick Soundbox Trigger View */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Display Screen */}
              <div className="md:col-span-6 bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Current Amount (₹)</span>
                  <div className="text-4xl md:text-5xl font-mono font-black text-white h-14 flex items-center">
                    ₹ {inputAmount || "0"}
                  </div>
                  <p className="text-xs text-[#e4a576] font-mono">{profile.upiId}</p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <QRCodeSVG value={paymentUrl} size={64} level="M" fgColor="#ffffff" bgColor="transparent" />
                    <div>
                      <p className="text-xs font-bold text-white">Dynamic Live QR</p>
                      <p className="text-[10px] text-zinc-400">Updates as you type</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAnnounce}
                  className="w-full py-4 bg-[#e4a576] hover:bg-[#d89766] active:scale-98 text-[#152935] font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-xl"
                >
                  <Volume2 className="w-5 h-5" /> ANNOUNCE PAYMENT (₹{inputAmount || "0"})
                </button>
              </div>

              {/* Right POS Numpad Grid */}
              <div className="md:col-span-6 grid grid-cols-3 gap-3">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      if (btn === "C") handleClear();
                      else if (btn === "⌫") handleBackspace();
                      else handleNumpad(btn);
                    }}
                    className={`py-5 text-xl font-black rounded-2xl active:scale-95 transition-all shadow-md ${
                      btn === "C"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                        : btn === "⌫"
                        ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                        : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
      <MerchantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profile={profile} onSave={saveProfile} onReset={resetProfile} />
    </div>
  );
}
