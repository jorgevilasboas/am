import { Request, Response, NextFunction } from 'express';
import { empreendimentoModel, CreateEmpreendimentoInput } from '../models/Empreendimento';
import { AppError } from '../middlewares/error.middleware';

export const empreendimentoController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as CreateEmpreendimentoInput;
      const empreendimento = await empreendimentoModel.create(data);
      res.status(201).json(empreendimento);
    } catch (error) {
      console.error('Error creating empreendimento:', error);
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const empreendimentos = await empreendimentoModel.findAll();
      res.json(empreendimentos);
    } catch (error) {
      console.error('Error fetching empreendimentos:', error);
      next(error);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const empreendimento = await empreendimentoModel.findById(id);
      
      if (!empreendimento) {
        throw new AppError('Empreendimento not found', 404);
      }

      res.json(empreendimento);
    } catch (error) {
      console.error('Error fetching empreendimento:', error);
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      // Convert dataEntrega to Date if it exists
      if (data.dataEntrega) {
        data.dataEntrega = new Date(data.dataEntrega);
      }

      // Convert renda to number if it exists
      if (data.renda !== undefined && data.renda !== null && data.renda !== '') {
        data.renda = parseFloat(data.renda);
      }

      const empreendimento = await empreendimentoModel.update(id, data);
      res.json(empreendimento);
    } catch (error) {
      console.error('Error updating empreendimento:', error);
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await empreendimentoModel.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting empreendimento:', error);
      next(error);
    }
  },
}; 