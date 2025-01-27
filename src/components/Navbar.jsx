import { AppBar, Box, Toolbar, IconButton, Badge, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import theme from '../theme/theme';
import logo from '../assets/sangBaeicon.svg';

export const Navbar = () => {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home page when logo is clicked
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to the home page when home icon is clicked
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#1DB954", zIndex: 1300, color: "white" }}>
        <Toolbar>
          <Box
            component="img"
            src={logo}
            alt="SingBae Logo"
            sx={{
              height: 60,
              cursor: 'pointer',
              marginRight: { xs: 1, md: 2 },
            }}
            onClick={handleLogoClick}
          />
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={handleHomeClick}
            sx={{
              textTransform: 'none',
              fontSize: { xs: '1rem', md: '1.25rem' }, // Responsive font size
            }}
          >
            Home
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="cart"
            onClick={handleCartClick}
            sx={{
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: 8 }} />
    </Box>
  );
};
