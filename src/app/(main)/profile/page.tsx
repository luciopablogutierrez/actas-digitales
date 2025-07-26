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
import { ThumbsUp, ThumbsDown, MinusCircle, CheckCircle, XCircle, Clock } from "lucide-react";

const voteTypes = ['Positivo', 'Negativo', 'Abstención'] as const;
type VoteType = typeof voteTypes[number];

const voteConfig: Record<VoteType, { variant: "success" | "destructive" | "warning", icon: React.ReactNode }> = {
    'Positivo': { variant: 'success', icon: <ThumbsUp className="h-4 w-4" /> },
    'Negativo': { variant: 'destructive', icon: <ThumbsDown className="h-4 w-4" /> },
    'Abstención': { variant: 'warning', icon: <MinusCircle className="h-4 w-4" /> },
}

const topicResultConfig: Record<string, { variant: "success" | "destructive" | "warning", icon: React.ReactNode }> = {
    'Aprobado': { variant: 'success', icon: <CheckCircle className="h-4 w-4" /> },
    'Rechazado': { variant: 'destructive', icon: <XCircle className="h-4 w-4" /> },
    'Pendiente': { variant: 'warning', icon: <Clock className="h-4 w-4" /> },
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
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={user.avatarUrl} data-ai-hint="person face" />
            <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
            <CardDescription className="text-base">{user.party}</CardDescription>
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
          <CardDescription>Últimos temas votados por el concejal.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead className="hidden md:table-cell">Resultado</TableHead>
                <TableHead className="text-right">Mi Voto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topics.map(topic => {
                  const userVote = getUserVote(topic.id, user.id);
                  const voteInfo = voteConfig[userVote];
                  const resultInfo = topicResultConfig[topic.result];
                  return (
                    <TableRow key={topic.id}>
                      <TableCell className="font-medium">
                        {topic.title}
                        <div className="font-mono text-xs text-muted-foreground mt-1">{topic.fileNumber}</div>
                        <div className="md:hidden mt-2">
                           <Badge variant={resultInfo.variant} className="flex items-center gap-2 w-fit">
                              {resultInfo.icon}
                              <span>{topic.result}</span>
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                          <Badge variant={resultInfo.variant} className="flex items-center gap-2">
                            {resultInfo.icon}
                            <span>{topic.result}</span>
                          </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                          <Badge variant={voteInfo.variant} className="flex items-center gap-2">
                            {voteInfo.icon}
                            <span className="hidden sm:inline">{userVote}</span>
                          </Badge>
                      </TableCell>
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
