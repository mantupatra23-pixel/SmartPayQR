export interface SeoPageData {
  slug: string;
  niche: string;
  city: string;
  title: string;
  description: string;
  defaultShopName: string;
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "chai-stall-mumbai",
    niche: "Chai & Tea Stall",
    city: "Mumbai",
    title: "Free UPI QR Standee Generator for Chai & Cafe in Mumbai",
    description: "Generate and print custom UPI payment standees with QR code for tea stalls and cafes in Mumbai. 100% free PDF download.",
    defaultShopName: "Mumbai Chai Corner",
  },
  {
    slug: "salon-beauty-delhi",
    niche: "Salon & Spa",
    city: "Delhi",
    title: "Instant UPI QR Code Poster Maker for Salons in Delhi",
    description: "Create branded salon payment posters and UPI QR cards in Delhi. Supports GPay, PhonePe, and Paytm.",
    defaultShopName: "Glamour Salon Delhi",
  },
  {
    slug: "restaurant-menu-bangalore",
    niche: "Restaurant & Bakery",
    city: "Bangalore",
    title: "Restaurant Table QR & UPI Standee Maker in Bangalore",
    description: "Instant table payment QR generator for restaurants, bakeries, and cloud kitchens in Bangalore.",
    defaultShopName: "Bengaluru Bites",
  },
  {
    slug: "doctor-clinic-kolkata",
    niche: "Clinic & Pharmacy",
    city: "Kolkata",
    title: "Doctor Clinic & Medical Store UPI QR Generator Kolkata",
    description: "Print professional UPI fee collection posters for doctors and medical clinics in Kolkata.",
    defaultShopName: "Care Clinic Kolkata",
  },
  {
    slug: "retail-shop-hyderabad",
    niche: "Kirana & Grocery Store",
    city: "Hyderabad",
    title: "Kirana Store UPI Standee & Counter Soundbox App Hyderabad",
    description: "Print-ready retail grocery store payment posters and counter soundbox alerts in Hyderabad.",
    defaultShopName: "Hyderabad Super Mart",
  },
  {
    slug: "freelancer-invoice-pune",
    niche: "Freelancer & Agency",
    city: "Pune",
    title: "Freelance Client Payment Link & UPI QR Generator Pune",
    description: "Generate customized invoice payment QRs and WhatsApp bills for freelancers in Pune.",
    defaultShopName: "Studio Pune Creative",
  },
];
