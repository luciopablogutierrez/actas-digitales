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
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2 xl:col-span-3">
        <Card>
          <CardHeader className="pb-2">
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
          <CardHeader className="pb-2">
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
          <CardHeader className="pb-2">
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
          <CardHeader className="pb-2">
            <CardDescription>Próxima Sesión</CardDescription>
            <CardTitle className="text-2xl font-headline">{sessions.find(s => new Date(s.date) > new Date())?.title || 'No hay'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {sessions.find(s => new Date(s.date) > new Date()) ? new Date(sessions.find(s => new Date(s.date) > new Date())!.date).toLocaleDateString() : '-'}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 xl:col-span-3">
        <AttendanceChart />
      </div>
      <Card className="xl:col-span-full">
        <CardHeader className="flex flex-row items-center">
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
                <TableHead>Comisión</TableHead>
                <TableHead className="hidden sm:table-cell">Estado</TableHead>
                <TableHead className="text-right">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.slice(0, 5).map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="font-medium">{session.title}</div>
                  </TableCell>
                  <TableCell>{session.committee}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant={
                        session.status === "Confirmada"
                          ? "success"
                          : session.status === "Cancelada"
                          ? "destructive"
                          : "warning"
                      }
                      className="capitalize"
                    >
                      {session.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(session.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
