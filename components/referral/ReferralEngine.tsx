"use client";

import React, { useState, useEffect } from "react";
import { Gift, Share2, Copy, Check, Users, Award, Sparkles } from "lucide-react";
import { trackActivity } from "@/lib/analyticsTracker";

export const ReferralEngine: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem("smartpay_referral_count");
    if (savedCount) {
      setReferralCount(parseInt(savedCount, 10));
    }
  }, []);

  const referralLink = "https://smartpayqr.in/?ref=merchant_partner";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    trackActivity("whatsAppShares", "Copied Referral Link to share with merchants", "Referral");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Dukan bhaiyon! Maine apni shop ke liye free NPCI UPI Payment Poster aur GST Invoice Maker SmartPay AI OS se banaya hai. Aap bhi apni dukan ke liye free me banao:\n👉 ${referralLink}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
    trackActivity("whatsAppShares", "Shared Merchant Referral Link on WhatsApp", "Referral");
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Invite Merchants & Unlock Rewards</h2>
            <p className="text-xs text-slate-500">Share SmartPay AI OS with other shopkeepers to earn bonus themes and verified badges.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl">
          <Award className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-black text-amber-800">{referralCount} Merchants Invited</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-white p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> Merchant Referral Program
        </div>
        <div>
          <h3 className="text-lg font-bold">Your Personal Referral Link</h3>
          <p className="text-xs text-slate-300 font-mono mt-1">{referralLink}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg"
          >
            <Share2 className="w-4 h-4" /> Invite via WhatsApp
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl text-xs transition border border-white/20"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Link Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
};
