"use client";

import React, { useState } from "react";
import { MessageCircle, Share2, Sparkles, Copy, Check, Users } from "lucide-react";
import { trackActivity } from "@/lib/analyticsTracker";

export const WhatsAppBroadcast: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState("festival");

  const promoTemplates: Record<string, { title: string; text: string }> = {
    festival: {
      title: "Festive Offer Announcement",
      text: `🎉 *GRAND FESTIVE SALE AT OUR SHOP!* 🎉\n\nVisit us today for exclusive discounts & deals!\n\n💳 We accept 0% Fee Instant Payments via PhonePe, GPay & Paytm.\n\n_Powered by SmartPay AI OS - Create your shop QR & Invoices free at https://smartpayqr.in_`
    },
    billing: {
      title: "Digital Billing Recommendation",
      text: `Dukan bhaiyon, agar aap bhi apne dukan ke liye free me HD Payment Poster, GST Bills aur AI Marketing captions banana chahte ho, toh SmartPay AI OS check karo!\n\n100% Free & NPCI Compliant:\n👉 https://smartpayqr.in`
    },
    paymentLink: {
      title: "Shop Payment VPA Share",
      text: `Hello Customer, you can now pay directly to our shop VPA account using any UPI app.\n\nClick link to view our Verified Shop Poster & Pay:\n👉 https://smartpayqr.in`
    }
  };

  const currentPromo = promoTemplates[selectedOffer];

  const handleShareToWhatsAppGroup = () => {
    trackActivity("whatsAppShares", `Broadcasted viral campaign: ${currentPromo.title}`, "WhatsApp Broadcast");
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(currentPromo.text)}`, "_blank");
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(currentPromo.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">WhatsApp Merchant Broadcast Engine</h2>
            <p className="text-xs text-slate-500">Share offers & payment links directly to local trader & customer WhatsApp groups.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Select Broadcast Campaign</label>
          <select
            value={selectedOffer}
            onChange={(e) => setSelectedOffer(e.target.value)}
            className="w-full px-4 py-2.5 text-xs bg-slate-50 border rounded-xl font-bold"
          >
            <option value="festival">🎉 Festive Offer Announcement</option>
            <option value="billing">📲 Free Merchant OS Recommendation</option>
            <option value="paymentLink">💳 Shop Payment Link</option>
          </select>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
          {currentPromo.text}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleShareToWhatsAppGroup}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-600/20"
          >
            <Share2 className="w-4 h-4" /> Share to WhatsApp Groups
          </button>
          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs transition border"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Broadcast Message"}
          </button>
        </div>
      </div>
    </div>
  );
};
