"use client";

import React, { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { StandeeTheme, MerchantProfile } from "@/types";
import { Copy, Check, ShieldCheck } from "lucide-react";

interface QRPreviewProps {
  profile: MerchantProfile;
  amount: string;
  theme: StandeeTheme;
  logoUrl?: string;
  onCopyUpi: () => void;
  copied: boolean;
}

export const QRPreview = forwardRef<HTMLDivElement, QRPreviewProps>(
  ({ profile, amount, theme, logoUrl, onCopyUpi, copied }, ref) => {
    // Generate valid UPI URI
    const paymentUrl = `upi://pay?pa=${encodeURIComponent(profile.upiId)}&pn=${encodeURIComponent(
      profile.businessName
    )}${amount ? `&am=${encodeURIComponent(amount)}` : ""}&cu=INR`;

    return (
      <div
        id="printable-standee"
        ref={ref}
        style={{ backgroundColor: theme.background, color: theme.foreground }}
        className={`w-full max-w-[340px] rounded-3xl p-6 shadow-2xl flex flex-col items-center space-y-4 transition-all ${theme.border}`}
      >
        {/* Top Tagline Badge */}
        <div className="text-center w-full space-y-1">
          <div
            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
            className="text-[10px] font-black tracking-widest py-1.5 px-4 rounded-full inline-block uppercase shadow-sm"
          >
            {profile.tagline || "Accepted Here • Any UPI"}
          </div>
          
          <div className="pt-2 flex items-center justify-center gap-2">
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Logo"
                className="w-7 h-7 rounded-full object-cover border border-zinc-200"
              />
            )}
            <h3 className="text-xl font-black truncate max-w-[240px]">{profile.businessName || "Store Name"}</h3>
          </div>
          <p className="text-[10px] font-bold opacity-75 uppercase tracking-wider">
            {profile.category} • Instant Counter Payment
          </p>
        </div>

        {/* High-Contrast SVG QR Container */}
        <div
          style={{ backgroundColor: theme.qrBg }}
          className="p-4 rounded-2xl border border-black/10 shadow-inner flex flex-col items-center justify-center relative"
        >
          <QRCodeSVG
            value={paymentUrl}
            size={190}
            level="H"
            fgColor={theme.qrFg}
            bgColor="transparent"
          />
        </div>

        {/* Preset Amount Chip (if configured) */}
        {amount && (
          <div className="bg-black/5 px-4 py-1.5 rounded-xl border border-black/10">
            <span className="text-xs font-black">Pay Exactly: ₹{amount}</span>
          </div>
        )}

        {/* UPI ID Row */}
        <div className="w-full flex items-center justify-between bg-black/5 rounded-xl px-3.5 py-2 border border-black/5">
          <span className="text-xs font-mono font-bold truncate max-w-[200px]">{profile.upiId}</span>
          <button
            onClick={onCopyUpi}
            type="button"
            className="p-1 hover:opacity-75 transition-opacity"
            title="Copy UPI ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Accepted Payment Icons Bar */}
        <div className="text-center w-full pt-2 border-t border-black/10 space-y-1">
          <p className="text-[10px] font-bold opacity-80">
            GPay • PhonePe • Paytm • BHIM • Cred • AmazonPay
          </p>
          <span className="text-[8px] font-bold opacity-50 block uppercase tracking-widest">
            SmartPay Standee OS
          </span>
        </div>
      </div>
    );
  }
);

QRPreview.displayName = "QRPreview";
