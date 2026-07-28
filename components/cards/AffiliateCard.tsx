// components/cards/AffiliateCard.tsx
import React from "react";
import { ExternalLink } from "lucide-react";

interface AffiliateCardProps {
  title: string;
  description: string;
  buttonText: string;
  category: string;
  url: string;
}

export const AffiliateCard: React.FC<AffiliateCardProps> = ({
  title,
  description,
  buttonText,
  category,
  url
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col justify-between">
      <div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {category}
        </span>
        <h3 className="text-sm font-bold text-slate-800 mt-2 mb-1">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-3 rounded-xl transition text-center"
      >
        {buttonText} <ExternalLink size={12} />
      </a>
    </div>
  );
};
