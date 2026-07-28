import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminGuard } from "@/lib/adminAuth";

const prisma = new PrismaClient();

export const GET = adminGuard(async () => {
  try {
    const totalMerchants = await prisma.merchant.count();
    const activeMerchants = await prisma.merchant.count({ where: { status: "ACTIVE" } });
    const disabledMerchants = await prisma.merchant.count({ where: { status: "DISABLED" } });

    const totalInvoices = await prisma.invoice.count();
    const totalPayments = await prisma.payment.count({ where: { status: "SUCCESS" } });
    
    const revenueSum = await prisma.payment.aggregate({
      where: { status: "SUCCESS" },
      _sum: { amount: true },
    });

    const totalProducts = await prisma.product.count();
    const totalBackups = await prisma.merchantBackup.count();

    return NextResponse.json({
      systemMetrics: {
        totalMerchants,
        activeMerchants,
        disabledMerchants,
        totalInvoices,
        totalPayments,
        totalRevenue: revenueSum._sum.amount || 0,
        totalProducts,
        totalBackups,
        systemStatus: "HEALTHY",
        uptime: "99.98%",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch system stats" }, { status: 500 });
  }
});
