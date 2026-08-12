"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [shopName, setShopName] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            shop_name: shopName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setSuccessMsg("Account created successfully. Please check your email to verify your account before logging in.");
        setLoading(false);
      }
    } catch (err: any) {
      setError("Unable to connect to the authentication server. Please check your internet connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full uppercase">
            Supabase Secure • Tenant OS
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-3">
            Create Merchant Account
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Setup your shop profile for instant UPI Posters & GST Invoicing.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Mantu Patra"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Shop Name *</label>
            <input
              type="text"
              required
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="e.g. Patra General Store"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="merchant@dukan.com"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-950 mt-2 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Merchant Account →"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-4">
          Already registered? <a href="/login" className="text-emerald-400 font-semibold hover:underline">Login Here</a>
        </p>
      </div>
    </div>
  );
}
