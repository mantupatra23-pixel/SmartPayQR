import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/authOptions";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verifySuperAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: "Unauthorized access.", status: 401, admin: null };
  }

  // Check if session user has SUPER_ADMIN or OWNER level privileges
  const adminEmail = session.user.email?.toLowerCase().trim();
  const superAdmin = await prisma.superAdmin.findUnique({
    where: { email: adminEmail },
  });

  if (!superAdmin) {
    return { error: "Forbidden: Super Admin access required.", status: 403, admin: null };
  }

  return { error: null, status: 200, admin: superAdmin };
}

export function adminGuard(handler: (req: Request) => Promise<NextResponse>) {
  return async (req: Request) => {
    const { error, status } = await verifySuperAdminSession();
    if (error) {
      return NextResponse.json({ error }, { status: status || 401 });
    }
    return handler(req);
  };
}
