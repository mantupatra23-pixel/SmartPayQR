import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateMerchantBackupPayload = async (merchantId: string) => {
  const [merchant, products, customers, invoices, suppliers, settings] = await Promise.all([
    prisma.merchant.findUnique({
      where: { id: merchantId },
      select: { id: true, name: true, shopName: true, email: true, mobile: true, category: true, gstin: true, upiId: true },
    }),
    prisma.product.findMany({ where: { merchantId } }),
    prisma.customer.findMany({ where: { merchantId } }),
    prisma.invoice.findMany({ where: { merchantId } }),
    prisma.supplier.findMany({ where: { merchantId } }),
    prisma.merchantSettings.findUnique({ where: { merchantId } }),
  ]);

  const backupObject = {
    metadata: {
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      merchantId,
      merchantName: merchant?.shopName,
    },
    merchant,
    products,
    customers,
    invoices,
    suppliers,
    settings,
  };

  return JSON.stringify(backupObject, null, 2);
};
