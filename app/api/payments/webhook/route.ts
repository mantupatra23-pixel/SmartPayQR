import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyRazorpaySignature } from "@/lib/paymentEngine";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    // 1. Razorpay Webhook Processing
    if (body.event === "payment.captured" || body.event === "payment.authorized") {
      const entity = body.payload.payment.entity;
      const orderId = entity.notes?.receipt || entity.order_id;
      const transactionId = entity.acquirer_data?.rrn || entity.id; // Real Bank RRN / UTR

      const payment = await prisma.payment.findFirst({
        where: {
          OR: [{ orderId }, { gatewayOrderId: entity.order_id }],
        },
      });

      if (!payment) {
        return NextResponse.json({ error: "Payment record not found." }, { status: 404 });
      }

      // Verify Webhook Signature using Merchant's Secret or Env Secret
      const config = await prisma.paymentGatewayConfig.findUnique({
        where: { merchantId: payment.merchantId },
      });
      const secret = config?.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET || process.env.WEBHOOK_SECRET;

      // Update Database Entry to SUCCESS
      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: "SUCCESS",
            transactionId,
            signature: entity.id,
            rawWebhookData: JSON.stringify(body),
          },
        });

        // Auto-Mark Linked Invoice as PAID
        if (payment.invoiceId) {
          await tx.invoice.update({
            where: { id: payment.invoiceId },
            data: { status: "PAID" },
          });
        }

        // Audit Trail
        await tx.auditLog.create({
          data: {
            merchantId: payment.merchantId,
            userEmail: "WEBHOOK_AUTOMATION",
            action: "PAYMENT_RECEIVED",
            details: `Received ₹${payment.amount} via ${payment.gateway}. Ref: ${transactionId}`,
          },
        });
      });

      return NextResponse.json({ status: "SUCCESS_PROCESSED" });
    }

    return NextResponse.json({ status: "EVENT_IGNORED" });
  } catch (error: any) {
    console.error("Webhook Execution Failure:", error);
    return NextResponse.json({ error: "Webhook Processing Failed" }, { status: 500 });
  }
}
