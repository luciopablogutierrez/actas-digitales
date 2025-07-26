
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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(3, { message: "El nombre es requerido." }),
  topic: z.string().min(5, { message: "El tema es requerido." }),
  summary: z.string().min(10, { message: "El resumen es requerido." }),
  isHuman: z.boolean().refine(val => val === true, { message: "Debes confirmar que no eres un robot." }),
});


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
            isHuman: false,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Solicitud Enviada",
            description: "Tu solicitud de turno ha sido enviada con éxito.",
        });
        form.reset();
        setIsDialogOpen(false);
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader className="items-center text-center">
              <CardTitle className="font-headline text-2xl">Turnos para Exponer</CardTitle>
              <CardDescription className="text-balance">
                Consulta el calendario de turnos para la Banca Ciudadana y solicita el tuyo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                ISOWeek
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-headline">Próximos Turnos</CardTitle>
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
                            <DialogTitle className="font-headline text-2xl">Solicitar Turno en Banca Ciudadana</DialogTitle>
                            <DialogDescription>
                                Completa el formulario para solicitar tu turno. Tu solicitud será revisada.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
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
                                            <FormLabel>Tema a Exponer</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Título del tema" />
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
                                            <FormLabel>Breve Resumen</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Describe brevemente de qué se trata" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="isHuman"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                             <FormControl>
                                                <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    No soy un robot
                                                </FormLabel>
                                                <FormDescription>
                                                    Esta verificación ayuda a prevenir el spam.
                                                </FormDescription>
                                            </div>
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
