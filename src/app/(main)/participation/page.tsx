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
import { MessageSquare, ThumbsUp, PenSquare } from "lucide-react";
import { SpeakingTurnRequest } from "@/components/speaking-turn-request";
import { InitiativeDetails } from "@/components/initiative-details";
import { ProposeInitiativeDialog } from "@/components/propose-initiative-dialog";
import { Button } from "@/components/ui/button";

export default function ParticipationPage() {
  return (
    <Tabs defaultValue="citizen-bench" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="citizen-bench">Banca Ciudadana</TabsTrigger>
        <TabsTrigger value="initiatives">Iniciativas Populares</TabsTrigger>
      </TabsList>
      <TabsContent value="citizen-bench">
        <SpeakingTurnRequest />
      </TabsContent>
      <TabsContent value="initiatives">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div>
                    <CardTitle className="font-headline">Seguimiento de Iniciativas</CardTitle>
                    <CardDescription>
                      Visualiza, comenta y apoya las propuestas de la comunidad.
                    </CardDescription>
                </div>
                <ProposeInitiativeDialog>
                    <Button>
                        <PenSquare className="mr-2 h-4 w-4" />
                        Proponer Iniciativa
                    </Button>
                </ProposeInitiativeDialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {citizenInitiatives.map((initiative) => (
              <Card key={initiative.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{initiative.title}</CardTitle>
                  <CardDescription>
                    Propuesto por: <span className="font-medium text-foreground">{initiative.proposer}</span> | Estado: <span className="text-primary font-medium">{initiative.status}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-balance">{initiative.summary}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4" /> {initiative.comments}
                    </span>
                    <span className="flex items-center gap-1.5">
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
