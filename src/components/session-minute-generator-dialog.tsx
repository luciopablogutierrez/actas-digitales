
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { generateSessionMinutes } from "@/ai/flows/generate-session-minutes";
import type { Session } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface SessionMinuteGeneratorDialogProps {
  session: Session;
  children: React.ReactNode;
}

export function SessionMinuteGeneratorDialog({ session, children }: SessionMinuteGeneratorDialogProps) {
  const [minutes, setMinutes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if(open) {
        handleGenerate();
    } else {
        setMinutes("");
        setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">Acta de Sesión: {session.title}</DialogTitle>
          <DialogDescription>
            Acta generada por IA para la sesión del {new Date(session.date).toLocaleDateString()}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            {isLoading && (
              <div className="flex items-center justify-center p-8 h-96">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

