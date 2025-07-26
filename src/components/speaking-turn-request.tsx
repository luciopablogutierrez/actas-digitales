
"use client"
import { useState, useEffect } from "react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const formSchema = z.object({
  name: z.string().min(3, { message: "El nombre es requerido." }),
  topic: z.string().min(5, { message: "El tema es requerido." }),
  summary: z.string().min(10, { message: "El resumen es requerido." }),
  captcha: z.string().refine(val => !isNaN(parseInt(val, 10)), { message: "Debe ser un número."}),
});


export function SpeakingTurnRequest() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);

     useEffect(() => {
        if (isDialogOpen) {
            setNum1(Math.floor(Math.random() * 10));
            setNum2(Math.floor(Math.random() * 10));
        }
    }, [isDialogOpen]);
    
    const dynamicFormSchema = formSchema.refine(data => parseInt(data.captcha, 10) === num1 + num2, {
        message: "Respuesta incorrecta.",
        path: ["captcha"],
    });

    const form = useForm<z.infer<typeof dynamicFormSchema>>({
        resolver: zodResolver(dynamicFormSchema),
        defaultValues: {
            name: "",
            topic: "",
            summary: "",
            captcha: "",
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
        <>
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
            </CardHeader>
            <CardContent className="grid gap-4">
              {speakingSlots.map((slot) => (
                <div key={slot.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{slot.citizenName}</p>
                    <p className="text-sm text-muted-foreground">{slot.topic}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {slot.date.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full">Solicitar Turno</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Solicitar Turno en Banca Ciudadana</DialogTitle>
                            <DialogDescription>
                                Completa el formulario para solicitar tu turno.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Nombre</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage className="col-span-4 text-right" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Tema</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage className="col-span-4 text-right" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="summary"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">Resumen</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} className="col-span-3" />
                                            </FormControl>
                                            <FormMessage className="col-span-4 text-right" />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="captcha"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">¿Cuánto es {num1} + {num2}?</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="col-span-3" placeholder="Tu respuesta"/>
                                            </FormControl>
                                            <FormMessage className="col-span-4 text-right" />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Enviar Solicitud</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>
        </div>
        <Toaster />
        </>
    )
}
