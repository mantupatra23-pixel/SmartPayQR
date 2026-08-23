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
  Zap, Copy, Check, Globe
} from "lucide-react";
import { SEO_PAGES } from "@/lib/seoData";

type ThemeType = "sunburn" | "neon" | "festival" | "minimal";

export default function SmartPaySuperApp() {
  const [activeTab, setActiveTab] = useState<"standee" | "whatsapp" | "soundbox">("standee");
  const [theme, setTheme] = useState<ThemeType>("sunburn");
  const [shopName, setShopName] = useState("Royal Cafe & Bakers");
  const [upiId, setUpiId] = useState("merchant@okaxis");
  const [amount, setAmount] = useState("");
  const [customNote, setCustomNote] = useState("Accepted Here • Any UPI");
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

  const getThemeStyles = () => {
    switch (theme) {
      case "neon":
        return {
          wrapper: "bg-black text-white border-4 border-[#00FF66]",
          badge: "bg-[#00FF66] text-black",
          qrBg: "bg-zinc-900 border border-[#00FF66]/50",
          qrColor: "#00FF66",
          accent: "text-[#00FF66]",
        };
      case "festival":
        return {
          wrapper: "bg-[#fff8f0] text-[#800020] border-4 border-[#FFD700]",
          badge: "bg-[#800020] text-[#FFD700]",
          qrBg: "bg-white border-2 border-[#FFD700]",
          qrColor: "#800020",
          accent: "text-[#FFD700]",
        };
      case "minimal":
        return {
          wrapper: "bg-white text-black border-4 border-black",
          badge: "bg-black text-white",
          qrBg: "bg-zinc-50 border border-zinc-300",
          qrColor: "#000000",
          accent: "text-zinc-600",
        };
      default:
        return {
          wrapper: "bg-white text-[#152935] border-4 border-[#e4a576]",
          badge: "bg-[#152935] text-white",
          qrBg: "bg-[#ccd5d2]/20 border-2 border-zinc-200",
          qrColor: "#152935",
          accent: "text-[#698ea2]",
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col items-center pb-24 md:pb-12">
      {/* Top Header */}
      <header className="w-full bg-[#152935] text-white px-4 md:px-8 py-3.5 sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e4a576] flex items-center justify-center text-[#152935] font-black text-lg shadow-inner">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-serif font-black tracking-tight text-white">SmartPay<span className="text-[#e4a576]">QR</span></span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">NO-CODE OS</span>
              </div>
              <p className="text-[11px] text-zinc-300 hidden md:block">Universal Merchant Standee Studio & Soundbox Terminal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/mantupatra23-pixel/SmartPayQR/actions"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-black bg-[#e4a576] text-[#152935] px-4 py-2 rounded-full shadow hover:opacity-90 transition-all"
            >
              <Smartphone className="w-4 h-4" /> Download APK
            </a>
          </div>
        </div>
      </header>

      {/* Main Responsive Grid Container */}
      <main className="max-w-6xl w-full px-4 md:px-8 pt-6 space-y-6">
        
        {/* Desktop / Tablet Hero Banner */}
        <div className="w-full bg-gradient-to-r from-[#152935] via-[#1f3747] to-[#2b4c60] text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#e4a576]">
              <Zap className="w-3.5 h-3.5" /> 100% Free • No Login Required
            </div>
            <h1 className="text-2xl md:text-4xl font-serif font-black leading-tight">
              Create Instant UPI Standees & Payment Posters
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 font-medium">
              Export high-resolution printable A4/A5 PDF stands with voice soundbox alerts and 1-click WhatsApp bills.
            </p>
          </div>

          {/* Desktop Tab Selector */}
          <div className="flex bg-black/40 backdrop-blur p-1.5 rounded-2xl border border-white/10 z-10">
            {[
              { id: "standee", label: "Standee Studio", icon: Printer },
              { id: "soundbox", label: "Soundbox Alert", icon: Volume2 },
              { id: "whatsapp", label: "WhatsApp Bill", icon: MessageCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${
                    activeTab === tab.id
                      ? "bg-[#e4a576] text-[#152935] shadow"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form Controls (7 Cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            
            {activeTab === "standee" && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h2 className="text-sm font-black text-[#152935] uppercase tracking-wide flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#698ea2]" /> Standee Configuration
                  </h2>
                  <span className="text-[11px] font-bold text-zinc-400">Step 1 of 2</span>
                </div>

                {/* Theme Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#152935] flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#e4a576]" /> Select Design Theme
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "sunburn", label: "Sunburn Slate" },
                      { id: "neon", label: "Neon Dark" },
                      { id: "festival", label: "Festive Gold" },
                      { id: "minimal", label: "Minimal B&W" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id as ThemeType)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          theme === t.id
                            ? "bg-[#152935] text-white border-[#152935] shadow-sm"
                            : "bg-zinc-50 border-zinc-200 text-[#152935] hover:bg-zinc-100"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#152935]">Shop / Business Name</label>
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#152935]">UPI ID / VPA</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#152935]">Custom Tagline / Header</label>
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#152935]">Fixed Amount (Optional ₹)</label>
                    <input
                      type="number"
                      value={amount}
                      placeholder="Leave blank for open amount"
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "soundbox" && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h2 className="text-sm font-black text-[#152935] uppercase tracking-wide flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#e4a576]" /> Counter Soundbox Terminal
                  </h2>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full uppercase">Active</span>
                </div>
                <p className="text-xs text-zinc-500 font-medium">Test instant multi-lingual payment voice announcements on your phone counter.</p>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#152935]">Preset Amount Quick-Trigger</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["50", "100", "250", "500"].map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          setSoundAmount(v);
                          playSoundboxAlert(v);
                        }}
                        className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                          soundAmount === v
                            ? "bg-[#152935] text-white border-[#152935] shadow"
                            : "bg-zinc-50 border-zinc-200 text-[#152935] hover:bg-zinc-100"
                        }`}
                      >
                        ₹{v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <input
                    type="number"
                    value={soundAmount}
                    onChange={(e) => setSoundAmount(e.target.value)}
                    className="w-32 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-center text-[#152935] focus:outline-none focus:border-[#152935]"
                  />
                  <button
                    onClick={() => playSoundboxAlert(soundAmount)}
                    className="flex-1 bg-[#152935] hover:bg-[#223d4e] active:scale-[0.98] text-white text-xs font-black rounded-xl px-4 py-3 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Volume2 className="w-4 h-4 text-[#e4a576]" /> PLAY VOICE ALERT (₹{soundAmount})
                  </button>
                </div>
              </div>
            )}

            {activeTab === "whatsapp" && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h2 className="text-sm font-black text-[#152935] uppercase tracking-wide flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" /> 1-Click WhatsApp Quick-Receipt
                  </h2>
                  <span className="text-[10px] font-bold bg-[#fde5d6] text-[#152935] px-2.5 py-0.5 rounded-full uppercase">Instant Link</span>
                </div>
                <p className="text-xs text-zinc-500 font-medium">Send dynamic digital invoices directly to customer's WhatsApp with one tap.</p>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#152935]">Customer WhatsApp Number</label>
                    <input
                      type="tel"
                      value={custPhone}
                      placeholder="10-digit mobile number"
                      onChange={(e) => setCustPhone(e.target.value)}
                      className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#152935]">Items / Order Description</label>
                    <input
                      type="text"
                      value={billItems}
                      onChange={(e) => setBillItems(e.target.value)}
                      className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#152935]">Total Bill Amount (₹)</label>
                    <input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      className="w-full mt-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={sendWhatsAppBill}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Share2 className="w-4 h-4" /> SEND BILL ON WHATSAPP
                  </button>
                </div>
              </div>
            )}

            {/* Programmatic SEO Links Widget */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-200 space-y-3">
              <h3 className="text-xs font-black text-[#152935] uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#698ea2]" /> Popular Regional QR Generators
              </h3>
              <div className="flex flex-wrap gap-2">
                {SEO_PAGES.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/tools/${page.slug}`}
                    className="text-xs font-bold bg-[#fde5d6]/50 hover:bg-[#e4a576]/30 text-[#152935] px-3 py-1.5 rounded-full border border-zinc-200 transition-all"
                  >
                    {page.niche} ({page.city})
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Standee Canvas & Actions (5 Cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-4 lg:sticky lg:top-20">
            <div
              ref={standeeRef}
              className={`w-full max-w-[340px] rounded-3xl p-6 shadow-2xl flex flex-col items-center space-y-5 transition-all ${themeStyle.wrapper}`}
            >
              <div className="text-center w-full">
                <div className={`text-[10px] font-black tracking-widest py-1.5 px-4 rounded-full inline-block uppercase mb-2 shadow-sm ${themeStyle.badge}`}>
                  {customNote || "Accepted Here • Any UPI"}
                </div>
                <h3 className="text-xl font-black truncate">{shopName || "Your Store Name"}</h3>
                <p className={`text-[11px] font-bold tracking-wide ${themeStyle.accent}`}>
                  GPay • PhonePe • Paytm • BHIM • Cred
                </p>
              </div>

              <div className={`p-4 rounded-2xl shadow-inner ${themeStyle.qrBg}`}>
                <QRCodeSVG value={paymentUrl} size={190} level="H" fgColor={themeStyle.qrColor} />
              </div>

              {amount && (
                <div className="bg-white/90 text-black px-4 py-1.5 rounded-xl border border-zinc-300 shadow-sm">
                  <span className="text-xs font-black">Amount: ₹{amount}</span>
                </div>
              )}

              {/* UPI Copy Box */}
              <div className="w-full flex items-center justify-between bg-black/5 rounded-xl px-3 py-2">
                <span className="text-xs font-mono font-bold truncate">{upiId}</span>
                <button onClick={copyUpi} className="hover:opacity-70 transition-all">
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-center w-full pt-1 border-t border-zinc-300/40">
                <span className="text-[9px] font-bold opacity-60 uppercase tracking-wider">
                  SmartPay Standee OS
                </span>
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="w-full max-w-[340px] space-y-2.5">
              <button
                onClick={downloadStandeePDF}
                disabled={isExporting}
                className="w-full py-4 bg-[#152935] hover:bg-[#223d4e] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-xl border border-[#152935]"
              >
                {isExporting ? <Printer className="w-4 h-4 animate-spin text-[#e4a576]" /> : <Download className="w-4 h-4 text-[#e4a576]" />}
                <span>{isExporting ? "GENERATING PDF..." : "DOWNLOAD STANDEE (PDF)"}</span>
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${shopName} UPI Stand`,
                      text: `Pay ${shopName} using UPI: ${paymentUrl}`,
                      url: window.location.href,
                    });
                  } else {
                    copyUpi();
                  }
                }}
                className="w-full py-3 bg-white hover:bg-zinc-50 border border-zinc-300 text-[#152935] font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Share2 className="w-4 h-4" /> SHARE PAYMENT QR
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Only: Floating Bottom App-Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-zinc-200 py-2 px-6 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => setActiveTab("standee")}
            className={`flex flex-col items-center gap-0.5 ${activeTab === "standee" ? "text-[#152935]" : "text-zinc-400"}`}
          >
            <Printer className="w-5 h-5" />
            <span className="text-[9px] font-black">Standee</span>
          </button>

          <button
            onClick={() => setActiveTab("soundbox")}
            className={`flex flex-col items-center gap-0.5 ${activeTab === "soundbox" ? "text-[#152935]" : "text-zinc-400"}`}
          >
            <Volume2 className="w-5 h-5" />
            <span className="text-[9px] font-black">Soundbox</span>
          </button>

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
            <span className="text-[9px] font-black">APK</span>
          </a>
        </div>
      </div>
    </div>
  );
}
