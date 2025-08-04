
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, FileText, File } from "lucide-react";
import { topics, sessions } from "@/lib/data";
import type { Topic, Session } from "@/lib/types";
import { Badge } from "./ui/badge";
import { TopicDetailsSheet } from "./topic-details-sheet";

interface SearchDialogProps {
  children: React.ReactNode;
}

type SearchResult = 
  | { type: 'topic', data: Topic }
  | { type: 'session', data: Session };

export function SearchDialog({ children }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const filteredTopics: SearchResult[] = topics
        .filter(
          (topic) =>
            topic.title.toLowerCase().includes(query.toLowerCase()) ||
            topic.fileNumber.toLowerCase().includes(query.toLowerCase())
        )
        .map(topic => ({ type: 'topic', data: topic }));
        
      const filteredSessions: SearchResult[] = sessions
        .filter((session) =>
            session.title.toLowerCase().includes(query.toLowerCase())
        )
        .map(session => ({ type: 'session', data: session }));

      setResults([...filteredSessions, ...filteredTopics]);
    } else {
      setResults([]);
    }
  }, [query]);
  
  useEffect(() => {
    if (!isOpen) {
        setQuery("");
        setResults([]);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">Buscar Sesiones, Expedientes y Temas</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Escribe el título o número de expediente..."
            className="w-full rounded-lg bg-background pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar sesiones, expedientes y temas"
          />
        </div>
        <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <ul className="space-y-4">
              {results.map((result) => (
                <li key={`${result.type}-${result.data.id}`} className="p-4 border rounded-md hover:bg-muted/50">
                  {result.type === 'topic' ? (
                     <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                            <TopicDetailsSheet topic={result.data as Topic}>
                                 <button className="font-medium cursor-pointer hover:underline text-left">{(result.data as Topic).title}</button>
                            </TopicDetailsSheet>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  <File className="mr-1.5 h-3 w-3" /> Tema
                                </Badge>
                                <p className="text-sm text-muted-foreground">{(result.data as Topic).fileNumber}</p>
                            </div>
                        </div>
                      <Badge variant={(result.data as Topic).result === "Aprobado" ? "success" : (result.data as Topic).result === "Rechazado" ? "destructive" : "warning"}>
                          {(result.data as Topic).result}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <Link href={`/sessions/${result.data.id}`} className="font-medium hover:underline" onClick={() => setIsOpen(false)}>
                          {result.data.title}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            <FileText className="mr-1.5 h-3 w-3" /> Sesión
                          </Badge>
                          <p className="text-sm text-muted-foreground">{new Date(result.data.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                       <Badge variant={(result.data as Session).status === "Confirmada" ? "success" : (result.data as Session).status === "Cancelada" ? "destructive" : "warning"}>
                          {(result.data as Session).status}
                      </Badge>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            query.length > 2 && <p className="text-center text-muted-foreground py-8">No se encontraron resultados.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
