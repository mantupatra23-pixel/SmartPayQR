import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getTenantSession } from "@/lib/tenantEngine";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { error, merchantId } = await getTenantSession();

    if (error || !merchantId) {
      return NextResponse.json({
        qrScansToday: 0,
        invoicedRevenue: 0,
        activeCustomers: 0,
        totalPayments: 0,
        todayRevenue: 0,
        recentPayments: []
      });
    }

    // Real database counts under merchantId
    const customerCount = await prisma.customer.count({
      where: { merchantId }
    });

    const payments = await prisma.payment.findMany({
      where: { merchantId, status: "SUCCESS" },
      orderBy: { createdAt: "desc" },
      take: 5
    });

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    const invoices = await prisma.invoice.findMany({
      where: { merchantId, status: "PAID" }
    });

    const invoiceTotal = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

    const qrCount = await prisma.qrPoster.count({
      where: { merchantId }
    });

    return NextResponse.json({
      qrScansToday: qrCount,
      invoicedRevenue: invoiceTotal || totalRevenue,
      activeCustomers: customerCount,
      totalPayments: payments.length,
      todayRevenue: totalRevenue,
      recentPayments: payments
    });
  } catch (err: any) {
    console.error("Dashboard Sync API Error:", err);
    return NextResponse.json({
      qrScansToday: 0,
      invoicedRevenue: 0,
      activeCustomers: 0,
      totalPayments: 0,
      todayRevenue: 0,
      recentPayments: []
    });
  }
}
