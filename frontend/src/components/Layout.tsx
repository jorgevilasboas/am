import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Badge,
  Container,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import logoAM from '../assets/logo_am.jpg';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const menuItems = [
    { text: 'Empreendimentos', icon: <BusinessIcon />, path: '/' },
    { text: 'Leads', icon: <PeopleIcon />, path: '/leads' },
    { text: 'Usuários', icon: <PersonIcon />, path: '/users' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          background: 'linear-gradient(90deg, #233944 0%, #18232b 100%)',
          borderBottom: `1.5px solid #2d4854`,
          boxShadow: '0 2px 8px 0 rgba(35,57,68,0.10)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mr: 4,
              }}
            >
              <Box
                component={Link}
                to="/"
                sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              >
                <Box
                  component="img"
                  src={logoAM}
                  alt="Logo AM Imobiliária"
                  sx={{
                    height: 40,
                    width: 40,
                    borderRadius: 2,
                    objectFit: 'cover',
                    boxShadow: 2,
                    mr: 1.5,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    letterSpacing: '-0.5px',
                    fontFamily: 'inherit',
                    textShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  }}
                >
                  AM Imobiliária
                </Typography>
              </Box>
            </Box>

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
                {menuItems.map((item) => {
                  const isActive = isCurrentPath(item.path);
                  return (
                    <Button
                      key={item.text}
                      component={Link}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        color: isActive ? '#fff' : '#a1a1aa',
                        background: isActive
                          ? 'linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)'
                          : 'transparent',
                        fontWeight: isActive ? 800 : 500,
                        px: 2.5,
                        border: isActive ? '1.5px solid rgba(255,255,255,0.18)' : '1.5px solid transparent',
                        boxShadow: isActive ? '0 4px 16px 0 rgba(0,0,0,0.18)' : 'none',
                        letterSpacing: isActive ? '0.5px' : '0px',
                        textShadow: isActive ? '0 2px 8px rgba(0,0,0,0.18)' : 'none',
                        transition: 'all 0.2s',
                        '&:hover': {
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                          color: '#fff',
                          border: '1.5px solid rgba(255,255,255,0.22)',
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  );
                })}
              </Box>
            )}

            {/* Right Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Notificações">
                <IconButton size="large" sx={{ color: '#fff' }}>
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Configurações">
                <IconButton size="large" sx={{ color: '#fff' }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  p: 1,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={handleUserMenuOpen}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: '#fff',
                    color: theme.palette.primary.main,
                  }}
                >
                  {user?.email?.charAt(0).toUpperCase()}
                </Avatar>
                {!isMobile && (
                  <Typography variant="body2" fontWeight={500}>
                    {user?.email}
                  </Typography>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchorEl}
        open={Boolean(mobileMenuAnchorEl)}
        onClose={handleMobileMenuClose}
        sx={{ mt: 1 }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleMobileMenuClose}
            sx={{
              color: isCurrentPath(item.path) ? 'primary.main' : 'text.primary',
              py: 1.5,
              px: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {item.icon}
              <Typography variant="body2" fontWeight={isCurrentPath(item.path) ? 600 : 400}>
                {item.text}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchorEl}
        open={Boolean(userMenuAnchorEl)}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem component={Link} to="/profile">
          <PersonIcon sx={{ mr: 2 }} />
          Perfil
        </MenuItem>
        <MenuItem component={Link} to="/settings">
          <SettingsIcon sx={{ mr: 2 }} />
          Configurações
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <LogoutIcon sx={{ mr: 2 }} />
          Sair
        </MenuItem>
      </Menu>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 9 },
          px: { xs: 2, sm: 3, md: 4 },
          pb: 3,
          backgroundColor: 'background.default',
          backgroundImage: 'none',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mb: 4,
            }}
          >
            {/* Removido botão global de Novo Empreendimento */}
          </Box>
          {children}
        </Container>
      </Box>
    </Box>
  );
}; 