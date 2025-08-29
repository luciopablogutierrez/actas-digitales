
"use client";
import React, { useState, useMemo } from 'react';
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
import { councilMembers, topics, sessions } from "@/lib/data";
import { ThumbsUp, ThumbsDown, MinusCircle, CheckCircle, XCircle, Filter, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Session, Topic } from '@/lib/types';


const voteTypes = ['Positivo', 'Negativo', 'Abstención'] as const;
type VoteType = typeof voteTypes[number];
type SessionStatus = Session['status'];

const voteConfig: Record<VoteType, { variant: "success" | "destructive" | "warning", icon: React.ReactNode, color: string }> = {
    'Positivo': { variant: 'success', icon: <ThumbsUp className="h-4 w-4" />, color: '#22c55e' },
    'Negativo': { variant: 'destructive', icon: <ThumbsDown className="h-4 w-4" />, color: '#ef4444' },
    'Abstención': { variant: 'warning', icon: <MinusCircle className="h-4 w-4" />, color: '#f59e0b' },
}

const topicResultConfig: Record<string, { variant: "success" | "destructive", icon: React.ReactNode, color: string }> = {
    'Aprobado': { variant: 'success', icon: <CheckCircle className="h-4 w-4" />, color: '#22c55e' },
    'Rechazado': { variant: 'destructive', icon: <XCircle className="h-4 w-4" />, color: '#ef4444' },
}

const statusConfig: Record<SessionStatus, { color: string }> = {
    'Confirmada': { color: '#22c55e' },
    'Pendiente': { color: '#f59e0b' },
    'Cancelada': { color: '#ef4444' },
};


const getUserVote = (topicId: string, userId: string): VoteType => {
  const hash = topicId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return voteTypes[hash % voteTypes.length];
};


