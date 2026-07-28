"use client";

import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Bot, Sparkles, Wand2, MessageSquare } from "lucide-react";

export default function AiSuitePage() {
  return (
    <SidebarLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">AI Merchant Copilot & Assistant</h2>
              <p className="text-xs text-slate-500">Groq LLM-powered marketing copywriter, HSN advisor, and smart inventory forecast.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-50 rounded-2xl border space-y-2">
              <Wand2 className="w-6 h-6 text-purple-600" />
              <h3 className="font-extrabold text-sm">Product Description AI</h3>
              <p className="text-xs text-slate-500">Auto-generate attractive descriptions for store products.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border space-y-2">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              <h3 className="font-extrabold text-sm">GST & HSN Finder</h3>
              <p className="text-xs text-slate-500">AI search for correct Indian tax rates and code mappings.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border space-y-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <h3 className="font-extrabold text-sm">WhatsApp Copywriter</h3>
              <p className="text-xs text-slate-500">Generate high-converting offer broadcasts in Hindi, Odia, & English.</p>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
