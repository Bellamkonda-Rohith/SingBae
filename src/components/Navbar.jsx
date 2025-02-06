import { AppBar, Box, Toolbar, IconButton, Badge, Button, InputBase, useMediaQuery } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import theme from '../theme/theme';
import logo from '../assets/sangBaeicon.svg';

// Styled Components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = () => {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCartClick = () => navigate('/cart');
  const handleLogoClick = () => navigate('/');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ 
        background: 'linear-gradient(135deg, #1DB954 0%, #17a844 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        zIndex: 1300
      }}>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Box
            component="img"
            src={logo}
            alt="SingBae Logo"
            sx={{
              height: { xs: 40, sm: 50 },
              cursor: 'pointer',
              mr: 2,
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}
            onClick={handleLogoClick}
          />
          
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': { background: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            {!isMobile && 'Home'}
          </Button>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size={isMobile ? 'medium' : 'large'}
            color="inherit"
            onClick={handleCartClick}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': { 
                background: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Badge 
              badgeContent={totalItems} 
              color="error"
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  right: -4,
                  top: 8,
                  fontWeight: 'bold',
                  fontSize: theme.typography.pxToRem(12)
                }
              }}
            >
              <ShoppingCartIcon fontSize={isMobile ? 'medium' : 'large'} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: { xs: 56, sm: 64 } }} />
    </Box>
  );
};

export default Navbar;
