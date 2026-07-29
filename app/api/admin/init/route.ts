import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash("AdminSecret@123", 10);
    const admin = await prisma.superAdmin.upsert({
      where: { email: "mantupatra23@gmail.com" },
      update: {
        password: hashedPassword,
      },
      create: {
        email: "mantupatra23@gmail.com",
        name: "Mantu Patra (Super Admin)",
        password: hashedPassword,
        role: "SUPER_ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Super Admin created and synced in Supabase database!",
      adminEmail: admin.email,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to initialize admin" }, { status: 500 });
  }
}
