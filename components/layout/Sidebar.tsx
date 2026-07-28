"use client";

import React from "react";
import { 
  Home, QrCode, Receipt, Wand2, Image as ImageIcon, Bot, 
  Calculator, BarChart3, Users, LayoutDashboard, Settings, 
  HelpCircle, ChevronLeft, ChevronRight, X, Store
} from "lucide-react";
import { NavigationTab } from "@/types/suite";

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const menuItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'poster-studio' as NavigationTab, label: 'QR Poster Studio', icon: <QrCode className="w-4 h-4" /> },
    { id: 'invoice-writer' as NavigationTab, label: 'AI Invoice Studio', icon: <Receipt className="w-4 h-4" /> },
    { id: 'marketing-hub' as NavigationTab, label: 'Groq AI Merchant', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'poster-generator' as NavigationTab, label: 'AI Poster Generator', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'business-assistant' as NavigationTab, label: 'Business Assistant', icon: <Bot className="w-4 h-4" /> },
    { id: 'merchant-toolbox' as NavigationTab, label: 'Merchant Toolbox', icon: <Calculator className="w-4 h-4" /> },
    { id: 'qr-analytics' as NavigationTab, label: 'QR Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'customer-management' as NavigationTab, label: 'Customer Management', icon: <Users className="w-4 h-4" /> },
    { id: 'marketplace' as NavigationTab, label: 'Marketplace', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'business-profile' as NavigationTab, label: 'Business Profile', icon: <Store className="w-4 h-4" /> },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'help-support' as NavigationTab, label: 'Help & Support', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleSelect = (id: NavigationTab) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between
        ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
        {/* Header Branding */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 p-2 rounded-xl text-white shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              {(!collapsed || mobileOpen) && (
                <div className="truncate">
                  <h1 className="font-extrabold text-base text-slate-900 leading-none">SmartPay <span className="text-emerald-600">AI</span></h1>
                  <p className="text-[10px] text-slate-400 font-medium">Merchant OS</p>
                </div>
              )}
            </div>

            {/* Mobile Close Button */}
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {menuItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  title={item.label}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200
                    ${active ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}
                    ${collapsed && !mobileOpen ? 'justify-center' : 'justify-start'}
                  `}
                >
                  <span className={`shrink-0 ${active ? 'text-emerald-400' : 'text-slate-500'}`}>{item.icon}</span>
                  {(!collapsed || mobileOpen) && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="p-3 border-t border-slate-100 hidden lg:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold transition"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
