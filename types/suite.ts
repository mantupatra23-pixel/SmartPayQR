import { NamePayData } from "./qr";

export type ViewMode = 'qr-studio' | 'poster-designer' | 'invoice-studio' | 'business-tools' | 'marketplace' | 'ai-assistant';

export interface MerchantProfile {
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  website?: string;
  gstNumber?: string;
  category: string;
  address: string;
  workingHours?: string;
  upiId: string;
  secondaryUpiId?: string;
  instagram?: string;
  whatsapp?: string;
  googleMapsUrl?: string;
  logoUrl?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceDocument {
  id: string;
  type: 'gst' | 'non-gst' | 'estimate' | 'receipt';
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerGst?: string;
  items: InvoiceItem[];
  gstRate: number;
  discount: number;
  notes: string;
  paid: boolean;
}

export interface AnalyticsData {
  posterDownloads: number;
  qrCopies: number;
  invoicesGenerated: number;
  totalRevenueCollected: number;
}
