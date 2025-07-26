
"use client"
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  proposer: z.string().min(3, { message: "Tu nombre es requerido." }),
  title: z.string().min(10, { message: "El título debe tener al menos 10 caracteres." }),
  summary: z.string().min(20, { message: "El resumen debe tener al menos 20 caracteres." }),
  isHuman: z.boolean().refine(val => val === true, { message: "Debes confirmar que no eres un robot." }),
});

export function ProposeInitiativeDialog({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            proposer: "",
            title: "",
            summary: "",
            isHuman: false,
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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
                                    </div>
                                    <FormMessage />
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
