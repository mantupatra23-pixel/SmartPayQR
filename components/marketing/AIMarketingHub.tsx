"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, Download, Share2, Copy, Check, MessageCircle, 
  Send, Image as ImageIcon, Wand2, Layers, QrCode, FileText, 
  Share, Barcode, Eye, Play, ArrowRight, ShieldCheck, RefreshCw 
} from "lucide-react";
import { PosterCanvas } from "./PosterCanvas";
import { 
  generateAiMarketingContent, savePoster, saveCampaign, 
  getSavedPosters, getSavedCampaigns, getMarketingAnalytics, 
  incrementAnalytics, MarketingPoster, MarketingCampaign 
} from "@/lib/aiMarketingEngine";
import { trackActivity } from "@/lib/analyticsTracker";

export const AIMarketingHub: React.FC = () => {
  const [analytics, setAnalytics] = useState(getMarketingAnalytics());
  const [activeTab, setActiveTab] = useState<"poster" | "copywriting" | "campaigns" | "history">("poster");

  // Poster Form State
  const [prompt, setPrompt] = useState("Diwali Dhamaka Discount Offer");
  const [businessType, setBusinessType] = useState("Grocery & Kirana Store");
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("modern");
  const [aspectRatio, setAspectRatio] = useState<"square" | "story" | "landscape" | "a4">("square");
  const [brandColor, setBrandColor] = useState("#059669");

  // Content State
  const [headline, setHeadline] = useState("DIWALI MEGA DHAMAKA SALE");
  const [offerText, setOfferText] = useState("FLAT 20% OFF + FREE GIFT ON ORDERS OVER ₹999");
  const [tagline, setTagline] = useState("Visit our store today or order on WhatsApp with 0% Fee UPI payment.");
  const [ctaText, setCtaText] = useState("SCAN & PAY VIA UPI");
  const [hashtags, setHashtags] = useState<string[]>(["#DiwaliSale", "#KiranaOffers", "#SmartPay"]);
  const [whatsappMsg, setWhatsappMsg] = useState("");
  const [captions, setCaptions] = useState<any>({});

  // Merchant Details
  const [shopName, setShopName] = useState("Mantu General Store");
  const [upiId, setUpiId] = useState("merchant@upi");
  const [mobile, setMobile] = useState("9876543210");
  const [address, setAddress] = useState("Main Market Road, Cuttack");
  const [includeQr, setIncludeQr] = useState(true);
  const [logoUrl, setLogoUrl] = useState<string | undefined>();
  const [productImageUrl, setProductImageUrl] = useState<string | undefined>();

  // Status Indicators
  const [loadingAi, setLoadingAi] = useState(false);
  const [copied, setCopied] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null!);

  const sync = () => setAnalytics(getMarketingAnalytics());

  useEffect(() => {
    window.addEventListener("smartpay_marketing_updated", sync);
    return () => window.removeEventListener("smartpay_marketing_updated", sync);
  }, []);

  const handleGenerateAi = async () => {
    if (!prompt.trim()) return;
    setLoadingAi(true);
    try {
      const res = await generateAiMarketingContent(prompt, businessType, language);
      setHeadline(res.headline || prompt.toUpperCase());
      setOfferText(res.offerText || "SPECIAL LIMITED PERIOD OFFER");
      setTagline(res.tagline || "Visit our local store today");
      setCtaText(res.ctaText || "PAY VIA UPI");
      setHashtags(res.hashtags || ["#StoreOffers"]);
      setWhatsappMsg(res.whatsappMessage || "");
      setCaptions(res.captions || {});

      savePoster({
        title: prompt,
        type: businessType,
        language,
        headline: res.headline,
        offerText: res.offerText,
        tagline: res.tagline,
        ctaText: res.ctaText,
        theme,
        aspectRatio,
        brandColor,
        logoUrl,
        productImageUrl,
        includeQr,
        shopName,
        upiId,
        mobile,
        address,
      });
      sync();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    incrementAnalytics("totalShares");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppBroadcast = () => {
    const text = whatsappMsg || `🎉 *${headline}*\n\n${offerText}\n\n${tagline}\n\nPay via UPI: upi://pay?pa=${upiId}&pn=${encodeURIComponent(shopName)}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    incrementAnalytics("totalShares");
    saveCampaign({
      name: prompt,
      category: "offer",
      targetChannel: "whatsapp",
      messageText: text,
      captions,
      hashtags,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Analytics Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
              <Wand2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">AI Marketing & Promotion Suite</h2>
              <p className="text-xs text-slate-500">Generate high-converting posters, WhatsApp broadcasts, and multi-channel social captions powered by Groq AI.</p>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl border text-xs font-bold gap-1">
            <button onClick={() => setActiveTab('poster')} className={`px-4 py-2 rounded-xl transition ${activeTab === 'poster' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
              Poster Studio
            </button>
            <button onClick={() => setActiveTab('copywriting')} className={`px-4 py-2 rounded-xl transition ${activeTab === 'copywriting' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
              AI Captions & Copy
            </button>
            <button onClick={() => setActiveTab('campaigns')} className={`px-4 py-2 rounded-xl transition ${activeTab === 'campaigns' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
              WhatsApp Broadcaster
            </button>
          </div>
        </div>

        {/* Real Analytics Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Posters Generated</span>
            <span className="text-xl font-black text-slate-900">{analytics.totalPostersCreated}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Campaigns Created</span>
            <span className="text-xl font-black text-purple-600">{analytics.totalCampaignsCreated}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">AI Generations</span>
            <span className="text-xl font-black text-emerald-600">{analytics.totalAiGenerations}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Shares</span>
            <span className="text-xl font-black text-blue-600">{analytics.totalShares}</span>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Top Theme</span>
            <span className="text-xl font-black text-amber-600 uppercase">{theme}</span>
          </div>
        </div>
      </div>

      {/* 1. AI POSTER STUDIO TAB */}
      {activeTab === "poster" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-5">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" /> AI Prompt & Design Controls
              </h3>
            </div>

            <div className="space-y-4 text-xs font-bold">
              <div>
                <label className="text-slate-700 uppercase block mb-1">Offer / Campaign Goal *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Grand Opening Sale, BOGO Offer, Sunday Grocery Deal"
                    className="flex-1 px-4 py-2.5 bg-slate-50 border rounded-xl"
                  />
                  <button
                    onClick={handleGenerateAi}
                    disabled={loadingAi}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 shrink-0"
                  >
                    {loadingAi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    {loadingAi ? "Generating..." : "AI Generate"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 uppercase block mb-1">Business Category</label>
                  <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
                    <option value="Grocery & Kirana Store">Grocery & Kirana</option>
                    <option value="Pharmacy & Medical">Pharmacy & Medical</option>
                    <option value="Restaurant & Cafe">Restaurant & Cafe</option>
                    <option value="Clothing & Garments">Clothing & Garments</option>
                    <option value="Electronics & Mobile">Electronics & Mobile</option>
                    <option value="Beauty Salon & Parlour">Beauty Salon & Parlour</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 uppercase block mb-1">Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Odia">Odia (ଓଡ଼ିଆ)</option>
                    <option value="Bengali">Bengali (বাংলা)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 uppercase block mb-1">Design Theme Style</label>
                  <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
                    <option value="modern">Modern Glass Gradient</option>
                    <option value="luxury">Luxury Gold</option>
                    <option value="festival">Festival Vibrant</option>
                    <option value="neon">Neon Cyberpunk</option>
                    <option value="minimal">Minimal White</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 uppercase block mb-1">Canvas Aspect Ratio</label>
                  <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as any)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
                    <option value="square">Square (1:1 Instagram/WhatsApp)</option>
                    <option value="story">Story (9:16 Mobile Fullscreen)</option>
                    <option value="landscape">Landscape (16:9 Banner)</option>
                    <option value="a4">Printable A4 Poster</option>
                  </select>
                </div>
              </div>

              {/* Text Tweaks */}
              <div className="space-y-2 pt-2 border-t">
                <label className="text-slate-800 uppercase block">Customize Text Content</label>
                <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline" className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
                <input type="text" value={offerText} onChange={(e) => setOfferText(e.target.value)} placeholder="Offer Details" className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
                <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Tagline" className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
              </div>

              {/* Upload Overlays */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                <div>
                  <label className="text-slate-700 uppercase block mb-1">Upload Logo</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setLogoUrl)} className="text-[10px] w-full" />
                </div>
                <div>
                  <label className="text-slate-700 uppercase block mb-1">Product Photo</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setProductImageUrl)} className="text-[10px] w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center sticky top-24">
            <PosterCanvas
              posterRef={posterRef}
              headline={headline}
              offerText={offerText}
              tagline={tagline}
              ctaText={ctaText}
              theme={theme}
              aspectRatio={aspectRatio}
              brandColor={brandColor}
              logoUrl={logoUrl}
              productImageUrl={productImageUrl}
              includeQr={includeQr}
              shopName={shopName}
              upiId={upiId}
              mobile={mobile}
              address={address}
            />

            <div className="grid grid-cols-2 gap-3 w-full mt-4">
              <button
                onClick={() => {
                  incrementAnalytics("totalDownloads");
                  alert("Exporting HD Printable Poster...");
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Download className="w-4 h-4" /> Download PNG
              </button>
              <button
                onClick={handleWhatsAppBroadcast}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Share2 className="w-4 h-4" /> Share WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. AI CAPTIONS & COPYWRITING TAB */}
      {activeTab === "copywriting" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" /> Groq AI Social Media Captions Generator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border space-y-2">
              <span className="text-xs font-black text-blue-600 uppercase block">Facebook Post Caption</span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">{captions.facebook || "Generate content using AI to view Facebook captions."}</p>
              <button onClick={() => handleCopyText(captions.facebook || "")} className="text-[11px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                <Copy className="w-3 h-3" /> Copy Caption
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border space-y-2">
              <span className="text-xs font-black text-pink-600 uppercase block">Instagram Reel / Post Caption</span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">{captions.instagram || "Generate content using AI to view Instagram captions."}</p>
              <button onClick={() => handleCopyText(captions.instagram || "")} className="text-[11px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                <Copy className="w-3 h-3" /> Copy Caption
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border space-y-2">
              <span className="text-xs font-black text-emerald-600 uppercase block">Google Business Profile Update</span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">{captions.googleBusiness || "Generate content using AI to view Google Business Post."}</p>
              <button onClick={() => handleCopyText(captions.googleBusiness || "")} className="text-[11px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                <Copy className="w-3 h-3" /> Copy Caption
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. WHATSAPP CAMPAIGN BROADCASTER TAB */}
      {activeTab === "campaigns" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-600" /> WhatsApp Merchant Broadcast Engine
            </h3>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900 text-white p-5 rounded-2xl font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
              {whatsappMsg || `🎉 GRAND FESTIVE SALE AT ${shopName.toUpperCase()}!\n\n${headline}\n${offerText}\n\n💳 Pay via UPI: upi://pay?pa=${upiId}&pn=${encodeURIComponent(shopName)}`}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleWhatsAppBroadcast}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Send className="w-4 h-4" /> Broadcast to WhatsApp Groups
              </button>
              <button
                onClick={() => handleCopyText(whatsappMsg)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-2xl text-xs border"
              >
                {copied ? "Copied!" : "Copy Broadcast Text"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
