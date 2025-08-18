
"use client"
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Clock, FileText, Users, Calendar, AlertTriangle } from "lucide-react";

// Mock data based on the prompt
const referendumData = {
  mayorName: "Francisco Ratto",
  electorate: 25000, // Total registered voters
  requiredSignaturesPercentage: 10,
  collectedSignatures: 1850,
  processStartDate: new Date('2024-03-01'),
  maxCollectionDays: 365,
  mandateStartDate: new Date('2023-12-10'),
  mandateEndDate: new Date('2027-12-10'),
};

export function ReferendumStatus() {
  const [daysRemaining, setDaysRemaining] = useState(0);

  const requiredSignatures = (referendumData.electorate * referendumData.requiredSignaturesPercentage) / 100;
  const progressPercentage = (referendumData.collectedSignatures / requiredSignatures) * 100;
  
  const now = new Date();
  const monthsInOffice = (now.getFullYear() - referendumData.mandateStartDate.getFullYear()) * 12 + (now.getMonth() - referendumData.mandateStartDate.getMonth());
  const monthsLeftInOffice = (referendumData.mandateEndDate.getFullYear() - now.getFullYear()) * 12 + (referendumData.mandateEndDate.getMonth() - now.getMonth());

  const areConditionsMet = monthsInOffice > 12 && monthsLeftInOffice > 6;

  useEffect(() => {
    const endDate = new Date(referendumData.processStartDate);
    endDate.setDate(endDate.getDate() + referendumData.maxCollectionDays);
    const remainingTime = endDate.getTime() - new Date().getTime();
    const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(remainingDays > 0 ? remainingDays : 0);
  }, []);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Proceso de Referéndum Revocatorio</CardTitle>
        <CardDescription>
          Seguimiento del estado actual del proceso de revocatoria de mandato para el intendente {referendumData.mayorName}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {!areConditionsMet && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Condiciones No Habilitantes</AlertTitle>
                <AlertDescription>
                    El proceso de revocatoria no puede iniciarse actualmente. Se requiere que el intendente haya cumplido más de 12 meses de mandato y que resten más de 6 meses para finalizarlo.
                </AlertDescription>
            </Alert>
        )}
      
        {areConditionsMet && (
            <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2"><FileText className="h-4 w-4" /> Adhesiones Requeridas</CardDescription>
                       <CardTitle className="text-3xl font-bold">{requiredSignatures.toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Equivalente al {referendumData.requiredSignaturesPercentage}% del padrón electoral ({referendumData.electorate.toLocaleString()} electores).
                      </p>
                    </CardContent>
                  </Card>
                   <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                       <CardDescription className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Plazo Restante</CardDescription>
                       <CardTitle className="text-3xl font-bold">{daysRemaining} días</CardTitle>
                    </CardHeader>
                     <CardContent>
                      <p className="text-xs text-muted-foreground">
                        Para la recolección y autenticación de firmas.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Etapa 2: Recolección de Adhesiones</h3>
                     <div className="space-y-3">
                        <Progress value={progressPercentage} aria-label={`${progressPercentage.toFixed(2)}% de firmas recolectadas`} />
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-muted-foreground">
                                <Users className="inline h-4 w-4 mr-1.5" />
                                {referendumData.collectedSignatures.toLocaleString()} firmas válidas
                            </span>
                            <span className="font-bold text-lg">{progressPercentage.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Próximos Pasos</h3>
                     <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                                <span className="font-semibold text-foreground">Etapa 1: Presentación del Petitorio</span>
                                <p>Completada y aceptada por la Junta Electoral.</p>
                            </div>
                        </li>
                         <li className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
                             <div>
                                <span className="font-semibold text-foreground">Etapa 2: Recolección de Adhesiones</span>
                                <p>Actualmente en curso.</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-3 opacity-60">
                             <Clock className="h-5 w-5" />
                             <div>
                                <span className="font-semibold text-foreground">Etapa 3: Verificación de Firmas</span>
                                <p>La Junta Electoral verificará las firmas en un plazo de 20 días.</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-3 opacity-60">
                            <Clock className="h-5 w-5" />
                             <div>
                                <span className="font-semibold text-foreground">Etapa 4: Convocatoria a Referéndum</span>
                                <p>Si se alcanza el 10%, se convocará a referéndum en un plazo de 30 a 60 días.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )}

      </CardContent>
      <CardFooter>
          <Button variant="outline" className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            Ver Programa de Gobierno Original
          </Button>
      </CardFooter>
    </Card>
  );
}
