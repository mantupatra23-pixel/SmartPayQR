"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Calculator, Percent, DollarSign } from "lucide-react";

export default function CalculatorsPage() {
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);

  const gstAmount = (amount * gstRate) / 100;
  const totalWithGst = amount + gstAmount;

  return (
    <SidebarLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Merchant Financial Calculators</h2>
              <p className="text-xs text-slate-500">Calculate GST components, profit margins, and loan EMIs.</p>
            </div>
          </div>

          <div className="max-w-md bg-slate-50 p-6 rounded-3xl border space-y-4 text-xs font-bold">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-amber-600" /> Instant GST Calculator
            </h3>

            <div>
              <label className="text-slate-700 block mb-1">Base Price (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2.5 bg-white border rounded-xl font-black"
              />
            </div>

            <div>
              <label className="text-slate-700 block mb-1">GST Tax Rate (%)</label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full p-2.5 bg-white border rounded-xl font-black"
              >
                <option value={5}>5% GST</option>
                <option value={12}>12% GST</option>
                <option value={18}>18% GST</option>
                <option value={28}>28% GST</option>
              </select>
            </div>

            <div className="bg-white p-4 rounded-2xl border space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">GST Tax Amount:</span>
                <span className="font-black text-amber-600">₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-sm">
                <span className="text-slate-900 font-extrabold">Total Invoice Amount:</span>
                <span className="font-black text-emerald-600">₹{totalWithGst.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
