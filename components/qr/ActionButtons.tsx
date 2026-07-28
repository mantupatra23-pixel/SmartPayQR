// components/qr/ActionButtons.tsx
"use client";

import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer, Copy, Share2, FileText } from "lucide-react";

interface ActionButtonsProps {
  posterRef: React.RefObject<HTMLDivElement | null>;
  upiId: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ posterRef, upiId }) => {
  const handleDownloadPNG = async () => {
    if (!posterRef.current) return;
    const canvas = await html2canvas(posterRef.current, { scale: 3, useCORS: true });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `SmartPayQR-${Date.now()}.png`;
    link.click();
  };

  const handleDownloadPDF = async () => {
    if (!posterRef.current) return;
    const canvas = await html2canvas(posterRef.current, { scale: 3, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.save(`SmartPayQR-Poster-${Date.now()}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyUPI = () => {
    if (!upiId) return;
    navigator.clipboard.writeText(upiId);
    alert("UPI ID copied to clipboard!");
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-md mx-auto my-4">
      <button
        onClick={handleDownloadPNG}
        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-3 rounded-xl transition text-xs shadow-md"
      >
        <Download size={14} /> Download PNG
      </button>

      <button
        onClick={handleDownloadPDF}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-3 rounded-xl transition text-xs shadow-md"
      >
        <FileText size={14} /> Download PDF
      </button>

      <button
        onClick={handlePrint}
        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 px-3 rounded-xl transition text-xs shadow-md"
      >
        <Printer size={14} /> Print Poster
      </button>

      <button
        onClick={handleCopyUPI}
        className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2.5 px-3 rounded-xl transition text-xs border border-slate-300"
      >
        <Copy size={14} /> Copy UPI
      </button>
    </div>
  );
};
