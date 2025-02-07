import { AppBar, Box, Toolbar, IconButton, Badge, Button, InputBase, useMediaQuery } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import theme from '../theme/theme';
import logo from '../assets/sangBaeicon.svg';

// Styled Components
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

// Animated Components
const AnimatedBadge = motion(Badge);
const FloatingButton = motion(IconButton);

const Search = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: theme.spacing(2),
  width: '40%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    transform: 'scale(1.02)'
  },
}));

const GlowingAppBar = styled(AppBar)({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.9)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.9)} 100%)`,
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
});

const Navbar = () => {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCartClick = () => navigate('/cart');
  const handleLogoClick = () => navigate('/');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <GlowingAppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, py: 1 }}>
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Box
              component="img"
              src={logo}
              alt="SingBae Logo"
              sx={{
                height: { xs: 40, sm: 50 },
                cursor: 'pointer',
                mr: 2,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              }}
              onClick={handleLogoClick}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
  <Button
    color="inherit"
    startIcon={
      <motion.div 
        whileHover={{ scale: 1.1 }}
        style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2px' // Adjust this value for perfect alignment
        }}
      >
        <HomeIcon sx={{ fontSize: 'inherit' }} />
      </motion.div>
    }
    onClick={() => navigate('/')}
    sx={{
      textTransform: 'none',
      fontSize: { xs: '0.875rem', sm: '1rem' },
      fontWeight: 600,
      letterSpacing: '0.5px',
      '&:hover': { 
        background: 'rgba(255, 255, 255, 0.1)',
        '&::after': { width: '100%' }
      },
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      '& .MuiButton-startIcon': {
        margin: 0 // Remove default margin
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '2px',
        background: 'white',
        transition: 'width 0.3s ease'
      }
    }}
  >
    {!isMobile && 'Home'}
  </Button>
</motion.div>

          <Search
            initial={{ width: isMobile ? '100px' : '300px' }}
            whileFocus={{ width: '400px' }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <SearchIconWrapper>
              <SearchIcon sx={{ color: 'white' }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                color: 'white',
                '&::placeholder': { color: 'rgba(255,255,255,0.8)' }
              }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <FloatingButton
            size={isMobile ? 'medium' : 'large'}
            onClick={handleCartClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            sx={{
              color: 'white',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              },
              '&:hover::before': {
                opacity: 1
              }
            }}
          >
            <AnimatedBadge 
              badgeContent={totalItems} 
              color="error"
              overlap="circular"
              animate={{
                scale: [1, 1.2, 1],
                transition: { duration: 0.3 }
              }}
              key={totalItems}
              sx={{
                '& .MuiBadge-badge': {
                  right: -4,
                  top: 8,
                  fontWeight: 'bold',
                  fontSize: theme.typography.pxToRem(12),
                  background: 'linear-gradient(45deg, #ff1744 0%, #ff4081 100%)',
                  boxShadow: '0 4px 8px rgba(255,23,68,0.3)'
                }
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 1.5, repeat: Infinity }
                }}
              >
                <ShoppingCartIcon fontSize={isMobile ? 'medium' : 'large'} />
              </motion.div>
            </AnimatedBadge>
          </FloatingButton>
        </Toolbar>

        {/* Animated Border Bottom */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'mirror' }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #fff, transparent)',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            originX: 0
          }}
        />
      </GlowingAppBar>
      <Box sx={{ height: { xs: 56, sm: 64 } }} />
    </Box>
  );
};

export default Navbar;