import React from "react";
import Link from "next/link";
import { 
  Store, Phone, MapPin, MessageCircle, QrCode, 
  ShieldCheck, ShoppingBag, ArrowRight 
} from "lucide-react";

export default async function PublicStorePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string } 
}) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug || "general-store";
  const formattedStoreName = rawSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Store Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-400/30">
              Verified Digital Storefront
            </span>
            <span className="text-xs text-slate-300 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> NPCI Verified
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{formattedStoreName}</h1>
            <p className="text-xs text-slate-300 mt-1">Welcome to our official online catalog & payment portal.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-emerald-400" /> Retail & Daily Essentials
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Main Market
            </span>
          </div>
        </div>

        {/* Quick Order / Contact Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hello ${formattedStoreName}, I want to place an order.`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" /> Order via WhatsApp
            </a>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition"
            >
              <QrCode className="w-4 h-4" /> Pay Shop VPA
            </Link>
          </div>
        </div>

        {/* Footer Branding (Viral Growth) */}
        <div className="text-center pt-4">
          <p className="text-xs font-semibold text-slate-500">
            Powered by <Link href="/" className="font-extrabold text-emerald-600 hover:underline">SmartPay AI OS</Link> • Free Shop Digital Storefront
          </p>
        </div>
      </div>
    </div>
  );
}
