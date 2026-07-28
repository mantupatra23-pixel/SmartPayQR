export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sku?: string;
  barcode?: string;
  description: string;
  imageUrl?: string;
  isFeatured: boolean;
  isBestSeller: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StoreProfile {
  storeName: string;
  slug: string;
  ownerName: string;
  category: string;
  description: string;
  aboutUs: string;
  tagline: string;
  address: string;
  mapsUrl: string;
  workingHours: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  logoUrl?: string;
  coverBannerUrl?: string;
  isPublished: boolean;
  upiId: string;
  codEnabled: boolean;
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

export interface StorefrontAnalytics {
  storeVisitors: number;
  productViews: number;
  whatsappOrders: number;
  totalRevenue: number;
  storeLinkClicks: number;
}
