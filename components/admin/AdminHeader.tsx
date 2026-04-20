"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { sidebarLinks } from "./admin-links";

interface AdminHeaderProps {
  onMenuOpen: () => void;
}

export default function AdminHeader({ onMenuOpen }: AdminHeaderProps) {
  const pathname = usePathname();

  const activeLink = sidebarLinks.find((link) =>
    link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href)
  );

  return (
    <header className="flex-shrink-0 flex items-center justify-between h-16 px-4 lg:px-8 border-b border-outline bg-surface/80 backdrop-blur-md z-10">
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMenuOpen}
          aria-label="Open menu"
          className="p-2 -ml-2 text-foreground hover:text-primary transition-colors lg:hidden rounded-sm hover:bg-surface-container-high"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest"
        >
          <Link href="/admin" className="hover:text-primary transition-colors">
            Admin
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{activeLink?.name ?? "Dashboard"}</span>
        </nav>
      </div>
    </header>
  );
}
