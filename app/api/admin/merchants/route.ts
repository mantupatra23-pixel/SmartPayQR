import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminGuard } from "@/lib/adminAuth";

const prisma = new PrismaClient();

export const GET = adminGuard(async () => {
  try {
    const merchants = await prisma.merchant.findMany({
      select: {
        id: true,
        name: true,
        shopName: true,
        email: true,
        mobile: true,
        category: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            invoices: true,
            products: true,
            payments: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ merchants });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch merchants" }, { status: 500 });
  }
});

export const PATCH = adminGuard(async (req: Request) => {
  try {
    const body = await req.json();
    const { merchantId, status } = body;

    if (!merchantId || !["ACTIVE", "DISABLED", "PENDING"].includes(status)) {
      return NextResponse.json({ error: "Invalid status parameters" }, { status: 400 });
    }

    const updated = await prisma.merchant.update({
      where: { id: merchantId },
      data: { status },
    });

    return NextResponse.json({ success: true, merchant: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update merchant status" }, { status: 500 });
  }
});
