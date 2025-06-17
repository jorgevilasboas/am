import express from 'express';
import { leadController } from '../controllers/leadController';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Get all leads
router.get('/', leadController.getAll);

// Get a single lead by ID
router.get('/:id', leadController.getById);

// Create a new lead
router.post('/', leadController.create);

// Update a lead
router.put('/:id', leadController.update);

// Delete a lead
router.delete('/:id', leadController.delete);

export default router; 