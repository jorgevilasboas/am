export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  crmLink?: string;
  renda?: number;
  dataNascimento?: string;
  entrada?: number;
  anotacoes?: string;
  createdAt: string;
  updatedAt: string;
} 