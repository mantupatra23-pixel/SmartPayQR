import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SmartPay QR - Free UPI QR & Poster Generator',
  description: 'Create professional UPI QR codes and printable payment posters for your shop for free.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
