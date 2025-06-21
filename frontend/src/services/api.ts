import axios from 'axios';

// Configuração dinâmica da URL da API
const getApiUrl = () => {
  // Em produção, usa a variável de ambiente
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://your-railway-app.railway.app';
  }
  
  // Em desenvolvimento, detecta automaticamente
  const host = window.location.hostname;
  const port = '3001';
  
  if (host === 'localhost' || host === '127.0.0.1') {
    return `http://${host}:${port}`;
  }
  
  // Para acesso externo (iPad, etc.)
  return `http://${host}:${port}`;
};

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 