"use client";

import React, { useState, useEffect } from "react";
import { Supplier, getSuppliers, saveSuppliers } from "@/lib/inventoryEngine";
import { Truck, Plus, Phone, MessageCircle, Mail, MapPin, Trash2, DollarSign } from "lucide-react";

export const SupplierStudio: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(getSuppliers());
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const sync = () => setSuppliers(getSuppliers());
    window.addEventListener("smartpay_inventory_updated", sync);
    return () => window.removeEventListener("smartpay_inventory_updated", sync);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSup: Supplier = {
      id: `sup_${Date.now()}`,
      name,
      phone,
      whatsapp: whatsapp || phone,
      email,
      address,
      outstandingBalance: Number(balance) || 0,
    };

    const updated = [...suppliers, newSup];
    saveSuppliers(updated);
    setShowForm(false);
    setName(""); setPhone(""); setWhatsapp(""); setEmail(""); setAddress(""); setBalance(0);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete supplier?")) {
      const updated = suppliers.filter((s) => s.id !== id);
      saveSuppliers(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-3xl border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Supplier Network</h3>
            <p className="text-xs text-slate-500">Manage vendors, purchase origins, and payables.</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl border shadow-xl space-y-4 text-xs font-semibold">
          <h4 className="font-extrabold text-slate-900 text-sm">New Supplier Profile</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <input type="text" required placeholder="Supplier Name *" value={name} onChange={(e) => setName(e.target.value)} className="p-3 bg-slate-50 border rounded-xl" />
            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-3 bg-slate-50 border rounded-xl" />
            <input type="text" placeholder="WhatsApp Number" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="p-3 bg-slate-50 border rounded-xl" />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 bg-slate-50 border rounded-xl" />
            <input type="number" placeholder="Outstanding Balance (₹)" value={balance || ""} onChange={(e) => setBalance(Number(e.target.value))} className="p-3 bg-slate-50 border rounded-xl" />
            <input type="text" placeholder="Address / Location" value={address} onChange={(e) => setAddress(e.target.value)} className="p-3 bg-slate-50 border rounded-xl" />
          </div>
          <button type="submit" className="bg-slate-900 text-white py-2.5 px-6 rounded-xl font-bold">Save Supplier</button>
        </form>
      )}

      {suppliers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed text-xs text-slate-400 font-bold">
          No suppliers registered yet. Click "+ Add Supplier" to start.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map((s) => (
            <div key={s.id} className="bg-white p-5 rounded-3xl border shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{s.name}</h4>
                  {s.phone && <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" /> {s.phone}</p>}
                </div>
                <button onClick={() => handleDelete(s.id)} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
              </div>

              {s.address && <p className="text-xs text-slate-600 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {s.address}</p>}

              <div className="bg-slate-50 p-2.5 rounded-xl border flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Outstanding Payable:</span>
                <span className={`font-black ${s.outstandingBalance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  ₹{s.outstandingBalance}
                </span>
              </div>

              {s.whatsapp && (
                <a
                  href={`https://api.whatsapp.com/send?phone=91${s.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold py-2 rounded-xl text-xs border border-emerald-200"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Supplier
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
