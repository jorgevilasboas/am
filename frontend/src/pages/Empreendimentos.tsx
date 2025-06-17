import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Empreendimento {
  id: string;
  construtora: string;
  empreendimento: string;
  bairro: string;
  tipo: string;
  dataEntrega: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
  id: keyof Empreendimento;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'construtora', label: 'Construtora', numeric: false },
  { id: 'empreendimento', label: 'Empreendimento', numeric: false },
  { id: 'bairro', label: 'Bairro', numeric: false },
  { id: 'tipo', label: 'Tipo', numeric: false },
  { id: 'dataEntrega', label: 'Data de Entrega', numeric: false },
  { id: 'status', label: 'Status', numeric: false },
];

export const Empreendimentos: React.FC = () => {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<keyof Empreendimento>('createdAt');
  const [order, setOrder] = useState<Order>('desc');
  const navigate = useNavigate();

  const fetchEmpreendimentos = async () => {
    try {
      const response = await axios.get('/api/empreendimentos');
      setEmpreendimentos(response.data);
    } catch (error) {
      console.error('Error fetching empreendimentos:', error);
    }
  };

  useEffect(() => {
    fetchEmpreendimentos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este empreendimento?')) return;
    
    try {
      await axios.delete(`/api/empreendimentos/${id}`);
      fetchEmpreendimentos();
    } catch (error) {
      console.error('Error deleting empreendimento:', error);
    }
  };

  const handleRequestSort = (property: keyof Empreendimento) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredEmpreendimentos = empreendimentos
    .filter((empreendimento) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        empreendimento.construtora.toLowerCase().includes(searchLower) ||
        empreendimento.empreendimento.toLowerCase().includes(searchLower) ||
        empreendimento.bairro.toLowerCase().includes(searchLower) ||
        empreendimento.tipo.toLowerCase().includes(searchLower) ||
        empreendimento.status.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Empreendimentos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/empreendimentos/new')}
        >
          Novo Empreendimento
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar empreendimentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmpreendimentos.map((empreendimento) => (
              <TableRow key={empreendimento.id}>
                <TableCell>{empreendimento.construtora}</TableCell>
                <TableCell>{empreendimento.empreendimento}</TableCell>
                <TableCell>{empreendimento.bairro}</TableCell>
                <TableCell>{empreendimento.tipo}</TableCell>
                <TableCell>
                  {new Date(empreendimento.dataEntrega).toLocaleDateString()}
                </TableCell>
                <TableCell>{empreendimento.status}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/empreendimentos/${empreendimento.id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(empreendimento.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
