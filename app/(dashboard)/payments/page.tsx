"use client";
import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { PaymentStudio } from "@/components/payments/PaymentStudio";

export default function PaymentsPage() {
  return (
    <SidebarLayout>
      <PaymentStudio merchantName="SmartPay Merchant" upiId="merchant@upi" />
    </SidebarLayout>
  );
}
