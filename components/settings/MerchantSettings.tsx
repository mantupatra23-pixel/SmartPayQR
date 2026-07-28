"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";

export const MerchantSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    gstin: "",
    address: "",
    upiId: ""
  });

  const [saved, setSaved] = useState(false);

  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("merchant_business_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (err) {
        console.error("Failed to parse saved profile", err);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("merchant_business_profile", JSON.stringify(profile));
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

      <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
        <div>
          <label className="text-slate-700 block mb-1 font-bold">Business Name</label>
          <input
            type="text"
            name="businessName"
            placeholder="e.g. My General Store"
            value={profile.businessName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-700 block mb-1 font-bold">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              placeholder="e.g. Rahul Sharma"
              value={profile.ownerName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-700 block mb-1 font-bold">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. 9876543210"
              value={profile.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-700 block mb-1 font-bold">GSTIN Number</label>
            <input
              type="text"
              name="gstin"
              placeholder="e.g. 22AAAAA0000A1Z5"
              value={profile.gstin}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-700 block mb-1 font-bold">Primary UPI ID</label>
            <input
              type="text"
              name="upiId"
              placeholder="e.g. myshop@upi"
              value={profile.upiId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-700 block mb-1 font-bold">Shop Address</label>
          <input
            type="text"
            name="address"
            placeholder="e.g. Main Market Road, City, State"
            value={profile.address}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-3 px-6 rounded-xl text-xs transition shadow-md"
        >
          <Save className="w-4 h-4" /> {saved ? "Settings Saved!" : "Save Settings"}
        </button>
      </form>
    </div>
  );
};
