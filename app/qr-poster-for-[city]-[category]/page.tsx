import React from "react";
import Link from "next/link";
import { INDIAN_CITIES, BUSINESS_CATEGORIES } from "@/config/seoKeywords";
import { QrCode, Sparkles, ShieldCheck, ArrowRight, Store } from "lucide-react";

export async function generateStaticParams() {
  const params: { city: string; category: string }[] = [];
  
  INDIAN_CITIES.forEach((city) => {
    BUSINESS_CATEGORIES.forEach((cat) => {
      params.push({
        city: city.toLowerCase(),
        category: cat.slug,
      });
    });
  });

  return params;
}

export default function ProgrammaticSEOPage({ params }: { params: { city: string; category: string } }) {
  const formattedCity = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  const categoryObj = BUSINESS_CATEGORIES.find(c => c.slug === params.category) || { name: "Small Business" };

  const pageTitle = `Free UPI Payment QR Poster Generator for ${categoryObj.name} in ${formattedCity}`;
  const metaDesc = `Create NPCI compliant UPI Payment QR posters and GST Invoices instantly for your ${categoryObj.name} in ${formattedCity}. 100% Free SmartPay AI OS.`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="space-y-3">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> NPCI Approved • 100% Free
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {pageTitle}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {metaDesc}
          </p>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> SmartPay AI OS
          </div>
          <h2 className="text-xl font-extrabold">Generate Your Custom Shop QR Poster in 10 Seconds</h2>
          <p className="text-xs text-slate-300">
            No registration needed. Enter your UPI VPA ID, generate A4 printable PDF/PNG, and receive payments directly to your bank account via PhonePe, Paytm, Google Pay, or BHIM.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow-lg transition active:scale-95"
          >
            Create {categoryObj.name} Poster <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="border-t pt-6 space-y-4 text-xs text-slate-600">
          <h3 className="font-bold text-slate-800 text-sm">Why Merchants in {formattedCity} Choose SmartPay AI OS:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Zero Transaction Charges (0% MDR on UPI payments).</li>
            <li>Instant HD Printable A4 PDF posters for shop counter display.</li>
            <li>Integrated GST Invoice Studio & WhatsApp Billing engine.</li>
            <li>Groq AI Assistant for multi-lingual store marketing (English, Hindi, Odia, Bengali).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
