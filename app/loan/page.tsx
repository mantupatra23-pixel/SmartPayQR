"use client";

import React, { useState } from "react";
import { useMerchant } from "@/hooks/useMerchant";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MerchantModal } from "@/components/merchant/MerchantModal";
import { Calculator, IndianRupee, ShieldCheck, Sparkles, AlertCircle, HelpCircle } from "lucide-react";

export default function LoanCalculatorPage() {
  const { profile, saveProfile, resetProfile, isLoaded } = useMerchant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [principal, setPrincipal] = useState("50000");
  const [interestRate, setInterestRate] = useState("14");
  const [tenureMonths, setTenureMonths] = useState("6");

  if (!isLoaded) return null;

  const P = Number(principal) || 0;
  const r = (Number(interestRate) || 0) / 12 / 100;
  const n = Number(tenureMonths) || 1;

  // Monthly EMI calculation formula: [P x r x (1+r)^n] / [(1+r)^n - 1]
  const monthlyEmi = r > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
  const totalRepayment = monthlyEmi * n;
  const totalInterest = totalRepayment - P;
  const dailyCollection = monthlyEmi / 30;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between">
      <div>
        <Header profile={profile} onEditProfile={() => setIsModalOpen(true)} />
        
        <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-serif font-black">Merchant Business Loan & EMI Planner</h1>
            <p className="text-xs text-zinc-500">Calculate working capital EMIs and daily cash repayment estimates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Input Controls */}
            <div className="md:col-span-6 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#e4a576]" /> Loan Parameters
              </h2>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Required Loan Amount</span>
                  <span className="text-[#e4a576] font-black">₹{Number(principal).toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full accent-[#152935]"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                  <span>₹10,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Annual Interest Rate (%)</span>
                  <span className="font-black text-[#152935]">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="30"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full accent-[#152935]"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                  <span>8% (Bank)</span>
                  <span>30% (NBFC/Mudra)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Loan Tenure (Months)</label>
                <div className="grid grid-cols-4 gap-2">
                  {["3", "6", "12", "24"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTenureMonths(m)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        tenureMonths === m
                          ? "bg-[#152935] text-white border-[#152935]"
                          : "bg-zinc-50 border-zinc-200 text-[#152935] hover:bg-zinc-100"
                      }`}
                    >
                      {m} Mos
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Projection Card */}
            <div className="md:col-span-6 bg-gradient-to-br from-[#152935] to-[#254254] text-white p-6 rounded-3xl shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-black uppercase text-[#e4a576] tracking-widest">Repayment Estimate</span>
                <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Mudra/Business</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-zinc-300">Estimated Monthly EMI</span>
                <h3 className="text-3xl font-serif font-black text-white">
                  ₹{Math.round(monthlyEmi).toLocaleString("en-IN")}
                </h3>
              </div>

              {/* Daily Counter Pocket Estimate */}
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-[#e4a576]">Daily Counter Collection Target:</span>
                <p className="text-lg font-black text-white">₹{Math.round(dailyCollection)} / day</p>
                <p className="text-[10px] text-zinc-300">Set aside this daily amount from your counter UPI/Cash sales to pay effortlessly.</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>Principal Amount</span>
                  <span className="font-bold text-white">₹{P.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Total Interest Cost</span>
                  <span className="font-bold text-[#e4a576]">₹{Math.round(totalInterest).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-zinc-200 font-black pt-1 border-t border-white/10">
                  <span>Total Amount to Pay</span>
                  <span className="text-white">₹{Math.round(totalRepayment).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fde5d6]/40 border border-[#e4a576]/30 p-4 rounded-2xl text-[11px] text-zinc-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#e4a576] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>SmartPay Financial Disclaimer:</strong> This loan calculator is an educational estimator. SmartPayQR does not disburse loans, process credit applications, or partner with lenders.
            </p>
          </div>
        </main>
      </div>

      <Footer />
      <MerchantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profile={profile} onSave={saveProfile} onReset={resetProfile} />
    </div>
  );
}
