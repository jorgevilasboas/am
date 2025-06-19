import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import empreendimentoRoutes from './routes/empreendimentoRoutes';
import leadRoutes from './routes/leadRoutes';
import construtoraRoutes from './routes/construtoraRoutes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Enable CORS for all routes
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'http://10.0.0.186:5173',
    'http://10.0.0.186:5174',
    /^http:\/\/10\.0\.0\.\d+:5173$/, // Permite qualquer IP da rede 10.0.0.x
    /^http:\/\/10\.0\.0\.\d+:5174$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/empreendimentos', empreendimentoRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/construtoras', construtoraRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the API at: http://localhost:${PORT}`);
  console.log(`For external access, use your machine's IP address`);
}); 