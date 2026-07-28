"use client";

import React, { useState } from "react";
import { Package, Plus, AlertTriangle, Barcode, Search, CheckCircle2 } from "lucide-react";
import { ProductItem } from "@/types/suite";

export const InventoryStudio: React.FC = () => {
  const [products] = useState<ProductItem[]>([
    { id: "1", name: "Fortune Sunflower Oil 1L", price: 145, stock: 42, category: "Grocery", hsnCode: "1512" },
    { id: "2", name: "Aashirvaad Atta 5kg", price: 230, stock: 4, category: "Grocery", hsnCode: "1101" },
    { id: "3", name: "Tata Salt 1kg", price: 28, stock: 85, category: "Grocery", hsnCode: "2501" },
    { id: "4", name: "Surf Excel Easy Wash 1kg", price: 140, stock: 2, category: "Household", hsnCode: "3402" },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Inventory & Stock Control</h2>
              <p className="text-xs text-slate-500">Track real-time stock levels, HSN codes, and automatic low-stock alerts.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-md">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Catalog Items</p>
            <p className="text-2xl font-black text-slate-900">133 SKU</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Inventory Value</p>
            <p className="text-2xl font-black text-teal-600">₹1,42,800</p>
          </div>
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 space-y-1">
            <p className="text-[10px] font-bold text-rose-600 uppercase flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Low Stock Warning
            </p>
            <p className="text-2xl font-black text-rose-700">2 Items</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Live Products Stock Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b font-extrabold text-slate-400 uppercase">
                  <th className="py-2">Item Name</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">HSN</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">In Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold text-slate-800">{p.name}</td>
                    <td className="py-3 text-slate-500">{p.category}</td>
                    <td className="py-3 font-mono text-slate-400">{p.hsnCode}</td>
                    <td className="py-3 text-right font-bold text-slate-900">₹{p.price}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        p.stock < 5 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {p.stock} units
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
