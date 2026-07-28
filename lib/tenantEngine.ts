import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/authOptions";
import { NextResponse } from "next/server";

export async function getTenantSession() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !(session.user as any).merchantId) {
    return { error: "Unauthorized access.", status: 401, merchantId: null, session: null };
  }

  return {
    error: null,
    status: 200,
    merchantId: (session.user as any).merchantId as string,
    session,
  };
}

export function tenantGuard(handler: (req: Request, tenantId: string) => Promise<NextResponse>) {
  return async (req: Request) => {
    const { error, status, merchantId } = await getTenantSession();
    if (error || !merchantId) {
      return NextResponse.json({ error: error || "Unauthorized" }, { status: status || 401 });
    }
    return handler(req, merchantId);
  };
}
