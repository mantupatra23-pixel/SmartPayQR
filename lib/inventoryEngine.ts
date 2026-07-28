export interface Supplier {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  address?: string;
  outstandingBalance: number;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: "stock-in" | "stock-out" | "purchase" | "sale" | "return" | "damaged" | "lost" | "adjustment";
  quantity: number;
  reason?: string;
  date: string;
}

export interface InventoryProduct {
  id: string;
  name: string;
  image?: string;
  category: string;
  brand?: string;
  sku: string;
  barcode: string;
  hsnCode?: string;
  purchasePrice: number;
  sellingPrice: number;
  gstPercent: number;
  stockQuantity: number;
  minStockLevel: number;
  unit: string;
  supplierId?: string;
  batchNumber?: string;
  mfgDate?: string;
  expiryDate?: string;
  description?: string;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY_PRODUCTS = "smartpay_inventory_products";
const STORAGE_KEY_SUPPLIERS = "smartpay_inventory_suppliers";
const STORAGE_KEY_MOVEMENTS = "smartpay_inventory_movements";

// Storage Initializers
export const getProducts = (): InventoryProduct[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products: InventoryProduct[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  window.dispatchEvent(new Event("smartpay_inventory_updated"));
};

export const getSuppliers = (): Supplier[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY_SUPPLIERS);
  return data ? JSON.parse(data) : [];
};

export const saveSuppliers = (suppliers: Supplier[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_SUPPLIERS, JSON.stringify(suppliers));
  window.dispatchEvent(new Event("smartpay_inventory_updated"));
};

export const getMovements = (): StockMovement[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY_MOVEMENTS);
  return data ? JSON.parse(data) : [];
};

export const saveMovements = (movements: StockMovement[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_MOVEMENTS, JSON.stringify(movements));
};

// CRUD Operations
export const addProduct = (product: Omit<InventoryProduct, "id" | "createdAt" | "updatedAt">): InventoryProduct => {
  const products = getProducts();
  const newProduct: InventoryProduct = {
    ...product,
    id: `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  
  // Log Initial Stock Entry
  if (product.stockQuantity > 0) {
    logMovement(newProduct.id, "stock-in", product.stockQuantity, "Initial Stock Entry");
  }
  return newProduct;
};

export const updateProduct = (product: InventoryProduct) => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    products[index] = { ...product, updatedAt: new Date().toISOString() };
    saveProducts(products);
  }
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
};

export const duplicateProduct = (id: string) => {
  const products = getProducts();
  const original = products.find((p) => p.id === id);
  if (original) {
    const copy = {
      ...original,
      name: `${original.name} (Copy)`,
      sku: `${original.sku}-COPY-${Math.floor(Math.random() * 1000)}`,
      barcode: `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
    };
    delete (copy as any).id;
    addProduct(copy);
  }
};

export const toggleArchiveProduct = (id: string) => {
  const products = getProducts();
  const product = products.find((p) => p.id === id);
  if (product) {
    product.status = product.status === "active" ? "archived" : "active";
    saveProducts(products);
  }
};

// Stock Adjustment Engine
export const logMovement = (
  productId: string,
  type: StockMovement["type"],
  quantity: number,
  reason?: string
) => {
  const movements = getMovements();
  movements.push({
    id: `mov_${Date.now()}`,
    productId,
    type,
    quantity,
    reason,
    date: new Date().toISOString(),
  });
  saveMovements(movements);

  // Auto-Update Product Stock
  const products = getProducts();
  const product = products.find((p) => p.id === productId);
  if (product) {
    if (["stock-in", "purchase", "return"].includes(type)) {
      product.stockQuantity += quantity;
    } else {
      product.stockQuantity = Math.max(0, product.stockQuantity - quantity);
    }
    saveProducts(products);
  }
};

// Analytics & Metrics Engine (Purely Calculated from DB)
export const getInventoryAnalytics = () => {
  const products = getProducts().filter((p) => p.status === "active");
  const suppliers = getSuppliers();
  const now = new Date();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

  const totalProducts = products.length;
  const categories = new Set(products.map((p) => p.category)).size;

  let totalPurchaseValue = 0;
  let totalSellingValue = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;
  let expiredCount = 0;
  let expiringSoonCount = 0;

  products.forEach((p) => {
    totalPurchaseValue += p.purchasePrice * p.stockQuantity;
    totalSellingValue += p.sellingPrice * p.stockQuantity;

    if (p.stockQuantity === 0) outOfStockCount++;
    else if (p.stockQuantity <= p.minStockLevel) lowStockCount++;

    if (p.expiryDate) {
      const exp = new Date(p.expiryDate);
      if (exp < now) expiredCount++;
      else if (exp.getTime() - now.getTime() <= thirtyDaysInMs) expiringSoonCount++;
    }
  });

  const expectedProfit = totalSellingValue - totalPurchaseValue;

  return {
    totalProducts,
    totalCategories: categories,
    inventoryValue: totalPurchaseValue,
    totalSellingValue,
    expectedProfit,
    lowStockCount,
    outOfStockCount,
    expiredCount,
    expiringSoonCount,
    totalSuppliers: suppliers.length,
  };
};

// CSV Export Utility
export const exportInventoryToCSV = () => {
  const products = getProducts();
  if (products.length === 0) return;

  const headers = ["Name,Category,SKU,Barcode,Purchase Price,Selling Price,GST %,Stock,Unit,Status\n"];
  const rows = products.map((p) => 
    `"${p.name}","${p.category}","${p.sku}","${p.barcode}",${p.purchasePrice},${p.sellingPrice},${p.gstPercent},${p.stockQuantity},"${p.unit}","${p.status}"`
  );

  const blob = new Blob([headers.concat(rows.join("\n")).join("")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `inventory_report_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
