"use client";

import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { BackupStudio } from "@/components/backup/BackupStudio";

export default function BackupPage() {
  return (
    <SidebarLayout>
      <BackupStudio />
    </SidebarLayout>
  );
}
