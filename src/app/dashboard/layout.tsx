"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mic,
  Users,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Shield,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Verslagen", href: "/dashboard/verslagen", icon: FileText },
  { label: "Patiënten", href: "/dashboard/patienten", icon: Users },
  { label: "Instellingen", href: "/dashboard/instellingen", icon: Settings },
];

const bottomLinks = [
  { label: "Help", href: "/dashboard/help", icon: HelpCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#faf6f0]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-[240px] flex-col border-r border-[#772d07]/10 bg-[#772d07]">
        {/* Logo */}
        <div className="flex h-[72px] items-center gap-3 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
            <Mic className="h-5 w-5 text-white" />
          </div>
          <Link
            href="/"
            className="text-[20px] font-semibold text-white"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            ZorgNotitie
          </Link>
        </div>

        {/* Nav links */}
        <nav className="mt-4 flex-1 space-y-1 px-3">
          {sidebarLinks.map((link) => {
            const isActive = link.href === "/dashboard" 
              ? pathname === "/dashboard" 
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom links */}
        <div className="space-y-1 border-t border-white/10 px-3 py-4">
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          ))}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <LogOut className="h-5 w-5" />
            Terug naar site
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="ml-[240px] flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200/60 bg-white/80 px-8 backdrop-blur-md">
          <h1
            className="text-[20px] font-semibold text-slate-900"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Welkom terug, Dr. Janssen
          </h1>

          <div className="flex items-center gap-4">
            {/* Security badge */}
            <div className="flex items-center gap-2 rounded-full bg-[#faf6f0] px-4 py-2">
              <Shield className="h-4 w-4 text-[#772d07]" />
              <span
                className="text-[12px] font-medium text-[#772d07]"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Beveiligd: Data binnen de EU
              </span>
            </div>

            {/* Notifications */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#faf6f0] transition-colors hover:bg-[#772d07]/10">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#772d07]" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-[#772d07]/10">
                <div className="flex h-full w-full items-center justify-center text-[14px] font-semibold text-[#772d07]">
                  DJ
                </div>
              </div>
              <span
                className="text-[14px] font-semibold text-slate-900"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Dr. Janssen
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
