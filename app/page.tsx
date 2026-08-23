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
    <div className="min-h-screen bg-white text-[#152935] flex flex-col items-center">
      {/* Top Accent Strip */}
      <div className="w-full h-3 bg-[#e4a576]" />

      {/* Top Half: Soft Slate Split Background (#ccd5d2) */}
      <div className="w-full bg-[#ccd5d2] pb-24 pt-6 px-4 md:px-8 flex flex-col items-center border-b border-zinc-300">
        <header className="max-w-4xl w-full flex items-center justify-between py-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#152935] flex items-center justify-center text-white font-black shadow-md text-lg">
              ₹
            </div>
            <span className="text-2xl font-serif font-black tracking-tight text-[#152935]">
              SmartPay<span className="text-[#e4a576] font-sans font-extrabold">QR</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold bg-white border border-zinc-300 px-4 py-2 rounded-full text-[#152935] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#e4a576]" /> No-Code Standee Studio
          </div>
        </header>

        <div className="max-w-4xl w-full text-center space-y-1.5">
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-[#152935]">
            LOVESHACK, BABY, LOVESHACK.
          </h1>
          <p className="text-xs md:text-sm text-[#152935]/80 font-semibold tracking-wide">
            Create high-converting UPI stands and payment QR codes in 10 seconds.
          </p>
        </div>
      </div>

      {/* Bottom Half: White Background with Floating Cards */}
      <div className="w-full bg-white flex-1 flex flex-col items-center px-4 md:px-8 -mt-16 pb-16">
        <main className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left: Controls Card */}
          <div className="space-y-6">
            <div className="bg-white border border-zinc-200 p-6 rounded-3xl shadow-xl space-y-4">
              <h2 className="text-base font-black text-[#152935] flex items-center gap-2 uppercase tracking-wide">
                <Store className="w-4 h-4 text-[#698ea2]" /> Merchant Details
              </h2>

              <div>
                <label className="text-xs font-bold text-[#152935]">Shop / Business Name</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-3 text-sm font-semibold text-[#152935] placeholder-zinc-400 focus:border-[#152935] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#152935]">UPI ID / VPA</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-3 text-sm font-semibold text-[#152935] placeholder-zinc-400 focus:border-[#152935] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#152935]">Fixed Amount (Optional ₹)</label>
                <input
                  type="number"
                  value={amount}
                  placeholder="Optional preset amount"
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-3 text-sm font-semibold text-[#152935] placeholder-zinc-400 focus:border-[#152935] focus:outline-none"
                />
              </div>
            </div>

            {/* Soundbox Card */}
            <div className="bg-white border border-zinc-200 p-6 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-[#152935] flex items-center gap-2 uppercase tracking-wide">
                  <Volume2 className="w-4 h-4 text-[#e4a576]" /> Counter Soundbox Alert
                </h2>
                <span className="text-[10px] font-black bg-[#e4a576] text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-medium">Simulate instant counter voice announcements.</p>
              <div className="flex gap-2.5">
                <input
                  type="number"
                  value={soundAmount}
                  onChange={(e) => setSoundAmount(e.target.value)}
                  className="w-24 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-3 py-2.5 text-sm text-center font-bold text-[#152935] focus:border-[#152935] focus:outline-none"
                />
                <button
                  onClick={() => playSoundboxAlert(soundAmount)}
                  className="flex-1 bg-[#152935] hover:bg-[#223d4e] active:scale-[0.98] text-white text-xs font-black rounded-xl px-4 py-3 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Volume2 className="w-4 h-4 text-[#e4a576]" /> PLAY ALERT (₹{soundAmount})
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Standee Canvas & High-Contrast Download Button */}
          <div className="space-y-4 flex flex-col items-center">
            <div
              ref={standeeRef}
              className="w-[320px] bg-white rounded-3xl p-6 shadow-2xl flex flex-col items-center space-y-5 border-4 border-[#e4a576]"
            >
              <div className="text-center w-full">
                <div className="bg-[#152935] text-white text-[10px] font-black tracking-widest py-1.5 px-4 rounded-full inline-block uppercase mb-2 shadow-sm">
                  Accepted Here • Any UPI
                </div>
                <h3 className="text-xl font-black text-[#152935] truncate">{shopName || "Your Store Name"}</h3>
                <p className="text-[11px] text-[#698ea2] font-bold tracking-wide">GPay • PhonePe • Paytm • BHIM</p>
              </div>

              <div className="bg-[#ccd5d2]/20 p-4 rounded-2xl border-2 border-zinc-200 shadow-inner">
                <QRCodeSVG value={paymentUrl} size={180} level="H" fgColor="#152935" />
              </div>

              {amount && (
                <div className="bg-[#fde5d6] px-4 py-1.5 rounded-xl border border-[#e4a576]">
                  <span className="text-xs font-black text-[#152935]">Amount: ₹{amount}</span>
                </div>
              )}

              <div className="text-center w-full pt-3 border-t border-zinc-200">
                <p className="text-xs font-mono font-black text-[#152935] truncate">{upiId}</p>
                <span className="text-[9px] font-bold text-zinc-400 block mt-0.5 uppercase tracking-wider">
                  SmartPay Standee OS
                </span>
              </div>
            </div>

            {/* High-Contrast Bold Download CTA Button */}
            <div className="w-[320px]">
              <button
                onClick={downloadStandeePDF}
                disabled={isExporting}
                className="w-full py-4 bg-[#152935] hover:bg-[#223d4e] active:scale-[0.98] text-white font-black text-sm tracking-wide rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-xl border border-[#152935]"
              >
                {isExporting ? <Printer className="w-5 h-5 animate-spin text-[#e4a576]" /> : <Download className="w-5 h-5 text-[#e4a576]" />}
                <span>{isExporting ? "GENERATING PDF..." : "DOWNLOAD STANDEE (PDF)"}</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
