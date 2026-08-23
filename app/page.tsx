"use client";

import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Volume2, Sparkles, Printer, Store, CreditCard } from "lucide-react";

export default function SmartPayStudio() {
  const [shopName, setShopName] = useState("My Retail Store");
  const [upiId, setUpiId] = useState("merchant@upi");
  const [amount, setAmount] = useState("");
  const [soundAmount, setSoundAmount] = useState("100");
  const [isExporting, setIsExporting] = useState(false);
  const standeeRef = useRef<HTMLDivElement>(null);

  const paymentUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(shopName)}${amount ? `&am=${amount}` : ""}&cu=INR`;

  const playSoundboxAlert = (val: string) => {
    if ("speechSynthesis" in window) {
      const text = `SmartPay par ${val || "kuchh"} rupaye prapt hue`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

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
    <div className="min-h-screen bg-sunburn-cream text-sunburn-dark p-4 md:p-8 flex flex-col items-center">
      {/* Top Header */}
      <header className="max-w-4xl w-full flex items-center justify-between py-4 border-b border-sunburn-light mb-8">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-sunburn-dark flex items-center justify-center text-sunburn-cream font-black">
            ₹
          </div>
          <span className="text-2xl font-black tracking-tight text-sunburn-dark">
            SmartPay<span className="text-sunburn-warm">QR</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold bg-white/70 border border-sunburn-light px-3.5 py-1.5 rounded-full text-sunburn-dark shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sunburn-warm" /> No-Code Standee Studio
        </div>
      </header>

      <main className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls Section */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur border border-sunburn-light p-6 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-base font-bold text-sunburn-dark flex items-center gap-2">
              <Store className="w-4 h-4 text-sunburn-slate" /> Merchant Details
            </h2>

            <div>
              <label className="text-xs font-medium text-sunburn-dark/70">Shop / Business Name</label>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full mt-1 bg-sunburn-cream/40 border border-sunburn-light rounded-xl px-4 py-2.5 text-sm text-sunburn-dark focus:border-sunburn-warm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-sunburn-dark/70">UPI ID / VPA</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full mt-1 bg-sunburn-cream/40 border border-sunburn-light rounded-xl px-4 py-2.5 text-sm text-sunburn-dark focus:border-sunburn-warm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-sunburn-dark/70">Fixed Amount (Optional ₹)</label>
              <input
                type="number"
                value={amount}
                placeholder="Optional preset amount"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-1 bg-sunburn-cream/40 border border-sunburn-light rounded-xl px-4 py-2.5 text-sm text-sunburn-dark focus:border-sunburn-warm focus:outline-none"
              />
            </div>
          </div>

          {/* Soundbox Simulator */}
          <div className="bg-white/80 backdrop-blur border border-sunburn-light p-6 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-sunburn-dark flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-sunburn-warm" /> Counter Soundbox Alert
              </h2>
              <span className="text-[10px] font-bold bg-sunburn-warm/20 text-sunburn-dark px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-xs text-sunburn-dark/70">Simulate incoming payment audio announcement.</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={soundAmount}
                onChange={(e) => setSoundAmount(e.target.value)}
                className="w-24 bg-sunburn-cream/40 border border-sunburn-light rounded-xl px-3 py-2 text-sm text-center font-bold text-sunburn-dark focus:border-sunburn-warm focus:outline-none"
              />
              <button
                onClick={() => playSoundboxAlert(soundAmount)}
                className="flex-1 bg-sunburn-dark hover:bg-sunburn-dark/90 text-sunburn-cream text-xs font-bold rounded-xl px-4 py-2.5 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                🔊 Play Voice Alert (₹{soundAmount})
              </button>
            </div>
          </div>
        </div>

        {/* Live Standee Canvas */}
        <div className="space-y-4 flex flex-col items-center">
          <div
            ref={standeeRef}
            className="w-[320px] bg-white rounded-3xl p-6 shadow-xl flex flex-col items-center space-y-5 border-4 border-sunburn-warm"
          >
            <div className="text-center w-full">
              <div className="bg-sunburn-dark text-sunburn-cream text-[10px] font-black tracking-widest py-1.5 px-4 rounded-full inline-block uppercase mb-2">
                Accepted Here • Any UPI
              </div>
              <h3 className="text-xl font-black text-sunburn-dark truncate">{shopName || "Your Store Name"}</h3>
              <p className="text-[11px] text-sunburn-slate font-semibold">GPay • PhonePe • Paytm • BHIM</p>
            </div>

            <div className="bg-sunburn-cream/30 p-4 rounded-2xl border-2 border-sunburn-light/60 shadow-inner">
              <QRCodeSVG value={paymentUrl} size={180} level="H" fgColor="#152935" />
            </div>

            {amount && (
              <div className="bg-sunburn-warm/15 px-4 py-1.5 rounded-xl border border-sunburn-warm/30">
                <span className="text-xs font-bold text-sunburn-dark">Amount: ₹{amount}</span>
              </div>
            )}

            <div className="text-center w-full pt-3 border-t border-sunburn-light">
              <p className="text-xs font-mono font-bold text-sunburn-dark truncate">{upiId}</p>
              <span className="text-[9px] font-semibold text-sunburn-slate block mt-0.5">SmartPay Standee OS</span>
            </div>
          </div>

          <div className="w-[320px] space-y-2">
            <button
              onClick={downloadStandeePDF}
              disabled={isExporting}
              className="w-full py-3.5 bg-sunburn-warm hover:bg-sunburn-warm/90 text-sunburn-dark font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
