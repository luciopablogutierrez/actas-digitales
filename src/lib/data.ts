
import type { Session, CouncilMember, Topic, CitizenInitiative, SpeakingSlot } from '@/lib/types';

const futureDate = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
}


export const councilMembers: CouncilMember[] = [
  { id: 'cm1', name: 'Alejandro Coria', party: 'Potencia', avatarUrl: 'https://i.pravatar.cc/150?u=cm1', attendance: [{ sessionId: 's1', present: true }, { sessionId: 's2', present: true }, { sessionId: 's-live', present: true }] },
  { id: 'cm2', name: 'Luis Fernández', party: 'Frente Renovador', avatarUrl: 'https://i.pravatar.cc/150?u=cm2', attendance: [{ sessionId: 's1', present: true }, { sessionId: 's2', present: false }, { sessionId: 's-live', present: true }] },
  { id: 'cm3', name: 'Marta Pérez', party: 'Unión por el Futuro', avatarUrl: 'https://i.pravatar.cc/150?u=wom_2', attendance: [{ sessionId: 's1', present: true }, { sessionId: 's2', present: true }, { sessionId: 's-live', present: false }] },
  { id: 'cm4', name: 'Carlos Rodríguez', party: 'Potencia', avatarUrl: 'https://i.pravatar.cc/150?u=cm4', attendance: [{ sessionId: 's1', present: false }, { sessionId: 's2', present: true }, { sessionId: 's-live', present: true }] },
  { id: 'cm5', name: 'Laura Martinez', party: 'Frente Renovador', avatarUrl: 'https://i.pravatar.cc/150?u=wom_3', attendance: [{ sessionId: 's1', present: true }, { sessionId: 's2', present: true }, { sessionId: 's-live', present: true }] },
  { id: 'cm6', name: 'Jorge Gómez', party: 'Unión por el Futuro', avatarUrl: 'https://i.pravatar.cc/150?u=cm6', attendance: [{ sessionId: 's1', present: true }, { sessionId: 's2', present: true }, { sessionId: 's-live', present: true }] },
];

export const topics: Topic[] = [
  { id: 't1', fileNumber: 'EXP-2024-101', title: 'Modificación del Código de Edificación Urbano', presenter: 'Alejandro Coria', result: 'Aprobado', summary: 'Propuesta para actualizar las normativas de construcción en altura en el centro de la ciudad, flexibilizando los requisitos para nuevos desarrollos y promoviendo la densificación urbana.', voteLink: '#' },
  { id: 't2', fileNumber: 'EXP-2024-102', title: 'Creación del Parque Industrial Norte', presenter: 'Comisión de Obras', result: 'Aprobado', summary: 'Proyecto para la creación de un nuevo parque industrial en la zona norte, con el objetivo de atraer inversiones y generar empleo local. Se debaten las exenciones impositivas.' },
  { id: 't3', fileNumber: 'EXP-2024-103', title: 'Exención de tasas para ONGs', presenter: 'Luis Fernández', result: 'Rechazado', summary: 'Iniciativa que buscaba eximir del pago de tasas municipales a todas las Organizaciones No Gubernamentales con sede en la ciudad. Fue rechazada por falta de consenso fiscal.' },
  { id: 't4', fileNumber: 'EXP-2024-104', title: 'Plan de Forestación Urbana 2024-2025', presenter: 'Marta Pérez', result: 'Aprobado', summary: 'Se aprueba el plan de forestación que incluye la plantación de 1000 nuevos árboles de especies nativas en distintas zonas de la ciudad para mejorar el medio ambiente urbano.', voteLink: '#' },
  { id: 't5', fileNumber: 'EXP-2024-105', title: 'Regulación de Food Trucks', presenter: 'Carlos Rodríguez', result: 'Rechazado', summary: 'Se está evaluando una nueva ordenanza para regular la ubicación, horarios y requisitos sanitarios para los camiones de comida en la vía pública.' },
];

