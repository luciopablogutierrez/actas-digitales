
"use client";

import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { citizenInitiatives, sessions } from "@/lib/data";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchDialog } from "./search-dialog";

export default function AppHeader() {
  const upcomingSession = sessions.find(s => new Date(s.date) > new Date());
  const newInitiative = citizenInitiatives[0];

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/60 px-6 backdrop-blur-sm">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-2xl font-headline"></h1>
      </div>
      <div className="relative flex-1 md:grow-0">
        <SearchDialog>
            <Button variant="outline" className="w-full justify-start text-muted-foreground pl-8 md:w-[200px] lg:w-[336px]">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                Buscar expedientes...
            </Button>
        </SearchDialog>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {upcomingSession && (
             <DropdownMenuItem>
                <Link href={`/sessions/${upcomingSession.id}`} className="block">
                    <p className="font-medium">Convocatoria a {upcomingSession.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(upcomingSession.date).toLocaleString()}</p>
                </Link>
            </DropdownMenuItem>
          )}
          {newInitiative && (
             <DropdownMenuItem>
                <Link href="/participation" className="block">
                    <p className="font-medium">Nueva iniciativa: "{newInitiative.title}"</p>
                    <p className="text-xs text-muted-foreground">Propuesta por {newInitiative.proposer}</p>
                </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/100x100" alt="Avatar" data-ai-hint="person face" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link href="/profile">Mi Perfil</Link></DropdownMenuItem>
          <DropdownMenuItem>Configuración</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
