"use client";

import React, { useState } from "react";
import { Users, Plus, Phone, MessageSquare, Send } from "lucide-react";
import { Customer } from "@/types/suite";

export const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: "1", name: "Rahul Sharma", phone: "9876543210", totalDue: 1250, lastInvoiceDate: "2026-07-20", notes: "Regular customer" },
    { id: "2", name: "Priya Verma", phone: "9123456789", totalDue: 0, lastInvoiceDate: "2026-07-25", notes: "Paid via UPI" },
    { id: "3", name: "Amit Kumar", phone: "9988776655", totalDue: 3400, lastInvoiceDate: "2026-07-15", notes: "Due for grocery bulk order" },
  ]);

  const sendWhatsAppReminder = (customer: Customer) => {
    const text = `Hello ${customer.name}, this is a gentle payment reminder from Mantu General Store for your outstanding balance of ₹${customer.totalDue}. Kindly pay via UPI.`;
    window.open(`https://api.whatsapp.com/send?phone=91${customer.phone}&text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Customer Ledger & Reminders</h2>
            <p className="text-xs text-slate-500">Track customer dues and send instant WhatsApp payment reminders.</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {customers.map((c) => (
          <div key={c.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 rounded-2xl border gap-3">
            <div>
              <h3 className="text-sm font-black text-slate-900">{c.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3" /> +91 {c.phone} • Last Bill: {c.lastInvoiceDate}
              </p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-2 sm:pt-0">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Outstanding Due</span>
                <span className={`text-sm font-black ${c.totalDue > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  ₹{c.totalDue}
                </span>
              </div>

              {c.totalDue > 0 && (
                <button
                  onClick={() => sendWhatsAppReminder(c)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition shadow-md"
                >
                  <Send className="w-3.5 h-3.5" /> WhatsApp Due
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
