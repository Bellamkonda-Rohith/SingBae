import { AppBar, Box, Toolbar, IconButton, Badge, Button, InputBase, useMediaQuery, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { ShoppingCart, Home, Search, LibraryMusic } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import theme from '../theme/theme';

// Styled Components
const SearchContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: 30,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 500,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
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
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.8, 1, 1.8, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: 14,
    fontWeight: 500,
  },
}));

const MusicAppBar = styled(AppBar)({
  backgroundColor: '#000000',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const Navbar = () => {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MusicAppBar position="fixed">
        <Toolbar sx={{ minHeight: 64, gap: 2 }}>
          {/* Brand Section */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <LibraryMusic sx={{ 
              fontSize: 32, 
              color: '#1DB954', 
              mr: 1 
            }} />
            <Typography variant="h6" sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1DB954 30%, #1ED760 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              SingBae
            </Typography>
          </motion.div>

          {/* Home Button */}
          {!isMobile && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                color="inherit"
                startIcon={<Home sx={{ color: '#1DB954' }} />}
                onClick={() => navigate('/')}
                sx={{
                  textTransform: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Home
              </Button>
            </motion.div>
          )}

          {/* Search Bar */}
          <SearchContainer
            initial={{ width: isMobile ? 40 : 240 }}
            whileFocus={{ width: 320 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <SearchIconWrapper>
              <Search sx={{ color: '#b3b3b3', fontSize: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search songs, artists..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: '#fff' }}
            />
          </SearchContainer>

          <Box sx={{ flexGrow: 1 }} />

          {/* Cart Button */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{
                position: 'relative',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Badge 
                badgeContent={totalItems} 
                overlap="circular"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -4,
                    top: 12,
                    fontWeight: 'bold',
                    fontSize: 10,
                    backgroundColor: '#1DB954',
                    color: '#000'
                  }
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 1.5, repeat: Infinity }
                  }}
                >
                  <ShoppingCart sx={{ 
                    fontSize: 28, 
                    color: '#fff' 
                  }} />
                </motion.div>
              </Badge>
            </IconButton>
          </motion.div>
        </Toolbar>
      </MusicAppBar>
      <Box sx={{ height: 64 }} />
    </Box>
  );
};

export default Navbar;