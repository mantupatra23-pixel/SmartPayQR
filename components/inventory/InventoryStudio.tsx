"use client";

import React, { useState, useEffect } from "react";
import { 
  InventoryProduct, getProducts, addProduct, updateProduct, deleteProduct, 
  duplicateProduct, toggleArchiveProduct, logMovement, getInventoryAnalytics, 
  getSuppliers, exportInventoryToCSV 
} from "@/lib/inventoryEngine";
import { SupplierStudio } from "./SupplierStudio";
import { 
  Package, Plus, Search, Filter, AlertTriangle, Clock, Barcode as BarcodeIcon, 
  Sparkles, Download, ArrowUpRight, ArrowDownRight, RefreshCw, Archive, Copy, Trash2, Edit3, X, Check, Box
} from "lucide-react";

export const InventoryStudio: React.FC = () => {
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [analytics, setAnalytics] = useState(getInventoryAnalytics());
  const [suppliers, setSuppliers] = useState(getSuppliers());

  // UI Tabs & Filters
  const [activeTab, setActiveTab] = useState<"products" | "suppliers" | "reports">("products");
  const [filter, setFilter] = useState<"all" | "in-stock" | "out-stock" | "low-stock" | "expired" | "expiring" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProd, setEditingProd] = useState<InventoryProduct | null>(null);
  const [showStockModal, setShowStockModal] = useState<InventoryProduct | null>(null);
  const [stockAdjQty, setStockAdjQty] = useState(1);
  const [stockAdjType, setStockAdjType] = useState<"stock-in" | "stock-out" | "damaged" | "lost">("stock-in");

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [gstPercent, setGstPercent] = useState(18);
  const [stockQuantity, setStockQuantity] = useState(10);
  const [minStockLevel, setMinStockLevel] = useState(5);
  const [unit, setUnit] = useState("Piece");
  const [supplierId, setSupplierId] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [description, setDescription] = useState("");

  const sync = () => {
    setProducts(getProducts());
    setAnalytics(getInventoryAnalytics());
    setSuppliers(getSuppliers());
  };

  useEffect(() => {
    sync();
    window.addEventListener("smartpay_inventory_updated", sync);
    return () => window.removeEventListener("smartpay_inventory_updated", sync);
  }, []);

  const autoGenerateSKUAndBarcode = () => {
    const randomSKU = `SKU-${Date.now().toString().slice(-6)}`;
    const randomBarcode = `${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    setSku(randomSKU);
    setBarcode(randomBarcode);
  };

  const handleAISuggestions = () => {
    if (!name) return;
    setCategory("Retail Goods");
    setHsnCode("8471");
    setDescription(`High-quality ${name} suitable for commercial and retail distribution.`);
  };

  const openAddModal = () => {
    setEditingProd(null);
    setName(""); setCategory("General"); setBrand("");
    autoGenerateSKUAndBarcode();
    setHsnCode(""); setPurchasePrice(0); setSellingPrice(0);
    setGstPercent(18); setStockQuantity(10); setMinStockLevel(5);
    setUnit("Piece"); setSupplierId(""); setBatchNumber("");
    setMfgDate(""); setExpiryDate(""); setDescription("");
    setShowProductModal(true);
  };

  const openEditModal = (p: InventoryProduct) => {
    setEditingProd(p);
    setName(p.name); setCategory(p.category); setBrand(p.brand || "");
    setSku(p.sku); setBarcode(p.barcode); setHsnCode(p.hsnCode || "");
    setPurchasePrice(p.purchasePrice); setSellingPrice(p.sellingPrice);
    setGstPercent(p.gstPercent); setStockQuantity(p.stockQuantity);
    setMinStockLevel(p.minStockLevel); setUnit(p.unit);
    setSupplierId(p.supplierId || ""); setBatchNumber(p.batchNumber || "");
    setMfgDate(p.mfgDate || ""); setExpiryDate(p.expiryDate || "");
    setDescription(p.description || "");
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name, category, brand, sku, barcode, hsnCode,
      purchasePrice: Number(purchasePrice),
      sellingPrice: Number(sellingPrice),
      gstPercent: Number(gstPercent),
      stockQuantity: Number(stockQuantity),
      minStockLevel: Number(minStockLevel),
      unit, supplierId, batchNumber, mfgDate, expiryDate,
      description, status: "active" as const
    };

    if (editingProd) {
      updateProduct({ ...editingProd, ...payload });
    } else {
      addProduct(payload);
    }

    setShowProductModal(false);
    sync();
  };

  const handleStockAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showStockModal || stockAdjQty <= 0) return;
    logMovement(showStockModal.id, stockAdjType, stockAdjQty, `Manual ${stockAdjType} adjustment`);
    setShowStockModal(null);
    setStockAdjQty(1);
    sync();
  };

  // Filter Search Pipeline
  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.barcode.includes(query) ||
      (p.hsnCode && p.hsnCode.includes(query)) ||
      p.category.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    const now = new Date();
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

    if (filter === "archived") return p.status === "archived";
    if (p.status === "archived") return false;

    if (filter === "in-stock") return p.stockQuantity > p.minStockLevel;
    if (filter === "out-stock") return p.stockQuantity === 0;
    if (filter === "low-stock") return p.stockQuantity > 0 && p.stockQuantity <= p.minStockLevel;
    if (filter === "expired") return p.expiryDate && new Date(p.expiryDate) < now;
    if (filter === "expiring") return p.expiryDate && new Date(p.expiryDate) >= now && (new Date(p.expiryDate).getTime() - now.getTime() <= thirtyDaysInMs);

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Header Controls */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Inventory & Stock Control</h2>
              <p className="text-xs text-slate-500">Live SKU tracking, automatic barcode generation, low stock alerts, and GST valuation.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportInventoryToCSV}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs transition border"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>

            <button
              onClick={openAddModal}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Real Analytics Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Products</span>
            <span className="text-xl font-black text-slate-900">{analytics.totalProducts}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Inventory Value</span>
            <span className="text-xl font-black text-emerald-600">₹{analytics.inventoryValue.toLocaleString()}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Expected Sales</span>
            <span className="text-xl font-black text-blue-600">₹{analytics.totalSellingValue.toLocaleString()}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Expected Profit</span>
            <span className="text-xl font-black text-amber-600">₹{analytics.expectedProfit.toLocaleString()}</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Low / Out of Stock</span>
            <span className={`text-xl font-black ${analytics.lowStockCount + analytics.outOfStockCount > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {analytics.lowStockCount + analytics.outOfStockCount}
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Expired Items</span>
            <span className={`text-xl font-black ${analytics.expiredCount > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {analytics.expiredCount}
            </span>
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="flex border-b text-xs font-bold gap-4">
          <button
            onClick={() => setActiveTab("products")}
            className={`pb-2.5 border-b-2 transition ${activeTab === "products" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500"}`}
          >
            Product Catalog ({products.filter((p) => p.status === "active").length})
          </button>
          <button
            onClick={() => setActiveTab("suppliers")}
            className={`pb-2.5 border-b-2 transition ${activeTab === "suppliers" ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-500"}`}
          >
            Suppliers ({suppliers.length})
          </button>
        </div>

        {/* 1. PRODUCT CATALOG VIEW */}
        {activeTab === "products" && (
          <div className="space-y-4">
            {/* Search & Filter Options */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by product name, SKU, barcode, HSN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border rounded-xl font-medium outline-none"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 text-xs bg-slate-50 border rounded-xl font-bold text-slate-700 outline-none"
              >
                <option value="all">All Active Items</option>
                <option value="in-stock">In Stock Only</option>
                <option value="low-stock">⚠ Low Stock Alert</option>
                <option value="out-stock">Out of Stock</option>
                <option value="expiring">Expiring in 30 Days</option>
                <option value="expired">Expired Products</option>
                <option value="archived">Archived Catalog</option>
              </select>
            </div>

            {/* Zero State / Empty Database View */}
            {products.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-4">
                <div className="p-4 bg-emerald-100 text-emerald-700 rounded-full w-fit mx-auto">
                  <Box className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800">📦 No products added yet.</h3>
                  <p className="text-xs text-slate-500 mt-1">Start building your real inventory database with auto SKUs, barcodes, and stock levels.</p>
                </div>
                <button
                  onClick={openAddModal}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-6 rounded-2xl text-xs shadow-lg shadow-emerald-600/20 transition"
                >
                  <Plus className="w-4 h-4" /> Add First Product
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border text-xs text-slate-400 font-bold">
                No products match the selected search query or filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((p) => {
                  const isLow = p.stockQuantity > 0 && p.stockQuantity <= p.minStockLevel;
                  const isOut = p.stockQuantity === 0;

                  return (
                    <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-emerald-300 transition">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                            {p.category}
                          </span>
                          <h3 className="text-sm font-black text-slate-900 mt-1">{p.name}</h3>
                          <p className="text-[10px] font-mono text-slate-400">SKU: {p.sku} | Barcode: {p.barcode}</p>
                        </div>
                        <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${
                          isOut ? 'bg-rose-100 text-rose-700 border-rose-300' :
                          isLow ? 'bg-amber-100 text-amber-800 border-amber-300' :
                          'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}>
                          {isOut ? 'Out of Stock' : isLow ? '⚠ Low Stock' : `${p.stockQuantity} ${p.unit}`}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl border text-xs">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block uppercase">Purchase Price</span>
                          <span className="font-bold text-slate-700">₹{p.purchasePrice}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-bold text-slate-400 block uppercase">Selling Price (+GST {p.gstPercent}%)</span>
                          <span className="font-black text-emerald-600">₹{p.sellingPrice}</span>
                        </div>
                      </div>

                      {/* Item Quick Actions */}
                      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => setShowStockModal(p)}
                          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-1.5 px-2 rounded-xl text-[11px] flex items-center justify-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Adjust Stock
                        </button>
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 text-slate-500 hover:text-blue-600 bg-slate-50 rounded-xl"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => duplicateProduct(p.id)}
                          className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-50 rounded-xl"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleArchiveProduct(p.id)}
                          className="p-2 text-slate-500 hover:text-amber-600 bg-slate-50 rounded-xl"
                          title="Archive"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 text-slate-500 hover:text-rose-600 bg-slate-50 rounded-xl"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. SUPPLIERS VIEW */}
        {activeTab === "suppliers" && <SupplierStudio />}
      </div>

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {showProductModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border shadow-2xl max-w-2xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingProd ? "Edit Inventory Item" : "Add Product to Inventory"}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-semibold">
              <div className="flex justify-between items-center bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> AI Assistant Available
                </span>
                <button
                  type="button"
                  onClick={handleAISuggestions}
                  className="bg-emerald-600 text-white font-bold py-1 px-3 rounded-xl text-[10px]"
                >
                  Auto Fill AI Suggestions
                </button>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Product Name *</label>
                <input type="text" required placeholder="e.g. Parle-G Biscuit 100g" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1">Category</label>
                  <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Brand</label>
                  <input type="text" placeholder="e.g. Parle" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">HSN / SAC Code</label>
                  <input type="text" placeholder="1905" value={hsnCode} onChange={(e) => setHsnCode(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1">SKU Code *</label>
                  <input type="text" required value={sku} onChange={(e) => setSku(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Barcode *</label>
                  <input type="text" required value={barcode} onChange={(e) => setBarcode(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1">Purchase Price (₹)</label>
                  <input type="number" value={purchasePrice || ""} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold" />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Selling Price (₹)</label>
                  <input type="number" value={sellingPrice || ""} onChange={(e) => setSellingPrice(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold" />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">GST %</label>
                  <select value={gstPercent} onChange={(e) => setGstPercent(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold">
                    <option value={0}>0%</option>
                    <option value={5}>5%</option>
                    <option value={12}>12%</option>
                    <option value={18}>18%</option>
                    <option value={28}>28%</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1">Stock Quantity</label>
                  <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold" />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Min Stock Alert Level</label>
                  <input type="number" value={minStockLevel} onChange={(e) => setMinStockLevel(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold" />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Unit</label>
                  <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl">
                    <option value="Piece">Piece</option>
                    <option value="Kg">Kg</option>
                    <option value="Litre">Litre</option>
                    <option value="Packet">Packet</option>
                    <option value="Box">Box</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block mb-1">Manufacturing Date</label>
                  <input type="date" value={mfgDate} onChange={(e) => setMfgDate(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="text-slate-700 block mb-1">Expiry Date</label>
                  <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" />
                </div>
              </div>

              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-2xl shadow-lg shadow-emerald-600/20">
                {editingProd ? "Update Product Details" : "Save Product to Inventory"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- STOCK ADJUSTMENT MODAL --- */}
      {showStockModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl border shadow-2xl max-w-sm w-full space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-black text-slate-900">Adjust Stock: {showStockModal.name}</h3>
              <button onClick={() => setShowStockModal(null)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleStockAdjustment} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="text-slate-700 block mb-1">Adjustment Type</label>
                <select value={stockAdjType} onChange={(e) => setStockAdjType(e.target.value as any)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold">
                  <option value="stock-in">Stock In (+)</option>
                  <option value="stock-out">Stock Out (-)</option>
                  <option value="damaged">Damaged (-) </option>
                  <option value="lost">Lost / Stolen (-)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 block mb-1">Quantity</label>
                <input type="number" min={1} value={stockAdjQty} onChange={(e) => setStockAdjQty(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold" />
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold">
                Confirm Stock Adjustment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
