import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { tenantGuard } from "@/lib/tenantEngine";
import { generateMerchantBackupPayload } from "@/lib/backupEngine";

const prisma = new PrismaClient();

export const GET = tenantGuard(async (req: Request, merchantId: string) => {
  try {
    const backups = await prisma.merchantBackup.findMany({
      where: { merchantId },
      select: {
        id: true,
        filename: true,
        format: true,
        sizeInBytes: true,
        version: true,
        status: true,
        note: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ backups });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to list backups" }, { status: 500 });
  }
});

export const POST = tenantGuard(async (req: Request, merchantId: string) => {
  try {
    const body = await req.json();
    const { note, format = "JSON" } = body;

    const payloadString = await generateMerchantBackupPayload(merchantId);
    const sizeInBytes = Buffer.byteLength(payloadString, "utf8");
    const filename = `backup_${merchantId.substring(0, 6)}_${new Date().toISOString().replace(/[:.]/g, "-")}.json`;

    const newBackup = await prisma.merchantBackup.create({
      data: {
        merchantId,
        filename,
        format,
        sizeInBytes,
        status: "COMPLETED",
        note: note || "Manual Cloud Snapshot",
        backupData: payloadString,
      },
    });

    return NextResponse.json({ success: true, backup: newBackup });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create cloud backup" }, { status: 500 });
  }
});
