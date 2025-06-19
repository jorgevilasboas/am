export interface Construtora {
  id: string;
  nome: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    empreendimentos: number;
  };
} 