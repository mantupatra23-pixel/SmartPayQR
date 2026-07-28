"use client";

import React, { useState, useRef } from "react";
import { PaymentPosterCanvas } from "./PaymentPosterCanvas";
import { 
  QrCode, Download, Share2, Sparkles, Image as ImageIcon, 
  Palette, ShieldCheck, DollarSign, Phone, Eye, Check 
} from "lucide-react";

export const PaymentPosterStudio: React.FC = () => {
  const [merchantName, setMerchantName] = useState("PATRA GENERAL STORE");
  const [upiId, setUpiId] = useState("9876543210@ybl");
  const [amount, setAmount] = useState<string>("");
  const [phone, setPhone] = useState("9876543210");
  const [theme, setTheme] = useState<"light" | "dark" | "gradient" | "gold">("gradient");
  const [logoUrl, setLogoUrl] = useState<string | undefined>();
  const [showNpciBadge, setShowNpciBadge] = useState(true);
  const [showSecureBadge, setShowSecureBadge] = useState(true);
  const [showAcceptedApps, setShowAcceptedApps] = useState(true);
  const [showWatermark, setShowWatermark] = useState(true);

  const posterRef = useRef<HTMLDivElement>(null!);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Payment Poster Studio</h2>
              <p className="text-xs text-slate-500">Design printable NPCI-compliant UPI QR Posters with all accepted app brands.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-7 space-y-5 bg-slate-50 p-6 rounded-3xl border">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Poster Details & Config</h3>

            <div className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-700 block mb-1">Business Name *</label>
                <input
                  type="text"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1">UPI ID (VPA) *</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border rounded-xl outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Fixed Collect Amount (Optional - Leave blank for open amount)</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border rounded-xl outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Poster Theme Style</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["gradient", "dark", "gold", "light"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      className={`py-2 rounded-xl border text-[10px] font-black uppercase transition ${
                        theme === t ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Upload Merchant Logo</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-[10px] w-full" />
              </div>

              {/* Toggles */}
              <div className="pt-3 border-t space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={showNpciBadge} onChange={(e) => setShowNpciBadge(e.target.checked)} />
                  <span className="text-slate-700">Show NPCI Verified Badge</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={showAcceptedApps} onChange={(e) => setShowAcceptedApps(e.target.checked)} />
                  <span className="text-slate-700">Show Accepted Payment Apps (BHIM, GPay, PhonePe, Paytm, CRED)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={showWatermark} onChange={(e) => setShowWatermark(e.target.checked)} />
                  <span className="text-slate-700">Show "Powered by SmartPay AI OS" Watermark</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Preview & Actions */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-4 sticky top-24">
            <PaymentPosterCanvas
              posterRef={posterRef}
              merchantName={merchantName}
              upiId={upiId}
              amount={amount}
              phone={phone}
              theme={theme}
              logoUrl={logoUrl}
              showNpciBadge={showNpciBadge}
              showSecureBadge={showSecureBadge}
              showAcceptedApps={showAcceptedApps}
              showWatermark={showWatermark}
            />

            <button
              onClick={handlePrintDownload}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl text-xs transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Print / Download High-DPI Poster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