export default function VotingHistoryPage() {
    const [topicFilter, setTopicFilter] = useState<string | null>(null);
    const [councilMemberFilter, setCouncilMemberFilter] = useState<string | null>(null);
    const [yearFilter, setYearFilter] = useState<string | null>(null);
    const [monthFilter, setMonthFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<SessionStatus | 'all'>("all");


    const availableYears = [...new Set(sessions.map(s => new Date(s.date).getFullYear().toString()))].sort((a, b) => parseInt(b) - parseInt(a));
    const months = Array.from({ length: 12 }, (_, i) => ({
        value: (i + 1).toString(),
        label: new Date(2000, i, 1).toLocaleString('es-AR', { month: 'long' })
    }));

    const clearFilters = () => {
        setTopicFilter(null);
        setCouncilMemberFilter(null);
        setYearFilter(null);
        setMonthFilter(null);
        setStatusFilter("all");
    };

    const hasActiveFilters = topicFilter || councilMemberFilter || yearFilter || monthFilter || statusFilter !== "all";

    const filteredData = useMemo(() => {
        let dateFilteredSessions = sessions;

        if (yearFilter) {
            dateFilteredSessions = dateFilteredSessions.filter(s => new Date(s.date).getFullYear().toString() === yearFilter);
        }
        if (yearFilter && monthFilter) {
            dateFilteredSessions = dateFilteredSessions.filter(s => (new Date(s.date).getMonth() + 1).toString() === monthFilter);
        }
        
        let finalSessions = dateFilteredSessions;
        
        if (topicFilter) {
            finalSessions = finalSessions.filter(s => s.topics.some(t => t.id === topicFilter));
        }
       
        if (statusFilter !== 'all') {
            finalSessions = finalSessions.filter(s => s.status === statusFilter);
        }
        
        const finalTopics = finalSessions.flatMap(s => s.topics).filter(topic => {
           if(topicFilter) return topic.id === topicFilter;
           return true;
        });
        
        const availableTopicIds = new Set(dateFilteredSessions.flatMap(s => s.topics.map(t => t.id)));
        const availableTopics = topics.filter(t => availableTopicIds.has(t.id));
        
        const filteredMembers = councilMemberFilter ? councilMembers.filter(m => m.id === councilMemberFilter) : councilMembers;

        const totalVotesData = filteredMembers.flatMap(member =>
            finalTopics.map(topic => getUserVote(topic.id, member.id))
        ).reduce((acc, vote) => {
            acc[vote] = (acc[vote] || 0) + 1;
            return acc;
        }, {} as Record<VoteType, number>);

        const votesChartData = Object.entries(totalVotesData).map(([name, value]) => ({ name, value }));

        const topicResultsData = finalTopics.reduce((acc, topic) => {
            acc[topic.result] = (acc[topic.result] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        const resultsChartData = Object.entries(topicResultsData).map(([name, value]) => ({ name, value }));

        const sessionStatusData = finalSessions.reduce((acc, session) => {
            acc[session.status] = (acc[session.status] || 0) + 1;
            return acc;
        }, {} as Record<SessionStatus, number>);

        const sessionStatusChartData = Object.entries(sessionStatusData).map(([name, value]) => ({ name, value }));

        return { 
            votesChartData, 
            resultsChartData, 
            sessionStatusChartData,
            filteredSessions: finalSessions
                .map(s => ({
                    ...s,
                    topics: topicFilter ? s.topics.filter(t => t.id === topicFilter) : s.topics
                }))
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
            filteredMembers,
            availableTopics
        };

    }, [topicFilter, councilMemberFilter, yearFilter, monthFilter, statusFilter]);

    const voteColors = Object.values(voteConfig).map(v => v.color);
    const resultColors = Object.values(topicResultConfig).map(r => r.color);
    const statusColors = Object.values(statusConfig).map(s => s.color);

    return (
        <div className="grid gap-8">
            <header>
                <h1 className="font-headline text-3xl">Historial y Análisis de Votaciones</h1>
                <p className="text-muted-foreground">
                    Analiza el registro de votaciones con filtros por tema, concejal y fecha.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5" /> Filtros de Análisis</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
                    <div className="grid gap-1.5">
                        <Label htmlFor="council-member-filter">Concejal</Label>
                        <Select value={councilMemberFilter || "all"} onValueChange={(value) => setCouncilMemberFilter(value === "all" ? null : value)}>
                            <SelectTrigger id="council-member-filter"><SelectValue placeholder="Seleccionar concejal" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los concejales</SelectItem>
                                {councilMembers.map(member => <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-1.5">
                        <Label htmlFor="topic-filter">Tema / Expediente</Label>
                        <Select value={topicFilter || "all"} onValueChange={(value) => setTopicFilter(value === "all" ? null : value)}>
                            <SelectTrigger id="topic-filter"><SelectValue placeholder="Seleccionar tema" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los temas</SelectItem>
                                {filteredData.availableTopics.map(topic => <SelectItem key={topic.id} value={topic.id}>{topic.title}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-1.5">
                            <Label htmlFor="year-filter">Año</Label>
                             <Select value={yearFilter || "all"} onValueChange={(value) => { setYearFilter(value === "all" ? null : value); setMonthFilter(null);}}>
                                <SelectTrigger id="year-filter"><SelectValue placeholder="Año" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    {availableYears.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="month-filter">Mes</Label>
                            <Select value={monthFilter || "all"} onValueChange={(value) => setMonthFilter(value === "all" ? null : value)} disabled={!yearFilter}>
                                <SelectTrigger id="month-filter"><SelectValue placeholder="Mes" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    {months.map(month => <SelectItem key={month.value} value={month.value} className="capitalize">{month.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor="status-filter">Estado de Sesión</Label>
                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as SessionStatus | 'all')}>
                            <SelectTrigger id="status-filter"><SelectValue placeholder="Estado" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los estados</SelectItem>
                                <SelectItem value="Confirmada">Confirmadas</SelectItem>
                                <SelectItem value="Pendiente">Pendientes</SelectItem>
                                <SelectItem value="Cancelada">Canceladas</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {hasActiveFilters && (
                        <Button variant="ghost" onClick={clearFilters}><X className="mr-2 h-4 w-4" /> Limpiar Filtros</Button>
                    )}
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Resumen de Votos Emitidos</CardTitle>
                        <CardDescription>Distribución de los votos según los filtros aplicados.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        {filteredData.votesChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={filteredData.votesChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} label>
                                        {filteredData.votesChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={voteColors[index % voteColors.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : <p className="text-center text-muted-foreground pt-16">No hay datos de votos para mostrar.</p>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Resultados de Temas</CardTitle>
                        <CardDescription>Distribución de resultados según los filtros aplicados.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        {filteredData.resultsChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={filteredData.resultsChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} label>
                                        {filteredData.resultsChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={resultColors[index % resultColors.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : <p className="text-center text-muted-foreground pt-16">No hay datos de resultados para mostrar.</p>}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Estado de Sesiones</CardTitle>
                        <CardDescription>Distribución de estados según los filtros aplicados.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        {filteredData.sessionStatusChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={filteredData.sessionStatusChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} label>
                                        {filteredData.sessionStatusChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : <p className="text-center text-muted-foreground pt-16">No hay sesiones para mostrar.</p>}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detalle de Votaciones por Sesión</CardTitle>
                    <CardDescription>
                        Expande cada sesión para ver el detalle de los temas y votaciones.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {filteredData.filteredSessions.map((session: Session) => (
                            <AccordionItem value={session.id} key={session.id}>
                                <AccordionTrigger>
                                    <div className="text-left">
                                        <p className="font-semibold text-base">{session.title}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-muted-foreground">{new Date(session.date).toLocaleDateString('es-AR', { dateStyle: 'long' })}</p>
                                            <Badge variant={session.status === 'Confirmada' ? 'success' : session.status === 'Cancelada' ? 'destructive' : 'warning'}>{session.status}</Badge>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {session.status === 'Confirmada' && session.topics.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Tema</TableHead>
                                                    <TableHead>Resultado</TableHead>
                                                    {filteredData.filteredMembers.map(member => (
                                                        <TableHead key={member.id} className="text-center hidden sm:table-cell">
                                                        <div className="flex flex-col items-center gap-1">
                                                            <Avatar className="h-8 w-8 border">
                                                                <AvatarImage src={member.avatarUrl} />
                                                                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                                            </Avatar>
                                                            <span className="text-xs w-20 truncate">{member.name}</span>
                                                        </div>
                                                        </TableHead>
                                                    ))}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {session.topics.map((topic: Topic) => {
                                                    const resultInfo = topicResultConfig[topic.result];
                                                    return (
                                                    <TableRow key={topic.id}>
                                                        <TableCell className="font-medium max-w-xs">
                                                            <p>{topic.title}</p>
                                                            <p className="font-mono text-xs text-muted-foreground mt-1">{topic.fileNumber}</p>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant={resultInfo.variant} className="flex items-center gap-2">
                                                                {resultInfo.icon}
                                                                <span>{topic.result}</span>
                                                            </Badge>
                                                        </TableCell>
                                                        {filteredData.filteredMembers.map(member => {
                                                            const vote = getUserVote(topic.id, member.id);
                                                            const voteInfo = voteConfig[vote];
                                                            return (
                                                                <TableCell key={`${topic.id}-${member.id}`} className="text-center hidden sm:table-cell">
                                                                    <Badge variant={voteInfo.variant} className="flex items-center gap-2 mx-auto">
                                                                        {voteInfo.icon}
                                                                        <span className="hidden lg:inline">{vote}</span>
                                                                    </Badge>
                                                                </TableCell>
                                                            )
                                                        })}
                                                    </TableRow>
                                                )})}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <div className="text-center text-muted-foreground py-4">
                                           {session.status !== 'Confirmada' ? `Una sesión ${session.status.toLowerCase()} no tiene datos de votación.` : "No hay temas que coincidan con los filtros para esta sesión."}
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                         {filteredData.filteredSessions.length === 0 && (
                            <div className="text-center text-muted-foreground py-8">
                                No se encontraron sesiones que coincidan con los filtros seleccionados.
                            </div>
                        )}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}

    