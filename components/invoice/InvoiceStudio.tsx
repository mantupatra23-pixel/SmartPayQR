"use client";

import React, { useState } from "react";
import { InvoiceDocument, InvoiceItem } from "@/types/suite";
import { Plus, Trash2, Printer, Download, Receipt } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const InvoiceStudio: React.FC = () => {
  const [invoice, setInvoice] = useState<InvoiceDocument>({
    id: `INV-${Date.now()}`,
    type: 'gst',
    invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    customerName: "",
    customerPhone: "",
    items: [{ id: "1", description: "Standard Business Service / Goods", quantity: 1, rate: 500, amount: 500 }],
    gstRate: 18,
    discount: 0,
    shipping: 0,
    notes: "Thank you for doing business with us!",
    paid: true
  });

  const invoiceRef = React.useRef<HTMLDivElement>(null!);

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoice(prev => {
      const updated = prev.items.map(item => {
        if (item.id === id) {
          const newItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            newItem.amount = (Number(newItem.quantity) || 0) * (Number(newItem.rate) || 0);
          }
          return newItem;
        }
        return item;
      });
      return { ...prev, items: updated };
    });
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: `${Date.now()}`, description: "", quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeItem = (id: string) => {
    if (invoice.items.length <= 1) return;
    setInvoice(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }));
  };

  const subtotal = invoice.items.reduce((sum, i) => sum + i.amount, 0);
  const gstAmount = (subtotal * (invoice.type === 'gst' ? invoice.gstRate : 0)) / 100;
  const grandTotal = Math.max(0, subtotal + gstAmount + (invoice.shipping || 0) - (invoice.discount || 0));

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, (canvas.height * pdfWidth) / canvas.width);
    pdf.save(`${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Invoice Form */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-600" /> Professional Invoice Studio
            </h2>
            <p className="text-xs text-slate-500 mt-1">Generate GST & Non-GST bills with embedded UPI payment QR.</p>
          </div>
          <select
            value={invoice.type}
            onChange={(e) => setInvoice({ ...invoice, type: e.target.value as any })}
            className="text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-300"
          >
            <option value="gst">GST Invoice (18%)</option>
            <option value="non-gst">Non-GST Bill</option>
            <option value="estimate">Estimate / Quotation</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Invoice Number</label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border rounded-xl"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Billing Date</label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Customer Name</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={invoice.customerName}
              onChange={(e) => setInvoice({ ...invoice, customerName: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border rounded-xl"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Customer Mobile</label>
            <input
              type="text"
              placeholder="9876543210"
              value={invoice.customerPhone}
              onChange={(e) => setInvoice({ ...invoice, customerPhone: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border rounded-xl"
            />
          </div>
        </div>

        {/* Dynamic Item Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Line Items</h3>
            <button
              onClick={addItem}
              className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add Item
            </button>
          </div>

          {invoice.items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border">
              <input
                type="text"
                placeholder="Item Description"
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                className="col-span-6 text-xs p-2 bg-white border rounded-lg"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                className="col-span-2 text-xs p-2 bg-white border rounded-lg text-center"
              />
              <input
                type="number"
                placeholder="Rate"
                value={item.rate}
                onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                className="col-span-3 text-xs p-2 bg-white border rounded-lg text-right"
              />
              <button onClick={() => removeItem(item.id)} className="col-span-1 text-slate-400 hover:text-red-500 flex justify-center">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Live Printable Preview */}
      <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
        <div ref={invoiceRef} className="bg-slate-50 p-6 rounded-2xl border text-slate-800 space-y-4 font-sans">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">TAX INVOICE</h3>
              <p className="text-xs font-bold text-emerald-600">{invoice.invoiceNumber}</p>
            </div>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              {invoice.type.toUpperCase()}
            </span>
          </div>

          <div className="text-xs space-y-1">
            <p><span className="font-bold">Customer:</span> {invoice.customerName || "Walk-in Customer"}</p>
            <p><span className="font-bold">Phone:</span> {invoice.customerPhone || "N/A"}</p>
            <p><span className="font-bold">Date:</span> {invoice.date}</p>
          </div>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b font-bold text-slate-600">
                <th className="py-1">Desc</th>
                <th className="py-1 text-center">Qty</th>
                <th className="py-1 text-right">Amt</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((i) => (
                <tr key={i.id} className="border-b">
                  <td className="py-1.5 truncate max-w-[120px]">{i.description || "Item"}</td>
                  <td className="py-1.5 text-center">{i.quantity}</td>
                  <td className="py-1.5 text-right">₹{i.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t pt-2 space-y-1 text-xs text-right">
            <p className="text-slate-600">Subtotal: ₹{subtotal}</p>
            {invoice.type === 'gst' && <p className="text-slate-600">GST ({invoice.gstRate}%): ₹{gstAmount}</p>}
            <p className="text-base font-black text-slate-900">Total Payable: ₹{grandTotal}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs"
          >
            <Printer className="w-4 h-4" /> Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
