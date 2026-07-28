export interface ActivityLog {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  badge: string;
}

export interface RealAnalyticsData {
  qrGenerations: number;
  qrDownloads: number;
  pdfDownloads: number;
  invoicesCreated: number;
  invoiceRevenue: number;
  activeCustomers: number;
  savedCustomers: number;
  marketplaceClicks: number;
  aiGenerationsUsed: number;
  whatsAppShares: number;
  posterShares: number;
  activities: ActivityLog[];
}

const STORAGE_KEY = "smartpay_real_analytics_data";

export const getRealAnalytics = (): RealAnalyticsData => {
  if (typeof window === "undefined") {
    return {
      qrGenerations: 0,
      qrDownloads: 0,
      pdfDownloads: 0,
      invoicesCreated: 0,
      invoiceRevenue: 0,
      activeCustomers: 0,
      savedCustomers: 0,
      marketplaceClicks: 0,
      aiGenerationsUsed: 0,
      whatsAppShares: 0,
      posterShares: 0,
      activities: []
    };
  }

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initial: RealAnalyticsData = {
      qrGenerations: 0,
      qrDownloads: 0,
      pdfDownloads: 0,
      invoicesCreated: 0,
      invoiceRevenue: 0,
      activeCustomers: 0,
      savedCustomers: 0,
      marketplaceClicks: 0,
      aiGenerationsUsed: 0,
      whatsAppShares: 0,
      posterShares: 0,
      activities: []
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(data);
  } catch {
    return {
      qrGenerations: 0,
      qrDownloads: 0,
      pdfDownloads: 0,
      invoicesCreated: 0,
      invoiceRevenue: 0,
      activeCustomers: 0,
      savedCustomers: 0,
      marketplaceClicks: 0,
      aiGenerationsUsed: 0,
      whatsAppShares: 0,
      posterShares: 0,
      activities: []
    };
  }
};

export const trackActivity = (
  type: keyof Omit<RealAnalyticsData, "activities" | "invoiceRevenue">,
  description: string,
  badge: string,
  revenueAdd: number = 0
) => {
  if (typeof window === "undefined") return;

  const current = getRealAnalytics();
  
  if (typeof current[type] === "number") {
    (current[type] as number) += 1;
  }

  if (revenueAdd > 0) {
    current.invoiceRevenue += revenueAdd;
  }

  const newLog: ActivityLog = {
    id: `ACT-${Date.now()}`,
    type: String(type),
    description,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    badge
  };

  current.activities = [newLog, ...current.activities].slice(0, 50); // Keep last 50 actions

  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));

  // Dispatch custom window event so open components react instantly
  window.dispatchEvent(new Event("smartpay_analytics_updated"));
};
