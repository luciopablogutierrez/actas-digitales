
"use client";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

export default function VotingHistoryPage() {
  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Historial de Votaciones</CardTitle>
          <CardDescription>
            Consulta el registro de votaciones de todos los concejales.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {councilMembers.map(member => (
                    <AccordionItem value={member.id} key={member.id}>
                        <AccordionTrigger>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage src={member.avatarUrl} alt={`Avatar de ${member.name}`} />
                                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-base">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.party}</p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                             <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Título del Tema</TableHead>
                                    <TableHead className="hidden md:table-cell">Resultado</TableHead>
                                    <TableHead className="text-right">Voto</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {topics.map(topic => {
                                    const userVote = getUserVote(topic.id, member.id);
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
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
