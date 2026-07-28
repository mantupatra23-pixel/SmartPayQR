"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { FileText, Plus, Download, Printer, Search, CheckCircle2 } from "lucide-react";

export default function GstBillingPage() {
  const [invoices, setInvoices] = useState<any[]>([]);

  return (
    <SidebarLayout>
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">GST Invoice Studio</h2>
                <p className="text-xs text-slate-500">Create B2B & B2C GST-compliant invoices and tax reports.</p>
              </div>
            </div>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md">
              <Plus className="w-4 h-4" /> Create New GST Invoice
            </button>
          </div>

          {invoices.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed text-xs text-slate-400 font-bold space-y-2">
              <FileText className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-slate-700 font-extrabold">No Invoices Created Yet</p>
              <p>Click "+ Create New GST Invoice" to generate your first tax bill.</p>
            </div>
          ) : null}
        </div>
      </div>
    </SidebarLayout>
  );
}
