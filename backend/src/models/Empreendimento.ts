import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateEmpreendimentoInput {
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateEmpreendimentoInput extends Partial<CreateEmpreendimentoInput> {}

export const empreendimentoModel = {
  async create(data: CreateEmpreendimentoInput) {
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