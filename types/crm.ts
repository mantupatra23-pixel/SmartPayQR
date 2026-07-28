export interface LedgerEntry {
  id: string;
  type: 'credit' | 'payment'; // credit = customer took goods on credit (+due), payment = customer paid (-due)
  amount: number;
  description: string;
  date: string;
  dueDate?: string;
  status: 'pending' | 'settled';
}

export interface PurchaseHistoryItem {
  id: string;
  invoiceNumber?: string;
  amount: number;
  date: string;
  itemsSummary: string;
  pointsEarned: number;
}

export interface CustomerProfile {
  id: string;
  name: string;
  mobile: string;
  whatsapp: string;
  email?: string;
  address?: string;
  city?: string;
  dob?: string; // YYYY-MM-DD
  anniversary?: string; // YYYY-MM-DD
  gstin?: string;
  photoUrl?: string;
  notes?: string;
  status: 'active' | 'inactive';
  isVip: boolean;
  createdAt: string;
  loyaltyPoints: number;
  ledgerEntries: LedgerEntry[];
  purchases: PurchaseHistoryItem[];
}

export interface LoyaltyRuleConfig {
  pointsPerRupee: number; // e.g., 0.01 = 1 point per ₹100
  redemptionRate: number; // e.g., ₹1 discount per 1 point
  minPointsToRedeem: number;
}
