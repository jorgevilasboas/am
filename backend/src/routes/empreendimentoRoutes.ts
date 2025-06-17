import { Router } from 'express';
import { empreendimentoController } from '../controllers/empreendimentoController';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Protect all routes
router.use(protect);

// Get all empreendimentos
router.get('/', empreendimentoController.findAll);

// Get single empreendimento
router.get('/:id', empreendimentoController.findById);

// Create empreendimento (admin only)
router.post('/', restrictTo('ADMIN'), empreendimentoController.create);

// Update empreendimento (admin only)
router.patch('/:id', restrictTo('ADMIN'), empreendimentoController.update);

// Delete empreendimento (admin only)
router.delete('/:id', restrictTo('ADMIN'), empreendimentoController.delete);

export default router; 