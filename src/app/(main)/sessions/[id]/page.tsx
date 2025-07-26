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
import { sessions } from "@/lib/data";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Clock, MinusCircle } from "lucide-react";
import { SessionMinuteGenerator } from "@/components/session-minute-generator";
import { TopicDetailsSheet } from "@/components/topic-details-sheet";
import type { Topic } from "@/lib/types";

const topicResultConfig: Record<string, { variant: "success" | "destructive" | "warning", icon: React.ReactNode }> = {
    'Aprobado': { variant: 'success', icon: <CheckCircle className="h-4 w-4" /> },
    'Rechazado': { variant: 'destructive', icon: <XCircle className="h-4 w-4" /> },
    'Pendiente': { variant: 'warning', icon: <Clock className="h-4 w-4" /> },
}

export default function SessionDetailPage({ params }: { params: { id: string } }) {
  const session = sessions.find((s) => s.id === params.id);

  if (!session) {
    notFound();
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-[1fr_400px] xl:gap-8">
      <div className="flex flex-col gap-8">
        <div className="mb-4">
          <h1 className="text-3xl font-headline tracking-tight">{session.title}</h1>
          <p className="text-muted-foreground">
            {new Date(session.date).toLocaleString('es-AR', { dateStyle: 'full', timeStyle: 'short' })}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Asistencia</CardTitle>
            <CardDescription>Registro de concejales presentes y ausentes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concejal</TableHead>
                  <TableHead className="hidden sm:table-cell">Partido</TableHead>
                  <TableHead className="text-right">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {session.attendees.map((attendee) => {
                  const attendanceRecord = attendee.attendance.find(a => a.sessionId === session.id);
                  const isPresent = attendanceRecord?.present;
                  return (
                    <TableRow key={attendee.id}>
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={attendee.avatarUrl} data-ai-hint="person face" />
                          <AvatarFallback>{attendee.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{attendee.name}</span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{attendee.party}</TableCell>
                      <TableCell className="text-right">
                        {isPresent ? 
                          <span className="flex items-center justify-end gap-2 text-green-600">
                            <CheckCircle className="h-5 w-5" /> Presente
                          </span> : 
                           <span className="flex items-center justify-end gap-2 text-red-600">
                            <XCircle className="h-5 w-5" /> Ausente
                          </span>
                        }
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Temas Tratados</CardTitle>
             <CardDescription>Expedientes discutidos durante la sesión.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expediente</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Presentador</TableHead>
                  <TableHead className="text-right">Resultado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {session.topics.map((topic: Topic) => {
                   const resultInfo = topicResultConfig[topic.result];
                  return(
                  <TableRow key={topic.id}>
                    <TableCell className="font-mono text-muted-foreground">{topic.fileNumber}</TableCell>
                    <TableCell className="font-medium max-w-xs truncate">
                      <TopicDetailsSheet topic={topic}>
                        <span className="cursor-pointer hover:underline">{topic.title}</span>
                      </TopicDetailsSheet>
                    </TableCell>
                    <TableCell>{topic.presenter}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={resultInfo.variant}
                        className="flex items-center gap-2 justify-center"
                      >
                        {resultInfo.icon}
                        <span>{topic.result}</span>
                      </Badge>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <SessionMinuteGenerator session={session} />
      </div>
    </div>
  );
}
