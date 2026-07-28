export interface AffiliateOffer {
  id: string;
  title: string;
  subtitle: string;
  category: "Personal Loan" | "Business Loan" | "Credit Card";
  buttonText: string;
  url: string;
  badge?: string;
  rating?: string;
  benefits: string;
  accentColor: "emerald" | "blue" | "purple";
  isWeRize?: boolean;
}

export const MONETIZATION_OFFERS: AffiliateOffer[] = [
  // ======================== PERSONAL LOAN (GREEN) ========================
  {
    id: "personal-loan-1",
    title: "Instant Personal Loan",
    subtitle: "Get up to ₹5 Lakh",
    category: "Personal Loan",
    buttonText: "Apply Now",
    url: "https://bitli.in/8QHRyKA",
    badge: "Fast Disbursal",
    rating: "4.9",
    benefits: "Minimal documentation with flexible EMI repayment tenure.",
    accentColor: "emerald"
  },
  {
    id: "personal-loan-2",
    title: "Quick Personal Loan",
    subtitle: "Fast Online Approval",
    category: "Personal Loan",
    buttonText: "Apply Now",
    url: "https://bitli.in/Sx3I5vG",
    badge: "100% Digital",
    rating: "4.8",
    benefits: "Instant eligibility check with zero collateral requirements.",
    accentColor: "emerald"
  },

  // ======================== BUSINESS LOAN (BLUE) ========================
  {
    id: "business-loan-werize",
    title: "Business Loan & Personal Loan Expert",
    subtitle: "Apply through Certified WeRize Financial Advisor",
    category: "Business Loan",
    buttonText: "Apply Now",
    url: "https://www.werize.com/Mantu-patra-loan-saving-expert-in-ganjam-personal-loan-2VrLbsgFaTjpeYugc6JDgu",
    badge: "WeRize Certified Advisor",
    rating: "5.0",
    benefits: "Personalized advisor guidance in Ganjam & Odisha for max approval.",
    accentColor: "blue",
    isWeRize: true
  },

  // ======================== CREDIT CARDS (PURPLE) ========================
  {
    id: "credit-card-1",
    title: "Lifetime Free Credit Card",
    subtitle: "Zero Joining & Annual Fees",
    category: "Credit Card",
    buttonText: "Apply Now",
    url: "https://bitli.in/oOxCquB",
    badge: "Zero Fee",
    rating: "4.9",
    benefits: "No hidden charges, free lounge access & welcome vouchers.",
    accentColor: "purple"
  },
  {
    id: "credit-card-2",
    title: "Cashback Credit Card",
    subtitle: "Maximum Savings On Monthly Spend",
    category: "Credit Card",
    buttonText: "Apply Now",
    url: "https://bitli.in/NDWk4IW",
    badge: "5% Cashback",
    rating: "4.8",
    benefits: "Direct statement cashback on grocery, utility & online spends.",
    accentColor: "purple"
  },
  {
    id: "credit-card-3",
    title: "Rewards Credit Card",
    subtitle: "Accelerate Every Purchase",
    category: "Credit Card",
    buttonText: "Apply Now",
    url: "https://bitli.in/1ULjk4G",
    badge: "10x Rewards",
    rating: "4.7",
    benefits: "Earn reward points on every transaction and redeem for travel/shopping.",
    accentColor: "purple"
  },
  {
    id: "credit-card-4",
    title: "Premium Credit Card",
    subtitle: "Elite Benefits & Lifestyle Perks",
    category: "Credit Card",
    buttonText: "Apply Now",
    url: "https://bitli.in/XdYtMjP",
    badge: "VIP Perks",
    rating: "4.9",
    benefits: "Airport lounge, golf access, dining discounts & dedicated concierge.",
    accentColor: "purple"
  }
];
