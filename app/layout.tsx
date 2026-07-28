import React from "react";
import "@/app/globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata = {
  title: "SmartPay AI OS - Merchant Operating System",
  description: "Complete AI OS for Indian Merchants with UPI, GST Billing, Inventory, and CRM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-100 text-slate-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
