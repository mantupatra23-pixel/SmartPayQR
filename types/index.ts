export type BusinessCategory =
  | "Kirana Store"
  | "Chai Stall"
  | "Cafe"
  | "Restaurant"
  | "Salon"
  | "Freelancer"
  | "Boutique"
  | "Pharmacy"
  | "Electronics"
  | "Street Vendor"
  | "Other";

export type SupportedLanguage =
  | "hi-IN"
  | "en-IN"
  | "or-IN"
  | "bn-IN"
  | "mr-IN"
  | "ta-IN"
  | "te-IN"
  | "kn-IN"
  | "ml-IN";

export interface MerchantProfile {
  businessName: string;
  upiId: string;
  category: BusinessCategory;
  tagline: string;
  language: SupportedLanguage;
  theme: string;
  phone?: string;
  address?: string;
  logoData?: string;
}

export interface StandeeTheme {
  id: string;
  name: string;
  background: string;
  foreground: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  qrBg: string;
  qrFg: string;
  border: string;
  description: string;
}

export interface BillItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ReceiptData {
  receiptNumber: string;
  customerPhone: string;
  customerName?: string;
  items: BillItem[];
  subtotal: number;
  discount: number;
  total: number;
  createdAt: string;
}

export interface City {
  slug: string;
  name: string;
  state: string;
}

export interface Niche {
  slug: string;
  name: string;
  keyword: string;
  description: string;
  recommendedTheme: string;
  defaultCategory: BusinessCategory;
}
