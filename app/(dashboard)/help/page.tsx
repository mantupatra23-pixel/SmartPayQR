"use client";

import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react";

export default function HelpPage() {
  return (
    <SidebarLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">SmartPay Help & Support Desk</h2>
              <p className="text-xs text-slate-500">24/7 dedicated merchant assistance for UPI settlements and POS configuration.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
            <a
              href="https://api.whatsapp.com/send?phone=919876543210"
              target="_blank"
              rel="noreferrer"
              className="p-5 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-3 hover:bg-emerald-100 transition"
            >
              <MessageCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h3 className="font-extrabold text-sm">WhatsApp Priority Support</h3>
                <p className="text-[11px] font-normal">Chat live with our technical integration specialists.</p>
              </div>
            </a>

            <div className="p-5 bg-slate-50 text-slate-800 rounded-2xl border flex items-center gap-3">
              <Mail className="w-6 h-6 text-slate-600 shrink-0" />
              <div>
                <h3 className="font-extrabold text-sm">Email Desk</h3>
                <p className="text-[11px] font-normal">support@smartpayqr.xyz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
