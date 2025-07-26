
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { councilMembers } from "@/lib/data";

export default function SettingsPage() {
  const { toast } = useToast();
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(councilMembers[0]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const handleThemeChange = (value: "light" | "dark") => {
    setTheme(value);
    document.documentElement.classList.toggle("dark", value === "dark");
    localStorage.setItem("theme", value);
  };
  
  const handleAvatarChange = () => {
    const newId = `cm${Math.floor(Math.random() * 100)}`;
    setUser(currentUser => ({
        ...currentUser,
        avatarUrl: `https://i.pravatar.cc/150?u=${newId}`
    }));
  }

  const handleSaveChanges = () => {
    // In a real app, you would save the user state to your backend here.
    toast({
      title: "Cambios Guardados",
      description: "Tu configuración ha sido actualizada.",
    });
  };

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-headline tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Gestiona tu perfil, notificaciones y preferencias de la aplicación.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>
            Esta es tu información pública.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="flex items-center gap-4">
             <Avatar className="h-20 w-20 border">
                <AvatarImage src={user.avatarUrl} alt={`Avatar de ${user.name}`} />
                <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleAvatarChange}>Cambiar Avatar</Button>
           </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input 
                id="name" 
                value={user.name} 
                onChange={(e) => setUser({...user, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="party">Partido</Label>
              <Input 
                id="party" 
                value={user.party} 
                onChange={(e) => setUser({...user, party: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
          <CardDescription>
            Elige qué notificaciones quieres recibir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="notification-sessions" className="font-medium">Nuevas Sesiones</Label>
              <p className="text-sm text-muted-foreground">
                Recibir avisos cuando se programan nuevas sesiones.
              </p>
            </div>
            <Switch id="notification-sessions" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="notification-initiatives" className="font-medium">Iniciativas Populares</Label>
              <p className="text-sm text-muted-foreground">
                Recibir avisos sobre nuevas iniciativas ciudadanas.
              </p>
            </div>
            <Switch id="notification-initiatives" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>
            Personaliza la apariencia de la aplicación.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <RadioGroup
                value={theme}
                onValueChange={(value) => handleThemeChange(value as any)}
                className="grid sm:grid-cols-2 gap-4"
              >
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Claro
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Oscuro
                </Label>
              </div>
            </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
      </div>
    </div>
  );
}
