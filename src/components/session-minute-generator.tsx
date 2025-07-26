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
import { Loader2, Wand2, RefreshCw } from "lucide-react";
import { generateSessionMinutes } from "@/ai/flows/generate-session-minutes";
import type { Session } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface SessionMinuteGeneratorProps {
  session: Session;
}

export function SessionMinuteGenerator({ session }: SessionMinuteGeneratorProps) {
  const [minutes, setMinutes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setMinutes("");
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
      setMinutes(result.minutes);
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
          Acta generada automáticamente con los eventos de la sesión.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[400px]">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Generando resumen...</p>
          </div>
        )}
        {!isLoading && minutes && (
          <Textarea
            readOnly
            value={minutes}
            className="h-96 bg-muted/30 text-sm leading-relaxed"
            aria-label="Acta generada por IA"
          />
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
