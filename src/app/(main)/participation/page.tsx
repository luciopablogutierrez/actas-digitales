import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { citizenInitiatives } from "@/lib/data";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { SpeakingTurnRequest } from "@/components/speaking-turn-request";
import { InitiativeDetails } from "@/components/initiative-details";

export default function ParticipationPage() {
  return (
    <Tabs defaultValue="citizen-bench" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="citizen-bench">Banca Ciudadana</TabsTrigger>
        <TabsTrigger value="initiatives">Iniciativas Populares</TabsTrigger>
      </TabsList>
      <TabsContent value="citizen-bench">
        <SpeakingTurnRequest />
      </TabsContent>
      <TabsContent value="initiatives">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Seguimiento de Iniciativas</CardTitle>
            <CardDescription>
              Visualiza, comenta y apoya las propuestas de la comunidad.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {citizenInitiatives.map((initiative) => (
              <Card key={initiative.id}>
                <CardHeader>
                  <CardTitle>{initiative.title}</CardTitle>
                  <CardDescription>
                    Propuesto por: {initiative.proposer} | Estado: <span className="text-primary">{initiative.status}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{initiative.summary}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <div className="flex items-center gap-1 text-muted-foreground mr-auto">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" /> {initiative.comments}
                    </span>
                    <span className="flex items-center gap-1 ml-4">
                      <ThumbsUp className="h-4 w-4" /> {initiative.support}
                    </span>
                  </div>
                  <InitiativeDetails initiative={initiative} />
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
