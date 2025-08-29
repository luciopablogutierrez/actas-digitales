
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar';
import { LayoutDashboard, Users, FileText, User, Settings, ShieldCheck } from 'lucide-react';

const navItems = [
  { id: "nav-dashboard", href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "nav-sessions", href: "/sessions", icon: FileText, label: "Sesiones" },
  { id: "nav-participation", href: "/participation", icon: Users, label: "Participación" },
  { id: "nav-profile", href: "/profile", icon: User, label: "Mi Perfil" },
  { id: "nav-settings", href: "/settings", icon: Settings, label: "Configuración" },
];

export function AppSidebarContent() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <>
      <SidebarHeader className="p-4" id="tour-step-1">
        <Link href="/dashboard" className="flex items-center gap-3">
          <svg
            className="h-8 w-8 text-primary"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 0C22.38 0 0 22.38 0 50C0 77.62 22.38 100 50 100C77.62 100 100 77.62 100 50C100 22.38 77.62 0 50 0ZM61.59 74L74 26H60.44L52.88 57.08H52.76L45.2 26H31.64L44.04 74H61.59Z"
              fill="currentColor"
            />
          </svg>
          <span className="font-headline text-xl font-semibold group-data-[state=collapsed]:hidden">{open && "Actas Digitales"}</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
             <SidebarMenuItem key={item.href} id={item.id}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  className="w-full justify-start"
                  tooltip={{children: item.label, side: "right", align: "center"}}
                >
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto">
        <div className="text-center text-xs text-muted-foreground p-4 group-data-[state=collapsed]:hidden">
          <p>copyright by GUTI (Areco Puede)</p>
        </div>
      </SidebarFooter>
    </>
  )
}
