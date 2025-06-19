import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import { Empreendimentos } from './pages/Empreendimentos';
import { Leads } from './pages/Leads';
import { Construtoras } from './pages/Construtoras';
import { EmpreendimentoForm } from './components/EmpreendimentoForm';
import { Users } from './pages/Users';
import Signup from './pages/Signup';

const queryClient = new QueryClient();

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Empreendimentos />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/leads"
          element={
            <PrivateRoute>
              <Leads />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/construtoras"
          element={
            <PrivateRoute>
              <Construtoras />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/empreendimentos/new"
          element={
            <PrivateRoute>
              <EmpreendimentoForm />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/empreendimentos/:id/edit"
          element={
            <PrivateRoute>
              <EmpreendimentoForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <div>Perfil do Usuário</div>
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <div>Configurações</div>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default AppRoutes; 