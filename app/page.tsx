"use client";

import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import { 
  Download, Volume2, Sparkles, Printer, Store, MessageCircle, 
  Smartphone, Palette, CheckCircle2, ShieldCheck, Share2, 
  QrCode, ArrowUpRight, FileText, Bell, Search, History, HelpCircle,
  Zap, Copy, Check
} from "lucide-react";
import { SEO_PAGES } from "@/lib/seoData";

type ActiveTab = "home" | "standee" | "soundbox" | "whatsapp";

export default function SmartPaySuperApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [shopName, setShopName] = useState("Royal Cafe & Bakers");
  const [upiId, setUpiId] = useState("merchant@okaxis");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  // WhatsApp Bill States
  const [custPhone, setCustPhone] = useState("");
  const [billItems, setBillItems] = useState("Chai (x2), Samosa (x2)");
  const [billAmount, setBillAmount] = useState("140");

  // Soundbox State
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

  // PDF Export
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

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendWhatsAppBill = () => {
    if (!custPhone) return alert("Please enter customer phone number");
    const cleanPhone = custPhone.replace(/\D/g, "");
    const directUpi = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(shopName)}&am=${billAmount}&cu=INR`;
    const message = `*Bill from ${shopName}*\n\nItems: ${billItems}\nTotal Amount: *₹${billAmount}*\n\nPay securely via UPI:\n${directUpi}\n\n_Generated via SmartPayQR_`;
    window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col items-center pb-24">
      {/* Top Mobile Fintech Header */}
      <header className="w-full bg-[#152935] text-white px-4 py-3.5 sticky top-0 z-40 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e4a576] flex items-center justify-center text-[#152935] font-black text-lg shadow-inner">
              {shopName.charAt(0) || "S"}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-black tracking-tight">{shopName || "My Store"}</h1>
                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded">VERIFIED</span>
              </div>
              <p className="text-[11px] text-zinc-300 font-mono">{upiId}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/mantupatra23-pixel/SmartPayQR/actions"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[11px] font-black bg-[#e4a576] text-[#152935] px-3 py-1.5 rounded-full shadow hover:opacity-90 transition-all"
            >
              <Smartphone className="w-3.5 h-3.5" /> APK
            </a>
          </div>
        </div>
      </header>

      {/* Main App Container */}
      <main className="max-w-md w-full px-4 pt-4 space-y-4">
        {/* Fintech Hero Banner */}
        <div className="w-full bg-gradient-to-br from-[#152935] to-[#254254] text-white p-5 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold text-[#e4a576]">
              <Zap className="w-3 h-3" /> 100% Free Instant UPI OS
            </div>
            <h2 className="text-xl font-serif font-black leading-tight">
              Instant Standees & Voice Soundbox
            </h2>
            <p className="text-xs text-zinc-300 font-medium">
              Zero transaction fees. Print QR standees in 10 seconds.
            </p>
          </div>
          <div className="absolute right-[-15px] bottom-[-20px] w-28 h-28 bg-[#e4a576]/10 rounded-full blur-2xl" />
        </div>

        {/* Quick Action Dock (PhonePe Style 4 Circle Buttons) */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-zinc-200/80">
          <h3 className="text-xs font-black text-[#152935] uppercase tracking-wider mb-3">Merchant Utilities</h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <button
              onClick={() => setActiveTab("standee")}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "standee" ? "bg-[#152935] text-[#e4a576] shadow-md" : "bg-[#fde5d6]/50 text-[#152935]"}`}>
                <Printer className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold">QR Standee</span>
            </button>

            <button
              onClick={() => setActiveTab("soundbox")}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "soundbox" ? "bg-[#152935] text-[#e4a576] shadow-md" : "bg-[#fde5d6]/50 text-[#152935]"}`}>
                <Volume2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold">Soundbox</span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp")}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "whatsapp" ? "bg-[#152935] text-[#e4a576] shadow-md" : "bg-[#fde5d6]/50 text-[#152935]"}`}>
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-[10px] font-bold">WhatsApp Bill</span>
            </button>

            <button
              onClick={() => {
                const url = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(shopName)}`;
                navigator.clipboard.writeText(url);
                alert("UPI Payment link copied!");
              }}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#fde5d6]/50 text-[#152935] flex items-center justify-center transition-all">
                <ArrowUpRight className="w-5 h-5 text-[#e4a576]" />
              </div>
              <span className="text-[10px] font-bold">Pay Link</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Interactive QR Card (PhonePe Style) */}
        {(activeTab === "home" || activeTab === "standee") && (
          <div className="space-y-4">
            {/* The Live Merchant Standee Card */}
            <div
              ref={standeeRef}
              className="bg-white rounded-3xl p-6 shadow-md border-2 border-zinc-200 flex flex-col items-center space-y-4 relative overflow-hidden"
            >
              <div className="w-full flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#152935] text-white flex items-center justify-center font-bold text-xs">
                    ₹
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#152935] truncate max-w-[170px]">{shopName}</h4>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Universal UPI Stand</p>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-[#e4a576]/20 text-[#152935] px-2.5 py-0.5 rounded-full">
                  ALL APPS
                </span>
              </div>

              {/* QR Container */}
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 shadow-inner relative flex items-center justify-center">
                <QRCodeSVG value={paymentUrl} size={180} level="H" fgColor="#152935" />
              </div>

              {amount && (
                <div className="bg-[#fde5d6] px-4 py-1 rounded-xl border border-[#e4a576]">
                  <span className="text-xs font-black text-[#152935]">Fixed Amount: ₹{amount}</span>
                </div>
              )}

              {/* UPI ID Row with Copy Icon */}
              <div className="w-full flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                <span className="text-xs font-mono font-bold text-zinc-700 truncate">{upiId}</span>
                <button onClick={copyUpi} className="text-[#152935] hover:text-[#e4a576] transition-all">
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-center w-full pt-1">
                <p className="text-[10px] text-[#698ea2] font-bold">Google Pay • PhonePe • Paytm • BHIM • Cred</p>
              </div>
            </div>

            {/* Quick Actions for Standee */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={downloadStandeePDF}
                disabled={isExporting}
                className="py-3.5 bg-[#152935] hover:bg-[#223d4e] active:scale-[0.98] text-white font-black text-xs rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md"
              >
                {isExporting ? <Printer className="w-4 h-4 animate-spin text-[#e4a576]" /> : <Download className="w-4 h-4 text-[#e4a576]" />}
                <span>{isExporting ? "EXPORTING..." : "DOWNLOAD PDF"}</span>
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${shopName} UPI QR`,
                      text: `Pay ${shopName} using this UPI link: ${paymentUrl}`,
                      url: window.location.href,
                    });
                  } else {
                    copyUpi();
                  }
                }}
                className="py-3.5 bg-white border border-zinc-300 hover:bg-zinc-50 active:scale-[0.98] text-[#152935] font-black text-xs rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Share2 className="w-4 h-4 text-[#152935]" />
                <span>SHARE QR</span>
              </button>
            </div>

            {/* Customizer Settings Card */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-200 space-y-3">
              <h3 className="text-xs font-black text-[#152935] uppercase tracking-wider">Customize Standee Details</h3>
              <div>
                <label className="text-[11px] font-bold text-zinc-600">Merchant / Store Name</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-zinc-600">UPI ID / VPA</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-zinc-600">Fixed Amount (Optional ₹)</label>
                <input
                  type="number"
                  value={amount}
                  placeholder="Leave empty for customer-entered price"
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Live Soundbox Console */}
        {activeTab === "soundbox" && (
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#e4a576]/20 flex items-center justify-center text-[#152935]">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-[#152935] uppercase">Counter Soundbox</h3>
                  <p className="text-[10px] text-zinc-400">High-volume payment announcements</p>
                </div>
              </div>
              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">Online</span>
            </div>

            {/* Quick Amount Chips */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-600">Select Amount to Announce</label>
              <div className="grid grid-cols-4 gap-2">
                {["50", "100", "200", "500"].map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      setSoundAmount(v);
                      playSoundboxAlert(v);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      soundAmount === v
                        ? "bg-[#152935] text-white border-[#152935]"
                        : "bg-zinc-50 border-zinc-200 text-[#152935] hover:bg-zinc-100"
                    }`}
                  >
                    ₹{v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="number"
                value={soundAmount}
                onChange={(e) => setSoundAmount(e.target.value)}
                className="w-24 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-bold text-center text-[#152935] focus:outline-none focus:border-[#152935]"
              />
              <button
                onClick={() => playSoundboxAlert(soundAmount)}
                className="flex-1 py-3 bg-[#152935] hover:bg-[#223d4e] active:scale-[0.98] text-white text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 shadow"
              >
                <Volume2 className="w-4 h-4 text-[#e4a576]" /> PLAY ALERT (₹{soundAmount})
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: WhatsApp Billing */}
        {activeTab === "whatsapp" && (
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-200 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black text-[#152935] uppercase">1-Click WhatsApp Receipt</h3>
                <p className="text-[10px] text-zinc-400">Send dynamic bill with instant UPI pay link</p>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-600">Customer Mobile (WhatsApp)</label>
              <input
                type="tel"
                value={custPhone}
                placeholder="10-digit number"
                onChange={(e) => setCustPhone(e.target.value)}
                className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-600">Bill Items / Notes</label>
              <input
                type="text"
                value={billItems}
                onChange={(e) => setBillItems(e.target.value)}
                className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-600">Total Amount (₹)</label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#152935] focus:outline-none focus:border-[#152935]"
              />
            </div>

            <button
              onClick={sendWhatsAppBill}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Share2 className="w-4 h-4" /> SEND BILL TO WHATSAPP
            </button>
          </div>
        )}

        {/* Programmatic SEO Links Tray */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-zinc-200 space-y-2.5">
          <h3 className="text-[11px] font-black text-[#152935] uppercase tracking-wider">City & Business QR Hubs</h3>
          <div className="flex flex-wrap gap-1.5">
            {SEO_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={`/tools/${page.slug}`}
                className="text-[10px] font-bold bg-[#fde5d6]/50 hover:bg-[#e4a576]/30 text-[#152935] px-2.5 py-1 rounded-full border border-zinc-200 transition-all"
              >
                {page.niche} ({page.city})
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Bottom App-Bar (PhonePe Style) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-zinc-200 py-2 px-6 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-0.5 ${activeTab === "home" ? "text-[#152935]" : "text-zinc-400"}`}
          >
            <Store className="w-5 h-5" />
            <span className="text-[9px] font-black">Home</span>
          </button>

          <button
            onClick={() => setActiveTab("soundbox")}
            className={`flex flex-col items-center gap-0.5 ${activeTab === "soundbox" ? "text-[#152935]" : "text-zinc-400"}`}
          >
            <Volume2 className="w-5 h-5" />
            <span className="text-[9px] font-black">Soundbox</span>
          </button>

          {/* Elevated Center QR Button */}
          <button
            onClick={() => setActiveTab("standee")}
            className="flex flex-col items-center -mt-5"
          >
            <div className="w-12 h-12 rounded-full bg-[#152935] border-4 border-white text-[#e4a576] flex items-center justify-center shadow-lg active:scale-95 transition-all">
              <QrCode className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-black text-[#152935] mt-0.5">My QR</span>
          </button>

          <button
            onClick={() => setActiveTab("whatsapp")}
            className={`flex flex-col items-center gap-0.5 ${activeTab === "whatsapp" ? "text-[#152935]" : "text-zinc-400"}`}
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-[9px] font-black">Receipt</span>
          </button>

          <a
            href="https://github.com/mantupatra23-pixel/SmartPayQR/actions"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-0.5 text-zinc-400 hover:text-[#152935]"
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-[9px] font-black">Counter APK</span>
          </a>
        </div>
      </div>
    </div>
  );
}
