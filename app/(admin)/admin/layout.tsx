"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { sidebarLinks } from "@/components/admin/admin-links";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const activeLink = sidebarLinks.find((link) =>
    link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href)
  );

  return (
    <div className="flex w-full h-[100dvh] bg-background font-ui text-foreground overflow-hidden">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminHeader onMenuOpen={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 lg:p-8 cinematic-scrollbar">
          <div className="mx-auto max-w-7xl">

            {/* Page heading */}
            <div className="mb-8 animate-in fade-in duration-500">
              <h1 className="text-3xl lg:text-4xl font-display font-bold tracking-wide capitalize">
                {activeLink?.name ?? "Dashboard"}
              </h1>
              <div className="signature-divider mt-4" />
            </div>

            {/* Page content */}
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out fill-mode-both delay-100">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
