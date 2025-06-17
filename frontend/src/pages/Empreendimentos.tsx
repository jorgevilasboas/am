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
  InputAdornment,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  TableChart as TableChartIcon,
  MenuBook as MenuBookIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import NumberFormat from 'react-number-format';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { TextFieldProps } from '@mui/material/TextField';
import { getLocalDateString } from '../utils/dateUtils';
import { formatBRL } from '../utils/currencyUtils';

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
  renda?: number;
  tabelaLink?: string;
  book?: string;
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
  { id: 'renda', label: 'Renda Mínima', numeric: true },
  { id: 'tabelaLink', label: 'Tabela', numeric: false },
  { id: 'book', label: 'Book', numeric: false },
];

function NumberFormatCustom(props: NumericFormatProps & { inputRef: any }) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      thousandSeparator='.'
      decimalSeparator=','
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      prefix=""
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
    />
  );
}

export const Empreendimentos: React.FC = () => {
  const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<keyof Empreendimento>('createdAt');
  const [order, setOrder] = useState<Order>('desc');
  const navigate = useNavigate();
  const user = useAuth();

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

  const handleDownloadBook = async (id: string) => {
    try {
      // First, get the book info with the correct download URL
      const infoResponse = await axios.get(`/api/empreendimentos/${id}/book-info`);
      const { downloadUrl, filename } = infoResponse.data;

      // Now download the file
      const response = await axios.get(downloadUrl, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename; // Use the filename from the info response
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Error downloading book:', error);
    }
  };

  const filteredEmpreendimentos = empreendimentos
    .filter((empreendimento) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        empreendimento.construtora.toLowerCase().includes(searchLower) ||
        empreendimento.empreendimento.toLowerCase().includes(searchLower) ||
        empreendimento.bairro.toLowerCase().includes(searchLower) ||
        empreendimento.tipo.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (orderBy === 'renda') {
        const aValue = a.renda ?? 0;
        const bValue = b.renda ?? 0;
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aStr = a[orderBy]?.toString() ?? '';
      const bStr = b[orderBy]?.toString() ?? '';
      
      return order === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
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
                  {getLocalDateString(empreendimento.dataEntrega)}
                </TableCell>
                <TableCell>{empreendimento.status}</TableCell>
                <TableCell align="right">
                  {formatBRL(empreendimento.renda)}
                </TableCell>
                <TableCell>
                  {empreendimento.tabelaLink && (
                    <Tooltip title="Ver Tabela">
                      <IconButton
                        size="small"
                        onClick={() => window.open(empreendimento.tabelaLink, '_blank')}
                      >
                        <TableChartIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  {empreendimento.book && (
                    <Tooltip title="Download Book">
                      <IconButton
                        size="small"
                        onClick={() => handleDownloadBook(empreendimento.id)}
                      >
                        <MenuBookIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/empreendimentos/${empreendimento.id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  {user?.role === 'ADMIN' && (
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(empreendimento.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
