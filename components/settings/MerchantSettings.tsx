"use client";

import React, { useState } from "react";
import { Settings, Save, Store, ShieldCheck, User, Phone, MapPin } from "lucide-react";

export const MerchantSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    businessName: "Mantu Patra General Store",
    ownerName: "Mantu Patra",
    phone: "9178065739",
    gstin: "21ABCDE1234F1Z5",
    address: "At-Bartini, Po-Sodaka, Ps-Polasara, Ganjam, Odisha",
    upiId: "9178065739@ibl"
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-100 text-slate-800 rounded-2xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Merchant Business Profile</h2>
            <p className="text-xs text-slate-500">Manage business details used across Posters and GST Invoices.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-xs font-semibold">
        <div>
          <label className="text-slate-700 block mb-1 font-bold">Business Name</label>
          <input
            type="text"
            value={profile.businessName}
            onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-bold"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-700 block mb-1 font-bold">Owner Name</label>
            <input
              type="text"
              value={profile.ownerName}
              onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="text-slate-700 block mb-1 font-bold">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-700 block mb-1 font-bold">GSTIN Number</label>
            <input
              type="text"
              value={profile.gstin}
              onChange={(e) => setProfile({ ...profile, gstin: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="text-slate-700 block mb-1 font-bold">Primary UPI ID</label>
            <input
              type="text"
              value={profile.upiId}
              onChange={(e) => setProfile({ ...profile, upiId: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-bold"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-700 block mb-1 font-bold">Shop Address</label>
          <input
            type="text"
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-bold"
          />
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition shadow-md"
        >
          <Save className="w-4 h-4" /> {saved ? "Profile Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
};
