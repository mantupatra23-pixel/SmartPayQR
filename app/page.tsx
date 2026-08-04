"use client";

import { useState } from "react";

export default function SmartPayApp() {
  const [merchantName, setMerchantName] = useState("");
  const [shopName, setShopName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [generated, setGenerated] = useState(false);

  // Dynamic UPI URL Generation
  const qrData = upiId 
    ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(merchantName || shopName || "Merchant")}${amount ? `&am=${amount}` : ""}&cu=INR`
    : "";

  const qrImageUrl = qrData
    ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`
    : "";

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (upiId) {
      setGenerated(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div>
            <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">
              100% FREE • NO LOGIN REQUIRED
            </span>
            <h1 className="text-2xl font-bold mt-1">SmartPay AI OS</h1>
            <p className="text-xs text-slate-400 mt-1">
              Instant UPI Poster & Standee Generator
            </p>
          </div>
        </header>

        {/* Ad Space Banner Top */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center text-xs text-slate-500">
          📢 AdSpace • Google AdSense Banner
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Form */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              1. Shop Details
            </h2>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Merchant / Owner Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Mantu Patra"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Shop / Business Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Patra General Store"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  UPI ID (VPA) *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 9178065739@ybl or shop@okaxis"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Fixed Amount ₹ (Optional)
                </label>
                <input 
                  type="number" 
                  placeholder="Leave empty for open payment"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition text-sm shadow-lg shadow-emerald-900/20"
              >
                Generate Payment Poster →
              </button>
            </form>
          </div>

          {/* Live Preview Poster */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
            {generated && qrImageUrl ? (
              <div className="w-full space-y-4">
                <div id="poster-area" className="bg-gradient-to-b from-emerald-600 to-teal-800 p-6 rounded-2xl text-white shadow-2xl space-y-4">
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase inline-block">
                    ACCEPTED HERE
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-extrabold">{shopName || "Your Shop Name"}</h3>
                    <p className="text-xs opacity-80">{merchantName}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl inline-block shadow-inner">
                    <img 
                      src={qrImageUrl} 
                      alt="UPI QR Code" 
                      className="w-48 h-48 mx-auto"
                    />
                  </div>

                  <div className="text-xs font-mono bg-black/30 py-1.5 px-3 rounded-lg break-all">
                    {upiId}
                  </div>

                  <div className="text-[11px] opacity-90 font-medium">
                    BHIM UPI • PhonePe • Google Pay • Paytm
                  </div>
                </div>

                <a
                  href={qrImageUrl}
                  download="UPI-QR-Poster.png"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-block bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-3 rounded-xl transition text-sm"
                >
                  Download QR Code Poster 📥
                </a>
              </div>
            ) : (
              <div className="py-12 text-slate-500 text-xs">
                👈 Fill shop details and click <br />
                <span className="text-emerald-400 font-semibold text-sm">"Generate Payment Poster"</span> <br />
                to preview your UPI QR Standee
              </div>
            )}
          </div>

        </div>

        {/* Ad Space Banner Bottom */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center text-xs text-slate-500">
          📢 AdSpace • Google AdSense Footer Unit
        </div>

      </div>
    </div>
  );
}
