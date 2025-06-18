import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Paper,
  InputAdornment
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface EmpreendimentoFormData {
  construtora: string;
  empreendimento: string;
  bairro: string;
  tipo: string;
  dataEntrega: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  renda?: number;
  tabelaLink?: string;
  book?: string;
  area_de?: number;
  area_ate?: number;
  unidades?: number;
}

export const EmpreendimentoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<EmpreendimentoFormData>({
    construtora: '',
    empreendimento: '',
    bairro: '',
    tipo: '',
    dataEntrega: '',
    description: '',
    status: 'ACTIVE',
    renda: undefined,
    tabelaLink: '',
    area_de: undefined,
    area_ate: undefined,
    unidades: 0,
  });

  useEffect(() => {
    if (isEditing) {
      fetchEmpreendimento();
    }
  }, [id]);

  const fetchEmpreendimento = async () => {
    try {
      const response = await axios.get(`/api/empreendimentos/${id}`);
      const data = response.data;
      setFormData({
        ...data,
        dataEntrega: data.dataEntrega ? data.dataEntrega.split('T')[0] : '',
      });
    } catch (error) {
      console.error('Error fetching empreendimento:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `/api/empreendimentos/${id}`
        : '/api/empreendimentos';
      
      const method = isEditing ? 'patch' : 'post';

      // Create FormData object to handle file upload
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          !(key === 'unidades' && (value === '' || isNaN(Number(value))))
        ) {
          formDataToSend.append(key, value.toString());
        }
      });

      // Add file if selected
      if (selectedFile) {
        formDataToSend.append('book', selectedFile);
      }
      
      await axios[method](url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error saving empreendimento:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files) {
      setSelectedFile(files[0]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? (value ? Number(value) : undefined) : value
      }));
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {isEditing ? 'Editar Empreendimento' : 'Novo Empreendimento'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Construtora"
            name="construtora"
            value={formData.construtora}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Empreendimento"
            name="empreendimento"
            value={formData.empreendimento}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bairro"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Data de Entrega"
            name="dataEntrega"
            type="date"
            value={formData.dataEntrega}
            onChange={handleChange}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Renda Mínima"
            name="renda"
            type="number"
            value={formData.renda || ''}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
          />
          <TextField
            fullWidth
            label="Link da Tabela"
            name="tabelaLink"
            value={formData.tabelaLink}
            onChange={handleChange}
            margin="normal"
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Área De (m²)"
              name="area_de"
              type="number"
              value={formData.area_de || ''}
              onChange={handleChange}
              margin="normal"
              inputProps={{ step: "0.01", min: "0" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">m²</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              label="Área Até (m²)"
              name="area_ate"
              type="number"
              value={formData.area_ate || ''}
              onChange={handleChange}
              margin="normal"
              inputProps={{ step: "0.01", min: "0" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">m²</InputAdornment>,
              }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="book-file"
              name="book"
              type="file"
              onChange={handleChange}
            />
            <label htmlFor="book-file">
              <Button variant="outlined" component="span">
                {selectedFile ? selectedFile.name : 'Upload Book (PDF)'}
              </Button>
            </label>
            {formData.book && !selectedFile && (
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Current file: {formData.book}
              </Typography>
            )}
          </Box>
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="ACTIVE">Ativo</MenuItem>
            <MenuItem value="INACTIVE">Inativo</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Unidades"
            name="unidades"
            type="number"
            value={formData.unidades || ''}
            onChange={handleChange}
            required
            margin="normal"
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {isEditing ? 'Salvar' : 'Criar'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}; 