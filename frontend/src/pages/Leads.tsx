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
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Lead } from '../types/Lead';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { MoneyInput } from '../components/MoneyInput';

type Order = 'asc' | 'desc';

interface HeadCell {
  id: keyof Lead;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'nome', label: 'Nome', numeric: false },
  { id: 'telefone', label: 'Telefone', numeric: false },
  { id: 'email', label: 'Email', numeric: false },
  { id: 'renda', label: 'Renda', numeric: true },
  { id: 'dataNascimento', label: 'Data de Nascimento', numeric: false },
  { id: 'entrada', label: 'Entrada', numeric: true },
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

// Função para formatar string de centavos para BRL
function formatCentavosToBRL(value: string) {
  if (!value) return '';
  const number = parseFloat(value) / 100;
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState<keyof Lead>('createdAt');
  const [order, setOrder] = useState<Order>('desc');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<Partial<Lead & { rendaRaw?: string; entradaRaw?: string }>>({
    nome: '',
    telefone: '',
    email: '',
    crmLink: '',
    rendaRaw: '',
    dataNascimento: '',
    entradaRaw: '',
    anotacoes: ''
  });

  const fetchLeads = async () => {
    try {
      const response = await axios.get('/api/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este lead?')) return;
    
    try {
      await axios.delete(`/api/leads/${id}`);
      fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleRequestSort = (property: keyof Lead) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOpenDialog = (lead?: Lead) => {
    if (lead) {
      setSelectedLead(lead);
      setFormData({
        ...lead,
        dataNascimento: lead.dataNascimento ? format(parseISO(lead.dataNascimento), 'yyyy-MM-dd') : '',
        rendaRaw: lead.renda ? (lead.renda * 100).toString() : '',
        entradaRaw: lead.entrada ? (lead.entrada * 100).toString() : ''
      });
    } else {
      setSelectedLead(null);
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        crmLink: '',
        rendaRaw: '',
        dataNascimento: '',
        entradaRaw: '',
        anotacoes: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLead(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedLead) {
        await axios.put(`/api/leads/${selectedLead.id}`, formData);
      } else {
        await axios.post('/api/leads', formData);
      }
      handleCloseDialog();
      fetchLeads();
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const filteredLeads = leads
    .filter((lead) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        lead.nome.toLowerCase().includes(searchLower) ||
        (lead.email?.toLowerCase().includes(searchLower) ?? false) ||
        lead.telefone.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aValue = a[orderBy] ?? '';
      const bValue = b[orderBy] ?? '';

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
          Leads
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Lead
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar leads..."
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
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.nome}</TableCell>
                <TableCell>{lead.telefone}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell align="right">
                  {lead.renda ? new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(lead.renda) : '-'}
                </TableCell>
                <TableCell>
                  {lead.dataNascimento ? format(new Date(lead.dataNascimento), 'dd/MM/yyyy', { locale: ptBR }) : '-'}
                </TableCell>
                <TableCell align="right">
                  {lead.entrada ? new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(lead.entrada) : '-'}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(lead)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(lead.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedLead ? 'Editar Lead' : 'Novo Lead'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Link CRM"
                  name="crmLink"
                  value={formData.crmLink}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MoneyInput
                  fullWidth
                  label="Renda"
                  name="renda"
                  value={formData.rendaRaw ?? ''}
                  onChange={(raw, floatValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      rendaRaw: raw,
                      renda: floatValue,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data de Nascimento"
                  name="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MoneyInput
                  fullWidth
                  label="Entrada"
                  name="entrada"
                  value={formData.entradaRaw ?? ''}
                  onChange={(raw, floatValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      entradaRaw: raw,
                      entrada: floatValue,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Anotações"
                  name="anotacoes"
                  value={formData.anotacoes}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedLead ? 'Salvar' : 'Criar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}; 