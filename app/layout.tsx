import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SmartOfferModal } from "@/components/monetization/SmartOfferModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartPay AI OS - India's All-in-One Merchant Operating System",
  description: "Free NPCI UPI Payment QR Posters, AI GST Invoicing, Groq Marketing Suite, and Merchant Loans for Indian Small Businesses.",
  keywords: "SmartPay, UPI QR Poster, GST Billing, Merchant OS, Free Invoice Generator, Business Loan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        {children}
        <SmartOfferModal />
      </body>
    </html>
  );
}
