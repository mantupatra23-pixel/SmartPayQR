"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { PaymentStudio } from "@/components/payments/PaymentStudio";
import { PaymentPosterStudio } from "@/components/payments/PaymentPosterStudio";

export default function PaymentsPage() {
  const [activeSubTab, setActiveSubTab] = useState<"gateway" | "poster">("poster");

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div className="flex bg-white p-2 rounded-2xl border text-xs font-bold gap-2 w-fit">
          <button
            onClick={() => setActiveSubTab("poster")}
            className={`px-4 py-2 rounded-xl transition ${
              activeSubTab === "poster" ? "bg-slate-900 text-white" : "text-slate-600"
            }`}
          >
            Payment QR Poster Studio
          </button>
          <button
            onClick={() => setActiveSubTab("gateway")}
            className={`px-4 py-2 rounded-xl transition ${
              activeSubTab === "gateway" ? "bg-slate-900 text-white" : "text-slate-600"
            }`}
          >
            UPI Intent & Gateway
          </button>
        </div>

        {activeSubTab === "poster" ? (
          <PaymentPosterStudio />
        ) : (
          <PaymentStudio merchantName="SmartPay Merchant" upiId="merchant@upi" />
        )}
      </div>
    </SidebarLayout>
  );
}
