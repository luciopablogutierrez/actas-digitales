import type { Session, CouncilMember, Topic, CitizenInitiative, SpeakingSlot } from '@/lib/types';

export const councilMembers: CouncilMember[] = [
  { id: 'cm1', name: 'Ana García', party: 'Partido de la Ciudad', avatarUrl: 'https://placehold.co/100x100', attendance: [{ sessionId: 's1', present: true }, { sessionId: 's2', present: true }] },
  { id: 'cm2', name: 'Luis Fernández', party: 'Frente Renovador', avatarUrl: 'https://placehold.co/100x100', attendance: [{ sessionId: 's1', present: true }, { sessionId: 's2', present: false }] },
  { id: 'cm3', name: 'Marta Pérez', party: 'Unión por el Futuro', avatarUrl: 'https://placehold.co/100x100', attendance: [{ sessionId: 's1', present: true }, { sessionId: 's2', present: true }] },
  { id: 'cm4', name: 'Carlos Rodríguez', party: 'Partido de la Ciudad', avatarUrl: 'https://placehold.co/100x100', attendance: [{ sessionId: 's1', present: false }, { sessionId: 's2', present: true }] },
];

export const topics: Topic[] = [
  { id: 't1', fileNumber: 'EXP-2024-101', title: 'Modificación del Código de Edificación Urbano', presenter: 'Ana García', result: 'Aprobado', summary: 'Propuesta para actualizar las normativas de construcción en altura en el centro de la ciudad, flexibilizando los requisitos para nuevos desarrollos y promoviendo la densificación urbana.', voteLink: '#' },
  { id: 't2', fileNumber: 'EXP-2024-102', title: 'Creación del Parque Industrial Norte', presenter: 'Comisión de Obras', result: 'Pendiente', summary: 'Proyecto para la creación de un nuevo parque industrial en la zona norte, con el objetivo de atraer inversiones y generar empleo local. Se debaten las exenciones impositivas.' },
  { id: 't3', fileNumber: 'EXP-2024-103', title: 'Exención de tasas para ONGs', presenter: 'Luis Fernández', result: 'Rechazado', summary: 'Iniciativa que buscaba eximir del pago de tasas municipales a todas las Organizaciones No Gubernamentales con sede en la ciudad. Fue rechazada por falta de consenso fiscal.' },
];

export const sessions: Session[] = [
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
    id: 's3', 
    title: 'Reunión de Comisión de Salud', 
    date: '2024-08-29T11:00:00Z', 
    status: 'Pendiente',
    committee: 'Comisión de Salud',
    agenda: [],
    attendees: [],
    topics: []
  },
  { 
    id: 's4', 
    title: 'Audiencia Pública - Transporte', 
    date: '2024-09-05T18:00:00Z', 
    status: 'Cancelada',
    committee: 'Plenario',
    agenda: [],
    attendees: [],
    topics: []
  },
];

export const citizenInitiatives: CitizenInitiative[] = [
    { id: 'ci1', title: 'Instalación de Puntos Verdes', proposer: 'Vecinos Autoconvocados', summary: 'Solicitud para instalar más centros de reciclaje en todos los barrios.', status: 'En comisión', support: 1250, comments: 45 },
    { id: 'ci2', title: 'Mejora de la Plaza Central', proposer: 'Junta Vecinal Centro', summary: 'Proyecto para la renovación de juegos infantiles y luminaria en la plaza principal.', status: 'Recibido', support: 800, comments: 22 },
];

export const speakingSlots: SpeakingSlot[] = [
    { id: 'ss1', citizenName: 'Juan Perez', topic: 'Seguridad en el barrio Norte', date: new Date('2024-08-20') },
    { id: 'ss2', citizenName: 'Maria Gomez', topic: 'Propuesta de ciclovías', date: new Date('2024-08-27') },
];
