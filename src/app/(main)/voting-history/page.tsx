
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
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const voteTypes = ['Positivo', 'Negativo', 'Abstención'] as const;
type VoteType = typeof voteTypes[number];

const voteConfig: Record<VoteType, { variant: "success" | "destructive" | "warning", icon: React.ReactNode, color: string }> = {
    'Positivo': { variant: 'success', icon: <ThumbsUp className="h-4 w-4" />, color: '#22c55e' },
    'Negativo': { variant: 'destructive', icon: <ThumbsDown className="h-4 w-4" />, color: '#ef4444' },
    'Abstención': { variant: 'warning', icon: <MinusCircle className="h-4 w-4" />, color: '#f59e0b' },
}

const topicResultConfig: Record<string, { variant: "success" | "destructive" | "warning", icon: React.ReactNode, color: string }> = {
    'Aprobado': { variant: 'success', icon: <CheckCircle className="h-4 w-4" />, color: '#22c55e' },
    'Rechazado': { variant: 'destructive', icon: <XCircle className="h-4 w-4" />, color: '#ef4444' },
    'Pendiente': { variant: 'warning', icon: <Clock className="h-4 w-4" />, color: '#f59e0b' },
}

// Simple deterministic function to get a vote type based on topic and user ID
const getUserVote = (topicId: string, userId: string): VoteType => {
  const hash = topicId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return voteTypes[hash % voteTypes.length];
};

const totalVotesData = councilMembers.flatMap(member => 
    topics.map(topic => getUserVote(topic.id, member.id))
).reduce((acc, vote) => {
    acc[vote] = (acc[vote] || 0) + 1;
    return acc;
}, {} as Record<VoteType, number>);

const votesChartData = Object.entries(totalVotesData).map(([name, value]) => ({ name, value }));
const voteColors = Object.values(voteConfig).map(v => v.color);


const topicResultsData = topics.reduce((acc, topic) => {
    acc[topic.result] = (acc[topic.result] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

const resultsChartData = Object.entries(topicResultsData).map(([name, value]) => ({ name, value }));
const resultColors = Object.values(topicResultConfig).map(r => r.color);

export default function VotingHistoryPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="font-headline text-3xl">Historial de Votaciones</h1>
        <p className="text-muted-foreground">
            Consulta el registro de votaciones de todos los concejales y visualiza estadísticas globales.
        </p>
      </div>

       <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Resumen General de Votos</CardTitle>
                    <CardDescription>Distribución de todos los votos emitidos.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={votesChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} label>
                                {votesChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={voteColors[index % voteColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Resultados de los Temas Tratados</CardTitle>
                    <CardDescription>Distribución del estado de todos los expedientes.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={resultsChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} label>
                                {resultsChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={resultColors[index % resultColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Votaciones por Concejal</CardTitle>
          <CardDescription>
            Expande cada sección para ver el detalle de votación individual.
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
