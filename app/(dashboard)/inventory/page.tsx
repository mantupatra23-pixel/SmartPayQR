"use client";
import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { InventoryStudio } from "@/components/inventory/InventoryStudio";

export default function InventoryPage() {
  return (
    <SidebarLayout>
      <InventoryStudio />
    </SidebarLayout>
  );
}
