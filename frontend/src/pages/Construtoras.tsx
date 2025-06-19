import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Tooltip,
  Link
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Construtora } from '../types/Construtora';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Order = 'asc' | 'desc';

interface HeadCell {
  id: keyof Construtora;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'nome', label: 'Nome', numeric: false },
  { id: 'link', label: 'Link', numeric: false },
  { id: 'createdAt', label: 'Data de Criação', numeric: false },
  { id: '_count', label: 'Empreendimentos', numeric: true },
];

export const Construtoras: React.FC = () => {
  const [construtoras, setConstrutoras] = useState<Construtora[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<keyof Construtora>('createdAt');
  const [order, setOrder] = useState<Order>('desc');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedConstrutora, setSelectedConstrutora] = useState<Construtora | null>(null);
  const [formData, setFormData] = useState<Partial<Construtora>>({
    nome: '',
    link: ''
  });

  const { user } = useAuth();
  const isAdmin = !!user && user.role === 'ADMIN';

  const fetchConstrutoras = async () => {
    try {
      const response = await axios.get('/api/construtoras');
      setConstrutoras(response.data);
    } catch (error) {
      console.error('Error fetching construtoras:', error);
    }
  };

  useEffect(() => {
    fetchConstrutoras();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta construtora?')) return;
    
    try {
      await axios.delete(`/api/construtoras/${id}`);
      fetchConstrutoras();
    } catch (error) {
      console.error('Error deleting construtora:', error);
    }
  };

  const handleRequestSort = (property: keyof Construtora) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOpenDialog = (construtora?: Construtora) => {
    if (construtora) {
      setSelectedConstrutora(construtora);
      setFormData({
        nome: construtora.nome,
        link: construtora.link || ''
      });
    } else {
      setSelectedConstrutora(null);
      setFormData({
        nome: '',
        link: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedConstrutora(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedConstrutora) {
        await axios.put(`/api/construtoras/${selectedConstrutora.id}`, formData);
      } else {
        await axios.post('/api/construtoras', formData);
      }
      handleCloseDialog();
      fetchConstrutoras();
    } catch (error) {
      console.error('Error saving construtora:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredConstrutoras = construtoras
    .filter((construtora) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        construtora.nome.toLowerCase().includes(searchLower) ||
        (construtora.link?.toLowerCase().includes(searchLower) ?? false)
      );
    })
    .sort((a, b) => {
      if (orderBy === '_count') {
        const aValue = a._count?.empreendimentos ?? 0;
        const bValue = b._count?.empreendimentos ?? 0;
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aStr = a[orderBy]?.toString() ?? '';
      const bStr = b[orderBy]?.toString() ?? '';
      
      return order === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#233944' }}>
          Construtoras
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: 'linear-gradient(90deg, #233944 0%, #18232b 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #18232b 0%, #233944 100%)',
              },
            }}
          >
            Nova Construtora
          </Button>
        )}
      </Box>

      <Paper sx={{ width: '100%', mb: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar construtoras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ fontWeight: 'bold', color: '#233944' }}
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
                {isAdmin && (
                  <TableCell align="center" sx={{ fontWeight: 'bold', color: '#233944' }}>
                    Ações
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredConstrutoras.map((construtora) => (
                <TableRow
                  hover
                  key={construtora.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                    {construtora.nome}
                  </TableCell>
                  <TableCell>
                    {construtora.link ? (
                      <Link
                        href={construtora.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <LinkIcon sx={{ fontSize: 16 }} />
                        Ver site
                      </Link>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Não informado
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(construtora.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell align="right">
                    {construtora._count?.empreendimentos || 0}
                  </TableCell>
                  {isAdmin && (
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(construtora)}
                            sx={{ color: '#233944' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(construtora.id)}
                            sx={{ color: '#d32f2f' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog para criar/editar construtora */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedConstrutora ? 'Editar Construtora' : 'Nova Construtora'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome da Construtora"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Link do Site (opcional)"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  variant="outlined"
                  placeholder="https://www.exemplo.com"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {selectedConstrutora ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}; 