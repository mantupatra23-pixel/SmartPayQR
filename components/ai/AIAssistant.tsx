"use client";

import React, { useState } from "react";
import { 
  Wand2, Sparkles, Copy, Check, Store, MessageSquareQuote, 
  Share2, RefreshCw, Languages, Loader2, Heart, QrCode, 
  MapPin, MessageCircle, AlertCircle, Lightbulb, TrendingUp, Package, DollarSign
} from "lucide-react";
import { trackActivity } from "@/lib/analyticsTracker";

interface AIResultData {
  shopNames?: string[];
  taglines?: string[];
  qrPosterText?: string[];
  whatsappPromotions?: string[];
  festivalOffers?: string[];
  googleReviewRequest?: string[];
  facebookPosts?: string[];
  instagramCaptions?: string[];
  shortsScript?: string[];
  smsMarketing?: string[];
  emailCampaigns?: string[];
  referralMessages?: string[];
  customerWelcomeMessages?: string[];
  thankYouMessages?: string[];
  invoiceFooterMessages?: string[];
  googleBusinessDescriptions?: string[];
  growthTips?: string[];
  pricingSuggestions?: string[];
  inventorySuggestions?: string[];
  retentionTips?: string[];
  profitImprovementTips?: string[];
}

export const AIAssistant: React.FC = () => {
  const [category, setCategory] = useState("Kirana & Grocery");
  const [customCategory, setCustomCategory] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiData, setAiData] = useState<AIResultData | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const categories = [
    "Kirana & Grocery", "Pharmacy / Medical Store", "Restaurant & Cafe", 
    "Tea Stall & Snacks", "Salon & Beauty Parlour", "Mobile Shop & Repair", 
    "Clothing & Fashion", "Electronics & Appliances", "Hardware & Electricals", 
    "Bakery & Confectionery", "Jewellery Showroom", "Stationery & Book Store", 
    "Automobile & Service Center", "Tuition & Coaching Class", "Freelancer & Services", "Custom Business"
  ];

  const languages = [
    { label: "English", value: "English" },
    { label: "हिंदी (Hindi)", value: "Hindi" },
    { label: "ଓଡ଼ିଆ (Odia)", value: "Odia" },
    { label: "বাংলা (Bengali)", value: "Bengali" }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    const selectedCategory = category === "Custom Business" ? customCategory : category;

    if (!selectedCategory.trim()) {
      setError("Please specify a business category.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/merchant-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selectedCategory, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed.");
      }

      setAiData(data);
      trackActivity("aiGenerationsUsed", `Generated Groq AI Suite for ${selectedCategory} (${language})`, "Groq AI");
    } catch (err: any) {
      setError(err.message || "Failed to generate AI content. Check your API key or connection.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const shareText = (text: string) => {
    if (navigator.share) {
      navigator.share({ title: "SmartPay AI Content", text });
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  const toggleFavorite = (text: string) => {
    setFavorites(prev => ({ ...prev, [text]: !prev[text] }));
  };

  const renderCardSection = (title: string, icon: React.ReactNode, items?: string[]) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="space-y-3 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
          {icon} {title}
        </h3>
        <div className="space-y-2.5">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-all"
            >
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">{item}</p>
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => toggleFavorite(item)}
                  className={`p-1.5 rounded-lg border transition ${
                    favorites[item] ? 'bg-rose-50 text-rose-600 border-rose-200' : 'text-slate-400 hover:text-slate-600 border-slate-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${favorites[item] ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={() => shareText(item)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyToClipboard(item)}
                  className="inline-flex items-center gap-1 bg-slate-900 hover:bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition shadow-sm"
                >
                  {copiedText === item ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedText === item ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20">
            <Wand2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Groq AI Merchant Suite</h2>
            <p className="text-xs text-slate-500 mt-0.5">Multi-lingual AI marketing & business growth engine for small businesses.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="sm:col-span-5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
            Business Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {category === "Custom Business" && (
          <div className="sm:col-span-4">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Specify Business Type
            </label>
            <input
              type="text"
              placeholder="e.g. Handmade Pottery Shop"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        )}

        <div className={category === "Custom Business" ? "sm:col-span-3" : "sm:col-span-4"}>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-emerald-600" /> Output Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {languages.map((lang, i) => (
              <option key={i} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition shadow-lg shadow-emerald-600/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Generating..." : "Generate Ideas"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {aiData && (
        <div className="space-y-6 pt-2">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Generated AI Content Suite ({language})
            </span>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Regenerate All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderCardSection("Premium Shop Names", <Store className="w-4 h-4 text-emerald-600" />, aiData.shopNames)}
            {renderCardSection("Poster Slogans & Taglines", <MessageSquareQuote className="w-4 h-4 text-emerald-600" />, aiData.taglines)}
            {renderCardSection("UPI QR Poster Texts", <QrCode className="w-4 h-4 text-emerald-600" />, aiData.qrPosterText)}
            {renderCardSection("WhatsApp Promotions", <MessageCircle className="w-4 h-4 text-emerald-600" />, aiData.whatsappPromotions)}
            {renderCardSection("Festival Offers & Discounts", <Sparkles className="w-4 h-4 text-amber-500" />, aiData.festivalOffers)}
            {renderCardSection("Google Review Requests", <MapPin className="w-4 h-4 text-blue-500" />, aiData.googleReviewRequest)}
            {renderCardSection("Facebook Ad Copies", <Share2 className="w-4 h-4 text-blue-600" />, aiData.facebookPosts)}
            {renderCardSection("Instagram Captions & Hashtags", <Sparkles className="w-4 h-4 text-pink-500" />, aiData.instagramCaptions)}
            {renderCardSection("YouTube Shorts Scripts", <Sparkles className="w-4 h-4 text-red-500" />, aiData.shortsScript)}
            {renderCardSection("SMS Marketing Messages", <MessageCircle className="w-4 h-4 text-emerald-600" />, aiData.smsMarketing)}
            {renderCardSection("Email Marketing Campaigns", <MessageSquareQuote className="w-4 h-4 text-indigo-500" />, aiData.emailCampaigns)}
            {renderCardSection("Customer Referral Messages", <Share2 className="w-4 h-4 text-teal-600" />, aiData.referralMessages)}
            {renderCardSection("Customer Welcome Messages", <Store className="w-4 h-4 text-emerald-600" />, aiData.customerWelcomeMessages)}
            {renderCardSection("Thank You Messages", <Sparkles className="w-4 h-4 text-amber-500" />, aiData.thankYouMessages)}
            {renderCardSection("Invoice Footer Messages", <MessageSquareQuote className="w-4 h-4 text-slate-600" />, aiData.invoiceFooterMessages)}
            {renderCardSection("Google Business Descriptions", <MapPin className="w-4 h-4 text-blue-500" />, aiData.googleBusinessDescriptions)}
            {renderCardSection("AI Business Growth Tips", <TrendingUp className="w-4 h-4 text-emerald-600" />, aiData.growthTips)}
            {renderCardSection("AI Pricing Suggestions", <DollarSign className="w-4 h-4 text-amber-500" />, aiData.pricingSuggestions)}
            {renderCardSection("AI Inventory Suggestions", <Package className="w-4 h-4 text-indigo-500" />, aiData.inventorySuggestions)}
            {renderCardSection("Customer Retention Tips", <Lightbulb className="w-4 h-4 text-teal-500" />, aiData.retentionTips)}
            {renderCardSection("Profit Improvement Tips", <TrendingUp className="w-4 h-4 text-emerald-600" />, aiData.profitImprovementTips)}
          </div>
        </div>
      )}
    </div>
  );
};
