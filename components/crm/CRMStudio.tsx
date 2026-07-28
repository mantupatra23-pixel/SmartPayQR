"use client";

import React, { useState } from "react";
import { Users, Gift, Award, Send, Phone, Calendar, Heart, ShieldCheck } from "lucide-react";
import { Customer } from "@/types/suite";

export const CRMStudio: React.FC = () => {
  const [customers] = useState<Customer[]>([
    { id: "1", name: "Rahul Sharma", phone: "9876543210", totalDue: 1250, loyaltyPoints: 240, lastInvoiceDate: "2026-07-20" },
    { id: "2", name: "Priya Verma", phone: "9123456789", totalDue: 0, loyaltyPoints: 510, lastInvoiceDate: "2026-07-25" },
    { id: "3", name: "Amit Kumar", phone: "9988776655", totalDue: 3400, loyaltyPoints: 85, lastInvoiceDate: "2026-07-15" },
  ]);

  const sendWish = (phone: string, name: string, type: string) => {
    const text = `Dear ${name}, Happy ${type} from Mantu General Store! Enjoy an exclusive 10% discount on your next visit.`;
    window.open(`https://api.whatsapp.com/send?phone=91${phone}&text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">CRM & Customer Loyalty Suite</h2>
              <p className="text-xs text-slate-500">Manage customer ledgers, reward points, and automated birthday/anniversary greetings.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200">
            3 Active Campaigns
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Loyalty Points Issued</p>
            <p className="text-2xl font-black text-indigo-600">835 Pts</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Outstanding Ledger Dues</p>
            <p className="text-2xl font-black text-rose-600">₹4,650</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Repeat Customer Rate</p>
            <p className="text-2xl font-black text-emerald-600">68%</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Customer Directory</h3>
          {customers.map((c) => (
            <div key={c.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 rounded-2xl border gap-3 hover:border-indigo-200 transition">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-slate-900">{c.name}</h4>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-600" /> {c.loyaltyPoints} Pts
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3" /> +91 {c.phone} • Last Purchase: {c.lastInvoiceDate}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => sendWish(c.phone, c.name, "Birthday")}
                  className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-3 rounded-xl text-xs transition shadow-sm"
                >
                  <Gift className="w-3.5 h-3.5" /> Wish Birthday
                </button>
                <button
                  onClick={() => sendWish(c.phone, c.name, "Anniversary")}
                  className="flex items-center gap-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-3 rounded-xl text-xs transition shadow-sm"
                >
                  <Heart className="w-3.5 h-3.5" /> Wish Anniversary
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
