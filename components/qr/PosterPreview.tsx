"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { NamePayData, PosterTheme } from "@/types/qr";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface PosterPreviewProps {
  data: NamePayData;
  posterRef: React.RefObject<HTMLDivElement>;
}

const THEME_STYLES: Record<PosterTheme, { container: string; text: string; badge: string; accent: string }> = {
  'classic-emerald': {
    container: 'from-slate-950 via-teal-950 to-emerald-950 border-emerald-500/40',
    text: 'text-emerald-300',
    badge: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300',
    accent: 'bg-emerald-500'
  },
  'royal-blue': {
    container: 'from-slate-950 via-blue-950 to-indigo-950 border-blue-500/40',
    text: 'text-blue-300',
    badge: 'bg-blue-500/10 border-blue-400/30 text-blue-300',
    accent: 'bg-blue-500'
  },
  'gold-luxury': {
    container: 'from-zinc-950 via-stone-900 to-amber-950 border-amber-500/40',
    text: 'text-amber-300',
    badge: 'bg-amber-500/10 border-amber-400/30 text-amber-300',
    accent: 'bg-amber-500'
  },
  'dark-violet': {
    container: 'from-slate-950 via-purple-950 to-slate-900 border-purple-500/40',
    text: 'text-purple-300',
    badge: 'bg-purple-500/10 border-purple-400/30 text-purple-300',
    accent: 'bg-purple-500'
  },
  'minimal-white': {
    container: 'from-white via-slate-50 to-slate-100 border-slate-300 text-slate-900',
    text: 'text-slate-700',
    badge: 'bg-slate-100 border-slate-300 text-slate-800',
    accent: 'bg-slate-900'
  },
  'festive-red': {
    container: 'from-slate-950 via-red-950 to-rose-950 border-rose-500/40',
    text: 'text-rose-300',
    badge: 'bg-rose-500/10 border-rose-400/30 text-rose-300',
    accent: 'bg-rose-500'
  }
};

export const PosterPreview: React.FC<PosterPreviewProps> = ({ data, posterRef }) => {
  const currentTheme = THEME_STYLES[data.theme || 'classic-emerald'];

  const upiIntent = data.upiId 
    ? `upi://pay?pa=${encodeURIComponent(data.upiId)}&pn=${encodeURIComponent(data.name || "")}${
        data.amount ? `&am=${data.amount}` : ""
      }${data.note ? `&tn=${encodeURIComponent(data.note)}` : ""}`
    : "";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-center w-full my-2"
    >
      <div
        id="printable-poster"
        ref={posterRef}
        className={`w-full max-w-[380px] sm:max-w-[400px] bg-gradient-to-b ${currentTheme.container} text-white rounded-3xl p-6 sm:p-7 shadow-2xl border flex flex-col items-center justify-between min-h-[560px] relative overflow-hidden`}
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Business Header */}
        <div className="w-full text-center space-y-1.5 z-10">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider mb-1 border ${currentTheme.badge}`}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified NPCI Merchant
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white truncate px-2">
            {data.name.trim() ? data.name : "YOUR SHOP NAME"}
          </h2>
          <p className={`text-xs font-medium truncate px-4 ${currentTheme.text}`}>
            {data.address.trim() ? data.address : "Enter shop address or tagline above"}
          </p>
        </div>

        {/* QR Core Container */}
        <div className="w-full bg-white p-5 rounded-2xl shadow-2xl border-4 border-white/20 flex flex-col items-center justify-center z-10 my-4">
          {data.upiId.trim() ? (
            <QRCodeSVG
              value={upiIntent}
              size={190}
              level="H"
              fgColor={data.qrColor || "#000000"}
              bgColor={data.qrBgColor || "#ffffff"}
              includeMargin={false}
              className="w-full max-w-[190px] h-auto"
            />
          ) : (
            <div className="w-[190px] h-[190px] flex flex-col items-center justify-center text-slate-400 text-xs text-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50">
              <ShieldCheck className="w-8 h-8 text-slate-300 mb-2" />
              Enter UPI ID in form to generate live QR
            </div>
          )}
          <p className="text-[11px] font-bold text-slate-600 tracking-widest uppercase mt-3">
            Scan & Pay With Any App
          </p>
        </div>

        {/* Payment VPA Box */}
        <div className="w-full text-center space-y-1.5 z-10">
          <div className="bg-white/10 backdrop-blur-md py-2 px-4 rounded-xl text-sm font-bold tracking-wide font-mono text-white border border-white/10 truncate">
            {data.upiId.trim() ? data.upiId : "yourname@upi"}
          </div>

          {data.mobile && (
            <p className="text-xs text-white/80 font-medium">
              Ph: +91 {data.mobile}
            </p>
          )}

          {data.amount && (
            <div className="inline-block bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-lg border border-amber-400/30">
              Fixed Amount: ₹{data.amount}
            </div>
          )}
        </div>

        {/* Supported UPI Partners */}
        <div className="w-full pt-4 border-t border-white/10 text-center z-10 mt-2">
          <p className="text-[10px] text-white/60 uppercase font-semibold tracking-widest mb-2">
            Accepted Payments
          </p>
          <div className="flex justify-center items-center gap-2 text-[11px] font-extrabold text-slate-900">
            <span className="bg-white px-2.5 py-1 rounded-md shadow-sm">GPay</span>
            <span className="bg-white px-2.5 py-1 rounded-md shadow-sm">PhonePe</span>
            <span className="bg-white px-2.5 py-1 rounded-md shadow-sm">Paytm</span>
            <span className="bg-white px-2.5 py-1 rounded-md shadow-sm">BHIM</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
