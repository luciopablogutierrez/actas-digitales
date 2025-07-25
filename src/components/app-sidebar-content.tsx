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
import { LayoutDashboard, Users, FileText, User, Settings } from 'lucide-react';

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/sessions", icon: FileText, label: "Sesiones" },
  { href: "/participation", icon: Users, label: "Participación" },
  { href: "/profile", icon: User, label: "Mi Perfil" },
];

export function AppSidebarContent() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <svg
            className="h-8 w-8 text-primary"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="48" fill="currentColor" />
            <path
              d="M61.59 74L74 26H60.44L52.88 57.08H52.76L45.2 26H31.64L44.04 74H61.59ZM52.76 63.8C52.76 65.48 51.44 66.8 49.8 66.8C48.16 66.8 46.84 65.48 46.84 63.8C46.84 62.12 48.16 60.8 49.8 60.8C51.44 60.8 52.76 62.12 52.76 63.8ZM38.6 63.8C38.6 65.48 37.28 66.8 35.64 66.8C34 66.8 32.68 65.48 32.68 63.8C32.68 62.12 34 60.8 35.64 60.8C37.28 60.8 38.6 62.12 38.6 63.8Z"
              fill="white"
            />
          </svg>
          <span className="font-headline text-xl font-semibold group-data-[state=collapsed]:hidden">{open && "Actas Digitales"}</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
             <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
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
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full justify-start" tooltip={{children: "Configuración", side: "right", align: "center"}}>
              <Link href="#">
                <Settings className="size-4" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
