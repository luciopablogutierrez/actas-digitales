
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { topics } from "@/lib/data";
import type { Topic } from "@/lib/types";
import { Badge } from "./ui/badge";
import { TopicDetailsSheet } from "./topic-details-sheet";

interface SearchDialogProps {
  children: React.ReactNode;
}

export function SearchDialog({ children }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Topic[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const filteredTopics = topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(query.toLowerCase()) ||
          topic.fileNumber.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredTopics);
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
          <DialogTitle className="font-headline">Buscar Expedientes y Temas</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Escribe el título o número de expediente..."
            className="w-full rounded-lg bg-background pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            results.map((topic) => (
              <div key={topic.id} className="p-4 border rounded-md hover:bg-muted/50">
                <div className="flex justify-between items-start">
                    <div>
                        <TopicDetailsSheet topic={topic}>
                             <p className="font-medium cursor-pointer hover:underline">{topic.title}</p>
                        </TopicDetailsSheet>
                        <p className="text-sm text-muted-foreground">{topic.fileNumber}</p>
                    </div>
                  <Badge variant={topic.result === "Aprobado" ? "success" : topic.result === "Rechazado" ? "destructive" : "warning"}>
                      {topic.result}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            query.length > 2 && <p className="text-center text-muted-foreground py-8">No se encontraron resultados.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

