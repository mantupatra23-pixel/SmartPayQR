"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Zap, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#152935] text-zinc-300 mt-16 border-t border-[#223d4e] pt-12 pb-24 md:pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#e4a576] text-[#152935] flex items-center justify-center font-black text-sm">
                ₹
              </div>
              <span className="text-lg font-serif font-black text-white">
                SmartPay<span className="text-[#e4a576]">QR</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Your free digital payment counter kit. Create printable UPI QR standees, simulated soundbox alerts, and WhatsApp bills without any login or database.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-[#e4a576] font-bold">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> 100% Local Device Storage</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Zero Fee</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Merchant Tools</h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li><Link href="/" className="hover:text-white transition-colors">Instant Standee Maker</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Counter Soundbox Alert</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">WhatsApp Quick Invoice</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Trust & Legal</h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Fintech Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} SmartPayQR. Merchant-triggered utility. Does not process or verify bank transactions.</p>
        </div>
      </div>
    </footer>
  );
}
