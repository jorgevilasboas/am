import { Request, Response, NextFunction } from 'express';
import { empreendimentoModel, CreateEmpreendimentoInput } from '../models/Empreendimento';
import { AppError } from '../middlewares/error.middleware';
import fs from 'fs';
import path from 'path';

// Function to remove diacritics from text
const removeDiacritics = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Function to normalize filename
const normalizeFilename = (filename: string): string => {
  // Convert to NFC form (fully composed)
  return filename.normalize('NFC');
};

export const empreendimentoController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      
      // Convert string values to their proper types
      if (data.renda) data.renda = Number(data.renda);
      if (data.dataEntrega) data.dataEntrega = new Date(data.dataEntrega);
      if (data.area_de) data.area_de = Number(data.area_de);
      if (data.area_ate) data.area_ate = Number(data.area_ate);
      if (data.unidades !== undefined && data.unidades !== null && data.unidades !== '') {
        data.unidades = Number(data.unidades);
        if (isNaN(data.unidades)) data.unidades = undefined;
      }

      // Add book file path and original name if uploaded
      if (req.file) {
        data.book = req.file.filename;
        // Remove diacritics from the original filename
        data.bookOriginalName = removeDiacritics(req.file.originalname);
      }

      const empreendimento = await empreendimentoModel.create(data);
      res.status(201).json(empreendimento);
    } catch (error) {
      // Delete uploaded file if there's an error
      if (req.file) {
        const filePath = path.join(__dirname, '../../uploads/books', req.file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
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
      return empreendimento;
    } catch (error) {
      console.error('Error fetching empreendimento:', error);
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      // Convert string values to their proper types
      if (data.renda) data.renda = Number(data.renda);
      if (data.dataEntrega) data.dataEntrega = new Date(data.dataEntrega);
      if (data.area_de) data.area_de = Number(data.area_de);
      if (data.area_ate) data.area_ate = Number(data.area_ate);
      if (data.unidades !== undefined && data.unidades !== null && data.unidades !== '') {
        data.unidades = Number(data.unidades);
        if (isNaN(data.unidades)) data.unidades = undefined;
      }

      // If there's a new file uploaded
      if (req.file) {
        // Get the old file path
        const oldEmpreendimento = await empreendimentoModel.findById(id);

        if (oldEmpreendimento?.book) {
          // Delete the old file
          const oldFilePath = path.join(__dirname, '../../uploads/books', oldEmpreendimento.book);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }

        // Update with new file info
        data.book = req.file.filename;
        // Remove diacritics from the original filename
        data.bookOriginalName = removeDiacritics(req.file.originalname);
      }

      console.log('Update data received:', data);

      const updatedEmpreendimento = await empreendimentoModel.update(id, data);

      console.log('Final update data:', updatedEmpreendimento);

      res.json(updatedEmpreendimento);
    } catch (error) {
      console.error('Error updating empreendimento:', error);
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      // Delete book file if it exists
      const empreendimento = await empreendimentoModel.findById(id);
      if (empreendimento?.book) {
        const filePath = path.join(__dirname, '../../uploads/books', empreendimento.book);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await empreendimentoModel.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting empreendimento:', error);
      next(error);
    }
  },
}; 