export type ViewMode = 
  | 'qr-studio' 
  | 'invoice-studio' 
  | 'marketing-hub' 
  | 'business-assistant' 
  | 'merchant-toolbox' 
  | 'customer-management' 
  | 'marketplace';

export type Language = 'English' | 'Hindi' | 'Odia' | 'Bengali';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  gstin?: string;
  totalDue: number;
  lastInvoiceDate?: string;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  hsnCode?: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceDocument {
  id: string;
  type: 'gst' | 'non-gst' | 'estimate' | 'quotation' | 'receipt' | 'proforma';
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  items: InvoiceItem[];
  gstRate: number;
  discount: number;
  shipping: number;
  notes: string;
  paid: boolean;
}

export interface AnalyticsData {
  qrDownloads: number;
  posterDownloads: number;
  invoicesCreated: number;
  totalRevenue: number;
}
