"use client";

import React from "react";
import { AffiliateOffer } from "@/config/affiliates";
import { ExternalLink, Star, ShieldCheck, Zap, CreditCard, Wallet, Briefcase } from "lucide-react";

export const AffiliateCard: React.FC<AffiliateOffer> = ({
  title,
  subtitle,
  category,
  buttonText,
  url,
  badge,
  rating,
  benefits,
  accentColor,
  isWeRize
}) => {
  const colorStyles = {
    emerald: {
      border: "border-emerald-200/80 hover:border-emerald-400",
      badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
      iconBg: "bg-emerald-500/10 text-emerald-600",
      btnBg: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20",
      glow: "from-emerald-500/5 to-teal-500/5",
      icon: <Wallet className="w-5 h-5 text-emerald-600" />
    },
    blue: {
      border: "border-blue-200/80 hover:border-blue-400",
      badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
      iconBg: "bg-blue-500/10 text-blue-600",
      btnBg: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20",
      glow: "from-blue-500/5 to-indigo-500/5",
      icon: <Briefcase className="w-5 h-5 text-blue-600" />
    },
    purple: {
      border: "border-purple-200/80 hover:border-purple-400",
      badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
      iconBg: "bg-purple-500/10 text-purple-600",
      btnBg: "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20",
      glow: "from-purple-500/5 to-fuchsia-500/5",
      icon: <CreditCard className="w-5 h-5 text-purple-600" />
    }
  };

  const theme = colorStyles[accentColor];

  return (
    <div
      className={`bg-white rounded-3xl p-6 border ${theme.border} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1`}
    >
      {/* Background Gradient Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.glow} opacity-100 pointer-events-none`} />

      <div>
        {/* Top Badges */}
        <div className="flex justify-between items-center mb-4">
          <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg}`}>
            {category}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {rating || "4.9"}
          </div>
        </div>

        {/* Card Header & Icon */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className={`p-3 rounded-2xl ${theme.iconBg} shrink-0`}>
            {theme.icon}
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-slate-900 transition-colors leading-snug">
              {title}
            </h3>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Benefits Description */}
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          {benefits}
        </p>

        {/* Special WeRize / Trusted Partner Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 mb-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>{isWeRize ? "Official WeRize Financial Partner" : "100% Certified Financial Partner"}</span>
        </div>
      </div>

      {/* CTA Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full inline-flex items-center justify-center gap-2 ${theme.btnBg} text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-lg active:scale-95`}
      >
        {buttonText} <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
