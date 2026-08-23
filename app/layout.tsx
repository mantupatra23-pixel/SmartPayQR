import type { Metadata } from "next";
import "./globals.css";
import "./print.css";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "SmartPayQR - Free Digital Payment Counter Kit for Indian Merchants",
  description: "Create instant print-ready UPI payment standees, voice payment announcements, and WhatsApp bills without any login.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f4f6f8] text-[#152935] antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
