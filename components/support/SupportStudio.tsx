"use client";

import React, { useState } from "react";
import { Mail, Bug, Sparkles, Send, Loader2, CheckCircle2, AlertCircle, History } from "lucide-react";

export const SupportStudio: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'contact' | 'bug' | 'feature' | 'logs'>('contact');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form States
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [bugForm, setBugForm] = useState({ description: "", device: "Mobile/Android", browser: "Chrome" });
  const [featureForm, setFeatureForm] = useState({ title: "", description: "", priority: "High" });

  // Email Logs State
  const [emailLogs, setEmailLogs] = useState<Array<{ id: string; type: string; recipient: string; status: 'Sent' | 'Failed'; time: string }>>([
    { id: "LOG-101", type: "Contact Support", recipient: "pmantu808@gmail.com", status: "Sent", time: "10 mins ago" },
    { id: "LOG-102", type: "Tax Invoice PDF", recipient: "customer@gmail.com", status: "Sent", time: "1 hour ago" },
  ]);

  const sendEmailRequest = async (type: string, data: any) => {
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          name: data.name || "Merchant User",
          email: data.email || "pmantu808@gmail.com",
          subject: data.subject || data.title || `${type} Submitted`,
          message: data.message || data.description,
          payload: data,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Dispatch failed");

      setStatusMsg({ type: "success", text: "Email & Auto-reply sent successfully!" });

      // Add to local logs
      setEmailLogs(prev => [{
        id: `LOG-${Date.now()}`,
        type,
        recipient: data.email || "pmantu808@gmail.com",
        status: "Sent",
        time: "Just now"
      }, ...prev]);

    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to send email." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Email Service & Support Center</h2>
            <p className="text-xs text-slate-500">Contact support, report bugs, suggest features, and monitor email delivery logs.</p>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('contact')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubTab === 'contact' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            Contact
          </button>
          <button
            onClick={() => setActiveSubTab('bug')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubTab === 'bug' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            Report Bug
          </button>
          <button
            onClick={() => setActiveSubTab('feature')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubTab === 'feature' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            Feature Request
          </button>
          <button
            onClick={() => setActiveSubTab('logs')}
            className={`px-3 py-1.5 rounded-xl transition ${activeSubTab === 'logs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            Email Logs
          </button>
        </div>
      </div>

      {/* Status Toast Notification */}
      {statusMsg && (
        <div className={`p-4 rounded-2xl flex items-center gap-2 text-xs font-bold ${
          statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {statusMsg.text}
        </div>
      )}

      {/* 1. Contact Form */}
      {activeSubTab === 'contact' && (
        <form onSubmit={(e) => { e.preventDefault(); sendEmailRequest('Support Request', contactForm); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Mantu Patra"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="pmantu808@gmail.com"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border rounded-xl font-semibold"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Subject *</label>
            <input
              type="text"
              required
              placeholder="e.g. Help with UPI Poster QR Export"
              value={contactForm.subject}
              onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border rounded-xl font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Message *</label>
            <textarea
              required
              rows={4}
              placeholder="Describe your request in detail..."
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full p-4 text-xs bg-slate-50 border rounded-xl font-semibold outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition shadow-md"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Sending Email..." : "Send Message"}
          </button>
        </form>
      )}

      {/* 2. Bug Report */}
      {activeSubTab === 'bug' && (
        <form onSubmit={(e) => { e.preventDefault(); sendEmailRequest('Bug Report', bugForm); }} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Bug Description *</label>
            <textarea
              required
              rows={4}
              placeholder="Explain the error or issue you encountered..."
              value={bugForm.description}
              onChange={(e) => setBugForm({ ...bugForm, description: e.target.value })}
              className="w-full p-4 text-xs bg-slate-50 border rounded-xl font-semibold outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Device Type</label>
              <input
                type="text"
                value={bugForm.device}
                onChange={(e) => setBugForm({ ...bugForm, device: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border rounded-xl font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Browser</label>
              <input
                type="text"
                value={bugForm.browser}
                onChange={(e) => setBugForm({ ...bugForm, browser: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border rounded-xl font-semibold"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition shadow-md"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bug className="w-4 h-4" />}
            {loading ? "Sending Bug Report..." : "Submit Bug Report"}
          </button>
        </form>
      )}

      {/* 3. Feature Request */}
      {activeSubTab === 'feature' && (
        <form onSubmit={(e) => { e.preventDefault(); sendEmailRequest('Feature Request', featureForm); }} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Feature Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. WhatsApp Auto Billing Bot"
              value={featureForm.title}
              onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })}
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border rounded-xl font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Description *</label>
            <textarea
              required
              rows={4}
              placeholder="Explain how this feature will help your dukan/business..."
              value={featureForm.description}
              onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })}
              className="w-full p-4 text-xs bg-slate-50 border rounded-xl font-semibold outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition shadow-md"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Submitting Idea..." : "Submit Feature Request"}
          </button>
        </form>
      )}

      {/* 4. Email Logs Dashboard */}
      {activeSubTab === 'logs' && (
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <History className="w-4 h-4 text-slate-500" /> Recent Sent & Dispatched Email Logs
          </h3>
          <div className="space-y-2">
            {emailLogs.map((log) => (
              <div key={log.id} className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border text-xs font-semibold">
                <div>
                  <span className="text-slate-900 font-bold block">{log.type}</span>
                  <span className="text-slate-400 text-[11px]">{log.recipient}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-[10px]">{log.time}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
