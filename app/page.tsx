"use client";

import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";
import { 
  Download, Volume2, Sparkles, Printer, Store, MessageCircle, 
  Smartphone, Palette, CheckCircle2, ShieldCheck, Share2 
} from "lucide-react";
import { SEO_PAGES } from "@/lib/seoData";

type ThemeType = "sunburn" | "neon" | "festival" | "minimal";

export default function SmartPayStudio() {
  const [activeTab, setActiveTab] = useState<"standee" | "whatsapp">("standee");
  const [theme, setTheme] = useState<ThemeType>("sunburn");
  const [shopName, setShopName] = useState("My Retail Store");
  const [upiId, setUpiId] = useState("merchant@upi");
  const [amount, setAmount] = useState("");
  const [customNote, setCustomNote] = useState("Accepted Here • Any UPI");
  
  // WhatsApp Bill States
  const [custPhone, setCustPhone] = useState("");
  const [billItems, setBillItems] = useState("Chai & Snacks");
  const [billAmount, setBillAmount] = useState("120");

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

  const sendWhatsAppBill = () => {
    if (!custPhone) return alert("Please enter customer phone number");
    const cleanPhone = custPhone.replace(/\D/g, "");
    const directUpi = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(shopName)}&am=${billAmount}&cu=INR`;
    const message = `*Bill from ${shopName}*\n\nItems: ${billItems}\nTotal Amount: *₹${billAmount}*\n\nPay securely via UPI:\n${directUpi}\n\n_Generated via SmartPayQR_`;
    window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Dynamic Theme Stylings
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
      default: // sunburn
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

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/mantupatra23-pixel/SmartPayQR/actions"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-black bg-[#152935] text-white px-4 py-2 rounded-full shadow hover:bg-[#223d4e] transition-all"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#e4a576]" /> Counter APK
            </a>
          </div>
        </header>

        {/* Hero Title */}
        <div className="max-w-4xl w-full text-center space-y-1.5">
          <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-[#152935]">
            LOVESHACK, BABY, LOVESHACK.
          </h1>
          <p className="text-xs md:text-sm text-[#152935]/80 font-semibold tracking-wide">
            Instant No-Code UPI Standee Generator, WhatsApp Billing & Counter Soundbox.
          </p>

          {/* Module Switcher Tabs */}
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => setActiveTab("standee")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black tracking-wide uppercase transition-all shadow-sm ${
                activeTab === "standee"
                  ? "bg-[#152935] text-white"
                  : "bg-white/80 text-[#152935] hover:bg-white"
              }`}
            >
              🎨 Standee Studio
            </button>
            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black tracking-wide uppercase transition-all shadow-sm ${
                activeTab === "whatsapp"
                  ? "bg-[#152935] text-white"
                  : "bg-white/80 text-[#152935] hover:bg-white"
              }`}
            >
              💬 WhatsApp Quick-Bill
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Studio Body */}
      <div className="w-full bg-white flex-1 flex flex-col items-center px-4 md:px-8 -mt-16 pb-16">
        <main className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column Controls */}
          <div className="space-y-6">
            {activeTab === "standee" ? (
              <>
                {/* Theme Selector */}
                <div className="bg-white border border-zinc-200 p-5 rounded-3xl shadow-xl space-y-3">
                  <label className="text-xs font-black text-[#152935] uppercase tracking-wide flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#e4a576]" /> Select Standee Theme
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "sunburn", label: "Sunburn Slate" },
                      { id: "neon", label: "Neon Cyber" },
                      { id: "festival", label: "Festive Gold" },
                      { id: "minimal", label: "Minimal B&W" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id as ThemeType)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          theme === t.id
                            ? "bg-[#152935] text-white border-[#152935]"
                            : "bg-[#fde5d6]/20 border-zinc-200 text-[#152935] hover:bg-[#fde5d6]/50"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Standee Input Form */}
                <div className="bg-white border border-zinc-200 p-6 rounded-3xl shadow-xl space-y-4">
                  <h2 className="text-base font-black text-[#152935] flex items-center gap-2 uppercase tracking-wide">
                    <Store className="w-4 h-4 text-[#698ea2]" /> Standee Configuration
                  </h2>

                  <div>
                    <label className="text-xs font-bold text-[#152935]">Shop / Business Name</label>
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#152935]">UPI ID / VPA</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#152935]">Custom Header Tagline</label>
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#152935]">Fixed Amount (Optional ₹)</label>
                    <input
                      type="number"
                      value={amount}
                      placeholder="Leave blank for open amount"
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* WhatsApp Billing Form */
              <div className="bg-white border border-zinc-200 p-6 rounded-3xl shadow-xl space-y-4">
                <h2 className="text-base font-black text-[#152935] flex items-center gap-2 uppercase tracking-wide">
                  <MessageCircle className="w-5 h-5 text-emerald-600" /> 1-Click WhatsApp Bill
                </h2>
                <p className="text-xs text-zinc-500 font-medium">Send ready-to-pay UPI bills directly to customer WhatsApp.</p>

                <div>
                  <label className="text-xs font-bold text-[#152935]">Customer Mobile Number</label>
                  <input
                    type="tel"
                    value={custPhone}
                    placeholder="10-digit mobile number"
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#152935]">Items / Description</label>
                  <input
                    type="text"
                    value={billItems}
                    onChange={(e) => setBillItems(e.target.value)}
                    className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#152935]">Bill Amount (₹)</label>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    className="w-full mt-1 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#152935] focus:border-[#152935] focus:outline-none"
                  />
                </div>

                <button
                  onClick={sendWhatsAppBill}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Share2 className="w-4 h-4" /> Send Bill via WhatsApp
                </button>
              </div>
            )}

            {/* Soundbox Simulator */}
            <div className="bg-white border border-zinc-200 p-6 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black text-[#152935] flex items-center gap-2 uppercase tracking-wide">
                  <Volume2 className="w-4 h-4 text-[#e4a576]" /> Counter Soundbox Alert
                </h2>
                <span className="text-[10px] font-black bg-[#e4a576] text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-medium">Test regional voice confirmation alerts on your phone counter.</p>
              <div className="flex gap-2.5">
                <input
                  type="number"
                  value={soundAmount}
                  onChange={(e) => setSoundAmount(e.target.value)}
                  className="w-24 bg-[#fde5d6]/40 border border-zinc-300 rounded-xl px-3 py-2 text-sm text-center font-bold text-[#152935] focus:border-[#152935] focus:outline-none"
                />
                <button
                  onClick={() => playSoundboxAlert(soundAmount)}
                  className="flex-1 bg-[#152935] hover:bg-[#223d4e] active:scale-[0.98] text-white text-xs font-black rounded-xl px-4 py-2.5 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Volume2 className="w-4 h-4 text-[#e4a576]" /> PLAY ALERT (₹{soundAmount})
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Standee Canvas */}
          <div className="space-y-4 flex flex-col items-center">
            <div
              ref={standeeRef}
              className={`w-[320px] rounded-3xl p-6 shadow-2xl flex flex-col items-center space-y-5 transition-all ${themeStyle.wrapper}`}
            >
              <div className="text-center w-full">
                <div className={`text-[10px] font-black tracking-widest py-1.5 px-4 rounded-full inline-block uppercase mb-2 shadow-sm ${themeStyle.badge}`}>
                  {customNote || "Accepted Here • Any UPI"}
                </div>
                <h3 className="text-xl font-black truncate">{shopName || "Your Store Name"}</h3>
                <p className={`text-[11px] font-bold tracking-wide ${themeStyle.accent}`}>
                  GPay • PhonePe • Paytm • BHIM
                </p>
              </div>

              <div className={`p-4 rounded-2xl shadow-inner ${themeStyle.qrBg}`}>
                <QRCodeSVG value={paymentUrl} size={180} level="H" fgColor={themeStyle.qrColor} />
              </div>

              {amount && (
                <div className="bg-white/90 text-black px-4 py-1.5 rounded-xl border border-zinc-300 shadow-sm">
                  <span className="text-xs font-black">Amount: ₹{amount}</span>
                </div>
              )}

              <div className="text-center w-full pt-3 border-t border-zinc-300/40">
                <p className="text-xs font-mono font-black truncate">{upiId}</p>
                <span className="text-[9px] font-bold opacity-60 block mt-0.5 uppercase tracking-wider">
                  SmartPay Standee OS
                </span>
              </div>
            </div>

            {/* High-Contrast Bold Download CTA */}
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

        {/* Programmatic SEO Internal Links Section (SEO Booster) */}
        <section className="max-w-4xl w-full mt-16 pt-10 border-t border-zinc-200 space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-xs font-black uppercase text-[#152935] tracking-widest">
              Popular City & Niche Standee Generators
            </h3>
            <p className="text-[11px] text-zinc-500 font-medium">Free instant printable QR standees tailored for local businesses across India.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {SEO_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={`/tools/${page.slug}`}
                className="text-xs font-bold text-[#152935] bg-[#fde5d6]/50 hover:bg-[#e4a576]/30 px-3.5 py-1.5 rounded-full border border-zinc-200 transition-all"
              >
                {page.niche} ({page.city})
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
