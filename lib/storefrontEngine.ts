import { StoreProfile, StoreProduct, CustomerReview, StorefrontAnalytics } from "@/types/storefront";
import { trackActivity } from "./analyticsTracker";

const STORE_PROFILE_KEY = "smartpay_storefront_profile";
const STORE_PRODUCTS_KEY = "smartpay_storefront_products";
const STORE_REVIEWS_KEY = "smartpay_storefront_reviews";
const STORE_ANALYTICS_KEY = "smartpay_storefront_analytics";

export const getStoreProfile = (): StoreProfile => {
  if (typeof window === "undefined") return getInitialProfile();
  const saved = localStorage.getItem(STORE_PROFILE_KEY);
  if (!saved) {
    const initial = getInitialProfile();
    localStorage.setItem(STORE_PROFILE_KEY, JSON.stringify(initial));
    return initial;
  }
  try { return JSON.parse(saved); } catch { return getInitialProfile(); }
};

export const saveStoreProfile = (profile: StoreProfile) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE_PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("smartpay_storefront_updated"));
};

const getInitialProfile = (): StoreProfile => ({
  storeName: "",
  slug: "my-digital-dukan",
  ownerName: "",
  category: "General Store",
  description: "",
  aboutUs: "",
  tagline: "",
  address: "",
  mapsUrl: "",
  workingHours: "09:00 AM - 09:00 PM",
  phone: "",
  whatsappNumber: "",
  email: "",
  isPublished: true,
  upiId: "",
  codEnabled: true,
  seoTitle: "",
  seoDescription: "",
  metaKeywords: ""
});

export const getStoreProducts = (): StoreProduct[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORE_PRODUCTS_KEY);
  if (!saved) return [];
  try { return JSON.parse(saved); } catch { return []; }
};

export const saveStoreProducts = (products: StoreProduct[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE_PRODUCTS_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event("smartpay_storefront_updated"));
};

export const getStoreReviews = (): CustomerReview[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORE_REVIEWS_KEY);
  if (!saved) return [];
  try { return JSON.parse(saved); } catch { return []; }
};

export const saveStoreReviews = (reviews: CustomerReview[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE_REVIEWS_KEY, JSON.stringify(reviews));
  window.dispatchEvent(new Event("smartpay_storefront_updated"));
};

export const getStoreAnalytics = (): StorefrontAnalytics => {
  if (typeof window === "undefined") return { storeVisitors: 0, productViews: 0, whatsappOrders: 0, totalRevenue: 0, storeLinkClicks: 0 };
  const saved = localStorage.getItem(STORE_ANALYTICS_KEY);
  if (!saved) {
    const initial = { storeVisitors: 0, productViews: 0, whatsappOrders: 0, totalRevenue: 0, storeLinkClicks: 0 };
    localStorage.setItem(STORE_ANALYTICS_KEY, JSON.stringify(initial));
    return initial;
  }
  try { return JSON.parse(saved); } catch { return { storeVisitors: 0, productViews: 0, whatsappOrders: 0, totalRevenue: 0, storeLinkClicks: 0 }; }
};

export const trackStoreClick = (metric: keyof StorefrontAnalytics, amountAdd = 0) => {
  if (typeof window === "undefined") return;
  const current = getStoreAnalytics();
  current[metric] += 1;
  if (amountAdd > 0) current.totalRevenue += amountAdd;
  localStorage.setItem(STORE_ANALYTICS_KEY, JSON.stringify(current));
  trackActivity("marketplaceClicks", `Storefront metric updated: ${metric}`, "Store Event");
  window.dispatchEvent(new Event("smartpay_storefront_updated"));
};
