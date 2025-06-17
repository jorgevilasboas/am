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
      next(error);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const empreendimentos = await empreendimentoModel.findAll();
      res.json(empreendimentos);
    } catch (error) {
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
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const empreendimento = await empreendimentoModel.update(id, data);
      res.json(empreendimento);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await empreendimentoModel.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
}; 