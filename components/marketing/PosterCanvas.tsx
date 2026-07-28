"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

interface PosterCanvasProps {
  posterRef: React.RefObject<HTMLDivElement>;
  headline: string;
  offerText: string;
  tagline: string;
  ctaText: string;
  theme: string;
  aspectRatio: "square" | "story" | "landscape" | "a4";
  brandColor: string;
  logoUrl?: string;
  productImageUrl?: string;
  includeQr: boolean;
  shopName: string;
  upiId: string;
  mobile: string;
  address: string;
}

export const PosterCanvas: React.FC<PosterCanvasProps> = ({
  posterRef,
  headline,
  offerText,
  tagline,
  ctaText,
  theme,
  aspectRatio,
  brandColor,
  logoUrl,
  productImageUrl,
  includeQr,
  shopName,
  upiId,
  mobile,
  address,
}) => {
  const getAspectClass = () => {
    switch (aspectRatio) {
      case "story": return "w-[340px] h-[600px]";
      case "landscape": return "w-[500px] h-[300px]";
      case "a4": return "w-[380px] h-[538px]";
      case "square":
      default: return "w-[380px] h-[380px]";
    }
  };

  const getThemeGradient = () => {
    switch (theme) {
      case "glass": return "from-slate-900/90 via-teal-950/90 to-slate-950/90 backdrop-blur-md border border-white/20";
      case "luxury": return "from-zinc-950 via-stone-900 to-amber-950 border border-amber-500/40 text-amber-200";
      case "festival": return "from-amber-600 via-rose-700 to-red-950 border border-rose-500/40";
      case "neon": return "from-slate-950 via-purple-950 to-indigo-950 border border-purple-500/50 shadow-purple-500/20";
      case "minimal": return "from-white via-slate-50 to-slate-100 text-slate-900 border border-slate-300";
      case "modern":
      default: return "from-slate-950 via-teal-950 to-emerald-950 border border-emerald-500/40";
    }
  };

  const isLight = theme === "minimal";

  return (
    <div className="flex justify-center w-full my-2">
      <div
        id="marketing-poster-canvas"
        ref={posterRef}
        className={`${getAspectClass()} bg-gradient-to-br ${getThemeGradient()} p-6 rounded-3xl shadow-2xl flex flex-col justify-between items-center text-center relative overflow-hidden transition-all duration-300`}
        style={{ borderColor: brandColor || undefined }}
      >
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Logo */}
        <div className="w-full flex justify-between items-center z-10">
          {logoUrl ? (
            <img src={logoUrl} alt="Shop Logo" className="h-8 max-w-[120px] object-contain rounded" />
          ) : (
            <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1 ${isLight ? 'text-slate-800' : 'text-emerald-400'}`}>
              <Sparkles className="w-3.5 h-3.5" /> {shopName || "YOUR SHOP NAME"}
            </span>
          )}
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${isLight ? 'bg-slate-200 text-slate-800' : 'bg-white/10 text-emerald-300 border-white/20'}`}>
            VERIFIED STORE
          </span>
        </div>

        {/* Main Product Image Overlay */}
        {productImageUrl && (
          <div className="my-2 max-h-[120px] w-full flex justify-center z-10">
            <img src={productImageUrl} alt="Product Promo" className="h-28 object-contain rounded-2xl shadow-lg border border-white/20" />
          </div>
        )}

        {/* Center Content Group */}
        <div className="space-y-2 z-10 my-auto px-2">
          <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {headline || "YOUR AI HEADLINE HERE"}
          </h2>
          <div className="bg-emerald-500/20 border border-emerald-400/30 py-1.5 px-4 rounded-xl backdrop-blur-sm">
            <p className="text-xs font-black text-emerald-300 uppercase tracking-wide">
              {offerText || "SPECIAL OFFER DETAILS"}
            </p>
          </div>
          <p className={`text-[11px] font-medium leading-tight ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {tagline || "Tagline describing store benefits"}
          </p>
        </div>

        {/* Dynamic QR Insertion & CTA */}
        <div className="w-full flex items-center justify-between pt-3 border-t border-white/10 z-10 gap-2">
          {includeQr && upiId ? (
            <div className="bg-white p-2 rounded-xl shadow-md shrink-0 flex items-center justify-center">
              <QRCodeSVG
                value={`upi://pay?pa=${upiId}&pn=${encodeURIComponent(shopName || 'Merchant')}`}
                size={52}
                level="M"
              />
            </div>
          ) : null}

          <div className="text-right flex-1 space-y-1">
            <span className="bg-emerald-600 text-white font-extrabold text-[10px] uppercase px-3 py-1 rounded-lg inline-block shadow">
              {ctaText || "SCAN & PAY VIA UPI"}
            </span>
            <p className={`text-[9px] font-bold truncate ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>
              {address || mobile ? `📍 ${address} | Ph: ${mobile}` : "Visit store today"}
            </p>
          </div>
        </div>

        {/* Watermark Branding */}
        <div className="absolute bottom-1 right-3 text-[8px] opacity-40 font-mono">
          SmartPayAI.in
        </div>
      </div>
    </div>
  );
};
