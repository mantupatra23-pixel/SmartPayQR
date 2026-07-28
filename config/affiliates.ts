// config/affiliates.ts
export const AFFILIATES = {
  amazon: "https://amazon.in",
  flipkart: "https://flipkart.com",
  earnkaro: "https://earnkaro.com",
  razorpay: "https://partner.razorpay.com",
  bank: "https://bankkaro.com",
  hosting: "https://vercel.com",
  domain: "https://namecheap.com"
};

export const MONETIZATION_CARDS = [
  {
    id: "credit-card",
    title: "Apply Business Credit Card",
    description: "Get up to ₹1,920 cashback & zero join fee on shop purchases.",
    buttonText: "Apply Now",
    category: "Finance",
    url: AFFILIATES.bank
  },
  {
    id: "pos-machine",
    title: "Need Soundbox / POS Machine?",
    description: "Instant payment audio alerts for your shop counter.",
    buttonText: "Order Machine",
    category: "Hardware",
    url: AFFILIATES.earnkaro
  },
  {
    id: "thermal-printer",
    title: "Buy Thermal Receipt Printer",
    description: "Connect via Bluetooth/USB for instant billing printing.",
    buttonText: "Check Price",
    category: "Store Essentials",
    url: AFFILIATES.amazon
  },
  {
    id: "current-account",
    title: "Open Zero Balance Current Account",
    description: "Instant activation with free debit card and high UPI limits.",
    buttonText: "Open Account",
    category: "Banking",
    url: AFFILIATES.bank
  }
];
