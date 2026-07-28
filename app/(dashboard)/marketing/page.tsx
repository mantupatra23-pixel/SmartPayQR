"use client";
import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { AIMarketingHub } from "@/components/marketing/AIMarketingHub";

export default function MarketingPage() {
  return (
    <SidebarLayout>
      <AIMarketingHub />
    </SidebarLayout>
  );
}
