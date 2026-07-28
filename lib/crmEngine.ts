import { CustomerProfile, LedgerEntry, PurchaseHistoryItem, LoyaltyRuleConfig } from "@/types/crm";
import { trackActivity } from "./analyticsTracker";

const CRM_CUSTOMERS_KEY = "smartpay_crm_customers";
const CRM_LOYALTY_KEY = "smartpay_crm_loyalty_config";

// --- LOYALTY RULES ---
export const getLoyaltyConfig = (): LoyaltyRuleConfig => {
  if (typeof window === "undefined") return { pointsPerRupee: 0.01, redemptionRate: 1, minPointsToRedeem: 10 };
  const saved = localStorage.getItem(CRM_LOYALTY_KEY);
  if (!saved) return { pointsPerRupee: 0.01, redemptionRate: 1, minPointsToRedeem: 10 };
  try { return JSON.parse(saved); } catch { return { pointsPerRupee: 0.01, redemptionRate: 1, minPointsToRedeem: 10 }; }
};

export const saveLoyaltyConfig = (config: LoyaltyRuleConfig) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CRM_LOYALTY_KEY, JSON.stringify(config));
  window.dispatchEvent(new Event("smartpay_crm_updated"));
};

// --- CUSTOMER CRUD ---
export const getCRMCustomers = (): CustomerProfile[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(CRM_CUSTOMERS_KEY);
  if (!saved) return [];
  try { return JSON.parse(saved); } catch { return []; }
};

export const saveCRMCustomers = (customers: CustomerProfile[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CRM_CUSTOMERS_KEY, JSON.stringify(customers));
  window.dispatchEvent(new Event("smartpay_crm_updated"));
};

export const addCustomer = (customer: Omit<CustomerProfile, "id" | "createdAt" | "loyaltyPoints" | "ledgerEntries" | "purchases">): CustomerProfile => {
  const current = getCRMCustomers();
  const newProfile: CustomerProfile = {
    ...customer,
    id: `CUST-${Date.now()}`,
    createdAt: new Date().toISOString().split("T")[0],
    loyaltyPoints: 0,
    ledgerEntries: [],
    purchases: []
  };

  const updated = [newProfile, ...current];
  saveCRMCustomers(updated);
  trackActivity("savedCustomers", `Added new customer: ${newProfile.name}`, "CRM");
  return newProfile;
};

export const updateCustomer = (updatedCustomer: CustomerProfile) => {
  const current = getCRMCustomers();
  const index = current.findIndex(c => c.id === updatedCustomer.id);
  if (index !== -1) {
    current[index] = updatedCustomer;
    saveCRMCustomers(current);
  }
};

export const deleteCustomer = (id: string) => {
  const current = getCRMCustomers();
  const filtered = current.filter(c => c.id !== id);
  saveCRMCustomers(filtered);
};

// --- LEDGER TRANSACTIONS ---
export const addLedgerEntry = (customerId: string, entry: Omit<LedgerEntry, "id">) => {
  const customers = getCRMCustomers();
  const customer = customers.find(c => c.id === customerId);
  if (!customer) return;

  const newEntry: LedgerEntry = {
    ...entry,
    id: `LEDG-${Date.now()}`
  };

  customer.ledgerEntries.unshift(newEntry);
  updateCustomer(customer);
};

// --- PURCHASE LOG & POINTS ---
export const logCustomerPurchase = (customerId: string, amount: number, itemsSummary: string) => {
  const customers = getCRMCustomers();
  const customer = customers.find(c => c.id === customerId);
  if (!customer) return;

  const loyaltyConfig = getLoyaltyConfig();
  const pointsEarned = Math.floor(amount * loyaltyConfig.pointsPerRupee);

  const newPurchase: PurchaseHistoryItem = {
    id: `PURCH-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    amount,
    itemsSummary,
    pointsEarned
  };

  customer.purchases.unshift(newPurchase);
  customer.loyaltyPoints += pointsEarned;
  updateCustomer(customer);
};

// --- ANALYTICS CALCULATOR (100% REAL DATA) ---
export const getCRMAnalytics = () => {
  const customers = getCRMCustomers();
  
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "active").length;
  const repeatCustomers = customers.filter(c => c.purchases.length > 1).length;
  
  const totalLoyaltyPoints = customers.reduce((sum, c) => sum + (c.loyaltyPoints || 0), 0);
  
  // Calculate Net Outstanding Dues across all customer ledgers
  const totalOutstandingDues = customers.reduce((sum, c) => {
    const custDues = c.ledgerEntries.reduce((net, entry) => {
      return entry.type === "credit" ? net + entry.amount : net - entry.amount;
    }, 0);
    return sum + Math.max(0, custDues);
  }, 0);

  // Total Sales & Average Purchase
  const totalPurchasesCount = customers.reduce((sum, c) => sum + c.purchases.length, 0);
  const totalRevenueFromPurchases = customers.reduce((sum, c) => {
    return sum + c.purchases.reduce((pSum, p) => pSum + p.amount, 0);
  }, 0);

  const averagePurchase = totalPurchasesCount > 0 
    ? Math.round(totalRevenueFromPurchases / totalPurchasesCount) 
    : 0;

  return {
    totalCustomers,
    activeCustomers,
    repeatCustomers,
    totalLoyaltyPoints,
    totalOutstandingDues,
    averagePurchase,
    totalPurchasesCount
  };
};

// --- TODAY'S BIRTHDAYS & ANNIVERSARIES ---
export const getTodayOccasions = () => {
  const customers = getCRMCustomers();
  const today = new Date();
  const currentMonthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const birthdays = customers.filter(c => {
    if (!c.dob) return false;
    const parts = c.dob.split("-");
    if (parts.length === 3) return `${parts[1]}-${parts[2]}` === currentMonthDay;
    return false;
  });

  const anniversaries = customers.filter(c => {
    if (!c.anniversary) return false;
    const parts = c.anniversary.split("-");
    if (parts.length === 3) return `${parts[1]}-${parts[2]}` === currentMonthDay;
    return false;
  });

  return { birthdays, anniversaries };
};

// --- CSV EXPORT & IMPORT ---
export const exportCustomersToCSV = () => {
  const customers = getCRMCustomers();
  if (customers.length === 0) return;

  const headers = ["ID,Name,Mobile,WhatsApp,Email,Address,City,DOB,Anniversary,GSTIN,Status,VIP,LoyaltyPoints,Dues\n"];
  const rows = customers.map(c => {
    const due = c.ledgerEntries.reduce((net, e) => e.type === "credit" ? net + e.amount : net - e.amount, 0);
    return `"${c.id}","${c.name}","${c.mobile}","${c.whatsapp}","${c.email || ""}","${c.address || ""}","${c.city || ""}","${c.dob || ""}","${c.anniversary || ""}","${c.gstin || ""}","${c.status}","${c.isVip}",${c.loyaltyPoints},${due}`;
  });

  const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Merchant_Customers_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
