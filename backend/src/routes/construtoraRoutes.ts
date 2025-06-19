import { Router } from 'express';
import { construtoraController } from '../controllers/construtoraController';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Protect all routes
router.use(protect);

// Get all construtoras
router.get('/', construtoraController.getAll);

// Get construtora by id
router.get('/:id', construtoraController.getById);

// Create new construtora (admin only)
router.post('/', restrictTo('ADMIN'), construtoraController.create);

// Update construtora (admin only)
router.put('/:id', restrictTo('ADMIN'), construtoraController.update);

// Delete construtora (admin only)
router.delete('/:id', restrictTo('ADMIN'), construtoraController.delete);

export default router; 