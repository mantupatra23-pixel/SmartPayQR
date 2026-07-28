"use client";

import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer, Copy, FileText, Check } from "lucide-react";

interface ActionButtonsProps {
  posterRef: React.RefObject<HTMLDivElement>;
  upiId: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ posterRef, upiId }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownloadPNG = async () => {
    if (!posterRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(posterRef.current, { scale: 3, useCORS: true });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `SmartPayQR-${Date.now()}.png`;
      link.click();
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!posterRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(posterRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", (pdfWidth - 140) / 2, 20, 140, (canvas.height * 140) / canvas.width);
      pdf.save(`SmartPayQR-Poster-${Date.now()}.pdf`);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyUPI = () => {
    if (!upiId) return;
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-4">
      <button
        onClick={handleDownloadPNG}
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl transition shadow-lg shadow-emerald-600/20 text-xs sm:text-sm"
      >
        <Download className="w-4 h-4" /> Download PNG
      </button>

      <button
        onClick={handleDownloadPDF}
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl transition shadow-lg shadow-blue-600/20 text-xs sm:text-sm"
      >
        <FileText className="w-4 h-4" /> Export A4 PDF
      </button>

      <button
        onClick={handlePrint}
        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl transition shadow-md text-xs sm:text-sm"
      >
        <Printer className="w-4 h-4" /> Print Poster
      </button>

      <button
        onClick={handleCopyUPI}
        className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 active:scale-95 text-slate-800 font-semibold py-3 px-4 rounded-xl transition border border-slate-300 shadow-sm text-xs sm:text-sm"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy UPI ID"}
      </button>
    </div>
  );
};
