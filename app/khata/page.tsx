"use client";

import React, { useState, useEffect } from "react";
import { useMerchant } from "@/hooks/useMerchant";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MerchantModal } from "@/components/merchant/MerchantModal";
import { BookOpen, Plus, IndianRupee, ArrowDownLeft, ArrowUpRight, Share2, Trash2, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface Entry {
  id: string;
  type: "upi" | "cash";
  amount: number;
  note: string;
  time: string;
}

export default function KhataPage() {
  const { profile, saveProfile, resetProfile, isLoaded } = useMerchant();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [entryType, setEntryType] = useState<"upi" | "cash">("upi");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("smartpayqr:daily_khata");
      if (saved) setEntries(JSON.parse(saved));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const saveEntries = (updated: Entry[]) => {
    setEntries(updated);
    try {
      localStorage.setItem("smartpayqr:daily_khata", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      showToast("Please enter a valid amount", "error");
      return;
    }

    const newEntry: Entry = {
      id: Math.random().toString(36).substring(2, 8),
      type: entryType,
      amount: Number(amount),
      note: note || (entryType === "upi" ? "UPI Payment" : "Cash Sale"),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);
    setAmount("");
    setNote("");
    showToast(`Added ₹${newEntry.amount} to ${entryType.toUpperCase()} sales`, "success");
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    saveEntries(updated);
    showToast("Entry removed", "info");
  };

  const clearKhata = () => {
    if (confirm("Are you sure you want to reset today's Khata entries?")) {
      saveEntries([]);
      showToast("Khata reset for today", "info");
    }
  };

  const totalUpi = entries.filter((e) => e.type === "upi").reduce((a, c) => a + c.amount, 0);
  const totalCash = entries.filter((e) => e.type === "cash").reduce((a, c) => a + c.amount, 0);
  const grandTotal = totalUpi + totalCash;

  const exportReport = () => {
    const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    const text = `*Daily Sales Report — ${profile.businessName}*\n📅 Date: ${dateStr}\n\n💳 UPI Collections: ₹${totalUpi}\n💵 Cash Collections: ₹${totalCash}\n----------------------\n*💰 GRAND TOTAL: ₹${grandTotal}*\n\nTotal Transactions: ${entries.length}\n_Generated via SmartPayQR Counter OS_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between">
      <div>
        <Header profile={profile} onEditProfile={() => setIsModalOpen(true)} />
        
        <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-serif font-black">Daily Khata & Ledger</h1>
              <p className="text-xs text-zinc-500">Track Cash vs UPI counter sales. Stored 100% locally on this phone.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportReport}
                className="bg-[#152935] hover:bg-[#223d4e] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Share2 className="w-4 h-4 text-[#e4a576]" /> Export to WhatsApp
              </button>
              <button
                onClick={clearKhata}
                className="p-2.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-xl"
                title="Reset Day"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metrics Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Sales Today</span>
              <p className="text-2xl font-black text-[#152935]">₹{grandTotal.toLocaleString("en-IN")}</p>
              <span className="text-[10px] text-zinc-500 font-medium">{entries.length} recorded sales</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">UPI Collections</span>
              <p className="text-2xl font-black text-emerald-600">₹{totalUpi.toLocaleString("en-IN")}</p>
              <span className="text-[10px] text-emerald-700 font-medium">Digital QR</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Cash in Counter</span>
              <p className="text-2xl font-black text-amber-700">₹{totalCash.toLocaleString("en-IN")}</p>
              <span className="text-[10px] text-amber-700 font-medium">Physical Cash</span>
            </div>
          </div>

          {/* Quick Entry Form */}
          <form onSubmit={addEntry} className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#152935]">Quick Sales Entry</h3>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEntryType("upi")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  entryType === "upi"
                    ? "bg-[#152935] text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-600"
                }`}
              >
                + UPI Entry
              </button>
              <button
                type="button"
                onClick={() => setEntryType("cash")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  entryType === "cash"
                    ? "bg-[#e4a576] text-[#152935] shadow-sm"
                    : "bg-zinc-100 text-zinc-600"
                }`}
              >
                + Cash Entry
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount (₹)"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#152935] focus:outline-none focus:border-[#152935]"
                />
              </div>

              <div className="sm:col-span-6">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional Note (e.g. Chai, Samosa, Table 3)"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full py-2.5 bg-[#152935] hover:bg-[#223d4e] active:scale-95 text-white font-black text-xs uppercase rounded-xl flex items-center justify-center gap-1 shadow"
                >
                  <Plus className="w-4 h-4 text-[#e4a576]" /> Add
                </button>
              </div>
            </div>
          </form>

          {/* Today's Transactions Log */}
          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-sm space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#152935]">Today's Activity Log</h3>

            {entries.length === 0 ? (
              <p className="text-xs text-zinc-400 text-center py-6">No sales entries recorded yet today. Add your first transaction above.</p>
            ) : (
              <div className="divide-y divide-zinc-100">
                {entries.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        item.type === "upi" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"
                      }`}>
                        {item.type === "upi" ? <ArrowDownLeft className="w-4 h-4" /> : <IndianRupee className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#152935]">{item.note}</p>
                        <span className="text-[10px] text-zinc-400">{item.time} • {item.type.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-[#152935]">₹{item.amount.toLocaleString("en-IN")}</span>
                      <button onClick={() => deleteEntry(item.id)} className="text-zinc-300 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
      <MerchantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profile={profile} onSave={saveProfile} onReset={resetProfile} />
    </div>
  );
}
