
"use client"
import React from 'react';
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

const voteTypes = ['Positivo', 'Negativo', 'Abstención'] as const;
type VoteType = typeof voteTypes[number];

const voteColors: Record<VoteType, "success" | "destructive" | "warning"> = {
    'Positivo': 'success',
    'Negativo': 'destructive',
    'Abstención': 'warning',
}

// Simple deterministic function to get a vote type based on topic and user ID
const getUserVote = (topicId: string, userId: string): VoteType => {
  const hash = topicId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return voteTypes[hash % voteTypes.length];
};

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
            <CardTitle className="text-4xl font-headline">{topics.length}</CardTitle>
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
              {topics.map(topic => {
                  const userVote = getUserVote(topic.id, user.id);
                  return (
                    <TableRow key={topic.id}>
                      <TableCell>{topic.fileNumber}</TableCell>
                      <TableCell>{topic.title}</TableCell>
                      <TableCell><Badge variant={topic.result === 'Aprobado' ? 'success' : topic.result === 'Rechazado' ? 'destructive' : 'warning'}>{topic.result}</Badge></TableCell>
                      <TableCell><Badge variant={voteColors[userVote]}>{userVote}</Badge></TableCell>
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
