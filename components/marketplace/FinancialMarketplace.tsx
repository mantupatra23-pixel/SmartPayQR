"use client";

import React from "react";
import { MONETIZATION_CARDS } from "@/config/affiliates";
import { ExternalLink, Star, ShieldCheck, Zap } from "lucide-react";

export const FinancialMarketplace: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> Merchant Financial Services & Hardware
          </h2>
          <p className="text-xs text-slate-500">Apply for pre-approved credit cards, current accounts, and soundboxes.</p>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Official Bank Partners
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {MONETIZATION_CARDS.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden group"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {card.category}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {card.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                {card.description}
              </p>
            </div>

            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition shadow-md"
            >
              {card.buttonText} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
