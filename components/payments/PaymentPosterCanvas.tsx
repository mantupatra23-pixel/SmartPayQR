"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, Lock, Copy, Check, Sparkles } from "lucide-react";

interface PaymentPosterCanvasProps {
  posterRef: React.RefObject<HTMLDivElement>;
  merchantName: string;
  upiId: string;
  amount?: number | string;
  phone?: string;
  theme: "light" | "dark" | "gradient" | "gold";
  logoUrl?: string;
  showNpciBadge?: boolean;
  showSecureBadge?: boolean;
  showAcceptedApps?: boolean;
  showWatermark?: boolean;
}

export const PaymentPosterCanvas: React.FC<PaymentPosterCanvasProps> = ({
  posterRef,
  merchantName,
  upiId,
  amount,
  phone,
  theme,
  logoUrl,
  showNpciBadge = true,
  showSecureBadge = true,
  showAcceptedApps = true,
  showWatermark = true,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyUpi = () => {
    if (upiId) {
      navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case "dark":
        return {
          bg: "bg-slate-950 border-slate-800 text-white",
          cardBg: "bg-slate-900 border-slate-800",
          textMuted: "text-slate-400",
          badgeBg: "bg-emerald-950/80 text-emerald-400 border-emerald-800",
          accentColor: "text-emerald-400",
          brandBox: "bg-slate-900 border-slate-800 text-slate-200",
        };
      case "gradient":
        return {
          bg: "bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950 border-emerald-500/30 text-white",
          cardBg: "bg-slate-900/90 border-emerald-500/20 backdrop-blur-md",
          textMuted: "text-emerald-200/70",
          badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
          accentColor: "text-emerald-300",
          brandBox: "bg-slate-900/80 border-emerald-500/20 text-slate-200",
        };
      case "gold":
        return {
          bg: "bg-gradient-to-br from-zinc-950 via-stone-900 to-amber-950 border-amber-500/40 text-amber-100",
          cardBg: "bg-stone-900/90 border-amber-500/30",
          textMuted: "text-amber-200/70",
          badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
          accentColor: "text-amber-400",
          brandBox: "bg-stone-900/80 border-amber-500/30 text-amber-100",
        };
      case "light":
      default:
        return {
          bg: "bg-white border-slate-200 text-slate-900",
          cardBg: "bg-slate-50 border-slate-200",
          textMuted: "text-slate-500",
          badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
          accentColor: "text-emerald-600",
          brandBox: "bg-white border-slate-200 text-slate-700",
        };
    }
  };

  const currentTheme = getThemeStyles();
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    merchantName || "Merchant"
  )}${amount ? `&am=${Number(amount).toFixed(2)}` : ""}&cu=INR`;

  return (
    <div className="flex justify-center w-full my-4">
      <div
        id="payment-poster-print-canvas"
        ref={posterRef}
        className={`w-[380px] min-h-[580px] ${currentTheme.bg} p-6 rounded-3xl border shadow-2xl flex flex-col justify-between items-center text-center relative overflow-hidden transition-all duration-300`}
      >
        {/* Top Badges & Logo */}
        <div className="w-full space-y-3 z-10">
          <div className="flex justify-between items-center w-full">
            {showNpciBadge && (
              <span
                className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 ${currentTheme.badgeBg}`}
              >
                <ShieldCheck className="w-3 h-3" /> NPCI VERIFIED
              </span>
            )}
            {showSecureBadge && (
              <span
                className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 ${currentTheme.badgeBg}`}
              >
                <Lock className="w-3 h-3" /> 256-BIT ENCRYPTED
              </span>
            )}
          </div>

          <div className="pt-2 flex flex-col items-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Merchant Logo"
                className="h-10 max-w-[140px] object-contain mb-1 rounded-lg"
              />
            ) : null}
            <h2 className="text-xl font-black uppercase tracking-tight leading-tight">
              {merchantName || "YOUR BUSINESS NAME"}
            </h2>
            {phone && (
              <p className={`text-[10px] font-bold ${currentTheme.textMuted}`}>
                Ph: +91 {phone}
              </p>
            )}
          </div>
        </div>

        {/* QR Code Container */}
        <div className="my-4 z-10 w-full flex flex-col items-center">
          <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-200 relative group">
            <QRCodeSVG
              value={upiUrl || "upi://pay?pa=merchant@upi"}
              size={180}
              level="H"
              includeMargin={true}
            />
          </div>

          <p className="text-[11px] font-black uppercase tracking-wider mt-2.5 text-emerald-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> SCAN & PAY SECURELY
          </p>

          {/* Conditional Amount Badge */}
          {amount && Number(amount) > 0 ? (
            <div className="mt-2 bg-emerald-600 text-white font-black text-sm px-4 py-1.5 rounded-2xl shadow-md">
              FIXED AMOUNT: ₹{Number(amount).toLocaleString("en-IN")}
            </div>
          ) : null}
        </div>

        {/* UPI ID Copy Bar */}
        <div
          onClick={handleCopyUpi}
          className={`w-full ${currentTheme.cardBg} p-2.5 rounded-2xl border flex justify-between items-center cursor-pointer transition z-10 text-xs font-mono font-bold mb-3`}
        >
          <span className="truncate max-w-[240px] px-1">{upiId || "yourupi@bank"}</span>
          <span
            className={`p-1.5 rounded-xl ${
              copied ? "bg-emerald-500 text-white" : "bg-slate-200/50 text-slate-600"
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </span>
        </div>

        {/* ACCEPTED PAYMENT APPS SECTION */}
        {showAcceptedApps && (
          <div className="w-full space-y-2 z-10">
            <span
              className={`text-[9px] font-black uppercase tracking-widest block ${currentTheme.textMuted}`}
            >
              Accepted Payment Apps
            </span>

            <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
              {/* BHIM UPI */}
              <div className={`px-2 py-1 rounded-xl border flex items-center justify-center font-black text-[9px] tracking-tight ${currentTheme.brandBox}`}>
                BHIM UPI
              </div>

              {/* PhonePe */}
              <div className={`px-2 py-1 rounded-xl border flex items-center justify-center font-black text-[9px] text-purple-400 ${currentTheme.brandBox}`}>
                PhonePe
              </div>

              {/* Google Pay */}
              <div className={`px-2 py-1 rounded-xl border flex items-center justify-center font-black text-[9px] text-blue-400 ${currentTheme.brandBox}`}>
                Google Pay
              </div>

              {/* Paytm */}
              <div className={`px-2 py-1 rounded-xl border flex items-center justify-center font-black text-[9px] text-sky-400 ${currentTheme.brandBox}`}>
                Paytm
              </div>

              {/* Amazon Pay */}
              <div className={`px-2 py-1 rounded-xl border flex items-center justify-center font-black text-[9px] text-amber-400 ${currentTheme.brandBox}`}>
                Amazon Pay
              </div>

              {/* CRED */}
              <div className={`px-2 py-1 rounded-xl border flex items-center justify-center font-black text-[9px] ${currentTheme.brandBox}`}>
                CRED
              </div>

              {/* WhatsApp Pay */}
              <div className={`px-2 py-1 rounded-xl border flex items-center justify-center font-black text-[9px] text-emerald-400 ${currentTheme.brandBox}`}>
                WhatsApp
              </div>

              {/* Mobikwik */}
              <div className={`px-2 py-1 rounded-xl border flex items-center justify-center font-black text-[9px] text-indigo-400 ${currentTheme.brandBox}`}>
                Mobikwik
              </div>
            </div>
          </div>
        )}

        {/* Optional Watermark */}
        {showWatermark && (
          <div className={`mt-3 text-[8px] font-mono opacity-50 ${currentTheme.textMuted}`}>
            Powered by SmartPay AI OS
          </div>
        )}
      </div>
    </div>
  );
};
