import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SmartOfferModal } from "@/components/monetization/SmartOfferModal";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "SmartPay AI OS - India's All-in-One Merchant Operating System",
  description: "Free NPCI UPI Payment QR Posters, AI GST Invoicing, Groq Marketing Suite, and Merchant Loans for Indian Small Businesses.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SmartPay OS",
  },
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
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
