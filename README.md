# User Management System

A full-stack user management system with authentication and role-based access control.

## Features

- User authentication (login/logout)
- Role-based access control (Admin/User)
- User management (create, list users)
- Modern UI with Tailwind CSS
- TypeScript support
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- Docker (optional)

## Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_management?schema=public"
   JWT_SECRET="your-secret-key"
   PORT=5001
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database with an admin user:
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Setup (Optional)

1. Start the PostgreSQL container:
   ```bash
   docker-compose up -d
   ```

2. Follow the backend setup steps (excluding database setup)

## Default Admin Credentials

- Email: admin@admin.com
- Password: admin123

## API Endpoints

### Authentication
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user

### Users
- GET /api/users - Get all users (Admin only)
- POST /api/users - Create new user (Admin only)

## Technologies Used

### Backend
- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT for authentication

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Query
- React Router
- Axios 