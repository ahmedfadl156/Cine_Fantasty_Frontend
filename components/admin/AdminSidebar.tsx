"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, LogOut, ShieldCheck, X } from "lucide-react";
import { sidebarLinks } from "./admin-links";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col
          border-r border-outline bg-surface
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex-shrink-0 flex items-center justify-between h-16 px-6 border-b border-outline bg-surface-container-low">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-[2px]">
              <Film className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-widest uppercase font-display">
              CineAdmin
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1 lg:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Admin identity  */}
        <div className="px-6 py-5 border-b border-outline/50 bg-surface-container-lowest flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 border border-outline bg-surface-bright font-display font-bold select-none">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-on-surface">System Admin</span>
            <span className="text-xs text-primary flex items-center gap-1 font-mono uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3" />
              Root Access
            </span>
          </div>
        </div>

        {/*  Navigation  */}
        <nav className="flex-1 py-6 px-4 overflow-y-auto cinematic-scrollbar flex flex-col gap-1.5">
          <p className="px-3 mb-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Main Menu
          </p>

          {sidebarLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`
                  relative flex items-center gap-3 px-3 py-2.5
                  transition-all duration-300 group overflow-hidden
                  ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-container-low"
                  }
                `}
              >
                {/* Left active indicator */}
                {isActive && (
                  <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-primary rounded-r-[2px]" />
                )}

                <Icon
                  className={`h-4 w-4 z-10 ${
                    isActive
                      ? "text-primary"
                      : "group-hover:text-primary transition-colors"
                  }`}
                />
                <span className="z-10 text-[15px]">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/*  Footer  */}
        <div className="p-4 border-t border-outline bg-surface-container-lowest">
          <Link href="/">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-outline bg-transparent text-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-300 cursor-pointer text-sm font-medium uppercase tracking-wider font-mono"
            >
              <LogOut className="w-4 h-4" />
              Exit Admin
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
}
