import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  providers: [
    CredentialsProvider({
      name: "Merchant Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.");
        }

        const merchant = await prisma.merchant.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!merchant) {
          throw new Error("No merchant account found with this email.");
        }

        if (merchant.status === "DISABLED") {
          throw new Error("Your merchant account has been disabled. Contact support.");
        }

        const isValid = await bcrypt.compare(credentials.password, merchant.password);
        if (!isValid) {
          throw new Error("Invalid email or password.");
        }

        // Log session in Audit
        await prisma.auditLog.create({
          data: {
            merchantId: merchant.id,
            userEmail: merchant.email,
            action: "MERCHANT_LOGIN",
            details: "Logged in via NextAuth Credentials",
          },
        });

        return {
          id: merchant.id,
          email: merchant.email,
          name: merchant.name,
          shopName: merchant.shopName,
          category: merchant.category,
          upiId: merchant.upiId || "",
          role: "OWNER",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.merchantId = user.id;
        token.shopName = (user as any).shopName;
        token.category = (user as any).category;
        token.upiId = (user as any).upiId;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).merchantId = token.merchantId;
        (session.user as any).shopName = token.shopName;
        (session.user as any).category = token.category;
        (session.user as any).upiId = token.upiId;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "SMARTPAY_SUPER_SECRET_PRODUCTION_KEY",
};
