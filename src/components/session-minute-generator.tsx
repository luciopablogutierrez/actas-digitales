"use client";

import { useState } from "react";
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
import { Loader2, Wand2 } from "lucide-react";
import { generateSessionMinutes } from "@/ai/flows/generate-session-minutes";
import type { Session } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface SessionMinuteGeneratorProps {
  session: Session;
}

export function SessionMinuteGenerator({ session }: SessionMinuteGeneratorProps) {
  const [minutes, setMinutes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Resumen de la Sesión</CardTitle>
        <CardDescription>
          Genera un acta automática con los eventos de la sesión.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {minutes && (
          <Textarea
            readOnly
            value={minutes}
            className="h-96 bg-muted/50"
            aria-label="Acta generada por IA"
          />
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Generando..." : "Generar Acta con IA"}
        </Button>
      </CardFooter>
    </Card>
  );
}
