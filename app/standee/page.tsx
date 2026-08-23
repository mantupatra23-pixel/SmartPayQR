"use client";

import React, { useState, useRef } from "react";
import { useMerchant } from "@/hooks/useMerchant";
import { STANDEE_THEMES } from "@/lib/themes";
import { StandeeTheme } from "@/types";
import { QRGenerator } from "@/components/qr/QRGenerator";
import { QRPreview } from "@/components/qr/QRPreview";
import { ExportControls } from "@/components/qr/ExportControls";
import { exportStandeeAsPng, exportStandeeAsPdf, triggerPrintDialog } from "@/lib/exportEngine";
import { useToast } from "@/components/ui/Toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileDock } from "@/components/layout/MobileDock";
import { MerchantModal } from "@/components/merchant/MerchantModal";

export default function StandeePage() {
  const { profile, saveProfile, resetProfile, isLoaded } = useMerchant();
  const { showToast } = useToast();
  const [amount, setAmount] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<StandeeTheme>(STANDEE_THEMES[0]);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const standeeRef = useRef<HTMLDivElement>(null);

  if (!isLoaded) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoUrl(event.target?.result as string);
        showToast("Shop logo uploaded successfully", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#152935] flex flex-col justify-between">
      <div>
        <Header profile={profile} onEditProfile={() => setIsModalOpen(true)} />
        
        <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-black">UPI QR Standee Studio</h1>
            <p className="text-xs text-zinc-500">Design, customize and print high-resolution payment QR stands.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <QRGenerator
                profile={profile}
                onUpdateProfile={saveProfile}
                amount={amount}
                setAmount={setAmount}
                selectedTheme={selectedTheme}
                onSelectTheme={setSelectedTheme}
                onLogoUpload={handleLogoUpload}
                logoUrl={logoUrl}
                onRemoveLogo={() => setLogoUrl(undefined)}
              />
            </div>

            <div className="lg:col-span-5 flex flex-col items-center space-y-4 lg:sticky lg:top-20">
              <QRPreview
                ref={standeeRef}
                profile={profile}
                amount={amount}
                theme={selectedTheme}
                logoUrl={logoUrl}
                copied={copied}
                onCopyUpi={() => {
                  navigator.clipboard.writeText(profile.upiId);
                  setCopied(true);
                  showToast("UPI ID copied to clipboard", "success");
                  setTimeout(() => setCopied(false), 2000);
                }}
              />

              <ExportControls
                isExporting={isExporting}
                onExportPng={async () => {
                  if (!standeeRef.current) return;
                  setIsExporting(true);
                  await exportStandeeAsPng(standeeRef.current, profile.businessName);
                  setIsExporting(false);
                  showToast("PNG standee downloaded", "success");
                }}
                onExportPdfA4={async () => {
                  if (!standeeRef.current) return;
                  setIsExporting(true);
                  await exportStandeeAsPdf(standeeRef.current, profile.businessName, "a4");
                  setIsExporting(false);
                  showToast("A4 Print PDF generated", "success");
                }}
                onExportPdfA5={async () => {
                  if (!standeeRef.current) return;
                  setIsExporting(true);
                  await exportStandeeAsPdf(standeeRef.current, profile.businessName, "a5");
                  setIsExporting(false);
                  showToast("A5 Print PDF generated", "success");
                }}
                onPrint={() => triggerPrintDialog()}
                onShare={() => {
                  if (navigator.share) {
                    navigator.share({ title: profile.businessName, text: `Pay via UPI: ${profile.upiId}`, url: window.location.href });
                  } else {
                    showToast("Share API not supported", "error");
                  }
                }}
              />
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <MerchantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} profile={profile} onSave={saveProfile} onReset={resetProfile} />
    </div>
  );
}
