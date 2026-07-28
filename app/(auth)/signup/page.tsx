"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Store, User, Phone, Mail, Lock, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    category: "Grocery & Kirana",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    gstin: "",
    referralCode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register merchant account.");
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      setError("An unexpected server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
      <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Free • Independent Tenant
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create Merchant Account</h1>
          <p className="text-xs text-slate-500">Setup your shop profile for instant UPI Posters & GST Invoicing.</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="uppercase block mb-1">Merchant Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Mantu Patra"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="uppercase block mb-1">Shop Name *</label>
              <input
                type="text"
                name="shopName"
                required
                placeholder="e.g. Patra General Store"
                value={formData.shopName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="uppercase block mb-1">Business Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
              >
                <option value="Grocery & Kirana">Grocery & Kirana</option>
                <option value="Pharmacy & Medical">Pharmacy & Medical</option>
                <option value="Restaurant & Cafe">Restaurant & Cafe</option>
                <option value="Garments & Clothing">Garments & Clothing</option>
                <option value="Electronics & Mobile">Electronics & Mobile</option>
                <option value="Salon & Beauty">Salon & Beauty</option>
              </select>
            </div>
            <div>
              <label className="uppercase block mb-1">Mobile Number *</label>
              <input
                type="text"
                name="mobile"
                required
                placeholder="9876543210"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
              />
            </div>
          </div>

          <div>
            <label className="uppercase block mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              placeholder="merchant@dukan.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="uppercase block mb-1">Password *</label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="uppercase block mb-1">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="uppercase block mb-1">GSTIN (Optional)</label>
              <input
                type="text"
                name="gstin"
                placeholder="21ABCDE1234F1Z5"
                value={formData.gstin}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="uppercase block mb-1">Referral Code (Optional)</label>
              <input
                type="text"
                name="referralCode"
                placeholder="REF123"
                value={formData.referralCode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-2xl text-xs transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            {loading ? "Registering Account..." : "Create Merchant Account"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t">
          Already registered?{" "}
          <Link href="/login" className="text-emerald-600 font-extrabold hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
