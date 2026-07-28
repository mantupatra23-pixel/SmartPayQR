export type PosterTheme = 
  | 'classic-emerald' 
  | 'royal-blue' 
  | 'gold-luxury' 
  | 'dark-violet' 
  | 'minimal-white'
  | 'festive-red';

export type PrintFormat = 'a4' | 'a5' | 'thermal-58' | 'thermal-80' | 'pvc-card' | 'table-stand';

export interface NamePayData {
  id?: string;
  name: string;
  upiId: string;
  mobile?: string;
  address?: string;
  note?: string;
  amount?: string;
  category?: string;
  theme?: PosterTheme;
  qrColor?: string;
  qrBgColor?: string;
  logoUrl?: string;
  verifiedBadge?: boolean;
  socialHandles?: {
    instagram?: string;
    whatsapp?: string;
  };
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  items: InvoiceItem[];
  gstPercentage: number;
  discount: number;
  notes: string;
}
