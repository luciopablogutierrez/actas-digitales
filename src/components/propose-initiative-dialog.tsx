
"use client"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  proposer: z.string().min(3, { message: "Tu nombre es requerido." }),
  title: z.string().min(10, { message: "El título debe tener al menos 10 caracteres." }),
  summary: z.string().min(20, { message: "El resumen debe tener al menos 20 caracteres." }),
  captcha: z.string().refine(val => !isNaN(parseInt(val, 10)), { message: "Debe ser un número."}),
});

export function ProposeInitiativeDialog({ children }: { children: React.ReactNode }) {
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
            proposer: "",
            title: "",
            summary: "",
            captcha: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Iniciativa Enviada",
            description: "Tu propuesta ha sido enviada para su revisión. ¡Gracias por participar!",
        });
        form.reset();
        setIsDialogOpen(false);
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline">Proponer una Iniciativa Ciudadana</DialogTitle>
                    <DialogDescription>
                        Completa el formulario con tu propuesta. Será revisada por el concejo.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="proposer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tu Nombre Completo</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Ej: Juana Pérez" />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título de la Iniciativa</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Ej: Creación de un nuevo parque en el Barrio Sol" />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Resumen de la Propuesta</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Describe tu idea de la forma más clara posible..." />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="captcha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>¿Cuánto es {num1} + {num2}?</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Tu respuesta"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Enviar Iniciativa</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
