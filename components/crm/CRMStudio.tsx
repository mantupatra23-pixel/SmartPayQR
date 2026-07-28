"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, UserPlus, Search, Filter, Phone, MessageCircle, Mail, 
  Gift, Heart, Award, CreditCard, Download, Upload, Plus, Trash2, 
  Edit3, Eye, DollarSign, Calendar, AlertCircle, CheckCircle2, X, Sparkles
} from "lucide-react";
import { CustomerProfile, LedgerEntry } from "@/types/crm";
import { 
  getCRMCustomers, addCustomer, updateCustomer, deleteCustomer, 
  addLedgerEntry, getCRMAnalytics, getTodayOccasions, 
  exportCustomersToCSV, getLoyaltyConfig, saveLoyaltyConfig 
} from "@/lib/crmEngine";

export const CRMStudio: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [analytics, setAnalytics] = useState(getCRMAnalytics());
  const [occasions, setOccasions] = useState(getTodayOccasions());
  
  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "active" | "inactive" | "vip" | "due">("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"directory" | "ledger" | "loyalty" | "occasions">("directory");

  // Form State for Adding / Editing
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    dob: "",
    anniversary: "",
    gstin: "",
    notes: "",
    status: "active" as "active" | "inactive",
    isVip: false
  });

  // Ledger Add Modal State
  const [ledgerForm, setLedgerForm] = useState({
    type: "credit" as "credit" | "payment",
    amount: 0,
    description: "",
    dueDate: ""
  });

  const syncCRM = () => {
    const fresh = getCRMCustomers();
    setCustomers(fresh);
    setAnalytics(getCRMAnalytics());
    setOccasions(getTodayOccasions());
  };

  useEffect(() => {
    syncCRM();
    window.addEventListener("smartpay_crm_updated", syncCRM);
    return () => window.removeEventListener("smartpay_crm_updated", syncCRM);
  }, []);

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) return;

    addCustomer({
      ...formData,
      whatsapp: formData.whatsapp || formData.mobile
    });

    setFormData({
      name: "", mobile: "", whatsapp: "", email: "", address: "", city: "",
      dob: "", anniversary: "", gstin: "", notes: "", status: "active", isVip: false
    });
    setIsAddModalOpen(false);
  };

  const handleAddLedger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || ledgerForm.amount <= 0) return;

    addLedgerEntry(selectedCustomer.id, {
      type: ledgerForm.type,
      amount: ledgerForm.amount,
      description: ledgerForm.description || (ledgerForm.type === "credit" ? "Goods Purchased on Credit" : "Payment Received"),
      date: new Date().toISOString().split("T")[0],
      dueDate: ledgerForm.dueDate,
      status: ledgerForm.type === "payment" ? "settled" : "pending"
    });

    setLedgerForm({ type: "credit", amount: 0, description: "", dueDate: "" });
    syncCRM();
    // Refresh selected customer view
    const updated = getCRMCustomers().find(c => c.id === selectedCustomer.id);
    if (updated) setSelectedCustomer(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this customer profile?")) {
      deleteCustomer(id);
      if (selectedCustomer?.id === id) setSelectedCustomer(null);
    }
  };

  // Search and Filter Logic
  const filteredCustomers = customers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mobile.includes(searchQuery) ||
      c.whatsapp.includes(searchQuery) ||
      (c.city && c.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.gstin && c.gstin.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === "active") return c.status === "active";
    if (filterType === "inactive") return c.status === "inactive";
    if (filterType === "vip") return c.isVip;
    if (filterType === "due") {
      const netDue = c.ledgerEntries.reduce((sum, e) => e.type === "credit" ? sum + e.amount : sum - e.amount, 0);
      return netDue > 0;
    }
    return true;
  });

  const sendWhatsApp = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    window.open(`https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Tab Controls */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Merchant CRM & Customer Ledger</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage real customer profiles, ledger credit, loyalty rules, and birthday greetings.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md"
            >
              <UserPlus className="w-4 h-4" /> Add Customer
            </button>

            {customers.length > 0 && (
              <button
                onClick={exportCustomersToCSV}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition border"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Real Data Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Customers</span>
            <span className="text-xl font-black text-slate-900">{analytics.totalCustomers}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Active Profiles</span>
            <span className="text-xl font-black text-emerald-600">{analytics.activeCustomers}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Repeat Buyers</span>
            <span className="text-xl font-black text-indigo-600">{analytics.repeatCustomers}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Loyalty Points</span>
            <span className="text-xl font-black text-amber-600">{analytics.totalLoyaltyPoints} Pts</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Outstanding Dues</span>
            <span className="text-xl font-black text-rose-600">₹{analytics.totalOutstandingDues.toLocaleString()}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Avg Purchase</span>
            <span className="text-xl font-black text-slate-900">₹{analytics.averagePurchase}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b text-xs font-bold gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab("directory")}
            className={`pb-2.5 border-b-2 transition whitespace-nowrap ${activeSubTab === "directory" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500"}`}
          >
            Customer Directory ({customers.length})
          </button>
          <button
            onClick={() => setActiveSubTab("occasions")}
            className={`pb-2.5 border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${activeSubTab === "occasions" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500"}`}
          >
            Today's Occasions 
            {(occasions.birthdays.length > 0 || occasions.anniversaries.length > 0) && (
              <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                {occasions.birthdays.length + occasions.anniversaries.length}
              </span>
            )}
          </button>
        </div>

        {/* 1. CUSTOMER DIRECTORY VIEW */}
        {activeSubTab === "directory" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, mobile, city, or GSTIN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border rounded-xl font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 text-xs bg-slate-50 border rounded-xl font-bold text-slate-700 outline-none"
              >
                <option value="all">All Customers</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
                <option value="vip">VIP Customers</option>
                <option value="due">Pending Dues Only</option>
              </select>
            </div>

            {/* Empty State */}
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-3">
                <Users className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">No customers added yet.</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Start adding customer details to track credit ledgers, loyalty points, and purchase history.
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition shadow-md mt-2"
                >
                  <Plus className="w-4 h-4" /> Add Customer
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCustomers.map((c) => {
                  const netDue = c.ledgerEntries.reduce((net, e) => e.type === "credit" ? net + e.amount : net - e.amount, 0);

                  return (
                    <div key={c.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3 hover:border-emerald-300 transition">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-sm font-black text-slate-900">{c.name}</h3>
                              {c.isVip && (
                                <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                                  VIP
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" /> +91 {c.mobile}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedCustomer(c)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 rounded-lg transition"
                            title="View Profile & Ledger"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border mt-2">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 block uppercase">Loyalty Points</span>
                            <span className="font-bold text-amber-600">{c.loyaltyPoints} Pts</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-bold text-slate-400 block uppercase">Ledger Due</span>
                            <span className={`font-black ${netDue > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                              ₹{netDue > 0 ? netDue : 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                        <button
                          onClick={() => sendWhatsApp(c.whatsapp, `Hello ${c.name}, greetings from our shop!`)}
                          className="flex-1 flex items-center justify-center gap-1 bg-emerald-50 text-emerald-700 font-bold py-1.5 px-2 rounded-lg text-[11px] border border-emerald-200 hover:bg-emerald-100 transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. TODAY'S OCCASIONS VIEW */}
        {activeSubTab === "occasions" && (
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Today's Birthdays & Anniversaries</h3>
            {occasions.birthdays.length === 0 && occasions.anniversaries.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border text-xs text-slate-500">
                No customer birthdays or anniversaries today.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {occasions.birthdays.map((c) => (
                  <div key={c.id} className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit mb-1">
                        <Gift className="w-3 h-3" /> Birthday Today
                      </span>
                      <h4 className="text-sm font-black text-slate-900">{c.name}</h4>
                      <p className="text-xs text-slate-600">+91 {c.mobile}</p>
                    </div>
                    <button
                      onClick={() => sendWhatsApp(c.whatsapp, `Happy Birthday ${c.name}! 🎉 Wishing you joy from our shop. Enjoy a 10% special discount on your next visit!`)}
                      className="bg-emerald-600 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center gap-1 shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Wish WhatsApp
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- ADD CUSTOMER MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl border shadow-2xl max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-black text-slate-900">Add New Customer</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="text-slate-700 block mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value, whatsapp: formData.whatsapp || e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    placeholder="9876543210"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Anniversary</label>
                  <input
                    type="date"
                    value={formData.anniversary}
                    onChange={(e) => setFormData({ ...formData, anniversary: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Cuttack"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">GSTIN (Optional)</label>
                  <input
                    type="text"
                    placeholder="21ABCDE1234F1Z5"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="vip"
                  checked={formData.isVip}
                  onChange={(e) => setFormData({ ...formData, isVip: e.target.checked })}
                  className="rounded text-emerald-600"
                />
                <label htmlFor="vip" className="text-slate-800 font-bold">Mark as VIP Customer</label>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition"
              >
                Save Customer Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- CUSTOMER LEDGER & PROFILE DRAWER --- */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white w-full max-w-xl h-full p-6 space-y-6 overflow-y-auto border-l shadow-2xl">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">{selectedCustomer.name}</h3>
                <p className="text-xs text-slate-500">+91 {selectedCustomer.mobile} • Member since {selectedCustomer.createdAt}</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Add Ledger Credit/Payment Form */}
            <form onSubmit={handleAddLedger} className="bg-slate-50 p-4 rounded-2xl border space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-700">Add Credit Entry / Payment</h4>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={ledgerForm.type}
                  onChange={(e) => setLedgerForm({ ...ledgerForm, type: e.target.value as any })}
                  className="px-3 py-2 text-xs bg-white border rounded-xl font-bold"
                >
                  <option value="credit">Customer Took Credit (+Due)</option>
                  <option value="payment">Customer Paid Amount (-Due)</option>
                </select>
                <input
                  type="number"
                  placeholder="Amount (₹) *"
                  required
                  value={ledgerForm.amount || ""}
                  onChange={(e) => setLedgerForm({ ...ledgerForm, amount: Number(e.target.value) })}
                  className="px-3 py-2 text-xs bg-white border rounded-xl font-bold"
                />
              </div>
              <input
                type="text"
                placeholder="Description / Reason"
                value={ledgerForm.description}
                onChange={(e) => setLedgerForm({ ...ledgerForm, description: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border rounded-xl font-semibold"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs"
              >
                Record Ledger Transaction
              </button>
            </form>

            {/* Ledger History List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400">Ledger Statement</h4>
              {selectedCustomer.ledgerEntries.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No credit transactions logged.</p>
              ) : (
                <div className="space-y-2">
                  {selectedCustomer.ledgerEntries.map((e) => (
                    <div key={e.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border text-xs font-semibold">
                      <div>
                        <span className={`font-bold block ${e.type === "credit" ? "text-rose-600" : "text-emerald-600"}`}>
                          {e.type === "credit" ? "Credit +" : "Payment Received -"} ₹{e.amount}
                        </span>
                        <span className="text-slate-400 text-[10px]">{e.description} • {e.date}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${e.type === "credit" ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"}`}>
                        {e.type.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
