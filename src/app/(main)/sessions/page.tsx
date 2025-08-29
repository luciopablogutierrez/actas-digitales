
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sessions } from "@/lib/data";
import Link from "next/link";
import { PlusCircle, FileUp, X, Calendar } from "lucide-react";
import { SessionMinuteGeneratorDialog } from "@/components/session-minute-generator-dialog";
import type { Session } from "@/lib/types";
import { Label } from "@/components/ui/label";

type SessionStatus = 'Confirmada' | 'Pendiente' | 'Cancelada';
const filterOptions: SessionStatus[] = ['Confirmada', 'Pendiente', 'Cancelada'];

export default function SessionsPage() {
  const [statusFilter, setStatusFilter] = useState<SessionStatus | null>(null);
  const [yearFilter, setYearFilter] = useState<string | null>(null);
  const [monthFilter, setMonthFilter] = useState<string | null>(null);

  const availableYears = [...new Set(sessions.map(s => new Date(s.date).getFullYear().toString()))].sort((a, b) => parseInt(b) - parseInt(a));
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: new Date(2000, i, 1).toLocaleString('es-AR', { month: 'long' })
  }));


  const filteredSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const statusMatch = !statusFilter || session.status === statusFilter;
    const yearMatch = !yearFilter || sessionDate.getFullYear().toString() === yearFilter;
    const monthMatch = !monthFilter || (sessionDate.getMonth() + 1).toString() === monthFilter;
    return statusMatch && yearMatch && monthMatch;
  });

  const clearFilters = () => {
    setStatusFilter(null);
    setYearFilter(null);
    setMonthFilter(null);
  }

  const hasActiveFilters = statusFilter || yearFilter || monthFilter;

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
         <div className="flex flex-col sm:flex-row flex-wrap items-end gap-2 mb-4 p-4 border rounded-lg">
            <div className="grid sm:flex-1 w-full sm:w-auto gap-1.5">
                <Label>Filtrar por estado</Label>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant={!statusFilter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter(null)}
                    >
                        Todas
                    </Button>
                    {filterOptions.map(option => (
                        <Button
                        key={option}
                        variant={statusFilter === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter(option)}
                        >
                        {option}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="grid sm:flex-initial w-full sm:w-auto gap-1.5">
                <Label htmlFor="year-filter">Año</Label>
                <Select value={yearFilter || ""} onValueChange={(value) => setYearFilter(value === "all" ? null : value)}>
                    <SelectTrigger id="year-filter" className="w-full sm:w-[120px]">
                        <SelectValue placeholder="Año" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {availableYears.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="grid sm:flex-initial w-full sm:w-auto gap-1.5">
                <Label htmlFor="month-filter">Mes</Label>
                 <Select value={monthFilter || ""} onValueChange={(value) => setMonthFilter(value === "all" ? null : value)}>
                    <SelectTrigger id="month-filter" className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Mes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                         {months.map(month => (
                            <SelectItem key={month.value} value={month.value} className="capitalize">{month.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {hasActiveFilters && (
                <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
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
            No se encontraron sesiones que coincidan con los filtros seleccionados.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
