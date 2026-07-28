export type NavigationTab = 
  | 'dashboard'
  | 'payments'
  | 'billing'
  | 'ai-center'
  | 'marketing'
  | 'crm'
  | 'analytics'
  | 'inventory'
  | 'online-presence'
  | 'financial-services'
  | 'merchant-toolbox'
  | 'marketplace'
  | 'business-profile'
  | 'settings'
  | 'help-support';

export type Language = 'English' | 'Hindi' | 'Odia' | 'Bengali';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  gstin?: string;
  totalDue: number;
  lastInvoiceDate?: string;
  notes?: string;
  loyaltyPoints?: number;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  hsnCode?: string;
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