export const sessions: Session[] = [
  { 
    id: 's-live', 
    title: 'Sesión Ordinaria N°16 - EN VIVO',
    date: new Date(new Date().setHours(10,0,0,0)).toISOString(), 
    status: 'Confirmada',
    committee: 'Plenario',
    agenda: ['Tema 4', 'Tema 5'],
    attendees: councilMembers,
    topics: topics.slice(3, 5)
  },
  { 
    id: 's1', 
    title: 'Sesión Ordinaria N°15', 
    date: '2024-08-15T10:00:00Z', 
    status: 'Confirmada',
    committee: 'Plenario',
    agenda: ['Tema 1', 'Tema 2'],
    attendees: councilMembers,
    topics: topics.slice(0, 2)
  },
  { 
    id: 's2', 
    title: 'Sesión Especial - Presupuesto 2025', 
    date: '2024-08-22T09:00:00Z', 
    status: 'Confirmada',
    committee: 'Comisión de Hacienda',
    agenda: ['Presupuesto', 'Tasas'],
    attendees: councilMembers,
    topics: [topics[2]]
  },
   { 
    id: 's5', 
    title: 'Sesión Ordinaria N°17', 
    date: futureDate(7), 
    status: 'Confirmada',
    committee: 'Plenario',
    agenda: [],
    attendees: [],
    topics: []
  },
  { 
    id: 's6', 
    title: 'Reunión de Comisión de Obras Públicas', 
    date: futureDate(14), 
    status: 'Pendiente',
    committee: 'Comisión de Obras Públicas',
    agenda: [],
    attendees: [],
    topics: []
  },
    { 
    id: 's3', 
    title: 'Reunión de Comisión de Salud', 
    date: futureDate(21),
    status: 'Pendiente',
    committee: 'Comisión de Salud',
    agenda: [],
    attendees: [],
    topics: []
  },
  { 
    id: 's4', 
    title: 'Audiencia Pública - Transporte', 
    date: futureDate(28),
    status: 'Cancelada',
    committee: 'Plenario',
    agenda: [],
    attendees: [],
    topics: []
  },
  {
    id: 's7',
    title: 'Sesión Ordinaria N°14',
    date: '2024-08-01T10:00:00Z',
    status: 'Confirmada',
    committee: 'Plenario',
    agenda: [],
    attendees: councilMembers,
    topics: [],
  },
  {
    id: 's8',
    title: 'Sesión Ordinaria N°13',
    date: '2024-07-18T10:00:00Z',
    status: 'Confirmada',
    committee: 'Plenario',
    agenda: [],
    attendees: councilMembers,
    topics: [],
  },
  {
    id: 's9',
    title: 'Reunión Comisión de Hacienda',
    date: '2024-07-11T09:00:00Z',
    status: 'Confirmada',
    committee: 'Comisión de Hacienda',
    agenda: [],
    attendees: [],
    topics: [],
  },
  {
    id: 's10',
    title: 'Sesión Extraordinaria - Tarifas',
    date: '2024-07-04T11:00:00Z',
    status: 'Cancelada',
    committee: 'Plenario',
    agenda: [],
    attendees: [],
    topics: [],
  },
  {
    id: 's11',
    title: 'Sesión Ordinaria N°18',
    date: futureDate(35),
    status: 'Confirmada',
    committee: 'Plenario',
    agenda: [],
    attendees: [],
    topics: [],
  },
  {
    id: 's12',
    title: 'Reunión de Labor Parlamentaria',
    date: futureDate(40),
    status: 'Pendiente',
    committee: 'Labor Parlamentaria',
    agenda: [],
    attendees: [],
    topics: [],
  },
  {
    id: 's13',
    title: 'Sesión Especial - Emergencia Hídrica',
    date: futureDate(45),
    status: 'Pendiente',
    committee: 'Plenario',
    agenda: [],
    attendees: [],
    topics: [],
  },
  {
    id: 's14',
    title: 'Audiencia Pública - Código Urbano',
    date: futureDate(50),
    status: 'Cancelada',
    committee: 'Plenario',
    agenda: [],
    attendees: [],
    topics: [],
  },
  {
    id: 's15',
    title: 'Sesión Ordinaria N°19',
    date: futureDate(55),
    status: 'Confirmada',
    committee: 'Plenario',
    agenda: [],
    attendees: [],
    topics: [],
  },
  {
    id: 's16',
    title: 'Reunión Comisión de Medio Ambiente',
    date: futureDate(60),
    status: 'Pendiente',
    committee: 'Comisión de Medio Ambiente',
    agenda: [],
    attendees: [],
    topics: [],
  },
];

export const citizenInitiatives: CitizenInitiative[] = [
    { id: 'ci1', title: 'Instalación de Puntos Verdes', proposer: 'Vecinos Autoconvocados', summary: 'Solicitud para instalar más centros de reciclaje en todos los barrios para fomentar la separación de residuos y el cuidado del medio ambiente.', status: 'En comisión', support: 1250, comments: 45 },
    { id: 'ci2', title: 'Mejora de la Plaza Central', proposer: 'Junta Vecinal Centro', summary: 'Proyecto para la renovación de juegos infantiles, bancos y luminaria en la plaza principal del pueblo, creando un espacio más seguro y moderno para las familias.', status: 'Recibido', support: 800, comments: 22 },
];

export const speakingSlots: SpeakingSlot[] = [
    { id: 'ss1', citizenName: 'Juan Perez', topic: 'Seguridad en el barrio Norte', date: new Date('2024-08-20') },
    { id: 'ss2', citizenName: 'Maria Gomez', topic: 'Propuesta de ciclovías', date: new Date('2024-08-27') },
    { id: 'ss3', citizenName: 'Ricardo Sosa', topic: 'Estado de las calles', date: new Date('2024-09-03') },
];
