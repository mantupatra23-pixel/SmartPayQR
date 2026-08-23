"use client";

import React from "react";
import { Download, Printer, FileText, Share2, Sparkles } from "lucide-react";

interface ExportControlsProps {
  onExportPng: () => void;
  onExportPdfA4: () => void;
  onExportPdfA5: () => void;
  onPrint: () => void;
  onShare: () => void;
  isExporting: boolean;
}

export function ExportControls({
  onExportPng,
  onExportPdfA4,
  onExportPdfA5,
  onPrint,
  onShare,
  isExporting,
}: ExportControlsProps) {
  return (
    <div className="w-full max-w-[340px] space-y-2.5">
      {/* Primary A4 Print Ready PDF */}
      <button
        onClick={onExportPdfA4}
        disabled={isExporting}
        className="w-full py-3.5 bg-[#152935] hover:bg-[#223d4e] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl border border-[#152935]"
      >
        {isExporting ? <Sparkles className="w-4 h-4 animate-spin text-[#e4a576]" /> : <FileText className="w-4 h-4 text-[#e4a576]" />}
        <span>{isExporting ? "PREPARING FILE..." : "DOWNLOAD A4 PRINT PDF"}</span>
      </button>

      {/* Secondary Options Grid */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onExportPdfA5}
          disabled={isExporting}
          className="py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 active:scale-[0.98] text-[#152935] font-black text-[11px] uppercase tracking-wide rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <FileText className="w-3.5 h-3.5 text-[#698ea2]" />
          <span>A5 PDF</span>
        </button>

        <button
          onClick={onExportPng}
          disabled={isExporting}
          className="py-2.5 bg-white border border-zinc-300 hover:bg-zinc-50 active:scale-[0.98] text-[#152935] font-black text-[11px] uppercase tracking-wide rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-[#e4a576]" />
          <span>HD PNG</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onPrint}
          className="py-2.5 bg-zinc-100 hover:bg-zinc-200 active:scale-[0.98] text-[#152935] font-black text-[11px] uppercase tracking-wide rounded-xl transition-all flex items-center justify-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Direct Print</span>
        </button>

        <button
          onClick={onShare}
          className="py-2.5 bg-zinc-100 hover:bg-zinc-200 active:scale-[0.98] text-[#152935] font-black text-[11px] uppercase tracking-wide rounded-xl transition-all flex items-center justify-center gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share QR</span>
        </button>
      </div>
    </div>
  );
}
