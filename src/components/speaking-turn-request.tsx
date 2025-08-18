
"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { speakingSlots } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, { message: "El Nombre y Apellido son requeridos." }),
  topic: z.string().min(5, { message: "El título del tema es requerido (máx 100 caracteres)." }).max(100),
  summary: z.string().min(10, { message: "El resumen es requerido (máx 300 palabras)." }).max(1800), // Approx 300 words
});

// Mock database to simulate existing requests
const citizenRequests: Record<string, { weekly: number, monthly: number }> = {
    "Juan Perez": { weekly: 2, monthly: 5 },
    "Maria Gomez": { weekly: 3, monthly: 11 },
    "Ricardo Sosa": { weekly: 1, monthly: 12 },
};

export function SpeakingTurnRequest() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            topic: "",
            summary: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const citizenName = values.name.trim();
        const requests = citizenRequests[citizenName] || { weekly: 0, monthly: 0 };
        
        // --- Simulated Backend Validation ---
        if (requests.monthly >= 12) {
            toast({
                title: "Límite Mensual Alcanzado",
                description: "Ya has alcanzado el límite de 12 solicitudes este mes.",
                variant: "destructive",
            });
            return;
        }

        if (requests.weekly >= 3) {
            toast({
                title: "Límite Semanal Alcanzado",
                description: "No puedes solicitar más de 3 turnos por semana.",
                variant: "destructive",
            });
            return;
        }
        // --- End of Simulation ---

        console.log("Solicitud de Banca Ciudadana:", values);
        toast({
            title: "Solicitud Enviada Correctamente",
            description: "Tu solicitud de turno ha sido registrada y será confirmada a la brevedad.",
        });
        
        // In a real app, you would update the backend here.
        // For simulation, we increment the mock data.
        if (!citizenRequests[citizenName]) {
            citizenRequests[citizenName] = { weekly: 0, monthly: 0 };
        }
        citizenRequests[citizenName].weekly++;
        citizenRequests[citizenName].monthly++;

        form.reset();
        setIsDialogOpen(false);
    }

    return (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-[1fr_400px]">
          <Card className="flex flex-col">
            <CardHeader className="items-center text-center">
              <CardTitle className="font-headline text-2xl">Turnos para Banca Ciudadana</CardTitle>
              <CardDescription className="text-balance">
                Consulta el calendario y solicita tu turno para exponer en el Concejo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex justify-center items-center p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                ISOWeek
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                className="rounded-md sm:border"
              />
            </CardContent>
             <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground p-4">
                <p>Las solicitudes deben realizarse con un mínimo de 48hs de anticipación.</p>
                <p>Duración máxima de la exposición: 15 minutos.</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Próximos Turnos Confirmados</CardTitle>
              <CardDescription>Ciudadanos que expondrán próximamente.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {speakingSlots.length > 0 ? speakingSlots.map((slot) => (
                <div key={slot.id} className="flex items-center justify-between gap-4 p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{slot.citizenName}</p>
                    <p className="text-sm text-muted-foreground truncate">{slot.topic}</p>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {slot.date.toLocaleDateString()}
                  </p>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground text-center py-8">No hay turnos programados.</p>
              )}
            </CardContent>
            <CardFooter>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">Solicitar Turno</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle id="request-turn-title" className="font-headline text-2xl">Solicitar Turno en Banca Ciudadana</DialogTitle>
                            <DialogDescription>
                                Completa el formulario para solicitar tu turno. Tu solicitud será revisada.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4" aria-labelledby="request-turn-title">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre y Apellido</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Tu nombre completo" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tema a Tratar</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Título del tema (máx. 100 caracteres)" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="summary"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Resumen del Tema</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} rows={6} placeholder="Describe brevemente de qué se trata (máx. 300 palabras)" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                     <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                                    <Button type="submit">Enviar Solicitud</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>
        </div>
    )
}
