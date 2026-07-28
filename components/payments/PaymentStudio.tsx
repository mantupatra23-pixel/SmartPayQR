"use client";

import React, { useState, useEffect } from "react";
import { 
  CreditCard, Smartphone, CheckCircle2, AlertCircle, Clock, 
  ArrowUpRight, RefreshCw, QrCode, ShieldCheck, DollarSign 
} from "lucide-react";
import { generateUpiIntentLink } from "@/lib/paymentEngine";

interface PaymentStudioProps {
  merchantName: string;
  upiId: string;
}

export const PaymentStudio: React.FC<PaymentStudioProps> = ({ merchantName, upiId }) => {
  const [amount, setAmount] = useState<number>(100);
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [selectedApp, setSelectedApp] = useState<"gpay" | "phonepe" | "paytm" | "bhim" | "generic">("generic");
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<any[]>([]);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments/list");
      if (res.ok) {
        const data = await res.json();
        setPayments(data.payments || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleLaunchUpiIntent = () => {
    if (!upiId) {
      alert("Please configure your Merchant UPI ID in Profile Settings first.");
      return;
    }
    const orderRef = `REF_${Date.now()}`;
    const intentUrl = generateUpiIntentLink(
      { pa: upiId, pn: merchantName || "Merchant", am: amount, tn: `Payment to ${merchantName}`, tr: orderRef },
      selectedApp
    );
    window.location.href = intentUrl;
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Live Gateway & UPI Intent Launcher</h2>
              <p className="text-xs text-slate-500">Real-time payment links, Razorpay integration, and instant webhook verification.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchPayments}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Payments
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Direct UPI Intent Launcher Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-2xl border border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Smartphone className="w-3 h-3" /> Live UPI Intent
              </span>
              <span className="text-xs font-bold text-slate-400">0% Gateway Fee</span>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div>
                <label className="text-slate-300 block mb-1">Enter Collect Amount (₹) *</label>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-2xl text-lg font-black outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Select Customer UPI App</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["gpay", "phonepe", "paytm"] as const).map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setSelectedApp(app)}
                      className={`p-2.5 rounded-xl border text-center uppercase font-black text-[10px] transition ${
                        selectedApp === app ? "bg-emerald-600 border-emerald-400 text-white" : "bg-slate-800 border-slate-700 text-slate-300"
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLaunchUpiIntent}
                className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-black py-3.5 rounded-2xl text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
              >
                Open UPI App & Collect ₹{amount}
              </button>
            </div>
          </div>

          {/* Real-Time Payment Transactions History */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b pb-2">Verified Real Transactions</h3>

            {payments.length === 0 ? (
              <div className="text-center py-12 text-xs font-bold text-slate-400 border border-dashed rounded-2xl bg-slate-50 space-y-1">
                <Clock className="w-8 h-8 mx-auto text-slate-300" />
                <p>No verified payment records found.</p>
                <p className="text-[10px] text-slate-400 font-normal">Real gateway payments and verified webhooks will appear here.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[280px] overflow-y-auto">
                {payments.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-2xl border flex justify-between items-center text-xs font-semibold">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-slate-900">₹{p.amount}</span>
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                          {p.gateway}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Ref/UTR: {p.transactionId || p.orderId}</p>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      p.status === "SUCCESS" ? "bg-emerald-100 text-emerald-800" :
                      p.status === "FAILED" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
