"use client";

import React, { useEffect } from "react";

interface AdSenseProps {
  client?: string;
  slot?: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
}

export const AdSenseSlot: React.FC<AdSenseProps> = ({
  client = "ca-pub-XXXXXXXXXXXXXXXX", // Aapka Google AdSense Publisher ID
  slot = "1234567890", // Aapka Ad Slot ID
  format = "auto",
  responsive = true,
}) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense load error", err);
    }
  }, []);

  return (
    <div className="w-full my-4 flex flex-col items-center justify-center min-h-[90px] bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-2 overflow-hidden">
      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">
        Sponsored Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};
