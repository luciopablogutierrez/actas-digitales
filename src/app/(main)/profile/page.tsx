import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { councilMembers, topics } from "@/lib/data";

export default function ProfilePage() {
  const user = councilMembers[0]; // Mock user
  const avgAttendance = (user.attendance.filter(a => a.present).length / user.attendance.length) * 100;
  
  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatarUrl} data-ai-hint="person face" />
            <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
            <CardDescription>{user.party}</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Asistencia Total</CardDescription>
            <CardTitle className="text-4xl font-headline">{avgAttendance.toFixed(1)}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Votos Emitidos</CardDescription>
            <CardTitle className="text-4xl font-headline">35</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Temas Presentados</CardDescription>
            <CardTitle className="text-4xl font-headline">{topics.filter(t => t.presenter === user.name).length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Historial de Votaciones</CardTitle>
          <CardDescription>Últimos temas votados.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expediente</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Resultado</TableHead>
                <TableHead>Mi Voto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topics.map(topic => (
                <TableRow key={topic.id}>
                  <TableCell>{topic.fileNumber}</TableCell>
                  <TableCell>{topic.title}</TableCell>
                  <TableCell><Badge variant={topic.result === 'Aprobado' ? 'default' : topic.result === 'Rechazado' ? 'destructive' : 'secondary'}>{topic.result}</Badge></TableCell>
                  <TableCell><Badge variant="outline">Positivo</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
