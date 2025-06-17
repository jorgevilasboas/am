import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import { Empreendimentos } from './pages/Empreendimentos';
import { Leads } from './pages/Leads';
import { EmpreendimentoForm } from './components/EmpreendimentoForm';

const queryClient = new QueryClient();

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
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
                  <UserManagement />
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
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App; 