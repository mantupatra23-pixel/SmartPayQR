import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'SmartPay QR | Free Professional UPI QR Poster Studio',
  description: 'Generate high-resolution printable UPI payment QR posters for your business instantly. 100% free with support for Google Pay, PhonePe, Paytm, and BHIM.',
  keywords: ['UPI QR Code Generator', 'Printable Payment Poster', 'Merchant QR Builder', 'SmartPay QR'],
  openGraph: {
    title: 'SmartPay QR - Free Printable UPI QR Generator',
    description: 'Create professional UPI QR posters for your dukan/store in seconds.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-gradient-to-br from-slate-50 via-slate-100/50 to-emerald-50/40 min-h-screen text-slate-800">
        {children}
      </body>
    </html>
  );
}
