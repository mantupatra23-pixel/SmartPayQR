"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { NamePayData } from "@/types/qr";
import { ShieldCheck, Sparkles } from "lucide-react";

interface PosterPreviewProps {
  data: NamePayData;
  posterRef: React.RefObject<HTMLDivElement>;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({ data, posterRef }) => {
  const upiIntent = `upi://pay?pa=${encodeURIComponent(data.upiId || "")}&pn=${encodeURIComponent(data.name || "")}${
    data.amount ? `&am=${data.amount}` : ""
  }${data.note ? `&tn=${encodeURIComponent(data.note)}` : ""}`;

  return (
    <div className="flex justify-center w-full my-2">
      <div
        id="printable-poster"
        ref={posterRef}
        className="w-full max-w-[380px] sm:max-w-[400px] bg-gradient-to-b from-slate-900 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-emerald-500/30 flex flex-col items-center justify-between min-h-[550px] relative overflow-hidden transition-all duration-300"
      >
        {/* Decorative Background Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Business Header */}
        <div className="w-full text-center space-y-1.5 z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-400/20 px-3 py-1 rounded-full text-emerald-300 text-[11px] font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Verified Merchant
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white truncate px-2">
            {data.name || "YOUR SHOP NAME"}
          </h2>
          {data.address && (
            <p className="text-xs text-emerald-200/80 font-medium truncate px-4">
              {data.address}
            </p>
          )}
        </div>

        {/* QR Core Container */}
        <div className="w-full bg-white p-5 rounded-2xl shadow-2xl border-4 border-emerald-400/30 flex flex-col items-center justify-center z-10 my-4 transform hover:scale-[1.01] transition-transform">
          {data.upiId ? (
            <QRCodeSVG
              value={upiIntent}
              size={190}
              level="H"
              includeMargin={false}
              className="w-full max-w-[190px] h-auto"
            />
          ) : (
            <div className="w-[190px] h-[190px] flex flex-col items-center justify-center text-slate-400 text-xs text-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50">
              <ShieldCheck className="w-8 h-8 text-slate-300 mb-2" />
              Fill form details to generate your UPI QR
            </div>
          )}
          <p className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mt-3">
            Scan to Pay with Any UPI App
          </p>
        </div>

        {/* Payment Identification */}
        <div className="w-full text-center space-y-1.5 z-10">
          <div className="bg-white/10 backdrop-blur-md py-2 px-4 rounded-xl text-sm font-bold tracking-wide font-mono text-emerald-200 border border-white/10 truncate">
            {data.upiId || "yourname@upi"}
          </div>

          {data.mobile && (
            <p className="text-xs text-emerald-200/90 font-medium">
              Phone: +91 {data.mobile}
            </p>
          )}

          {data.amount && (
            <div className="inline-block bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-lg border border-amber-400/30">
              Amount Payable: ₹{data.amount}
            </div>
          )}
        </div>

        {/* Supported UPI Providers Banner */}
        <div className="w-full pt-4 border-t border-white/10 text-center z-10 mt-2">
          <p className="text-[10px] text-emerald-300/70 uppercase font-semibold tracking-widest mb-2">
            Accepted Payments
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-3 text-[11px] font-extrabold text-slate-900">
            <span className="bg-white px-2.5 py-1 rounded-md shadow-sm">GPay</span>
            <span className="bg-white px-2.5 py-1 rounded-md shadow-sm">PhonePe</span>
            <span className="bg-white px-2.5 py-1 rounded-md shadow-sm">Paytm</span>
            <span className="bg-white px-2.5 py-1 rounded-md shadow-sm">BHIM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
