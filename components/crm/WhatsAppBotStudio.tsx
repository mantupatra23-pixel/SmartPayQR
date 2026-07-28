"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, BellRing, Sparkles, Send, FileText, UserCheck, AlertCircle } from "lucide-react";
import { getCRMCustomers } from "@/lib/crmEngine";
import { getStoreProfile } from "@/lib/storefrontEngine";
import { sendWhatsAppMessage, WA_TEMPLATES } from "@/lib/whatsappBot";

export const WhatsAppBotStudio: React.FC = () => {
  const [customers, setCustomers] = useState(getCRMCustomers());
  const storeProfile = getStoreProfile();
  
  const [activeBot, setActiveBot] = useState<"reminder" | "marketing">("reminder");
  const [promoDiscount, setPromoDiscount] = useState("FLAT 20% OFF on all items!");

  useEffect(() => {
    const handleSync = () => setCustomers(getCRMCustomers());
    window.addEventListener("smartpay_crm_updated", handleSync);
    return () => window.removeEventListener("smartpay_crm_updated", handleSync);
  }, []);

  const customersWithDues = customers.filter(c => {
    const netDue = c.ledgerEntries.reduce((sum, e) => e.type === "credit" ? sum + e.amount : sum - e.amount, 0);
    return netDue > 0;
  });

  const handleSendReminder = (customer: any) => {
    const netDue = customer.ledgerEntries.reduce((sum: number, e: any) => e.type === "credit" ? sum + e.amount : sum - e.amount, 0);
    const message = WA_TEMPLATES.paymentReminder(
      customer.name, 
      netDue, 
      storeProfile.upiId || "merchant@upi", 
      storeProfile.storeName || "Store"
    );
    sendWhatsAppMessage(customer.whatsapp || customer.mobile, message, `Sent Payment Reminder to ${customer.name}`);
  };

  const handleSendPromo = (customer: any) => {
    const message = WA_TEMPLATES.festivalPromo(
      customer.name, 
      storeProfile.storeName || "Our Shop", 
      promoDiscount
    );
    sendWhatsAppMessage(customer.whatsapp || customer.mobile, message, `Sent Promo Campaign to ${customer.name}`);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">WhatsApp Auto-Bot Studio</h2>
            <p className="text-xs text-slate-500">Send 1-click payment reminders and marketing campaigns directly to your customers.</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl border text-xs font-bold gap-1">
          <button
            onClick={() => setActiveBot('reminder')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeBot === 'reminder' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            <BellRing className="w-4 h-4" /> Payment Reminders
          </button>
          <button
            onClick={() => setActiveBot('marketing')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeBot === 'marketing' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            <Sparkles className="w-4 h-4" /> Marketing Campaign
          </button>
        </div>
      </div>

      {activeBot === "reminder" && (
        <div className="space-y-4">
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-rose-800 text-sm font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>You have {customersWithDues.length} customers with outstanding pending balances.</p>
          </div>

          {customersWithDues.length === 0 ? (
            <div className="text-center py-8 text-xs font-bold text-slate-400 border border-dashed rounded-2xl bg-slate-50">
              No outstanding dues found in the ledger.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customersWithDues.map(c => {
                const netDue = c.ledgerEntries.reduce((sum, e) => e.type === "credit" ? sum + e.amount : sum - e.amount, 0);
                return (
                  <div key={c.id} className="bg-white border p-4 rounded-2xl shadow-sm flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">{c.name}</h4>
                      <p className="text-xs text-slate-500">Pending: <span className="font-black text-rose-600">₹{netDue}</span></p>
                    </div>
                    <button
                      onClick={() => handleSendReminder(c)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Reminder
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeBot === "marketing" && (
        <div className="space-y-6">
          <div className="bg-slate-50 border p-4 rounded-2xl space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Set Campaign Offer / Discount Text</label>
            <input
              type="text"
              value={promoDiscount}
              onChange={(e) => setPromoDiscount(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-white border rounded-xl font-bold"
            />
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-900 mb-3">Select Customers to Send Campaign ({customers.length})</h3>
            {customers.length === 0 ? (
              <div className="text-center py-8 text-xs font-bold text-slate-400 border border-dashed rounded-2xl bg-slate-50">
                Add customers to CRM to send marketing campaigns.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customers.map(c => (
                  <div key={c.id} className="bg-white border p-4 rounded-2xl shadow-sm flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-slate-900 text-sm flex items-center gap-1">
                        {c.name} {c.isVip && <UserCheck className="w-3 h-3 text-amber-500" />}
                      </h4>
                      <p className="text-[11px] text-slate-500">+{c.mobile}</p>
                    </div>
                    <button
                      onClick={() => handleSendPromo(c)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Promo
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
