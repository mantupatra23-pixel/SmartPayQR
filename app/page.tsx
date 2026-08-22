"use client";

import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Volume2, Sparkles, Printer, Smartphone } from "lucide-react";

export default function SmartPayStudio() {
  const [shopName, setShopName] = useState("My Retail Store");
  const [upiId, setUpiId] = useState("merchant@upi");
  const [amount, setAmount] = useState("");
  const [soundAmount, setSoundAmount] = useState("100");
  const [isExporting, setIsExporting] = useState(false);
  const standeeRef = useRef<HTMLDivElement>(null);

  const paymentUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(shopName)}${amount ? `&am=${amount}` : ""}&cu=INR`;

  // Voice Alert Simulation (Soundbox)
  const playSoundboxAlert = (val: string) => {
    if ("speechSynthesis" in window) {
      const text = `SmartPay par ${val || "kuchh"} rupaye prapt hue`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // HD PDF Export
  const downloadStandeePDF = async () => {
    if (!standeeRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(standeeRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save(`${shopName.replace(/\s+/g, "_")}_Standee.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center">
      {/* Top Brand Bar */}
      <header className="max-w-4xl w-full flex items-center justify-between py-4 border-b border-zinc-800 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00FF66] flex items-center justify-center text-black font-black">₹</div>
          <span className="text-xl font-bold tracking-tight text-white">SmartPay<span className="text-[#00FF66]">QR</span></span>
        </div>
        <div className="flex items-center gap-2 text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" /> No-Code Fintech Studio
        </div>
      </header>

      <main className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Interactive Controls */}
        <div className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-base font-semibold text-zinc-200">1. Merchant Details</h2>
            
            <div>
              <label className="text-xs text-zinc-400">Shop / Business Name</label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full mt-1 bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:border-[#00FF66] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400">UPI ID / VPA</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full mt-1 bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:border-[#00FF66] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400">Fixed Amount (Optional ₹)</label>
              <input
                type="number"
                value={amount}
                placeholder="Leave blank for customer-entered amount"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-1 bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:border-[#00FF66] focus:outline-none"
              />
            </div>
          </div>

          {/* Soundbox Terminal Simulator */}
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#00FF66]" /> Live Web Soundbox
              </h2>
              <span className="text-[10px] bg-[#00FF66]/10 text-[#00FF66] px-2 py-0.5 rounded">Active</span>
            </div>
            <p className="text-xs text-zinc-400">Test the counter voice alerts for payment confirmations.</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={soundAmount}
                onChange={(e) => setSoundAmount(e.target.value)}
                className="w-24 bg-black border border-zinc-800 rounded-xl px-3 py-2 text-sm text-center focus:border-[#00FF66] focus:outline-none"
              />
              <button
                onClick={() => playSoundboxAlert(soundAmount)}
                className="flex-1 bg-zinc-900 border border-zinc-700 hover:border-[#00FF66] text-white text-xs font-semibold rounded-xl px-4 py-2 transition-all flex items-center justify-center gap-2"
              >
                🔊 Play Alert (₹{soundAmount})
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Standee Canvas */}
        <div className="space-y-4 flex flex-col items-center">
          <div
            ref={standeeRef}
            className="w-[320px] bg-white text-black rounded-3xl p-6 shadow-2xl flex flex-col items-center space-y-5 border-4 border-[#00FF66]"
          >
            <div className="text-center w-full">
              <div className="bg-black text-[#00FF66] text-[11px] font-black tracking-widest py-1 px-4 rounded-full inline-block uppercase mb-2">
                Scan & Pay with Any UPI
              </div>
              <h3 className="text-xl font-black text-black truncate">{shopName || "Your Store Name"}</h3>
              <p className="text-[11px] text-zinc-500 font-medium">BHIM UPI • GPay • PhonePe • Paytm</p>
            </div>

            <div className="bg-white p-3 rounded-2xl border-2 border-zinc-100 shadow-inner">
              <QRCodeSVG value={paymentUrl} size={190} level="H" />
            </div>

            {amount && (
              <div className="bg-zinc-100 px-4 py-1.5 rounded-xl border border-zinc-300">
                <span className="text-xs font-bold text-zinc-800">Fixed Amount: ₹{amount}</span>
              </div>
            )}

            <div className="text-center w-full pt-2 border-t border-zinc-200">
              <p className="text-xs font-mono font-bold text-zinc-700 truncate">{upiId}</p>
              <span className="text-[9px] text-zinc-400 block mt-1">SmartPay Standee OS</span>
            </div>
          </div>

          <div className="w-[320px] space-y-2">
            <button
              onClick={downloadStandeePDF}
              disabled={isExporting}
              className="w-full py-3.5 bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00ff6633]"
            >
              {isExporting ? <Printer className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? "Generating PDF..." : "Download Standee (PDF)"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
