"use client";

import React, { useState } from "react";
import { Wand2, Sparkles, Copy, Check, Store, MessageSquareQuote, Shield } from "lucide-react";

export const AIAssistant: React.FC = () => {
  const [category, setCategory] = useState("Retail & Grocery");
  const [outputNames, setOutputNames] = useState<string[]>([]);
  const [outputTaglines, setOutputTaglines] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateAIContent = () => {
    const shopNameDb: Record<string, string[]> = {
      "Retail & Grocery": ["Patra HyperMart", "Apna Daily Essentials", "Prime Super Market", "Bharat Retail Hub"],
      "Restaurant & Cafe": ["The Spicy Spoon", "Urban Tadka Cafe", "Fresh Bites Bistro", "Chai & Conversations"],
      "Fashion & Apparel": ["Velvet Trends", "Imperial Clothing Co.", "Desi Style Studio", "Vogue Attire"],
      "Electronics & Mobile": ["TechZone Electronics", "Mobile Care Point", "Smart Gadgets Hub", "Digital World"]
    };

    const taglineDb = [
      "Quality Guaranteed, Lowest Prices Everyday!",
      "Scan UPI QR & Get Instant Digital Receipt.",
      "Your Trusted Neighborhood Dukan Since Day 1.",
      "100% Original Products & Fast Customer Support."
    ];

    setOutputNames(shopNameDb[category] || shopNameDb["Retail & Grocery"]);
    setOutputTaglines(taglineDb);
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
          <Wand2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Merchant AI Assistant Engine</h2>
          <p className="text-xs text-slate-500">Auto-generate catchy shop names, taglines, and marketing notes in seconds.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Select Business Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-medium"
          >
            <option value="Retail & Grocery">Retail, Kirana & Grocery</option>
            <option value="Restaurant & Cafe">Restaurant, Food Court & Cafe</option>
            <option value="Fashion & Apparel">Fashion, Clothes & Footwear</option>
            <option value="Electronics & Mobile">Electronics & Mobile Repair</option>
          </select>
        </div>
        <button
          onClick={generateAIContent}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 rounded-xl text-sm shadow-md"
        >
          <Sparkles className="w-4 h-4" /> Generate Ideas
        </button>
      </div>

      {outputNames.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
          {/* Shop Names Output */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Store className="w-4 h-4 text-emerald-600" /> Suggested Shop Names
            </h3>
            {outputNames.map((name, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 border rounded-xl">
                <span className="text-sm font-bold text-slate-800">{name}</span>
                <button
                  onClick={() => copyToClipboard(name, i)}
                  className="text-slate-500 hover:text-emerald-600"
                >
                  {copiedIndex === i ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>

          {/* Taglines Output */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4 text-emerald-600" /> Recommended Poster Taglines
            </h3>
            {outputTaglines.map((tagline, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 border rounded-xl">
                <span className="text-xs font-medium text-slate-700">{tagline}</span>
                <button
                  onClick={() => copyToClipboard(tagline, i + 10)}
                  className="text-slate-500 hover:text-emerald-600"
                >
                  {copiedIndex === i + 10 ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
