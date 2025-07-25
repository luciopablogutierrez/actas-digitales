import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { citizenInitiatives, speakingSlots } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp } from "lucide-react";

export default function ParticipationPage() {
  return (
    <Tabs defaultValue="citizen-bench" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="citizen-bench">Banca Ciudadana</TabsTrigger>
        <TabsTrigger value="initiatives">Iniciativas Populares</TabsTrigger>
      </TabsList>
      <TabsContent value="citizen-bench">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle className="font-headline">Turnos para Exponer</CardTitle>
              <CardDescription>
                Consulta el calendario de turnos para la Banca Ciudadana.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-0">
               <Calendar
                mode="single"
                ISOWeek
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
             <CardHeader>
              <CardTitle className="font-headline">Próximos Turnos</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {speakingSlots.map(slot => (
                 <div key={slot.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{slot.citizenName}</p>
                    <p className="text-sm text-muted-foreground">{slot.topic}</p>
                  </div>
                   <p className="text-sm text-muted-foreground">{slot.date.toLocaleDateString()}</p>
                </div>
              ))}
            </CardContent>
             <CardFooter>
              <Button className="w-full">Solicitar Turno</Button>
            </CardFooter>
          </Card>
        </div>
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
                <CardFooter className="flex justify-end gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" /> {initiative.comments}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" /> {initiative.support}
                  </div>
                  <Button variant="outline">Apoyar</Button>
                  <Button>Ver Detalles</Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
