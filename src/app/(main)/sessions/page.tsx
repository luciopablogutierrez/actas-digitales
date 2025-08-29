
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sessions } from "@/lib/data";
import Link from "next/link";
import { PlusCircle, FileUp, X } from "lucide-react";
import { SessionMinuteGeneratorDialog } from "@/components/session-minute-generator-dialog";
import type { Session } from "@/lib/types";

type SessionStatus = 'Confirmada' | 'Pendiente' | 'Cancelada';
const filterOptions: SessionStatus[] = ['Confirmada', 'Pendiente', 'Cancelada'];


export default function SessionsPage() {
  const [filter, setFilter] = useState<SessionStatus | null>(null);

  const filteredSessions = sessions.filter(session => !filter || session.status === filter);


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-headline">Sesiones</CardTitle>
            <CardDescription>
              Gestiona y revisa las sesiones del concejo.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Programar Sesión
          </Button>
        </div>
      </CardHeader>
      <CardContent>
         <div className="flex flex-wrap items-center gap-2 mb-4">
              <Button
                variant={!filter ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(null)}
                className="flex items-center gap-2"
              >
                Todas
              </Button>
              {filterOptions.map(option => (
                <Button
                  key={option}
                  variant={filter === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(option)}
                >
                  {option}
                </Button>
              ))}
               {filter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpiar
                </Button>
              )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="hidden sm:table-cell">Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSessions.map((session: Session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">
                  <Link href={`/sessions/${session.id}`} className="hover:underline">
                    {session.title}
                  </Link>
                   <div className="text-sm text-muted-foreground md:hidden mt-1">
                     {new Date(session.date).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}
                   </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(session.date).toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' })}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant={
                      session.status === "Confirmada"
                        ? "success"
                        : session.status === "Cancelada"
                        ? "destructive"
                        : "warning"
                    }
                  >
                    {session.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col sm:flex-row gap-2 justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/sessions/${session.id}`}>Ver</Link>
                    </Button>
                    <SessionMinuteGeneratorDialog session={session}>
                      <Button variant="outline" size="sm">
                        <FileUp className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Generar Acta</span>
                      </Button>
                    </SessionMinuteGeneratorDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredSessions.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No hay sesiones con el estado "{filter}".
          </div>
        )}
      </CardContent>
    </Card>
  );
}
