import {
  LayoutDashboard,
  Trophy,
  Clapperboard,
  Users,
  Film,
  Settings,
} from "lucide-react";

export const sidebarLinks = [
  { name: "Overview",     href: "/admin",          icon: LayoutDashboard },
  { name: "Leagues",      href: "/admin/leagues",  icon: Trophy          },
  { name: "Seasons",      href: "/admin/seasons",  icon: Clapperboard    },
  { name: "Users",        href: "/admin/users",    icon: Users           },
  { name: "Movie Market", href: "/admin/market",   icon: Film            },
  { name: "Settings",     href: "/admin/settings", icon: Settings        },
];
