"use client";

import React, { useState, useEffect } from "react";
import { Zap, X, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { trackActivity } from "@/lib/analyticsTracker";

export const SmartOfferModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleAnalyticsUpdate = () => {
      const savedData = localStorage.getItem("smartpay_real_analytics_data");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          // Agar merchant ne ₹25,000+ se zyadah ka bill/revenue calculate kiya hai
          if (parsed.invoiceRevenue >= 25000 && !sessionStorage.getItem("loan_modal_shown")) {
            setIsOpen(true);
            sessionStorage.setItem("loan_modal_shown", "true");
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    window.addEventListener("smartpay_analytics_updated", handleAnalyticsUpdate);
    return () => window.removeEventListener("smartpay_analytics_updated", handleAnalyticsUpdate);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 relative overflow-hidden">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-[10px] font-black px-3 py-1 rounded-full border border-amber-200 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-600" /> Pre-Approved Merchant Offer
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-black text-slate-900">Get Collateral-Free Business Loan</h3>
          <p className="text-xs text-slate-500">
            Based on your shop sales activity, you are eligible for up to ₹5,000,000 instant business loan with 0% processing fees.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border space-y-2 text-xs">
          <div className="flex justify-between font-bold">
            <span className="text-slate-500">Loan Amount:</span>
            <span className="text-slate-900 font-black">Up to ₹5 Lakhs</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-slate-500">Interest Rate:</span>
            <span className="text-emerald-600 font-black">1.1% per month</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-slate-500">Disposal Time:</span>
            <span className="text-blue-600 font-black">24 Hours in Bank</span>
          </div>
        </div>

        <a
          href="https://werize.com" // Aapka Affiliate Referral Link
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackActivity("marketplaceClicks", "Clicked Smart Loan Offer Modal", "Monetization");
            setIsOpen(false);
          }}
          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-2xl text-xs transition shadow-lg shadow-emerald-600/20"
        >
          Apply Instant Loan <ExternalLink className="w-4 h-4" />
        </a>

        <p className="text-[10px] text-center text-slate-400 font-medium">
          100% Paperless • RBI Registered Lending Partners
        </p>
      </div>
    </div>
  );
};
