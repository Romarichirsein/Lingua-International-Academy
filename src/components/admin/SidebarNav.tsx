"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  Layers,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Gestion des Cours",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Formateurs",
    href: "/admin/instructors",
    icon: Users,
  },
  {
    title: "Certificats",
    href: "/verify",
    icon: ShieldCheck,
  },
  {
    title: "Étudiants",
    href: "/admin/students",
    icon: Layers,
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-100 p-6">
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu Admin</h2>
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-gray-900 text-white shadow-md" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400")} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
