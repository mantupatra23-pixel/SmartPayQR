"use client";

import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer, Copy, FileText, Share2, Check } from "lucide-react";
import { trackActivity } from "@/lib/analyticsTracker";

interface ActionButtonsProps {
  posterRef: React.RefObject<HTMLDivElement>;
  upiId: string;
  name: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ posterRef, upiId, name }) => {
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
      link.download = `${name || 'SmartPay'}-QR-Poster.png`;
      link.click();
      trackActivity("qrDownloads", `Downloaded Ultra HD PNG poster for ${name || 'Store'}`, "PNG Export");
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
      
      pdf.addImage(imgData, "PNG", (pdfWidth - 140) / 2, 20, 140, (canvas.height * 140) / canvas.width);
      pdf.save(`${name || 'SmartPay'}-QR-Poster.pdf`);
      trackActivity("pdfDownloads", `Exported A4 PDF poster for ${name || 'Store'}`, "PDF Export");
    } finally {
      setLoading(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `Pay ${name} instantly via UPI:\nUPI ID: ${upiId}\n\nGenerated via SmartPay QR Studio`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
    trackActivity("whatsAppShares", `Shared UPI QR via WhatsApp`, "WhatsApp Share");
  };

  const handlePrint = () => {
    window.print();
    trackActivity("posterShares", `Printed QR poster for ${name || 'Store'}`, "Print Event");
  };

  const handleCopyUPI = () => {
    if (!upiId) return;
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    trackActivity("posterShares", `Copied UPI VPA: ${upiId}`, "Clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-4">
      <button
        onClick={handleDownloadPNG}
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl transition shadow-lg shadow-emerald-600/20 text-xs sm:text-sm"
      >
        <Download className="w-4 h-4" /> Download Ultra HD
      </button>

      <button
        onClick={handleDownloadPDF}
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl transition shadow-lg shadow-blue-600/20 text-xs sm:text-sm"
      >
        <FileText className="w-4 h-4" /> Export A4 PDF
      </button>

      <button
        onClick={handleShareWhatsApp}
        className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl transition shadow-md text-xs sm:text-sm"
      >
        <Share2 className="w-4 h-4" /> Share WhatsApp
      </button>

      <button
        onClick={handlePrint}
        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-semibold py-3 px-4 rounded-xl transition shadow-md text-xs sm:text-sm"
      >
        <Printer className="w-4 h-4" /> Print Poster
      </button>

      <button
        onClick={handleCopyUPI}
        className="col-span-2 flex items-center justify-center gap-2 bg-white hover:bg-slate-100 active:scale-95 text-slate-800 font-semibold py-3 px-4 rounded-xl transition border border-slate-300 shadow-sm text-xs sm:text-sm"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        {copied ? "UPI ID Copied to Clipboard!" : "Copy VPA / UPI ID"}
      </button>
    </div>
  );
};
