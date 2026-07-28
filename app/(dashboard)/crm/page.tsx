"use client";
import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { CRMStudio } from "@/components/crm/CRMStudio";

export default function CRMPage() {
  return (
    <SidebarLayout>
      <CRMStudio />
    </SidebarLayout>
  );
}
