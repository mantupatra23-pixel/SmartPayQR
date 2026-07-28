"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe, Plus, Trash2, Edit3, ShoppingBag, Wand2, Share2, 
  ExternalLink, QrCode, Phone, MessageCircle, MapPin, Store, 
  Sparkles, CheckCircle2, Eye, BarChart3, Tag, Star, CreditCard, Copy, Download, Loader2
} from "lucide-react";
import { StoreProfile, StoreProduct, CustomerReview, StorefrontAnalytics } from "@/types/storefront";
import { 
  getStoreProfile, saveStoreProfile, 
  getStoreProducts, saveStoreProducts, 
  getStoreReviews, saveStoreReviews,
  getStoreAnalytics, trackStoreClick 
} from "@/lib/storefrontEngine";

export const PresenceStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'profile' | 'catalog' | 'visiting-card' | 'analytics'>('preview');
  const [profile, setProfile] = useState<StoreProfile>(getStoreProfile());
  const [products, setProducts] = useState<StoreProduct[]>(getStoreProducts());
  const [reviews, setReviews] = useState<CustomerReview[]>(getStoreReviews());
  const [analytics, setAnalytics] = useState<StorefrontAnalytics>(getStoreAnalytics());
  const [isSaving, setIsSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // New Product Modal State
  const [newProduct, setNewProduct] = useState<StoreProduct>({
    id: "",
    name: "",
    category: "General",
    price: 0,
    discountPrice: 0,
    stock: 10,
    description: "",
    isFeatured: true,
    isBestSeller: false
  });

  const syncData = () => {
    setProfile(getStoreProfile());
    setProducts(getStoreProducts());
    setReviews(getStoreReviews());
    setAnalytics(getStoreAnalytics());
  };

  useEffect(() => {
    syncData();
    window.addEventListener("smartpay_storefront_updated", syncData);
    return () => window.removeEventListener("smartpay_storefront_updated", syncData);
  }, []);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    saveStoreProfile(profile);
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price <= 0) return;
    const updated = [{ ...newProduct, id: `PROD-${Date.now()}` }, ...products];
    saveStoreProducts(updated);
    setProducts(updated);
    setNewProduct({
      id: "", name: "", category: "General", price: 0, discountPrice: 0, stock: 10, description: "", isFeatured: true, isBestSeller: false
    });
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    saveStoreProducts(updated);
    setProducts(updated);
  };

  const runAIGenerator = async () => {
    if (!profile.storeName) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/merchant-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: profile.category, language: "English" }),
      });
      const data = await res.json();
      if (data) {
        setProfile(prev => ({
          ...prev,
          description: data.googleBusinessDescriptions?.[0] || prev.description,
          tagline: data.taglines?.[0] || prev.tagline,
          seoTitle: `${prev.storeName} - Best ${prev.category} Online Store`,
          seoDescription: data.googleBusinessDescriptions?.[1] || prev.description,
          metaKeywords: `${prev.storeName}, ${prev.category}, buy online, UPI pay`
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const buyOnWhatsApp = (product: StoreProduct) => {
    trackStoreClick("whatsappOrders", product.discountPrice || product.price);
    const targetPhone = profile.whatsappNumber || profile.phone || "9178065739";
    const message = `Hello ${profile.storeName || "Store Owner"}, I want to buy:\n*Product:* ${product.name}\n*Price:* ₹${product.discountPrice || product.price}\n\nPlease confirm availability.`;
    window.open(`https://api.whatsapp.com/send?phone=91${targetPhone}&text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">AI Mini E-Commerce Builder</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage digital storefront, products, instant WhatsApp checkout, and NFC visiting card.</p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center bg-slate-100 p-1.5 rounded-2xl border text-xs font-bold gap-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Live Store Preview
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'profile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Store Profile
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'catalog' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('visiting-card')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'visiting-card' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Visiting Card
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* 1. LIVE STORE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                  Published E-Commerce Website
                </span>
                <h3 className="text-2xl font-black mt-2">{profile.storeName || "My General Store"}</h3>
                <p className="text-xs text-slate-300 mt-1">{profile.tagline || "Quality Products At Best Prices"}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://smartpayqr.in/store/${profile.slug}`);
                    trackStoreClick("storeLinkClicks");
                    alert("Store URL Copied to clipboard!");
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-white/20 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Link
                </button>
              </div>
            </div>

            {/* Product Catalog Display Grid */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">Catalog Products</h4>
              {products.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-dashed rounded-2xl text-xs text-slate-500">
                  No products added yet. Click "Products" tab above to add items to your online storefront.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3 hover:border-emerald-300 transition">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{p.category}</span>
                          {p.isBestSeller && (
                            <span className="text-[9px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                              Best Seller
                            </span>
                          )}
                        </div>
                        <h5 className="text-sm font-bold text-slate-900">{p.name}</h5>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.description || "Fresh stock item"}</p>
                      </div>

                      <div>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-base font-black text-slate-900">₹{p.discountPrice || p.price}</span>
                          {p.discountPrice && p.discountPrice < p.price && (
                            <span className="text-xs text-slate-400 line-through">₹{p.price}</span>
                          )}
                        </div>
                        <button
                          onClick={() => buyOnWhatsApp(p)}
                          className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs shadow-md transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Buy on WhatsApp
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. STORE PROFILE EDITOR */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSave} className="space-y-4 text-xs font-semibold">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">Configure Business & SEO Details</h3>
              <button
                type="button"
                onClick={runAIGenerator}
                disabled={aiLoading}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1"
              >
                {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                {aiLoading ? "AI Writing..." : "AI Auto-Generate Details"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 block mb-1">Store Name</label>
                <input
                  type="text"
                  value={profile.storeName}
                  onChange={(e) => setProfile({ ...profile, storeName: e.target.value })}
                  placeholder="e.g. Patra Super Mart"
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
              <div>
                <label className="text-slate-700 block mb-1">URL Slug</label>
                <input
                  type="text"
                  value={profile.slug}
                  onChange={(e) => setProfile({ ...profile, slug: e.target.value })}
                  placeholder="my-shop-name"
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 block mb-1">WhatsApp Order Number</label>
                <input
                  type="text"
                  value={profile.whatsappNumber}
                  onChange={(e) => setProfile({ ...profile, whatsappNumber: e.target.value })}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
              <div>
                <label className="text-slate-700 block mb-1">Store UPI ID</label>
                <input
                  type="text"
                  value={profile.upiId}
                  onChange={(e) => setProfile({ ...profile, upiId: e.target.value })}
                  placeholder="merchant@upi"
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 block mb-1">Tagline</label>
              <input
                type="text"
                value={profile.tagline}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                placeholder="Quality groceries delivered at your doorstep"
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-slate-700 block mb-1">Store Description</label>
              <textarea
                rows={3}
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                placeholder="Describe your business, specialty products, and delivery terms..."
                className="w-full p-3 bg-slate-50 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition"
            >
              {isSaving ? "Saving..." : "Save Store Settings"}
            </button>
          </form>
        )}

        {/* 3. PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <form onSubmit={handleAddProduct} className="bg-slate-50 p-4 rounded-2xl border space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-700">Add New Catalog Product</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Product Name *"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="px-3 py-2 text-xs bg-white border rounded-xl"
                />
                <input
                  type="number"
                  placeholder="Regular Price (₹) *"
                  required
                  value={newProduct.price || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="px-3 py-2 text-xs bg-white border rounded-xl"
                />
                <input
                  type="number"
                  placeholder="Discounted Price (₹)"
                  value={newProduct.discountPrice || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, discountPrice: Number(e.target.value) })}
                  className="px-3 py-2 text-xs bg-white border rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Save Product To Catalog
              </button>
            </form>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase text-slate-400">Current Product List</h4>
              {products.map((p) => (
                <div key={p.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border text-xs font-semibold">
                  <div>
                    <span className="text-slate-900 font-bold">{p.name}</span>
                    <span className="text-slate-400 block text-[11px]">Category: {p.category} • Price: ₹{p.discountPrice || p.price}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. DIGITAL VISITING CARD */}
        {activeTab === 'visiting-card' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-black text-white">{profile.storeName || "Merchant Name"}</h3>
                  <p className="text-xs text-emerald-400 font-bold">{profile.category}</p>
                </div>
                <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30 text-emerald-400">
                  <QrCode className="w-5 h-5" />
                </div>
              </div>

              <div className="text-xs space-y-1 text-slate-300">
                <p><Phone className="w-3 h-3 inline mr-1 text-slate-400" /> +91 {profile.phone || profile.whatsappNumber || "9876543210"}</p>
                <p><MapPin className="w-3 h-3 inline mr-1 text-slate-400" /> {profile.address || "Shop Address"}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono text-center">
                Digital Business Card • SmartPay OS
              </div>
            </div>

            <button
              onClick={() => alert("Downloading Visiting Card Image...")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download Digital Card PNG
            </button>
          </div>
        )}

        {/* 5. STOREFRONT ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Store Link Clicks</p>
              <p className="text-2xl font-black text-slate-900">{analytics.storeLinkClicks}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border">
              <p className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp Orders</p>
              <p className="text-2xl font-black text-emerald-600">{analytics.whatsappOrders}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Order Revenue</p>
              <p className="text-2xl font-black text-slate-900">₹{analytics.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Catalog Products</p>
              <p className="text-2xl font-black text-blue-600">{products.length}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
