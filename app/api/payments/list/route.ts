import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getTenantSession } from "@/lib/tenantEngine";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { error, merchantId } = await getTenantSession();

    if (error || !merchantId) {
      return NextResponse.json({ payments: [] });
    }

    const payments = await prisma.payment.findMany({
      where: { merchantId },
      orderBy: { createdAt: "desc" },
      take: 20
    });

    return NextResponse.json({ payments });
  } catch (err) {
    return NextResponse.json({ payments: [] });
  }
}
