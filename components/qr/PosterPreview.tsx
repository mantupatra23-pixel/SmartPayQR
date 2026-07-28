// components/qr/PosterPreview.tsx
"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { NamePayData } from "@/types/qr";

interface PosterPreviewProps {
  data: NamePayData;
  posterRef: React.RefObject<HTMLDivElement | null>;
}

export const PosterPreview: React.FC<PosterPreviewProps> = ({ data, posterRef }) => {
  const upiIntent = `upi://pay?pa=${encodeURIComponent(data.upiId || "")}&pn=${encodeURIComponent(data.name || "")}${data.amount ? `&am=${data.amount}` : ""}${data.note ? `&tn=${encodeURIComponent(data.note)}` : ""}`;

  return (
    <div className="flex justify-center w-full my-4">
      <div
        ref={posterRef}
        className="w-[340px] sm:w-[380px] bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-emerald-400/30 flex flex-col items-center justify-between min-h-[520px] relative overflow-hidden"
      >
        {/* Top Header */}
        <div className="w-full text-center space-y-1 z-10">
          {data.logoUrl && (
            <img
              src={data.logoUrl}
              alt="Business Logo"
              className="w-14 h-14 mx-auto rounded-full object-cover border-2 border-white/80 shadow-md mb-2"
            />
          )}
          <h2 className="text-2xl font-black tracking-wide truncate uppercase text-emerald-100">
            {data.name || "YOUR BUSINESS NAME"}
          </h2>
          {data.address && (
            <p className="text-xs text-emerald-200/80 truncate px-4">
              {data.address}
            </p>
          )}
        </div>

        {/* Scan & Pay Badge */}
        <div className="bg-emerald-500/20 backdrop-blur-md px-4 py-1 rounded-full border border-emerald-300/30 text-xs font-bold tracking-widest uppercase my-2 text-emerald-200">
          SCAN & PAY WITH ANY UPI APP
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-emerald-100 flex items-center justify-center z-10 my-2">
          {data.upiId ? (
            <QRCodeSVG
              value={upiIntent}
              size={180}
              level="H"
              includeMargin={false}
            />
          ) : (
            <div className="w-[180px] h-[180px] flex items-center justify-center text-slate-400 text-xs text-center border-2 border-dashed border-slate-200 rounded-xl">
              Enter UPI ID to generate QR
            </div>
          )}
        </div>

        {/* Payment Details */}
        <div className="w-full text-center space-y-1 z-10 my-1">
          <div className="bg-black/20 backdrop-blur-sm py-1.5 px-3 rounded-lg text-sm font-semibold tracking-wide font-mono text-emerald-100 border border-white/10">
            {data.upiId || "example@upi"}
          </div>
          {data.mobile && (
            <p className="text-xs text-emerald-200/90 font-medium">
              Ph: +91 {data.mobile}
            </p>
          )}
          {data.amount && (
            <p className="text-sm font-bold text-amber-300">
              Amount: ₹{data.amount}
            </p>
          )}
        </div>

        {/* Bottom Supported UPI Apps */}
        <div className="w-full pt-3 border-t border-white/10 text-center z-10">
          <p className="text-[10px] text-emerald-200/60 uppercase font-semibold tracking-wider mb-1">
            Accepted On
          </p>
          <div className="flex justify-center items-center gap-3 text-xs font-bold text-white/90">
            <span className="bg-white/10 px-2 py-0.5 rounded">GPay</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">PhonePe</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">Paytm</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">BHIM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
