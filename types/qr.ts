// types/qr.ts
export interface NamePayData {
  name: string;
  upiId: string;
  mobile?: string;
  address?: string;
  note?: string;
  amount?: string;
  logoUrl?: string;
}

export type QRTabType = 
  | 'upi' 
  | 'namepay' 
  | 'website' 
  | 'whatsapp' 
  | 'wifi' 
  | 'vcard' 
  | 'email' 
  | 'text';

export interface RecentQRItem extends NamePayData {
  id: string;
  createdAt: string;
  type: QRTabType;
}
