
"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { CitizenInitiative } from "@/lib/types";
import { ThumbsUp } from "lucide-react";

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
                    <DialogTitle>{initiative.title}</DialogTitle>
                    <DialogDescription>
                        Propuesto por: {initiative.proposer} | Estado: <span className="text-primary">{initiative.status}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <p className="text-sm text-muted-foreground">{initiative.summary}</p>
                    <div className="flex justify-end gap-2">
                         <Button variant="outline">
                            <ThumbsUp className="mr-2 h-4 w-4" /> 
                            Apoyar ({initiative.support})
                        </Button>
                        <Button>
                            Ver Expediente
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
