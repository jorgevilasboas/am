import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export interface CreateEmpreendimentoInput {
  construtora: string;
  empreendimento: string;
  bairro: string;
  tipo: string;
  dataEntrega: Date;
  description: string;
  status?: string;
  renda?: number;
  tabelaLink?: string;
  book?: string;
  bookOriginalName?: string;
  area_de?: Decimal | number | string;
  area_ate?: Decimal | number | string;
}

export interface UpdateEmpreendimentoInput extends Partial<CreateEmpreendimentoInput> {}

export const empreendimentoModel = {
  async create(data: CreateEmpreendimentoInput) {
    // Convert area fields to Decimal if they exist
    if (data.area_de) {
      data.area_de = new Decimal(data.area_de.toString());
    }
    if (data.area_ate) {
      data.area_ate = new Decimal(data.area_ate.toString());
    }
    
    return prisma.empreendimento.create({
      data,
    });
  },

  async findAll() {
    return prisma.empreendimento.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  async findById(id: string) {
    return prisma.empreendimento.findUnique({
      where: { id },
    });
  },

  async update(id: string, data: UpdateEmpreendimentoInput) {
    // Convert area fields to Decimal if they exist
    if (data.area_de) {
      data.area_de = new Decimal(data.area_de.toString());
    }
    if (data.area_ate) {
      data.area_ate = new Decimal(data.area_ate.toString());
    }

    return prisma.empreendimento.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.empreendimento.delete({
      where: { id },
    });
  },
}; 