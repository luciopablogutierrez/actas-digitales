
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
import { sessions, councilMembers, topics } from "@/lib/data";
import { AttendanceChart } from "@/components/attendance-chart";
import { ArrowUpRight, CheckCircle, Clock, FileX, Info, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";


const badgeVariants: Record<string, "success" | "warning" | "destructive" | "info" | "default"> = {
  Confirmada: "success",
  Pendiente: "warning",
  Cancelada: "destructive",
  "Sesión Activa": "info",
};

const badgeIcons: Record<string, React.ReactNode> = {
  Confirmada: <CheckCircle className="h-4 w-4" />,
  Pendiente: <Clock className="h-4 w-4" />,
  Cancelada: <FileX className="h-4 w-4" />,
  "Sesión Activa": <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
  </span>,
};

type SessionStatus = 'Confirmada' | 'Pendiente' | 'Cancelada';
const filterOptions: SessionStatus[] = ['Confirmada', 'Pendiente', 'Cancelada'];


export default function Dashboard() {
  const [filter, setFilter] = useState<SessionStatus | null>(null);

  const avgAttendance =
    (councilMembers.reduce(
      (acc, member) =>
        acc +
        (member.attendance.filter((a) => a.present).length /
          member.attendance.length) * 100,
      0
    ) /
      councilMembers.length);
  
  const pendingTopics = topics.filter(t => t.result === 'Pendiente').length;
  const approvedTopics = topics.filter(t => t.result === 'Aprobado').length;
  const nextSession = sessions.find(s => new Date(s.date) > new Date());
  const upcomingSessionsCount = sessions.filter(s => new Date(s.date) > new Date()).length;

  const filteredSessions = sessions
    .filter(session => new Date(session.date) >= new Date())
    .filter(session => !filter || session.status === filter);


  return (
    <TooltipProvider>
    <div className="grid auto-rows-max items-start gap-4 md:gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" id="tour-step-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardDescription>Asistencia Promedio</CardDescription>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Promedio de asistencia de todos los concejales a las sesiones registradas.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardTitle className="text-4xl font-headline">
              {avgAttendance.toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +2% que el último mes
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardDescription>Temas Pendientes</CardDescription>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Número de temas y expedientes cuyo estado es "Pendiente" de tratamiento.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardTitle className="text-4xl font-headline">{pendingTopics}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {topics.length} temas en total
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardDescription>Temas Aprobados</CardDescription>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                   <p>Número de temas y expedientes cuyo estado es "Aprobado".</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardTitle className="text-4xl font-headline">{approvedTopics}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% que el último mes
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardDescription>Próximas Sesiones</CardDescription>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cantidad de sesiones con fecha futura, sin importar su estado.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardTitle className="text-4xl font-headline">{upcomingSessionsCount}</CardTitle>
          </CardHeader>
          <CardContent>
            {nextSession ? (
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Próxima: {new Date(nextSession.date).toLocaleDateString('es-AR', {day: '2-digit', month: '2-digit'})}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/sessions/${nextSession.id}`}>Ver</Link>
                </Button>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">No hay sesiones programadas</div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <AttendanceChart />
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="grid gap-2">
              <CardTitle className="font-headline">Próximas Sesiones</CardTitle>
              <CardDescription>
                Listado de sesiones confirmadas, pendientes y canceladas.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/sessions">
                Ver Todas
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
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
                  <TableHead>Sesión</TableHead>
                  <TableHead className="hidden sm:table-cell">Estado</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.slice(0, 5).map((session) => {
                  const isLive = new Date() > new Date(session.date) && session.status === 'Confirmada' && session.id === 's-live';
                  const statusLabel = isLive ? 'Sesión Activa' : session.status;
                  return (
                    <TableRow key={session.id}>
                      <TableCell>
                        <Link href={`/sessions/${session.id}`} className="font-medium hover:underline">{session.title}</Link>
                        <div className="text-muted-foreground md:hidden mt-1">
                          {new Date(session.date).toLocaleDateString('es-AR', { dateStyle: 'short' })}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          variant={badgeVariants[statusLabel]}
                          className="capitalize"
                        >
                          <div className="flex items-center gap-2">
                            {badgeIcons[statusLabel]}
                            <span>{statusLabel}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        {new Date(session.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
             {filteredSessions.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No hay sesiones con el estado "{filter}".
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </TooltipProvider>
  );
}
