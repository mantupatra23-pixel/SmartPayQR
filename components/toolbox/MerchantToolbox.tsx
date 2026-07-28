"use client";

import React, { useState } from "react";
import { Calculator, Percent } from "lucide-react";

export const MerchantToolbox: React.FC = () => {
  // GST Calculator State
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'exclusive' | 'inclusive'>('exclusive');

  // Calculation Logic
  const gstAmount = gstType === 'exclusive' 
    ? (amount * gstRate) / 100 
    : amount - (amount * (100 / (100 + gstRate)));

  const totalAmount = gstType === 'exclusive' ? amount + gstAmount : amount;

  // Margin Calculator State
  const [costPrice, setCostPrice] = useState<number>(800);
  const [sellingPrice, setSellingPrice] = useState<number>(1000);
  const profit = sellingPrice - costPrice;
  const margin = sellingPrice > 0 ? ((profit / sellingPrice) * 100).toFixed(2) : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* GST Calculator */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">GST Calculator</h3>
            <p className="text-xs text-slate-500">Calculate Inclusive and Exclusive GST Rates instantly.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Base Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">GST Rate (%)</label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border rounded-xl font-semibold"
              >
                <option value={5}>5% GST</option>
                <option value={12}>12% GST</option>
                <option value={18}>18% GST</option>
                <option value={28}>28% GST</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Calculation Type</label>
              <select
                value={gstType}
                onChange={(e) => setGstType(e.target.value as any)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border rounded-xl font-semibold"
              >
                <option value="exclusive">Add GST (Exclusive)</option>
                <option value="inclusive">Remove GST (Inclusive)</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>GST Amount:</span>
              <span className="font-mono text-emerald-400 font-bold">₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-800">
              <span>Final Total Amount:</span>
              <span className="font-mono text-emerald-300">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Margin & Profit Calculator */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Profit Margin Calculator</h3>
            <p className="text-xs text-slate-500">Analyze profit margins on wholesale inventory purchases.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Cost Price (₹)</label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Selling Price (₹)</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Net Profit:</span>
              <span className="font-mono text-blue-400 font-bold">₹{profit}</span>
            </div>
            <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-800">
              <span>Profit Margin (%):</span>
              <span className="font-mono text-blue-300">{margin}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
