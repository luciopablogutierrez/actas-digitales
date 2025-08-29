
"use client";

import { Bell, Search, Menu } from "lucide-react";
import Link from "next/link";
import { citizenInitiatives, councilMembers, sessions } from "@/lib/data";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchDialog } from "./search-dialog";

export default function AppHeader() {
  const upcomingSession = sessions.find(s => new Date(s.date) > new Date());
  const newInitiative = citizenInitiatives[0];
  const user = councilMembers[0];

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden">
           <Menu className="h-6 w-6" />
           <span className="sr-only">Abrir menú</span>
        </SidebarTrigger>
      </div>
      
      <div className="hidden sm:flex flex-1 justify-center" id="tour-step-2">
        <div className="w-full max-w-md">
            <SearchDialog>
                <Button variant="outline" className="w-full justify-start text-muted-foreground pl-8 pr-12 text-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <span className="truncate">Buscar expedientes...</span>
                </Button>
            </SearchDialog>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="sm:hidden">
            <SearchDialog>
                <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Buscar</span>
                </Button>
            </SearchDialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Ver notificaciones">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {upcomingSession && (
               <DropdownMenuItem asChild>
                  <Link href={`/sessions/${upcomingSession.id}`} className="block w-full">
                      <p className="font-medium">Convocatoria a {upcomingSession.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(upcomingSession.date).toLocaleString()}</p>
                  </Link>
              </DropdownMenuItem>
            )}
            {newInitiative && (
               <DropdownMenuItem asChild>
                  <Link href="/participation" className="block w-full">
                      <p className="font-medium">Nueva iniciativa: "{newInitiative.title}"</p>
                      <p className="text-xs text-muted-foreground">Propuesta por {newInitiative.proposer}</p>
                  </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Abrir menú de usuario">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatarUrl} alt={`Avatar de ${user.name}`} />
                <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" id="tour-step-4">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/profile">Mi Perfil</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/settings">Configuración</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
