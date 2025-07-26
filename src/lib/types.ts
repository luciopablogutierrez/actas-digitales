export interface Session {
  id: string;
  title: string;
  date: string;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
  committee: string;
  agenda: string[];
  attendees: CouncilMember[];
  topics: Topic[];
}

export interface CouncilMember {
  id: string;
  name: string;
  party: string;
  avatarUrl: string;
  attendance: { sessionId: string; present: boolean }[];
}

export interface Topic {
  id: string;
  fileNumber: string;
  title: string;
  presenter: string;
  result: 'Aprobado' | 'Rechazado' | 'Pendiente';
  summary: string;
  voteLink?: string;
}

export interface CitizenInitiative {
  id: string;
  title: string;
  proposer: string;
  summary: string;
  status: 'Recibido' | 'En comisión' | 'Tratado';
  support: number;
  comments: number;
}

export interface SpeakingSlot {
  id: string;
  citizenName: string;
  topic: string;
  date: Date;
}
