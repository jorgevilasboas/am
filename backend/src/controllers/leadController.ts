import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const leadController = {
  // Get all leads
  async getAll(req: Request, res: Response) {
    try {
      const leads = await prisma.lead.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching leads' });
    }
  },

  // Get a single lead by ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lead = await prisma.lead.findUnique({
        where: { id }
      });

      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }

      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching lead' });
    }
  },

  // Create a new lead
  async create(req: Request, res: Response) {
    try {
      const { nome, telefone, email, crmLink, renda, dataNascimento, entrada, anotacoes } = req.body;

      const data: any = { nome, telefone };
      if (email) data.email = email;
      if (crmLink) data.crmLink = crmLink;
      if (renda !== undefined && renda !== null && renda !== '') data.renda = parseFloat(renda);
      if (dataNascimento) data.dataNascimento = new Date(dataNascimento);
      if (entrada !== undefined && entrada !== null && entrada !== '') data.entrada = parseFloat(entrada);
      if (anotacoes) data.anotacoes = anotacoes;

      const lead = await prisma.lead.create({ data });
      res.status(201).json(lead);
    } catch (error) {
      res.status(500).json({ error: 'Error creating lead' });
    }
  },

  // Update a lead
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, telefone, email, crmLink, renda, dataNascimento, entrada, anotacoes } = req.body;

      const data: any = { nome, telefone };
      if (email) data.email = email;
      if (crmLink) data.crmLink = crmLink;
      if (renda !== undefined && renda !== null && renda !== '') data.renda = parseFloat(renda);
      if (dataNascimento) data.dataNascimento = new Date(dataNascimento);
      if (entrada !== undefined && entrada !== null && entrada !== '') data.entrada = parseFloat(entrada);
      if (anotacoes) data.anotacoes = anotacoes;

      const lead = await prisma.lead.update({
        where: { id },
        data
      });

      res.json(lead);
    } catch (error) {
      res.status(500).json({ error: 'Error updating lead' });
    }
  },

  // Delete a lead
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.lead.delete({
        where: { id }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting lead' });
    }
  }
}; 