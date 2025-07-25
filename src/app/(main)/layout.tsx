import type { ReactNode } from "react";
import AppHeader from "@/components/app-header";
import { AppSidebarContent } from "@/components/app-sidebar-content";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebarContent />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
