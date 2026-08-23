"use client";

import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Volume2, Sparkles, Printer, Store } from "lucide-react";

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
    <div className="min-h-screen bg-[#ccd5d2] text-[#152935] flex flex-col items-center">
      {/* Top Sunburn Warm Stripe (Like Reference Image) */}
      <div className="w-full h-3 bg-[#e4a576]" />

      <div className="max-w-4xl w-full p-4 md:p-8 flex flex-col items-center">
        {/* Header Bar */}
        <header className="w-full flex items-center justify-between py-4 border-b border-[#152935]/15 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#152935] flex items-center justify-center text-white font-black text-lg">
              ₹
            </div>
            <span className="text-2xl font-black tracking-tight text-[#152935]">
              SmartPay<span className="text-[#e4a576]">QR</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold bg-white px-3.5 py-1.5 rounded-full text-[#152935] shadow-sm border border-[#152935]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#e4a576]" /> No-Code Standee Studio
          </div>
        </header>

        <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Form Controls */}
          <div className="space-y-6">
            <div className="bg-white border border-[#152935]/10 p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#152935] flex items-center gap-2">
                <Store className="w-4 h-4 text-[#698ea2]" /> Merchant Details
              </h2>

              <div>
                <label className="text-xs font-semibold text-[#152935]/80">Shop / Business Name</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full mt-1 bg-[#fde5d6]/40 border border-[#152935]/15 rounded-xl px-4 py-2.5 text-sm text-[#152935] focus:border-[#698ea2] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#152935]/80">UPI ID / VPA</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full mt-1 bg-[#fde5d6]/40 border border-[#152935]/15 rounded-xl px-4 py-2.5 text-sm text-[#152935] focus:border-[#698ea2] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#152935]/80">Fixed Amount (Optional ₹)</label>
                <input
                  type="number"
                  value={amount}
                  placeholder="Optional preset amount"
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-1 bg-[#fde5d6]/40 border border-[#152935]/15 rounded-xl px-4 py-2.5 text-sm text-[#152935] focus:border-[#698ea2] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Soundbox Simulator */}
            <div className="bg-white border border-[#152935]/10 p-6 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#152935] flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#e4a576]" /> Counter Soundbox Alert
                </h2>
                <span className="text-[10px] font-bold bg-[#e4a576]/20 text-[#152935] px-2.5 py-0.5 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-xs text-[#152935]/70">Simulate incoming payment audio announcement.</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={soundAmount}
                  onChange={(e) => setSoundAmount(e.target.value)}
                  className="w-24 bg-[#fde5d6]/40 border border-[#152935]/15 rounded-xl px-3 py-2 text-sm text-center font-bold text-[#152935] focus:border-[#698ea2] focus:outline-none"
                />
                <button
                  onClick={() => playSoundboxAlert(soundAmount)}
                  className="flex-1 bg-[#698ea2] hover:bg-[#5b7d90] text-white text-xs font-bold rounded-xl px-4 py-2.5 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  🔊 Play Voice Alert (₹{soundAmount})
                </button>
              </div>
            </div>
          </div>

          {/* Right Standee Live Canvas */}
          <div className="space-y-4 flex flex-col items-center">
            <div
              ref={standeeRef}
              className="w-[320px] bg-white rounded-2xl p-6 shadow-md flex flex-col items-center space-y-5 border-2 border-[#152935]/15"
            >
              <div className="text-center w-full">
                <div className="bg-[#152935] text-white text-[10px] font-bold tracking-widest py-1 px-4 rounded-full inline-block uppercase mb-2">
                  Accepted Here • Any UPI
                </div>
                <h3 className="text-xl font-bold text-[#152935] truncate">{shopName || "Your Store Name"}</h3>
                <p className="text-[11px] text-[#698ea2] font-semibold">GPay • PhonePe • Paytm • BHIM</p>
              </div>

              <div className="bg-[#ccd5d2]/25 p-4 rounded-xl border border-[#152935]/10">
                <QRCodeSVG value={paymentUrl} size={180} level="H" fgColor="#152935" />
              </div>

              {amount && (
                <div className="bg-[#e4a576]/20 px-4 py-1.5 rounded-lg border border-[#e4a576]/40">
                  <span className="text-xs font-bold text-[#152935]">Amount: ₹{amount}</span>
                </div>
              )}

              <div className="text-center w-full pt-3 border-t border-[#152935]/10">
                <p className="text-xs font-mono font-bold text-[#152935] truncate">{upiId}</p>
                <span className="text-[9px] font-semibold text-[#698ea2] block mt-0.5">SmartPay Standee OS</span>
              </div>
            </div>

            <div className="w-[320px] space-y-2">
              <button
                onClick={downloadStandeePDF}
                disabled={isExporting}
                className="w-full py-3.5 bg-[#698ea2] hover:bg-[#587a8e] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {isExporting ? <Printer className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {isExporting ? "Generating PDF..." : "Download Standee (PDF)"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
