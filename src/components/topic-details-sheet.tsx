
"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import type { Topic } from "@/lib/types";
import { Button } from "./ui/button";

interface TopicDetailsSheetProps {
    topic: Topic;
    children: React.ReactNode;
}

export function TopicDetailsSheet({ topic, children }: TopicDetailsSheetProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-headline">{topic.title}</SheetTitle>
                    <SheetDescription>
                        Expediente: {topic.fileNumber}
                    </SheetDescription>
                </SheetHeader>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Presentado por:</span>
                        <span className="font-medium">{topic.presenter}</span>
                    </div>
                    <div className="flex justify-between items-center">
                         <span className="text-sm text-muted-foreground">Resultado:</span>
                        <Badge 
                            variant={
                                topic.result === "Aprobado"
                                ? "success"
                                : "destructive"
                            }
                        >
                            {topic.result}
                        </Badge>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Resumen</h4>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md">
                            {topic.summary}
                        </p>
                    </div>
                    {topic.voteLink && (
                        <Button className="w-full" asChild>
                            <a href={topic.voteLink} target="_blank" rel="noopener noreferrer">
                                Ver Votación
                            </a>
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
