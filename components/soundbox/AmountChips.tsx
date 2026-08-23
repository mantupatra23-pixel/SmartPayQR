"use client";

import React from "react";

interface AmountChipsProps {
  selectedAmount: string;
  onSelectAmount: (val: string) => void;
}

const PRESET_AMOUNTS = ["10", "20", "50", "100", "200", "500", "1000", "2000"];

export function AmountChips({ selectedAmount, onSelectAmount }: AmountChipsProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-[#152935] flex items-center justify-between">
        <span>Quick Amount Triggers</span>
        <span className="text-[10px] text-zinc-400 font-normal">Tap to announce instantly</span>
      </label>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {PRESET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => onSelectAmount(amt)}
            className={`py-2.5 rounded-xl text-xs font-black border transition-all active:scale-95 ${
              selectedAmount === amt
                ? "bg-[#152935] text-white border-[#152935] shadow-sm"
                : "bg-zinc-50 border-zinc-200 text-[#152935] hover:bg-zinc-100"
            }`}
          >
            ₹{amt}
          </button>
        ))}
      </div>
    </div>
  );
}
