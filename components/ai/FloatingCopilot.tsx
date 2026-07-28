"use client";

import React, { useState } from "react";
import { Bot, X, Sparkles, Send, Loader2 } from "lucide-react";

export const FloatingCopilot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState<string[]>([]);

  const askCopilot = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/merchant-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "copilot", promptData: prompt, category: "Kirana & Retail" }),
      });
      const data = await res.json();
      if (data.strategies) {
        setTips(data.strategies);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold p-4 rounded-full shadow-2xl hover:scale-105 transition"
        >
          <Bot className="w-6 h-6" />
          <span className="text-xs pr-1 font-extrabold hidden sm:inline">Merchant AI Copilot</span>
        </button>
      ) : (
        <div className="bg-white w-[340px] sm:w-[380px] p-5 rounded-3xl border border-slate-200 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900">AI Business Assistant</h3>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[260px] overflow-y-auto text-xs">
            {tips.length === 0 ? (
              <p className="text-slate-500 text-center py-6">Ask me anything about increasing shop sales, margins, or festival offers!</p>
            ) : (
              tips.map((tip, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border rounded-xl text-slate-800 leading-relaxed font-medium">
                  • {tip}
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. How to increase Diwali sale?"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={askCopilot}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
