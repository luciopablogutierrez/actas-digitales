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
import { ArrowUpRight, CheckCircle, Clock, FileX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function Dashboard() {
  const avgAttendance =
    (councilMembers.reduce(
      (acc, member) =>
        acc +
        member.attendance.filter((a) => a.present).length /
          member.attendance.length,
      0
    ) /
      councilMembers.length) *
    100;
  
  const pendingTopics = topics.filter(t => t.result === 'Pendiente').length;
  const approvedTopics = topics.filter(t => t.result === 'Aprobado').length;
  const nextSession = sessions.find(s => new Date(s.date) > new Date());

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Asistencia Promedio</CardDescription>
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
            <CardDescription>Temas Pendientes</CardDescription>
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
            <CardDescription>Temas Aprobados</CardDescription>
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
            <CardDescription>Próxima Sesión</CardDescription>
            <CardTitle className="text-2xl font-headline truncate">{nextSession?.title || 'No hay programadas'}</CardTitle>
          </CardHeader>
          <CardContent>
            {nextSession ? (
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {new Date(nextSession.date).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/sessions/${nextSession.id}`}>Ver</Link>
                </Button>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">-</div>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sesión</TableHead>
                  <TableHead className="hidden sm:table-cell">Estado</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.slice(0, 5).map((session) => {
                  const isLive = new Date() > new Date(session.date) && session.status === 'Confirmada';
                  const statusLabel = isLive ? 'Sesión Activa' : session.status;
                  return (
                    <TableRow key={session.id}>
                      <TableCell>
                        <Link href={`/sessions/${session.id}`} className="font-medium hover:underline">{session.title}</Link>
                        <div className="text-muted-foreground md:hidden">
                          {new Date(session.date).toLocaleDateString()}
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
                        {new Date(session.date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
