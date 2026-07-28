"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { 
  Home, CreditCard, FileText, Package, Users, Bot, Megaphone, 
  BarChart3, ShoppingBag, Store, Calculator, Cloud, Settings, 
  User, HelpCircle, LogOut, ChevronLeft, ChevronRight, Menu, X, 
  Search, ShieldCheck, Sparkles, Bell
} from "lucide-react";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const merchantName = (session?.user as any)?.shopName || session?.user?.name || "SmartPay Merchant";
  const userRole = (session?.user as any)?.role || "OWNER";

  const menuGroups = [
    {
      title: "CORE",
      items: [
        { label: "Dashboard", href: "/", icon: Home },
      ]
    },
    {
      title: "PAYMENTS & BILLING",
      items: [
        { label: "Payments & UPI", href: "/payments", icon: CreditCard },
        { label: "GST Billing", href: "/billing", icon: FileText },
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { label: "Inventory & Stock", href: "/inventory", icon: Package },
        { label: "CRM & Ledger", href: "/crm", icon: Users },
      ]
    },
    {
      title: "AI & MARKETING",
      items: [
        { label: "AI Suite", href: "/ai-suite", icon: Bot },
        { label: "Marketing Hub", href: "/marketing", icon: Megaphone },
      ]
    },
    {
      title: "BUSINESS SUITE",
      items: [
        { label: "Analytics", href: "/analytics", icon: BarChart3 },
        { label: "Marketplace & Loans", href: "/marketplace", icon: ShoppingBag },
        { label: "Online Store", href: "/store", icon: Store },
        { label: "Calculators", href: "/calculators", icon: Calculator },
        { label: "Cloud Backup", href: "/backup", icon: Cloud },
      ]
    },
    {
      title: "SETTINGS & ACCOUNT",
      items: [
        { label: "Settings", href: "/settings", icon: Settings },
        { label: "My Profile", href: "/profile", icon: User },
        { label: "Help & Support", href: "/help", icon: HelpCircle },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900 font-sans">
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* LEFT COLLAPSIBLE SIDEBAR */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen bg-slate-900 text-white border-r border-slate-800
        flex flex-col justify-between transition-all duration-300 shadow-2xl
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Sidebar Header Logo */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500 text-slate-950 font-black rounded-2xl text-base shadow-lg shadow-emerald-500/20">
              SP
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-1">
                  SmartPay <span className="text-emerald-400">AI OS</span>
                </h1>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Merchant Edition</span>
              </div>
            )}
          </div>

          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search */}
        {!collapsed && (
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input 
                type="text" 
                placeholder="Search tools, billing..." 
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-800/80 text-white rounded-xl outline-none focus:ring-1 focus:ring-emerald-500 font-medium placeholder:text-slate-500"
              />
            </div>
          </div>
        )}

        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-semibold scrollbar-thin">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <span className="text-[9px] font-black text-slate-500 px-3 uppercase tracking-wider block">
                  {group.title}
                </span>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                      ${isActive 
                        ? "bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/30" 
                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      }
                      ${collapsed ? "justify-center" : ""}
                    `}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer User Info & Logout */}
        <div className="p-3 border-t border-slate-800 shrink-0 space-y-2 bg-slate-950/50">
          {!collapsed && (
            <div className="flex items-center gap-2.5 p-2 bg-slate-800/50 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center font-bold text-emerald-400 text-xs">
                {merchantName.charAt(0).toUpperCase()}
              </div>
              <div className="truncate flex-1">
                <p className="text-xs font-black text-white truncate">{merchantName}</p>
                <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">{userRole}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={`
              w-full flex items-center gap-3 px-3 py-2 text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 rounded-xl transition text-xs font-bold
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>

            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> NPCI Verified Merchant
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 bg-rose-500 rounded-full absolute top-1.5 right-1.5" />
            </button>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                {merchantName.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-black text-slate-800 hidden sm:inline-block">
                {merchantName}
              </span>
            </div>
          </div>
        </header>

        {/* Page Body Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
