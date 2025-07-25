
"use client"
import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function SpeakingTurnRequest() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
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
                <Dialog>
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
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nombre
                                </Label>
                                <Input id="name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="topic" className="text-right">
                                    Tema
                                </Label>
                                <Input id="topic" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="summary" className="text-right">
                                    Resumen
                                </Label>
                                <Textarea id="summary" className="col-span-3" />
                            </div>
                        </div>
                         <Button type="submit">Enviar Solicitud</Button>
                    </DialogContent>
                </Dialog>
            </CardFooter>
          </Card>
        </div>
    )
}
