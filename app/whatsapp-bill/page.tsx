"use client";

import React, { useState } from "react";
import { useMerchant } from "@/hooks/useMerchant";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MerchantModal } from "@/components/merchant/MerchantModal";
import { MessageCircle, Share2, Plus, Trash2, Receipt } from "lucide-react";
import { BillItem } from "@/types";
import { useToast } from "@/components/ui/Toast";

export default function WhatsAppBillPage() {
  const { profile, saveProfile, resetProfile, isLoaded } = useMerchant();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [custPhone, setCustPhone] = useState("");
  const [items, setItems] = useState<BillItem[]>([
    { id: "1", name: "Special Tea / Chai", quantity: 2, price: 20 },
    { id: "2", name: "Crispy Samosa", quantity: 2, price: 15 },
  ]);
  const [discount, setDiscount] = useState("0");

  if (!isLoaded) return null;

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substring(2, 7), name: "New Item", quantity: 1, price: 50 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const subtotal = items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
  const total = Math.max(0, subtotal - (Number(discount) || 0));

  const handleSendWhatsApp = () => {
    if (!custPhone || custPhone.length < 10) {
      showToast("Please enter a valid 10-digit customer mobile number", "error");
      return;
    }

    const cleanPhone = custPhone.replace(/\D/g, "");
    const directUpi = `upi://pay?pa=${encodeURIComponent(profile.upiId)}&pn=${encodeURIComponent(profile.businessName)}&am=${total}&cu=INR`;
    
    const itemsText = items.map((i) => `• ${i.name} (${i.quantity} x ₹${i.price}) = ₹${i.quantity * i.price}`).join("\n");
    
    const message = `*Digital Invoice — ${profile.businessName}*\n\n${itemsText}\n------------------\nSubtotal: ₹${subtotal}\nDiscount: ₹${discount}\n*TOTAL PAYABLE: ₹${total}*\n\n📲 *Click to Pay via UPI:* \n${directUpi}\n\n_Thank you for your business!_`;

    window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
    showToast("Opening WhatsApp with itemized bill", "success");
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between">
      <div>
        <Header profile={profile} onEditProfile={() => setIsModalOpen(true)} />
        
        <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-serif font-black">1-Click WhatsApp Quick-Bill</h1>
            <p className="text-xs text-zinc-500">Generate itemized digital bills with embedded UPI payment deep links.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 space-y-5">
            <div>
              <label className="text-xs font-bold text-[#152935]">Customer WhatsApp Number</label>
              <input
                type="tel"
                value={custPhone}
                placeholder="10-digit mobile number"
                onChange={(e) => setCustPhone(e.target.value)}
                className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#152935] uppercase tracking-wide">Itemized Bill Rows</label>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-xs font-black text-[#152935] bg-[#fde5d6] px-3 py-1.5 rounded-xl flex items-center gap-1 hover:bg-[#e4a576] transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Item
                </button>
              </div>

              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-zinc-50 p-3 rounded-2xl border border-zinc-200">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        setItems(items.map((i) => (i.id === item.id ? { ...i, name: e.target.value } : i)));
                      }}
                      className="col-span-6 bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs font-semibold"
                      placeholder="Item name"
                    />
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => {
                        setItems(items.map((i) => (i.id === item.id ? { ...i, quantity: Number(e.target.value) } : i)));
                      }}
                      className="col-span-2 bg-white border border-zinc-200 rounded-xl px-2 py-1.5 text-xs font-semibold text-center"
                      placeholder="Qty"
                    />
                    <input
                      type="number"
                      value={item.price}
                      min="0"
                      onChange={(e) => {
                        setItems(items.map((i) => (i.id === item.id ? { ...i, price: Number(e.target.value) } : i)));
                      }}
                      className="col-span-3 bg-white border border-zinc-200 rounded-xl px-2 py-1.5 text-xs font-semibold text-center"
                      placeholder="Price"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="col-span-1 flex justify-center text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-zinc-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-zinc-600">
                <span>Discount / Offer (₹)</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-24 bg-white border border-zinc-200 rounded-lg px-2 py-1 text-right text-xs font-bold"
                />
              </div>
              <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-black text-[#152935]">
                <span>Total Payable</span>
                <span className="text-emerald-600">₹{total}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Share2 className="w-4 h-4" /> SEND BILL VIA WHATSAPP
            </button>
          </div>
        </main>
      </div>

      <Footer />
      <MerchantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profile={profile} onSave={saveProfile} onReset={resetProfile} />
    </div>
  );
}
