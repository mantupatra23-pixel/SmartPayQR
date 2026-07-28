import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, shopName, category, mobile, email, password, gstin, referralCode } = body;

    if (!name || !shopName || !category || !mobile || !email || !password) {
      return NextResponse.json({ error: "All required fields must be provided." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanMobile = mobile.replace(/[^0-9]/g, "");

    // Check existing
    const existing = await prisma.merchant.findFirst({
      where: {
        OR: [{ email: cleanEmail }, { mobile: cleanMobile }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A merchant with this email or phone number already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Merchant with Settings & Audit Log in transaction
    const newMerchant = await prisma.$transaction(async (tx) => {
      const merchant = await tx.merchant.create({
        data: {
          name,
          shopName,
          category,
          mobile: cleanMobile,
          email: cleanEmail,
          password: hashedPassword,
          gstin: gstin || null,
          referralCode: referralCode || null,
        },
      });

      await tx.merchantSettings.create({
        data: {
          merchantId: merchant.id,
        },
      });

      await tx.auditLog.create({
        data: {
          merchantId: merchant.id,
          userEmail: merchant.email,
          action: "ACCOUNT_CREATED",
          details: `Registered merchant account for ${shopName}`,
        },
      });

      return merchant;
    });

    return NextResponse.json(
      { message: "Merchant account registered successfully.", merchantId: newMerchant.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error during registration." }, { status: 500 });
  }
}
