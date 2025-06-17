import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { AppError } from '../middlewares/error.middleware';

const router = Router();
const prisma = new PrismaClient();

// Protect all routes after this middleware
router.use(protect);

// Get all users (admin only)
router.get('/', restrictTo('ADMIN'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        aprovado: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Aprovar usuário (admin only)
router.patch('/:id/aprovar', restrictTo('ADMIN'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { aprovado: true },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        aprovado: true,
        createdAt: true,
      },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Create new user (admin only)
router.post('/', restrictTo('ADMIN'), async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        aprovado: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        aprovado: true,
        createdAt: true,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// Delete user (admin only)
router.delete('/:id', restrictTo('ADMIN'), async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent deleting the last admin user
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });

    const userToDelete = await prisma.user.findUnique({
      where: { id },
      select: { role: true }
    });

    if (adminCount === 1 && userToDelete?.role === 'ADMIN') {
      throw new AppError('Cannot delete the last admin user', 400);
    }

    await prisma.user.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router; 