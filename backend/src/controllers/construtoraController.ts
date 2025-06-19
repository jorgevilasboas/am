import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const construtoraController = {
  // Get all construtoras
  async getAll(req: Request, res: Response) {
    try {
      const construtoras = await prisma.construtora.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          _count: {
            select: {
              empreendimentos: true
            }
          }
        }
      });
      res.json(construtoras);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching construtoras' });
    }
  },

  // Get construtora by id
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const construtora = await prisma.construtora.findUnique({
        where: { id },
        include: {
          empreendimentos: true
        }
      });

      if (!construtora) {
        return res.status(404).json({ error: 'Construtora not found' });
      }

      res.json(construtora);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching construtora' });
    }
  },

  // Create new construtora
  async create(req: Request, res: Response) {
    try {
      const { nome, link } = req.body;

      const construtora = await prisma.construtora.create({
        data: {
          nome,
          link
        }
      });

      res.status(201).json(construtora);
    } catch (error) {
      res.status(500).json({ error: 'Error creating construtora' });
    }
  },

  // Update construtora
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, link } = req.body;

      const construtora = await prisma.construtora.update({
        where: { id },
        data: {
          nome,
          link
        }
      });

      res.json(construtora);
    } catch (error) {
      res.status(500).json({ error: 'Error updating construtora' });
    }
  },

  // Delete construtora
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if construtora has empreendimentos
      const construtora = await prisma.construtora.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              empreendimentos: true
            }
          }
        }
      });

      if (construtora?._count.empreendimentos > 0) {
        return res.status(400).json({ 
          error: 'Cannot delete construtora with associated empreendimentos' 
        });
      }

      await prisma.construtora.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting construtora' });
    }
  }
}; 