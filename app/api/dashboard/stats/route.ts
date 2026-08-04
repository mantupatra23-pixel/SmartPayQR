import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({
      qrScansToday: 1420,
      invoicedRevenue: 84500,
      activeCustomers: 248,
      loanOfferLimit: 500000,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
