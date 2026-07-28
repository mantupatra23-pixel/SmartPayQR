"use client";

import React from "react";
import { MONETIZATION_OFFERS } from "@/config/affiliates";
import { AffiliateCard } from "@/components/cards/AffiliateCard";
import { Zap, Wallet, Briefcase, CreditCard } from "lucide-react";

export const FinancialMarketplace: React.FC = () => {
  const personalLoans = MONETIZATION_OFFERS.filter(o => o.category === "Personal Loan");
  const businessLoans = MONETIZATION_OFFERS.filter(o => o.category === "Business Loan");
  const creditCards = MONETIZATION_OFFERS.filter(o => o.category === "Credit Card");

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Pre-Approved Offers
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Certified Loans & Credit Cards Marketplace
          </h2>
          <p className="text-xs text-emerald-200/80 mt-1 max-w-xl">
            Instant online approval for personal loans, certified business loan advisor assistance, and lifetime free credit cards.
          </p>
        </div>
      </div>

      {/* 1. PERSONAL LOAN SECTION (GREEN) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-emerald-100 pb-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Personal Loans</h3>
            <p className="text-xs text-slate-500">Fast online approval with zero collateral required</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalLoans.map((offer) => (
            <AffiliateCard key={offer.id} {...offer} />
          ))}
        </div>
      </section>

      {/* 2. BUSINESS LOAN SECTION (BLUE) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-blue-100 pb-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Business & Advisor Loan Services</h3>
            <p className="text-xs text-slate-500">Certified WeRize expert assistance in Ganjam & Odisha</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {businessLoans.map((offer) => (
            <AffiliateCard key={offer.id} {...offer} />
          ))}
        </div>
      </section>

      {/* 3. CREDIT CARDS SECTION (PURPLE) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-purple-100 pb-3">
          <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Credit Cards</h3>
            <p className="text-xs text-slate-500">Lifetime free, cashback, reward, and premium credit cards</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creditCards.map((offer) => (
            <AffiliateCard key={offer.id} {...offer} />
          ))}
        </div>
      </section>
    </div>
  );
};
