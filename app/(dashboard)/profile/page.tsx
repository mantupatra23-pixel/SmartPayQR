"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { User, Store, Phone, Mail, QrCode, Save, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [merchantName, setMerchantName] = useState(session?.user?.name || "Mantu Patra");
  const [shopName, setShopName] = useState((session?.user as any)?.shopName || "Patra General Store");
  const [upiId, setUpiId] = useState((session?.user as any)?.upiId || "9876543210@ybl");

  return (
    <SidebarLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Merchant Business Profile</h2>
              <p className="text-xs text-slate-500">Update shop details, default UPI receiver VPA, and GSTIN.</p>
            </div>
          </div>

          <form className="max-w-xl space-y-4 text-xs font-bold text-slate-700">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1">Owner Name</label>
                <input
                  type="text"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>
              <div>
                <label className="block mb-1">Shop Name</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Merchant UPI ID (Default VPA)</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono"
              />
            </div>

            <button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </form>
        </div>
      </div>
    </SidebarLayout>
  );
}
