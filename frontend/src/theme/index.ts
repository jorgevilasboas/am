import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

const primaryColor = '#334155'; // cinza-azulado escuro para botões
const secondaryColor = '#64748b'; // cinza-azulado para botões secundários
const cardColor = '#f8fafc'; // cinza-claro para cards/grid
const backgroundColor = '#fff'; // fundo principal branco
const borderColor = '#e5e7eb'; // bordas/divisores cinza bem claro
const accentColor = '#2563eb'; // azul para destaques
const textPrimary = '#1e293b'; // cinza-escuro para texto principal
const textSecondary = '#64748b'; // cinza médio para texto secundário

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryColor,
      light: '#60a5fa',
      dark: '#1e40af',
      contrastText: '#fff',
    },
    secondary: {
      main: secondaryColor,
      light: '#cbd5e1',
      dark: '#334155',
      contrastText: '#fff',
    },
    neutral: {
      main: borderColor,
      light: '#f1f5f9',
      dark: '#cbd5e1',
      contrastText: textPrimary,
    },
    background: {
      default: backgroundColor,
      paper: cardColor,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    divider: borderColor,
    action: {
      hover: '#e0e7ef',
      selected: accentColor,
      disabled: '#cbd5e1',
      disabledBackground: '#f1f5f9',
    },
    warning: {
      main: accentColor,
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          backgroundColor: primaryColor,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#475569',
            color: '#fff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: cardColor,
          border: `1px solid ${borderColor}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: cardColor,
        },
        elevation1: {
          boxShadow: '0px 4px 20px rgba(30, 41, 59, 0.08)',
          border: `1px solid ${borderColor}`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderBottom: `1px solid ${borderColor}`,
        },
        head: {
          fontWeight: 600,
          backgroundColor: cardColor,
          color: textPrimary,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: backgroundColor,
          borderBottom: `1px solid ${borderColor}`,
          boxShadow: '0px 1px 3px rgba(30,41,59,0.06)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: cardColor,
          borderRight: `1px solid ${borderColor}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: borderColor,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
        },
      },
    },
  },
}); 