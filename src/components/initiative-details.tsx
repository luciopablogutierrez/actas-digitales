
"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { CitizenInitiative } from "@/lib/types";
import { ThumbsUp, FileText, MessageSquare } from "lucide-react";
import { Badge } from "./ui/badge";

interface InitiativeDetailsProps {
    initiative: CitizenInitiative;
}

export function InitiativeDetails({ initiative }: InitiativeDetailsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Ver Detalles</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <Badge variant="secondary" className="w-fit mb-2">{initiative.status}</Badge>
                    <DialogTitle className="text-2xl font-headline">{initiative.title}</DialogTitle>
                    <DialogDescription>
                        Propuesto por: {initiative.proposer}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2">Resumen de la Propuesta</h4>
                        <p className="text-muted-foreground bg-muted/50 p-4 rounded-md">
                            {initiative.summary}
                        </p>
                    </div>
                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <ThumbsUp className="h-4 w-4" /> {initiative.support} apoyos
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MessageSquare className="h-4 w-4" /> {initiative.comments} comentarios
                        </span>
                    </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2 pt-4">
                     <Button variant="outline" className="w-full sm:w-auto">
                        <ThumbsUp className="mr-2 h-4 w-4" /> 
                        Apoyar
                    </Button>
                    <Button className="w-full sm:w-auto">
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Expediente
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
