"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, RefreshCw, CheckCircle } from "lucide-react";
import { generateSessionMinutes, GenerateSessionMinutesOutput } from "@/ai/flows/generate-session-minutes";
import type { Session } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "./ui/badge";

interface SessionMinuteGeneratorProps {
  session: Session;
}

export function SessionMinuteGenerator({ session }: SessionMinuteGeneratorProps) {
  const [summary, setSummary] = useState<GenerateSessionMinutesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setSummary(null);
    try {
      const input = {
        sessionTitle: session.title,
        sessionDate: new Date(session.date).toISOString().split('T')[0],
        attendees: session.attendees.map(a => `${a.name} (${a.party})`),
        topicsDiscussed: session.topics.map(t => ({
          topic: t.title,
          presenter: t.presenter,
          outcome: t.result,
          voteLink: t.voteLink,
        })),
      };
      const result = await generateSessionMinutes(input);
      setSummary(result);
    } catch (error) {
      console.error("Error generating minutes:", error);
      toast({
        title: "Error",
        description: "No se pudieron generar las actas. Inténtelo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id]);


  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="font-headline">Resumen de la Sesión (IA)</CardTitle>
        <CardDescription>
          Generado automáticamente con los eventos de la sesión.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[400px]">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Analizando la sesión...</p>
          </div>
        )}
        {!isLoading && summary && (
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">Título Sugerido</Badge>
              <h3 className="font-semibold text-lg">{summary.title}</h3>
            </div>
            <div>
              <Badge variant="secondary" className="mb-2">Puntos Clave</Badge>
              <ul className="space-y-2">
                {summary.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <Badge variant="secondary" className="mb-2">Acta Completa</Badge>
               <Textarea
                readOnly
                value={summary.minutes}
                className="h-64 bg-muted/30 text-sm leading-relaxed"
                aria-label="Acta generada por IA"
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Generando..." : "Volver a Generar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
