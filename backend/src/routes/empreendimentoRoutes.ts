import { Router } from 'express';
import { empreendimentoController } from '../controllers/empreendimentoController';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { upload } from '../utils/upload';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Protect all routes
router.use(protect);

// Get all empreendimentos
router.get('/', empreendimentoController.findAll);

// Get single empreendimento
router.get('/:id', empreendimentoController.findById);

// Get book info
router.get('/:id/book-info', async (req, res, next) => {
  try {
    const { id } = req.params;
    const empreendimento = await prisma.empreendimento.findUnique({
      where: { id },
      select: {
        book: true,
        bookOriginalName: true
      }
    });
    
    if (!empreendimento?.book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({
      downloadUrl: `/api/empreendimentos/${id}/download/${encodeURIComponent(empreendimento.bookOriginalName || 'book.pdf')}`,
      filename: empreendimento.bookOriginalName || 'book.pdf'
    });
  } catch (error) {
    console.error('Error getting book info:', error);
    next(error);
  }
});

// Download book with filename
router.get('/:id/download/:filename', async (req, res, next) => {
  try {
    const { id } = req.params;
    const empreendimento = await prisma.empreendimento.findUnique({
      where: { id },
      select: {
        book: true,
        bookOriginalName: true
      }
    });
    
    if (!empreendimento?.book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const filePath = path.join(__dirname, '../../uploads/books', empreendimento.book);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Book file not found' });
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(empreendimento.bookOriginalName || 'book.pdf')}`
    });

    // Send file directly
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error in download route:', error);
    next(error);
  }
});

// Create empreendimento (admin only)
router.post('/', restrictTo('ADMIN'), upload.single('book'), empreendimentoController.create);

// Update empreendimento (admin only)
router.patch('/:id', restrictTo('ADMIN'), upload.single('book'), empreendimentoController.update);

// Delete empreendimento (admin only)
router.delete('/:id', restrictTo('ADMIN'), empreendimentoController.delete);

export default router; 