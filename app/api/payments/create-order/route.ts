import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { tenantGuard } from "@/lib/tenantEngine";

const prisma = new PrismaClient();

export const POST = tenantGuard(async (req: Request, merchantId: string) => {
  try {
    const body = await req.json();
    const { amount, gateway, customerName, customerMobile, invoiceId } = body;

    if (!amount || amount <= 0 || !gateway) {
      return NextResponse.json({ error: "Invalid payment request parameters." }, { status: 400 });
    }

    const orderId = `ORD_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    // Create PENDING Payment in DB under merchantId
    const payment = await prisma.payment.create({
      data: {
        merchantId,
        orderId,
        gateway,
        amount: Number(amount),
        customerName: customerName || null,
        customerMobile: customerMobile || null,
        invoiceId: invoiceId || null,
        status: "PENDING",
      },
    });

    // Check Merchant's Gateway Keys
    const gatewayConfig = await prisma.paymentGatewayConfig.findUnique({
      where: { merchantId },
    });

    let gatewayResponseData: any = {};

    if (gateway === "RAZORPAY") {
      const keyId = gatewayConfig?.razorpayKeyId || process.env.RAZORPAY_KEY_ID;
      const keySecret = gatewayConfig?.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET;

      if (!keyId || !keySecret) {
        return NextResponse.json({ error: "Razorpay API credentials not configured." }, { status: 400 });
      }

      // Initialize Real Razorpay Order
      const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // in paise
          currency: "INR",
          receipt: orderId,
        }),
      });

      const rzpOrder = await rzpRes.json();
      if (!rzpRes.ok) throw new Error(rzpOrder.error?.description || "Razorpay API Error");

      await prisma.payment.update({
        where: { id: payment.id },
        data: { gatewayOrderId: rzpOrder.id },
      });

      gatewayResponseData = { razorpayOrderId: rzpOrder.id, keyId };
    }

    return NextResponse.json({
      success: true,
      orderId,
      paymentId: payment.id,
      amount,
      gatewayResponseData,
    });
  } catch (error: any) {
    console.error("Payment Order Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create payment order." }, { status: 500 });
  }
});
