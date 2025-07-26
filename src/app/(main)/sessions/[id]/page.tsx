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
import { CheckCircle, XCircle } from "lucide-react";
import { SessionMinuteGenerator } from "@/components/session-minute-generator";
import { TopicDetailsSheet } from "@/components/topic-details-sheet";
import type { Topic } from "@/lib/types";

export default function SessionDetailPage({ params }: { params: { id: string } }) {
  const session = sessions.find((s) => s.id === params.id);

  if (!session) {
    notFound();
  }

  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-[1fr_400px] xl:gap-8">
      <div className="flex flex-col gap-8">
        <div className="mb-4">
          <h1 className="text-3xl font-headline">{session.title}</h1>
          <p className="text-muted-foreground">
            {new Date(session.date).toLocaleString('es-AR', { dateStyle: 'full', timeStyle: 'short' })}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Concejal</TableHead>
                  <TableHead>Partido</TableHead>
                  <TableHead>Presente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {session.attendees.map((attendee) => {
                  const attendanceRecord = attendee.attendance.find(a => a.sessionId === session.id);
                  return (
                    <TableRow key={attendee.id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={attendee.avatarUrl} data-ai-hint="person face" />
                          <AvatarFallback>{attendee.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        {attendee.name}
                      </TableCell>
                      <TableCell>{attendee.party}</TableCell>
                      <TableCell>
                        {attendanceRecord?.present ? 
                          <CheckCircle className="h-5 w-5 text-green-500" /> : 
                          <XCircle className="h-5 w-5 text-red-500" />}
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
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expediente</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Presentador</TableHead>
                  <TableHead>Resultado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {session.topics.map((topic: Topic) => (
                  <TableRow key={topic.id}>
                    <TableCell>{topic.fileNumber}</TableCell>
                    <TableCell className="font-medium">
                      <TopicDetailsSheet topic={topic}>
                        <span className="cursor-pointer hover:underline">{topic.title}</span>
                      </TopicDetailsSheet>
                    </TableCell>
                    <TableCell>{topic.presenter}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          topic.result === "Aprobado"
                            ? "success"
                            : topic.result === "Rechazado"
                            ? "destructive"
                            : "warning"
                        }
                      >{topic.result}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
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
