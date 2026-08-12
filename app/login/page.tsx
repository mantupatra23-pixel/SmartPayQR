"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full uppercase">
            Supabase Auth • Secure Merchant OS
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-3">
            Login to SmartPay AI OS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Access your isolated merchant database and billing suite.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Registered Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="merchant@dukan.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-xs text-white bg-slate-950"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-xs text-white bg-slate-950"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-xl text-xs transition disabled:opacity-50 shadow-lg shadow-emerald-950"
          >
            {loading ? "Authenticating..." : "Login to Merchant Account →"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          New merchant? <a href="/signup" className="text-emerald-400 font-semibold hover:underline">Create Account</a>
        </p>
      </div>
    </div>
  );
}
