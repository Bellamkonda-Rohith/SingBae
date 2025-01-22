import { AppBar, Box, Toolbar, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "black", zIndex: 1300, color: "white" }}>
        <Toolbar>
          <Box
            component="img"
            src={logo}
            alt="SingBae Logo"
            sx={{
              height: 60,
              cursor: 'pointer',
            }}
            onClick={handleLogoClick}
          />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="cart"
            onClick={handleCartClick}
            sx={{
              marginLeft: 'auto', // Push the cart icon to the right
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
