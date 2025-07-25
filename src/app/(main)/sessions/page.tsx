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
import { PlusCircle, FileUp } from "lucide-react";

export default function SessionsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">
                  <Link href={`/sessions/${session.id}`} className="hover:underline">
                    {session.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(session.date).toLocaleString('es-AR', { dateStyle: 'long', timeStyle: 'short' })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      session.status === "Confirmada"
                        ? "default"
                        : session.status === "Cancelada"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {session.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                     <Link href={`/sessions/${session.id}`}>Ver</Link>
                  </Button>
                   <Button variant="outline" size="sm">
                    <FileUp className="mr-2 h-4 w-4" />
                    Generar Acta
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
